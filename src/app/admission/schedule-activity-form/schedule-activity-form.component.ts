import { Component, Inject } from '@angular/core';

import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ScheduleActivity } from '../models/scheduleActivity';
import { ScheduleActivitiesService } from '../services/schedule-activities.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ResponseMessageMaestra } from '../models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';


export interface DialogData {
  id: string;
  action: string;
  schedule: ScheduleActivity;
}
@Component({
  selector: 'app-schedule-activity-form',
  templateUrl: './schedule-activity-form.component.html',
  styleUrls: ['./schedule-activity-form.component.scss']
})
export class ScheduleActivityFormComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string;
  scheduleForm!: UntypedFormGroup;
  schedule!: ScheduleActivity;
  years = Array(100).fill(null);

  constructor(
    private _scheduleActivitiesService: ScheduleActivitiesService,
    public dialogRef: MatDialogRef<ScheduleActivityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public scheduleActivitiesService: ScheduleActivitiesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar cronograma";

      this.schedule = data.schedule;
    } else {

      this.dialogTitle = 'Añadir cronograma';

      this.schedule = new ScheduleActivity();
      this.schedule.statusId = 1;

    }
    this.scheduleForm = this.createContactForm();

    for (let i = 0; i < this.years.length; i++) {
      this.years[i] = new Date().getFullYear() + i;
    }

  }


  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: new FormControl(this.schedule.id),
      name: new FormControl(this.schedule.name, Validators.required),
      description: new FormControl(this.schedule.description, Validators.required),
      year: new FormControl(this.schedule.year, Validators.required),
      statusId: new FormControl(this.schedule.statusId, [Validators.required, Validators.min(1)])

    });


  }


  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

    if (this.action === 'edit') {
      this.scheduleActivitiesService.updateScheduleActivity(this.scheduleForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error.error.Message;
            this.dialogRef.close(this.ResponseMessage);
          },
        });
    } else {
      this.scheduleActivitiesService.addScheduleActivity(this.scheduleForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error.error.Message;
            this.dialogRef.close(this.ResponseMessage);
          },
        });
    }

  }




}
