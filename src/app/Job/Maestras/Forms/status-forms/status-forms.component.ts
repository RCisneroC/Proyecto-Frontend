import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { StatusJobs } from 'app/Job/Interfaces/Status-jobs';
import { StatusJobServiceService } from 'app/Job/Services/status-job-service.service';
export interface DialogData {
  estados: StatusJobs;
  accion: string;
}
@Component({
  selector: 'app-status-forms',
  templateUrl: './status-forms.component.html',
  styleUrls: ['./status-forms.component.scss']
})
export class StatusFormsComponent {
  action: string;
  dialogTitle: string = '';
  FormsStatus: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<StatusFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _StatusJobServiceService: StatusJobServiceService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-status') {
      this.dialogTitle = "Agregar Estado";
    } else if (this.action === 'edit-status') {
      this.dialogTitle = "Editar Estado";
    }
    this.FormsStatus = this.fb.group({
      statusId: [data.estados.statusId, [Validators.required]],
      id: [data.estados.id],
      name: [data.estados.name, [Validators.required]],
      description: [data.estados.description, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-status') {
      this._StatusJobServiceService.addStatusJobs(this.FormsStatus.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    } else if (this.action === 'edit-status') {
      this._StatusJobServiceService.updateStatusJobs(this.FormsStatus.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    }


  }
  onNoClick() {
    this.dialogRef.close();
  }
}