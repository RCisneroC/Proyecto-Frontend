import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ScheduleActivityDetail } from '../models/scheduleActivity';
import { ScheduleActivitiesService } from '../services/schedule-activities.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity, UbicationsActivity } from '../models/activity';
import { ActivityService } from '../maestros/services/activity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalityService } from '../maestros/services/modality.service';
import { Modality } from '../models/modality';
import { TypeActivityService } from '../maestros/services/type-activity.service';
import { TypeActivity } from '../models/type-activity';
import { UserService } from 'app/security/user/service/user.service';
import { User } from '@core/models/user';
import { Reason } from '../models/reason';
import { ReasonService } from '../maestros/services/reason.service';
import { SourceFunds } from '../models/source -funds';
import { SourceFundsService } from '../maestros/services/source-funds.service';
import { ResponseMessageMaestra } from '../models/ResponseMessage';
import { ActivityLocationService } from '../maestros/services/activity-location.service';


export interface DialogData {
  id: number;
  action: string;
  scheduleActivity: ScheduleActivityDetail;
}
@Component({
  selector: 'app-schedule-activity-detail-form',
  templateUrl: './schedule-activity-detail-form.component.html',
  styleUrls: ['./schedule-activity-detail-form.component.scss']
})
export class ScheduleActivityDetailFormComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  action: string;
  dialogTitle: string;
  scheduleForm!: UntypedFormGroup;
  schedule!:ScheduleActivityDetail;
  activityList!: Activity[];
  ubicationsList!: UbicationsActivity[];
  modalityList!: Modality[];
  typeActivityList!: TypeActivity[];
  userList!: User [];
  reasonList!: Reason [];
  sourceFundsList!: SourceFunds [];
  
  id!:number;
 
  constructor(
    private _activityService: ActivityService,
    private _activityLocationService:ActivityLocationService,
    private _modalityService: ModalityService,
    private _typeActivityService: TypeActivityService,
    private _userService: UserService,
    private _reasonService: ReasonService,
    private _sourceFundsService: SourceFundsService,
    public dialogRef: MatDialogRef<ScheduleActivityDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public scheduleActivitiesService: ScheduleActivitiesService,
    private fb: UntypedFormBuilder
  ) {
    
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      
      this.dialogTitle ="Editar actividad";
      
      this.schedule = data.scheduleActivity;
    } else {
      
      this.dialogTitle = 'Añadir actividad';
      this.id=data.id;
      this.schedule = new ScheduleActivityDetail();
   
    }
    this.scheduleForm = this.createContactForm();
    this.loadActivities();
    this.loadModality();
    this.loadTypeActivity();
    this.loadUser();
    this.loadReason();
    this.loadSourceFunds();
    this.loadLocationActividad();
  }


  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup{
    return this.fb.group({
      curriculumDesignId: new FormControl(this.action=="edit"?this.schedule.curriculumDesignId:this.id, Validators.required),
      id: new FormControl(this.schedule.id),
      planningDate: new FormControl(this.schedule.planningDate, Validators.required),
      activityModeId: new FormControl(this.schedule.activityModeId, Validators.required),
      activityTypeId: new FormControl(this.schedule.activityTypeId, Validators.required),
      name: new FormControl(this.schedule.name, Validators.required),
      activityLocationId: new FormControl(this.schedule.activityLocationId, Validators.required),
      assignedCoordinatorId: new FormControl(this.schedule.assignedCoordinatorId, Validators.required),
      inscriptionStartDate: new FormControl(this.schedule.inscriptionStartDate, Validators.required),
      inscriptionEndDate: new FormControl(this.schedule.inscriptionEndDate, Validators.required),
      startDate: new FormControl(this.schedule.startDate, Validators.required),
      plannedEndDate: new FormControl(this.schedule.plannedEndDate, Validators.required),
      effectiveEndDate: new FormControl(this.schedule.effectiveEndDate, Validators.required),
      isExecuted: new FormControl(false),
      activityReasonId: new FormControl(this.schedule.activityReasonId, Validators.required),
      activityFundsSourceId: new FormControl(this.schedule.activityFundsSourceId, Validators.required),
      hasDataSheet: new FormControl(false),
      dataSheetDeliveryDate: new FormControl(this.schedule.dataSheetDeliveryDate),
      isEvaluation: new FormControl(false),
      digitalReportDeliveryDate: new FormControl(this.schedule.digitalReportDeliveryDate),
      physicalReportDeliveryDate: new FormControl(this.schedule.physicalReportDeliveryDate),
      observations: new FormControl(this.schedule.observations)

    });
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
   console.log(this.scheduleForm);
   
      if(this.action==='edit'){
        this.scheduleActivitiesService.updateActivityDetail(this.scheduleForm.getRawValue()).subscribe({
          next:() => {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Creado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
          },
          error:(err:any) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'Intente Nuevamente.';
              this.dialogRef.close(this.ResponseMessage);
          }
        });
      } else {
        this.scheduleActivitiesService.addActivityDetail(this.scheduleForm.getRawValue()).subscribe({
          next:() => {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Creado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
          },
          error:(err:any) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'Intente Nuevamente.';
              this.dialogRef.close(this.ResponseMessage);
          }
        });
      }
      
  }
    loadLocationActividad() {
    this._activityLocationService.getAllLocationActivity2().subscribe({
      next: (data) => {
      this.ubicationsList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadActivities() {
    this._activityService.getAllActivity2().subscribe({
      next: (data) => {
      this.activityList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  loadModality() {
    this._modalityService.getAllModality2().subscribe({
      next: (data) => {
      this.modalityList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  loadTypeActivity() {
    this._typeActivityService.getAllTypeActivity2().subscribe({
      next: (data) => {
      this.typeActivityList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  loadUser() {
    this._userService.getAllUsers2().subscribe({
      next: (data) => {
      this.userList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  loadReason() {
    this._reasonService.getAllReason2().subscribe({
      next: (data) => {
      this.reasonList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
    
  loadSourceFunds() {
    this._sourceFundsService.getAllSourceFunds2().subscribe({
      next: (data) => {
      this.sourceFundsList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  
  

}
