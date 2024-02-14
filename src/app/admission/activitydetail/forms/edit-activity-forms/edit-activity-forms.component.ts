import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { User } from '@core';
import { ActivityLocationService } from 'app/admission/maestros/services/activity-location.service';
import { ActivityService } from 'app/admission/maestros/services/activity.service';
import { ModalityService } from 'app/admission/maestros/services/modality.service';
import { ReasonService } from 'app/admission/maestros/services/reason.service';
import { SourceFundsService } from 'app/admission/maestros/services/source-funds.service';
import { TypeActivityService } from 'app/admission/maestros/services/type-activity.service';
import { EditActivity } from 'app/admission/models/EditActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Activity, UbicationsActivity } from 'app/admission/models/activity';
import { Modality } from 'app/admission/models/modality';
import { Reason } from 'app/admission/models/reason';
import { SourceFunds } from 'app/admission/models/source -funds';
import { TypeActivity } from 'app/admission/models/type-activity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { UserService } from 'app/security/user/service/user.service';
import * as moment from 'moment-timezone';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import { EditorConfig } from '@ckeditor/ckeditor5-angular';
export interface DialogData {
  actividad: EditActivity;
  accion: string;
}
@Component({
  selector: 'app-edit-activity-forms',
  templateUrl: './edit-activity-forms.component.html',
  styleUrls: ['./edit-activity-forms.component.scss']
})
export class EditActivityFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string = '';
  dialogTitle: string = '';
  editActivity!: UntypedFormGroup;
  RoweditActivity!: EditActivity;
  id_actividad: string = '';
  activityList!: Activity[];
  ubicationsList!: UbicationsActivity[];
  modalityList!: Modality[];
  typeActivityList!: TypeActivity[];
  userList!: User[];
  reasonList!: Reason[];
  sourceFundsList!: SourceFunds[];
  public pasar: any[] = [];
  public cantidadHoras: number = 0;
  public Editor: any = ClassicEditor;

  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }
  @ViewChild('stepper') stepper: MatStepper | undefined;
  constructor(
    public dialogRef: MatDialogRef<EditActivityFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityDetailService: ActivityDetailService,
    private fb: UntypedFormBuilder,
    private _activityService: ActivityService,
    private _activityLocationService: ActivityLocationService,
    private _modalityService: ModalityService,
    private _typeActivityService: TypeActivityService,
    private _userService: UserService,
    private _reasonService: ReasonService,
    private _sourceFundsService: SourceFundsService,
  ) {

    this.loadActivities();
    this.loadModality();
    this.loadTypeActivity();
    this.loadUser();
    this.loadReason();
    this.loadSourceFunds();
    this.loadLocationActividad();

    if (data.actividad.electronicEvaluation) {
      data.actividad.electronicEvaluation = "true";
    } else {
      data.actividad.electronicEvaluation = "false";
    }

    if (data.actividad.hasSurvey) {
      data.actividad.hasSurvey = "true";
    } else {
      data.actividad.hasSurvey = "false";
    }
    console.log(this.id_actividad);

    this.cantidadHoras = data.actividad.totalHours;
    this.editActivity = this.fb.group({
      statusId: [data.actividad.statusId, [Validators.required]],//
      name: [data.actividad.name, [Validators.required]],//
      description: [data.actividad.description, [Validators.required]],//
      id: [data.actividad.id, [Validators.required]],//
      activityModeId: [data.actividad.activityModeId, [Validators.required]],//
      activityTypeId: [data.actividad.activityTypeId, [Validators.required]],//
      activityLocationId: [data.actividad.activityLocationId, [Validators.required]],//
      activityFundsSourceId: [data.actividad.activityFundsSourceId, [Validators.required]],//
      activityReasonId: [data.actividad.activityReasonId, [Validators.required]],//
      curriculumDesignId: [data.actividad.curriculumDesignId, [Validators.required]],//
      assignedCoordinatorId: [data.actividad.assignedCoordinatorId, [Validators.required]],// 
      studentQuota: [data.actividad.studentQuota, [Validators.required]],//
      planningDate: [data.actividad.planningDate, [Validators.required]],//
      startDate: [data.actividad.startDate, [Validators.required]],
      plannedEndDate: [data.actividad.plannedEndDate, [Validators.required]],
      effectiveEndDate: [data.actividad.effectiveEndDate, [Validators.required]],
      inscriptionStartDate: [data.actividad.inscriptionStartDate, [Validators.required]],
      inscriptionEndDate: [data.actividad.inscriptionEndDate, [Validators.required]],
      studentWithdrawalEndDate: [data.actividad.studentWithdrawalEndDate],
      dataSheetDeliveryDate: [data.actividad.dataSheetDeliveryDate, [Validators.required]],
      digitalReportDeliveryDate: [data.actividad.digitalReportDeliveryDate, [Validators.required]],
      physicalReportDeliveryDate: [data.actividad.physicalReportDeliveryDate, [Validators.required]],
      isExecuted: [data.actividad.isExecuted],
      hasDataSheet: [data.actividad.hasDataSheet],
      hasCertificate: [data.actividad.hasCertificate],
      hasSurvey: [data.actividad.hasSurvey],
      isEvaluation: [data.actividad.isEvaluation],
      observations: [data.actividad.observations],
      duration: [data.actividad.duration, [Validators.required]],
      totalHours: [data.actividad.totalHours, [Validators.required]],
      onSiteHours: [data.actividad.onSiteHours, [Validators.required]],
      synchronousHours: [data.actividad.synchronousHours, [Validators.required]],
      asynchronousHours: [data.actividad.asynchronousHours, [Validators.required]],
      startTime: [data.actividad.startTime],
      endTime: [data.actividad.endTime],
      competencies: [data.actividad.competencies],
      content: [data.actividad.content],
      learningActivities: [data.actividad.learningActivities],
      electronicEvaluation: [data.actividad.electronicEvaluation],//
      participationProfile: [data.actividad.participationProfile?.toString(), [Validators.required]],//
      activityTarget: [data.actividad.activityTarget?.toString()],//
      virtualRoom: [data.actividad.virtualRoom],//
      meetLink: [data.actividad.meetLink],//
      justification: [data.actividad.justification],//
      generalGoals: [data.actividad.generalGoals],//
      specificGoals: [data.actividad.specificGoals],//
      participantAdmissionProfile: [data.actividad.participantAdmissionProfile],//
      participantGraduateProfile: [data.actividad.participantGraduateProfile],//
      teachingMethodology: [data.actividad.teachingMethodology],//

    });
    this.action = this.data.accion;
    if (this.action === 'add-document') {
      this.dialogTitle = "Agregar Requerimientos";

    }
  }
  ngOnInit(): void {
  }

  submit() {
    console.log(this.editActivity);
    if (this.editActivity.controls['electronicEvaluation'].value == "true") {
      this.editActivity.controls['electronicEvaluation'].setValue(true);
    } else {
      this.editActivity.controls['electronicEvaluation'].setValue(false);
    }

    if (this.editActivity.controls['hasSurvey'].value == "true") {
      this.editActivity.controls['hasSurvey'].setValue(true);
    } else {
      this.editActivity.controls['hasSurvey'].setValue(false);
    }
    let TimeStart = moment.tz(this.editActivity.controls['startTime'].value, "America/Panama");
    let TimeEnd = moment.tz(this.editActivity.controls['endTime'].value, "America/Panama");
    this.RoweditActivity = {
      id: this.editActivity.controls['id'].value,
      statusId: this.editActivity.controls['statusId'].value,
      name: this.editActivity.controls['name'].value,
      description: this.editActivity.controls['description'].value,
      curriculumDesignId: this.editActivity.controls['curriculumDesignId'].value,
      activityModeId: this.editActivity.controls['activityModeId'].value,
      activityTypeId: this.editActivity.controls['activityTypeId'].value,
      activityLocationId: this.editActivity.controls['activityLocationId'].value,
      activityFundsSourceId: this.editActivity.controls['activityFundsSourceId'].value,
      activityReasonId: this.editActivity.controls['activityReasonId'].value,
      assignedCoordinatorId: this.editActivity.controls['assignedCoordinatorId'].value,
      studentQuota: this.editActivity.controls['studentQuota'].value,
      planningDate: this.editActivity.controls['planningDate'].value,
      startDate: this.editActivity.controls['startDate'].value,
      plannedEndDate: this.editActivity.controls['plannedEndDate'].value,
      effectiveEndDate: this.editActivity.controls['effectiveEndDate'].value,
      startTime: this.adjustDateTimeToLocal(TimeStart.toLocaleString()),
      endTime: this.adjustDateTimeToLocal(TimeEnd.toLocaleString()),
      inscriptionStartDate: this.editActivity.controls['inscriptionStartDate'].value,
      inscriptionEndDate: this.editActivity.controls['inscriptionEndDate'].value,
      studentWithdrawalEndDate: this.editActivity.controls['studentWithdrawalEndDate'].value,
      dataSheetDeliveryDate: this.editActivity.controls['dataSheetDeliveryDate'].value,
      digitalReportDeliveryDate: this.editActivity.controls['digitalReportDeliveryDate'].value,
      physicalReportDeliveryDate: this.editActivity.controls['physicalReportDeliveryDate'].value,
      isExecuted: this.editActivity.controls['isExecuted'].value,
      hasDataSheet: this.editActivity.controls['hasDataSheet'].value,
      hasCertificate: this.editActivity.controls['hasCertificate'].value,
      hasSurvey: this.editActivity.controls['hasSurvey'].value,
      isEvaluation: this.editActivity.controls['isEvaluation'].value,
      observations: this.editActivity.controls['observations'].value,
      duration: this.editActivity.controls['duration'].value,
      totalHours: this.editActivity.controls['totalHours'].value,
      onSiteHours: this.editActivity.controls['onSiteHours'].value,
      synchronousHours: this.editActivity.controls['synchronousHours'].value,
      asynchronousHours: this.editActivity.controls['asynchronousHours'].value,
      competencies: this.editActivity.controls['competencies'].value,
      content: this.editActivity.controls['content'].value,
      learningActivities: this.editActivity.controls['learningActivities'].value,
      electronicEvaluation: this.editActivity.controls['electronicEvaluation'].value,
      participationProfile: this.editActivity.controls['participationProfile'].value,
      activityTarget: this.editActivity.controls['activityTarget'].value,
      virtualRoom: this.editActivity.controls['virtualRoom'].value,
      meetLink: this.editActivity.controls['meetLink'].value,
      justification: this.editActivity.controls['justification'].value,
      generalGoals: this.editActivity.controls['generalGoals'].value,
      specificGoals: this.editActivity.controls['specificGoals'].value,
      participantAdmissionProfile: this.editActivity.controls['participantAdmissionProfile'].value,
      participantGraduateProfile: this.editActivity.controls['participantGraduateProfile'].value,
      teachingMethodology: this.editActivity.controls['teachingMethodology'].value,
      certificatesReceived: 0,
    };
    this._ActivityDetailService.UpdateActivity(this.RoweditActivity).subscribe({
      next: () => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err: any) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    })

  }

  adjustDateTimeToLocal(date: string) {
    let fecha = new Date(date);

    // Formatear la fecha en el formato deseado (YYYY-MM-DDTHH:mm:ss)
    let fechaFormateada = fecha.getFullYear() + '-' +
      ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + // los meses en JavaScript van de 0 a 11
      ('0' + fecha.getDate()).slice(-2) + 'T' +
      ('0' + fecha.getHours()).slice(-2) + ':' +
      ('0' + fecha.getMinutes()).slice(-2) + ':' +
      ('0' + fecha.getSeconds()).slice(-2);
    return fechaFormateada;
  }


  loadLocationActividad() {
    this._activityLocationService.getAllLocationActivity2().subscribe({
      next: (data) => {
        this.ubicationsList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadActivities() {
    this._activityService.getAllActivity2().subscribe({
      next: (data) => {
        this.activityList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadModality() {
    this._modalityService.getAllModality2().subscribe({
      next: (data) => {
        this.modalityList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadTypeActivity() {
    this._typeActivityService.getAllTypeActivity2().subscribe({
      next: (data) => {
        this.typeActivityList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadUser() {
    this._userService.getAllUsers2().subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadReason() {
    this._reasonService.getAllReason2().subscribe({
      next: (data) => {
        this.reasonList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }


  loadSourceFunds() {
    this._sourceFundsService.getAllSourceFunds2().subscribe({
      next: (data) => {
        this.sourceFundsList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

}
