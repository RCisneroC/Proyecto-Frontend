import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventsActivity } from 'app/admission/models/EventsActivity';
import { ActivityTeachers, GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
export interface DialogData {
  id_actividad: string;
  accion: string;
  event: EventsActivity;
  docentes: ActivityTeachers[];
  actividad: GetOneActivity;
}

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  NewEventsActivity: UntypedFormGroup;
  id_actividad: string = '';
  public JsonEventsActivity!: EventsActivity;

  public IsLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<CreateEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _ActivityDetailService: ActivityDetailService,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'edit-events') {
      this.dialogTitle = "Editar Evento";
      this.id_actividad = data.id_actividad;
    } else if (this.action === 'add-events') {
      this.dialogTitle = "Nuevo Evento";
      this.id_actividad = data.id_actividad;
    }

    this.NewEventsActivity = this.fb.group({
      statusId: [data.event.statusId, [Validators.required]],
      id: [data.event.id, [Validators.required]],
      activityId: [this.id_actividad, [Validators.required]],
      name: [data.event.name, [Validators.required]],
      description: [data.event.description, [Validators.required]],
      date: [data.event.date, [Validators.required]],
      startTime: [data.event.startTime, [Validators.required]],
      endTime: [data.event.endTime, [Validators.required]],
      teacherCedula: [data.event.teacherCedula],
    });
  }
  ngOnInit(): void {

  }

  submit() {
    // console.log(this.NewEventsActivity.getRawValue());
    // return;
    this.JsonEventsActivity = {
      statusId: this.NewEventsActivity.controls['statusId'].value,
      id: this.NewEventsActivity.controls['id'].value,
      activityId: this.NewEventsActivity.controls['activityId'].value,
      name: this.NewEventsActivity.controls['name'].value,
      description: this.NewEventsActivity.controls['description'].value,
      date: this.NewEventsActivity.controls['date'].value,
      startTime: this.adjustDateTimeToLocal(this.NewEventsActivity.controls['startTime'].value),
      endTime: this.adjustDateTimeToLocal(this.NewEventsActivity.controls['endTime'].value),
      teacherCedula: this.NewEventsActivity.controls['teacherCedula'].value,
      teacherFullName: '',
      teacherStatusId: ''
    }
    console.log('====================================');
    console.log('====================================');
    if (this.data.accion == 'edit-events') {
      this._ActivityDetailService.UpdateEventsActivity(this.JsonEventsActivity).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    } else {
      this._ActivityDetailService.CreateEventsActivity(this.JsonEventsActivity).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }

  }
  adjustDateTimeToLocal(date: string) {
    let fecha = new Date(date);

    // Formatear la fecha en el formato deseado (YYYY-MM-DDTHH:mm:ss)
    let fechaFormateada = fecha.getFullYear() + '-' +
      ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + // los meses en JavaScript van de 0 a 11
      ('0' + fecha.getDate()).slice(-2) + 'T' +
      ('0' + fecha.getHours()).slice(-2) + ':' +
      ('0' + fecha.getMinutes()).slice(-2) + ':' +
      ('0' + fecha.getSeconds()).slice(-2);
    return fechaFormateada;
  }
}
