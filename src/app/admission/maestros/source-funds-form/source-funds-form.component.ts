import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SourceFundsService } from '../services/source-funds.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SourceFunds } from 'app/admission/models/source -funds';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
export interface DialogData {
  id: string;
  action: string;
  source : SourceFunds;
}
@Component({
  selector: 'app-source-funds-form',
  templateUrl: './source-funds-form.component.html',
  styleUrls: ['./source-funds-form.component.scss']
})
export class SourceFundsFormComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public sourceFundsForm: UntypedFormGroup;
  public sourceFunds: SourceFunds = {
    id: 0,
    name: '',
    statusId:0
  }
  constructor(
    public dialogRef: MatDialogRef<SourceFundsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public sourceFundsService: SourceFundsService,
    private fb: UntypedFormBuilder
  ) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Origen de Fondo";
      this.sourceFunds = data.source;
      
    } else {
      this.dialogTitle = 'Nueva Origen de Fondo';
    }
    this.sourceFundsForm = this.createContactForm();
  }


    createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.sourceFunds.id],
      name: [this.sourceFunds.name, [Validators.required]],
      statusId: [this.sourceFunds.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    public confirmAdd(): void {
      if (this.action === 'edit') {
        this.sourceFundsService.updateSourceFunds(this.sourceFundsForm.getRawValue())
          .subscribe({
          next: (res:ResponseGenerica) => {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Editado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'No se pudo actualizar.';
              this.dialogRef.close(this.ResponseMessage);
          },
      });
      
    } else {
         this.sourceFundsService.addSourceFunds(this.sourceFundsForm.getRawValue())
          .subscribe({
          next: (res:ResponseGenerica) => {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Creado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'No se pudo Crear, intente nuevamente.';
              this.dialogRef.close(this.ResponseMessage);
          },
      });
    }
  }
}
