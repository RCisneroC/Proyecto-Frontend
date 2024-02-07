import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskSubject } from '../models/Teacher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  action: string;
  taskSubject: TaskSubject;
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  public ResponseMessage: ResponseMessageMaestra = {
      CodError: 0,
      Message:''
  }
    action: string;
    dialogTitle: string;
    trainingForm!: UntypedFormGroup;
    taskSubject!: TaskSubject;
    years = Array(100).fill(null);
    gradosInstruccion: { id: number; nombre: string; }[];
   
   
    constructor(
      public dialogRef: MatDialogRef<AddTaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private fb: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.action;
      if (this.action === 'edit') {
        this.dialogTitle ="Editar usuario";
        this.taskSubject = data.taskSubject;
      } else {
        
        this.dialogTitle = 'Agregar tarea';
        this.taskSubject = new TaskSubject();
  
      }
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

    formControl = new UntypedFormControl('', [
      Validators.required,
    ]);

    createContactForm(): UntypedFormGroup {
      return this.fb.group({
      id: [this.taskSubject.id], 
      titulo: new FormControl(this.taskSubject.Titulo, Validators.required),
      observacion: new FormControl(this.taskSubject.observacion, Validators.required),
      tipoTarea: new FormControl(this.taskSubject.tipoTarea, Validators.required),
      nombre: new FormControl(this.taskSubject.nombre, Validators.required),
      fechaEntrega: new FormControl(this.taskSubject.fechaEntrega, Validators.required),
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
  

