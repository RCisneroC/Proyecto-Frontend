import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AuditLog } from 'app/security/models/auditLogModel';
export interface DialogData {
  action: string;
  audit: AuditLog;
}
@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.scss']
})
export class ViewLogComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;

  constructor(
    public dialogRef: MatDialogRef<ViewLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogTitle='';
    this.action = data.action;
    if (this.action === 'view') {
      this.dialogTitle = "Detalle de Auditoria";
    }
  }
}
