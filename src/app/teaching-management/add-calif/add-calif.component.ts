import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskSubject } from '../models/Teacher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, User } from '@core';
import { CalificacionEstudiante } from '../models/Asistencias';
export interface DialogData {
  id: string;
  accion: string;
  user: User;
  taskSubject: TaskSubject
}
@Component({
  selector: 'app-add-calif',
  templateUrl: './add-calif.component.html',
  styleUrls: ['./add-calif.component.scss']
})
export class AddCalifComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public _CalificacionEstudiante: CalificacionEstudiante[] = [];
  public _CalificacionEstudianteUser: CalificacionEstudiante[] = [];
  public _CalificacionEstudianteOne!: CalificacionEstudiante;

  action: string;
  dialogTitle: string = '';
  FormsCalificacion!: UntypedFormGroup;
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<AddCalifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public authservice: AuthService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (this.action == 'add-calificacion') {
      this.dialogTitle = "Agregar calificación";
    } else if (this.action == 'view') {
      this.dialogTitle = "Ver calificación";
    }

    this.user = data.user;

    this.FormsCalificacion = this.createContactForm();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      calif: new FormControl('', Validators.required),

    });
  }


  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

    console.log('====================================');
    console.log(this.FormsCalificacion.getRawValue());
    console.log('====================================');
    let type = localStorage.getItem('tipoSolicitud') || '1';
    let local = localStorage.getItem('calificaciones') || '';
    console.log(local);

    if (local != '') {
      this._CalificacionEstudiante = JSON.parse(local);
      let existe = this._CalificacionEstudiante.filter(x => x.cedula == this.data.user.cedula && x.idasignatura == this.data.taskSubject.idAsignatura);
      if (existe.length > 0) {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = 'Ya mantiene una calificación.';
        this.dialogRef.close(this.ResponseMessage);
      } else {
        this._CalificacionEstudianteOne = {
          statusId: 1,
          startDate: new Date(),
          idEstudiante: this.data.user.id,
          cedula: this.data.user.cedula,
          name: this.data.user.firstName,
          lastname: this.data.user.lastName,
          id: this._CalificacionEstudiante.length + 1,
          idasignatura: this.data.taskSubject.idAsignatura,
          docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.firstName,
          type: type,
          calificacion: this.FormsCalificacion.controls['calif'].value,
          nameTarea: this.data.taskSubject.Titulo
        };
        this._CalificacionEstudiante.push(this._CalificacionEstudianteOne);
        localStorage.setItem('calificaciones', JSON.stringify(this._CalificacionEstudiante));
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Calificación creada correctamente..';
        this.dialogRef.close(this.ResponseMessage);
      }


    } else {
      this._CalificacionEstudianteOne = {
        statusId: 1,
        startDate: new Date(),
        idEstudiante: this.data.user.id,
        cedula: this.data.user.cedula,
        name: this.data.user.firstName,
        lastname: this.data.user.lastName,
        id: 1,
        idasignatura: this.data.taskSubject.idAsignatura,
        docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.firstName,
        type: type,
        calificacion: this.FormsCalificacion.controls['calif'].value,
        nameTarea: this.data.taskSubject.Titulo
      };
      this._CalificacionEstudiante.push(this._CalificacionEstudianteOne);
      localStorage.setItem('calificaciones', JSON.stringify(this._CalificacionEstudiante))
      console.log(this._CalificacionEstudianteOne);

    }
  }


}



