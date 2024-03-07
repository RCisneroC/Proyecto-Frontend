import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from 'app/admission/FormalEducations/Models/Status';
import { StatusService } from 'app/admission/FormalEducations/Services/status.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  status: Status;
}
@Component({
  selector: 'app-forms-status',
  templateUrl: './forms-status.component.html',
  styleUrls: ['./forms-status.component.scss']
})
export class FormsStatusComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _StatusForms!: UntypedFormGroup;
  public _Status!: Status;
  constructor(
    public dialogRef: MatDialogRef<FormsStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _StatusService: StatusService
  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Estado";
      this._Status = data.status;
    } else {
      this.dialogTitle = "Editar Estado";
      this._Status = data.status;
    }
    this._StatusForms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._Status.id],
      name: [this._Status.name, [Validators.required]],
      description: [this._Status.description],
      statusId: [this._Status.statusId, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      this._StatusService.addStatus(this._StatusForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
      this._StatusService.updateStatus(this._StatusForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}