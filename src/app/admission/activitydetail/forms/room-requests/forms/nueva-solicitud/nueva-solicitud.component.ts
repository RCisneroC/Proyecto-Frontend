import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestRooms } from 'app/admission/models/RequestRooms';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';

export interface DialogData {
  requestRooms: RequestRooms;
  id_actividad: string;
  accion: string;
}

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.scss']
})
export class NuevaSolicitudComponent {
 public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
 }
  
  action: string='';
  dialogTitle: string='';
  requestRoomsForms!: UntypedFormGroup;
  id_actividad: string = '';


    constructor(
    public dialogRef: MatDialogRef<NuevaSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityDetailService:ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
   this.requestRoomsForms =this.fb.group({
      startDate:[this.data.requestRooms.startDate,Validators.required],
      endDate:[this.data.requestRooms.endDate,Validators.required],
      activityId:[this.data.id_actividad,Validators.required],
      id:[this.data.requestRooms.id,Validators.required]
   });
    this.action = this.data.accion;
    if (this.action === 'add-room') {
      this.dialogTitle ="Nueva solicitud";
      this.id_actividad = this.data.id_actividad;
    } else {
      if (this.action === 'add-room') {
      this.dialogTitle ="Editar solicitud";
      this.id_actividad = this.data.id_actividad;
    }
    }
    }
    submit() {
    console.log(this.requestRoomsForms.getRawValue());
      if (this.data.accion == 'add-room') {
        this._ActivityDetailService.saveRequestRooms(this.requestRoomsForms.getRawValue()).subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Cargado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
      } else {
        this._ActivityDetailService.EditRequestRooms(this.requestRoomsForms.getRawValue()).subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
      }
    }
  

}
