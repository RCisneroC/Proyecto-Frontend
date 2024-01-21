
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }

  public dialogTitle: string | undefined;
  public modalityForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private fb: UntypedFormBuilder
  ) {
   
    this.modalityForm = this.createContactForm();
  }

    createContactForm(): UntypedFormGroup {
    return this.fb.group({
      courseId: [""],
      name: ["", [Validators.required]],
      year: ["", [Validators.required]],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



}
