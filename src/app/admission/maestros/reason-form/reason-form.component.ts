import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Reason } from 'app/admission/models/reason';
import { ReasonService } from '../services/reason.service';
export interface DialogData {
id: string;
action: string;
reason : Reason;
}

@Component({
  selector: 'app-reason-form',
  templateUrl: './reason-form.component.html',
  styleUrls: ['./reason-form.component.scss']
})

export class ReasonFormComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public reasonForm: UntypedFormGroup;
  public reasonData: Reason = {
    id: 0,
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<ReasonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public reasonService: ReasonService,
    private fb: UntypedFormBuilder
  ) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Razón de actividad";
      this.reasonData = data.reason;
    } else {
      this.dialogTitle = 'Nueva Razón de actividad';
    }
    this.reasonForm = this.createContactForm();
  }

      createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.reasonData.id],
      name: [this.reasonData.name, [Validators.required]],
      statusId: [this.reasonData.statusId, [Validators.required]],
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
      this.reasonService.updateReason(this.reasonForm.getRawValue())
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
      this.reasonService.addReason(this.reasonForm.getRawValue())
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
