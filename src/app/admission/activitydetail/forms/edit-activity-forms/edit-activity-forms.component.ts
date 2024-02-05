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
  id_actividad: string = '';
  activityList!: Activity[];
  ubicationsList!: UbicationsActivity[];
  modalityList!: Modality[];
  typeActivityList!: TypeActivity[];
  userList!: User[];
  reasonList!: Reason[];
  sourceFundsList!: SourceFunds[];
  public pasar: any[] = [];
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
      numOfAssignedTeachers: [data.actividad.numOfAssignedTeachers],
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
      isEvaluation: [data.actividad.isEvaluation],
      observations: [data.actividad.observations],//
      duration: [data.actividad.duration, [Validators.required]],//
      totalHours: [data.actividad.totalHours, [Validators.required]],//
      onSiteHours: [data.actividad.onSiteHours, [Validators.required]],//
      synchronousHours: [data.actividad.synchronousHours, [Validators.required]],//
      asynchronousHours: [data.actividad.asynchronousHours, [Validators.required]],//
      competencies: [data.actividad.competencies],
      content: [data.actividad.content],
      learningActivities: [data.actividad.learningActivities],
      electronicEvaluation: [data.actividad.electronicEvaluation],//
      participationProfile: [data.actividad.participationProfile?.toString(), [Validators.required]],//
      activityTarget: [data.actividad.activityTarget?.toString(), [Validators.required]],//
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
    this._ActivityDetailService.UpdateActivity(this.editActivity.getRawValue()).subscribe({
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
