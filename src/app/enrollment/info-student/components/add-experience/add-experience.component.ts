
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Experience } from '../../models/Student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  action: string;
  experience: Experience;
}
@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})


export class AddExperienceComponent {
  public ResponseMessage: ResponseMessageMaestra = {
      CodError: 0,
      Message:''
  }
    action: string;
    dialogTitle: string;
    experienceForm: UntypedFormGroup;
    experience!: Experience;


    constructor(
      public dialogRef: MatDialogRef<AddExperienceComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private fb: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.action;
      if (this.action === 'edit') {
        this.dialogTitle ="Editar usuario";
        this.experience = data.experience;
      } else {

        this.dialogTitle = 'Agregar experiencia profesional';
        this.experience = new Experience();

      }
      this.experienceForm = this.createContactForm();



    }


    formControl = new UntypedFormControl('', [
      Validators.required,
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
        experienceId: [this.experience.experienceId],
        description: [this.experience.description, [Validators.required]],
        position: [this.experience.position, [Validators.required]],
        startDate: [this.experience.startDate, [Validators.required]],
        endDate: [this.experience.endDate, [Validators.required]],

      });
    }


    submit() {
      // emppty stuff
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
     public confirmAdd(): void {

      this.dialogRef.close(this.experienceForm.value);


     }




  }

