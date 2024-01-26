import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { StatusPrimary } from 'app/admission/models/StatusPrimary';
import { StatusService } from '../services/status.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id: string;
  action: string;
  status : StatusPrimary;
}
@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent {
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public statusForm: UntypedFormGroup;
  public status: StatusPrimary = {
    id: 0,
    description: '',
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<StatusFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public statusService: StatusService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Estado Requerido";
      this.status = data.status;
    } else {
      this.dialogTitle = 'Nuevo Estado Requerido';
    }
    this.statusForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.status.id],
      name: [this.status.name, [Validators.required]],
      description: [this.status.description],
      statusId: [this.status.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    public confirmAdd(): void {
    if  (this.action==='edit'){
      this.statusService.updateStatusPrimary(this.statusForm.getRawValue())
        .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
          
    } else {
      this.statusService.addStatusPrimary(this.statusForm.getRawValue())
      .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
    }
  }

}
