import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskSubject } from '../models/Teacher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@core';
export interface DialogData {
  id: string;
  action: string;
  user: User;
}
@Component({
  selector: 'app-add-calif',
  templateUrl: './add-calif.component.html',
  styleUrls: ['./add-calif.component.scss']
})
export class AddCalifComponent {
  public ResponseMessage: ResponseMessageMaestra = {
      CodError: 0,
      Message:''
  }
    action: string;
    dialogTitle: string;
    trainingForm!: UntypedFormGroup;
    user!: User;
    years = Array(100).fill(null);
    gradosInstruccion: { id: number; nombre: string; }[];
   
   
    constructor(
      public dialogRef: MatDialogRef<AddCalifComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private fb: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.action;
      //if (this.action === 'edit') {
        this.dialogTitle ="Agregar calificación";
        this.user = data.user;
      
      this.trainingForm = this.createContactForm();
      
      for (let i = 0; i < this.years.length; i++) {
        this.years[i] = new Date().getFullYear() + i;
      }
    
      this.gradosInstruccion =[
        { id: 1, nombre: "Texto (Lecturas, PDF)" },
        { id: 2, nombre: "Gráfico (Iconos)" },
        { id: 3, nombre: "Audiovisual (videoclase, entrevistas, tutoriales)" },
        { id: 4, nombre: "Interactivo (podcast, guías didácticas)" },
        { id: 5, nombre: "Web (enlaces web)" },
        { id: 6, nombre: "Trabajo individual" },
        { id: 7, nombre: "Trabajo en grupo" },
        { id: 8, nombre: "Foro" },
        { id: 9, nombre: "Autoevaluación" },
        { id: 10, nombre: "Otro" },
      ];
    }

  
    createContactForm(): UntypedFormGroup {
      return this.fb.group({
      id: [this.user.id], 
      firstName: new FormControl(this.user.firstName, Validators.required),
      calif: new FormControl(this.user.cedula, Validators.required),
    
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
  


