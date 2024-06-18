import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestVariousItem} from 'app/intranet-academic-registration/Models/RequestVarious';
export interface DialogData {
  id: string;
  action: string;
  request: RequestVariousItem;
}
@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss']
})
export class DetalleSolicitudComponent {
  action: string;
  dialogTitle: string;
  item: RequestVariousItem;

  constructor(
    public dialogRef: MatDialogRef<DetalleSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.action = data.action;
    this.item = data.request;
    console.log(this.item)
    this.dialogTitle = "Detalle de la Solicitud";
  }
}
