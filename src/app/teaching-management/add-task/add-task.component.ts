import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskSubject } from '../models/Teacher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  accion: string;
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
    Message: ''
  }
  action: string;
  dialogTitle: string;
  trainingForm!: UntypedFormGroup;
  taskSubject!: TaskSubject;
  taskSubjectArray: TaskSubject[] = [];
  years = Array(100).fill(null);
  gradosInstruccion: { id: number; nombre: string; }[];


  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.action = data.accion;
    if (this.action === 'edit-taskSubject') {
      this.dialogTitle = "Editar Tarea";
      this.taskSubject = data.taskSubject;
    } else {

      this.dialogTitle = 'Agregar tarea';
      this.taskSubject = new TaskSubject();

    }
    this.trainingForm = this.createContactForm();

    for (let i = 0; i < this.years.length; i++) {
      this.years[i] = new Date().getFullYear() + i;
    }

    this.gradosInstruccion = [
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
      id: [this.data.taskSubject.id],
      titulo: new FormControl(this.data.taskSubject.Titulo, Validators.required),
      observacion: new FormControl(this.data.taskSubject.observacion, Validators.required),
      tipoTarea: new FormControl(this.data.taskSubject.tipoTarea, Validators.required),
      nombre: new FormControl(this.data.taskSubject.nombre, Validators.required),
      fechaEntrega: new FormControl(this.data.taskSubject.fechaEntrega, Validators.required),
      idAsignatura: new FormControl(this.data.id, Validators.required)
    });
  }


  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

    if (this.action == 'edit-taskSubject') {
      let local = localStorage.getItem('task') || '';
      this.taskSubjectArray = JSON.parse(local);
      if (local != '') {
        let indice = this.taskSubjectArray.findIndex(x => x.id === this.data.taskSubject.id);
        this.taskSubjectArray = JSON.parse(local);
        this.taskSubjectArray[indice].Titulo = this.trainingForm.controls['titulo'].value;
        this.taskSubjectArray[indice].fechaEntrega = this.trainingForm.controls['fechaEntrega'].value;
        this.taskSubjectArray[indice].id = this.data.taskSubject.id;
        this.taskSubjectArray[indice].idAsignatura = this.data.id;
        this.taskSubjectArray[indice].nombre = this.trainingForm.controls['nombre'].value;
        this.taskSubjectArray[indice].observacion = this.trainingForm.controls['observacion'].value;
        this.taskSubjectArray[indice].tipoTarea = this.trainingForm.controls['tipoTarea'].value;
        this.taskSubjectArray[indice].type = localStorage.getItem('tipoSolicitud') || '1'
        localStorage.setItem('task', JSON.stringify(this.taskSubjectArray));
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Editado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      }

    } else {
      let local = localStorage.getItem('task') || '';
      if (local != '') {
        this.taskSubjectArray = JSON.parse(local);
        this.taskSubject.Titulo = this.trainingForm.controls['titulo'].value;
        this.taskSubject.fechaEntrega = this.trainingForm.controls['fechaEntrega'].value;
        this.taskSubject.id = this.taskSubjectArray.length + 1;
        this.taskSubject.idAsignatura = this.data.id;
        this.taskSubject.nombre = this.trainingForm.controls['nombre'].value;
        this.taskSubject.observacion = this.trainingForm.controls['observacion'].value;
        this.taskSubject.tipoTarea = this.trainingForm.controls['tipoTarea'].value;
        this.taskSubject.type = localStorage.getItem('tipoSolicitud') || '1'
        this.taskSubjectArray.push(this.taskSubject);
        // localStorage
        localStorage.setItem('task', JSON.stringify(this.taskSubjectArray));
        console.log('Insertado correctamente, nuevo.');
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      } else {
        this.taskSubject.Titulo = this.trainingForm.controls['titulo'].value;
        this.taskSubject.fechaEntrega = this.trainingForm.controls['fechaEntrega'].value;
        this.taskSubject.id = 1;
        this.taskSubject.idAsignatura = this.data.id;
        this.taskSubject.nombre = this.trainingForm.controls['nombre'].value;
        this.taskSubject.observacion = this.trainingForm.controls['observacion'].value;
        this.taskSubject.tipoTarea = this.trainingForm.controls['tipoTarea'].value;
        this.taskSubject.type = localStorage.getItem('tipoSolicitud') || '1'
        this.taskSubjectArray.push(this.taskSubject);
        localStorage.setItem('task', JSON.stringify(this.taskSubjectArray))
        console.log('Insertado correctamente');
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      }
    }

    // this.dialogRef.close(this.trainingForm.getRawValue());


  }




}


