import { Component, Inject } from '@angular/core';
import { Training } from '../models/Teacher';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id: string;
  action: string;
  training: Training;
}
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent {
  public ResponseMessage: ResponseMessageMaestra = {
      CodError: 0,
      Message:''
  }
    action: string;
    dialogTitle: string;
    trainingForm!: UntypedFormGroup;
    training!: Training;
    years = Array(100).fill(null);
    gradosInstruccion: { id: number; nombre: string; }[];
   
   
    constructor(
      public dialogRef: MatDialogRef<AddTrainingComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private fb: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.action;
      if (this.action === 'edit') {
        this.dialogTitle ="Editar usuario";
        this.training = data.training;
      } else {
        
        this.dialogTitle = 'Agregar formación academica';
        this.training = new Training();
  
      }
      this.trainingForm = this.createContactForm();
      
      for (let i = 0; i < this.years.length; i++) {
        this.years[i] = new Date().getFullYear() + i;
      }
    
      this.gradosInstruccion = [
        {
          id: 1,
          nombre: "Bachiller",
        },
        {
          id: 2,
          nombre: "Técnico",
        },
        {
          id: 3,
          nombre: "Licenciatura",
        },
        {
          id: 4,
          nombre: "Especialización",
        },
        {
          id: 5,
          nombre: "Maestría",
        },
        {
          id: 6,
          nombre: "Doctorado",
        },
        {
          id: 7,
          nombre: "Otros",
        },
      ];
    }

    formControl = new UntypedFormControl('', [
      Validators.required,
    ]);

    createContactForm(): UntypedFormGroup {
      return this.fb.group({
      trainingId: [this.training.trainingId], 
      institution: [this.training.institution, Validators.required],
      completionDate: [this.training.completionDate, Validators.required],
      city: [this.training.city, Validators.required],
      degreeDate: [this.training.degreeDate, Validators.required],
      degreeObtained: [this.training.degreeObtained, Validators.required],
      educationLevel:[this.training.educationLevel, Validators.required],
      statusId: [this.training.statusId, Validators.required],
      });
    }
    
  
    submit() {
      // emppty stuff
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
     public confirmAdd(): void {
     
      this.dialogRef.close(this.trainingForm.value);
    
        
     }
    
  
    
  
  }
  

