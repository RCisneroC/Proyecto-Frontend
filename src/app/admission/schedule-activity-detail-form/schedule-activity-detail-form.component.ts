import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ScheduleActivityDetail } from '../models/scheduleActivity';
import { ScheduleActivitiesService } from '../services/schedule-activities.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from '../models/activity';
import { ActivityService } from '../maestros/services/activity.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  id: string;
  action: string;
  scheduleActivity: ScheduleActivityDetail;
}
@Component({
  selector: 'app-schedule-activity-detail-form',
  templateUrl: './schedule-activity-detail-form.component.html',
  styleUrls: ['./schedule-activity-detail-form.component.scss']
})
export class ScheduleActivityDetailFormComponent {

  action: string;
  dialogTitle: string;
  scheduleForm!: UntypedFormGroup;
  schedule!:ScheduleActivityDetail;
  activityList!: Activity[];
 
  constructor(
    private _activityService: ActivityService,
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
      //const blankObject = {} as Role;
      this.schedule = new ScheduleActivityDetail();
      //this.user.id="-1";
    }
    this.scheduleForm = this.createContactForm();
     this._activityService.getAllActivity();
    // this.roleList =this._roleService.data.map((x)=>x
    // );
  
    this.loadActivities();
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      curriculumDesignId: new FormControl(this.schedule.curriculumDesignId, Validators.required),
      planningDate: new FormControl(this.schedule.planningDate, Validators.required),
      activityModeId: new FormControl(this.schedule.activityModeId, Validators.required),
      activityTypeId: new FormControl(this.schedule.activityTypeId, Validators.required),
      activityNameId: new FormControl(this.schedule.activityNameId, Validators.required),
      activityLocationId: new FormControl(this.schedule.activityLocationId, Validators.required),
      assignedCoordinatorId: new FormControl(this.schedule.assignedCoordinatorId, Validators.required),
      startDate: new FormControl(this.schedule.startDate, Validators.required),
      plannedEndDate: new FormControl(this.schedule.plannedEndDate, Validators.required),
      effectiveEndDate: new FormControl(this.schedule.effectiveEndDate, Validators.required),
      isExecuted: new FormControl(this.schedule.isExecuted, Validators.required),
      activityReasonId: new FormControl(this.schedule.activityReasonId, Validators.required),
      activityFundsSourceId: new FormControl(this.schedule.activityFundsSourceId, Validators.required),
      numOfAssignedTeachers: new FormControl(this.schedule.numOfAssignedTeachers, Validators.min(0)),
      hasDataSheet: new FormControl(this.schedule.hasDataSheet),
      dataSheetDeliveryDate: new FormControl(this.schedule.dataSheetDeliveryDate),
      isEvaluation: new FormControl(this.schedule.isEvaluation),
      digitalReportDeliveryDate: new FormControl(this.schedule.digitalReportDeliveryDate),
      physicalReportDeliveryDate: new FormControl(this.schedule.physicalReportDeliveryDate),
      enrolledStudentsDiplomat: new FormControl(this.schedule.enrolledStudentsDiplomat, Validators.min(0)),
      retiredStudentsDiplomat: new FormControl(this.schedule.retiredStudentsDiplomat, Validators.min(0)),
      participants: new FormControl(this.schedule.participants, Validators.min(0)),
      male: new FormControl(this.schedule.male, Validators.min(0)),
      female: new FormControl(this.schedule.female, Validators.min(0)),
      certificatesReceived: new FormControl(this.schedule.certificatesReceived, Validators.min(0)),
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
   
    if  (this.action==='edit'){
      this.scheduleActivitiesService.updateActivityDetail(
        this.scheduleForm.getRawValue()
      ); }else{
        this.scheduleActivitiesService.addActivityDetail(
          this.scheduleForm.getRawValue()
        );
      }
      
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
  

}
