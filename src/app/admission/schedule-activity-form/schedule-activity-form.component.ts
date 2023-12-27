import { Component, Inject} from '@angular/core';

import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ScheduleActivity } from '../models/scheduleActivity';
import { ScheduleActivitiesService } from '../services/schedule-activities.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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

  action: string;
  dialogTitle: string;
  scheduleForm!: UntypedFormGroup;
  schedule!:ScheduleActivity ;
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
      this.dialogTitle ="Editar cronograma";
    
      this.schedule = data.schedule;
    } else {
      
      this.dialogTitle = 'Añadir cronograma';
     
      this.schedule = new ScheduleActivity();
      this.schedule.curriculumDesignStatusId=1;
     
    }
    this.scheduleForm = this.createContactForm();
    
    for (let i = 0; i < this.years.length; i++) {
      this.years[i] = new Date().getFullYear() + i;
      console.log(this.years[i])
    }
    
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
      id: new FormControl(this.schedule.id, Validators.required),
      name: new FormControl(this.schedule.name, Validators.required),
      description: new FormControl(this.schedule.description),
      year: new FormControl(this.schedule.year, Validators.required),
      curriculumDesignStatusId: new FormControl(this.schedule.curriculumDesignStatusId, [Validators.required, Validators.min(1)])
      
    });
    
  
  }
  

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
   
    // if  (this.action==='edit'){
    //   this.userService.updateUser(
    //     this.userForm.getRawValue()
    //   ); }else{
    //     this.userService.addUser(
    //       this.userForm.getRawValue()
    //     );
    //   }
      
  }
  
  loadRol() {
    // this._roleService.getAllRols2().subscribe({
    //   next: (data) => {
    //   this.roleList=data;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error.message);
    //   },
    // });
  }
  

}
