import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Activity } from 'app/admission/models/activity';
import { ActivityService } from '../services/activity.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id: string;
  action: string;
  activity: Activity;
}
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent {

  action: string;
  dialogTitle: string;
  activityForm: UntypedFormGroup;
  activity: Activity;
  constructor(
    public dialogRef: MatDialogRef<ActivityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public activityService: ActivityService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar actividad";
      this.activity = data.activity;
    } else {
      this.dialogTitle = 'Crear actividad';
      this.activity = new Activity();
      this.activity.statusId=1;
    }
    this.activityForm = this.createContactForm();
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
      id: [this.activity.id],
      name: [this.activity.name, [Validators.required]],
      enrollmentFee: [this.activity.enrollmentFee, [Validators.required]],
      numOfHours: [this.activity.numOfHours, [Validators.required]],
      numOfVacancies: [this.activity.numOfVacancies, [Validators.required]],
      profileType: [this.activity.profileType, [Validators.required]],
      statusId: [this.activity.statusId, [Validators.required]],
     
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
    this.activityService.updateActivity(
      this.activityForm.getRawValue()
    ); }else{
      this.activityService.addActivity(
        this.activityForm.getRawValue()
      );
    }
  
  }
}
