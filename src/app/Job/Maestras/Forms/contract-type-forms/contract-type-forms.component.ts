import { Component, Inject } from '@angular/core';
import { TypeContractJobs } from '../../../Interfaces/Type-contract-jobs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TypeContractJobServiceService } from 'app/Job/Services/type-contract-job-service.service';
import { HttpErrorResponse } from '@angular/common/http';
export interface DialogData {
  typeContract: TypeContractJobs;
  accion: string;
}
@Component({
  selector: 'app-contract-type-forms',
  templateUrl: './contract-type-forms.component.html',
  styleUrls: ['./contract-type-forms.component.scss']
})
export class ContractTypeFormsComponent {
  action: string;
  dialogTitle: string = '';
  FormsTypeContract: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<ContractTypeFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _TypeContractJobServiceService: TypeContractJobServiceService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-type') {
      this.dialogTitle = "Agregar Tipo de servicio";
    } else if (this.action === 'edit-type') {
      this.dialogTitle = "Editar Tipo de servicio";
    }
    this.FormsTypeContract = this.fb.group({
      statusId: [data.typeContract.statusId, [Validators.required]],
      id: [data.typeContract.id],
      name: [data.typeContract.name, [Validators.required]],
      description: [data.typeContract.description, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-type') {
      this._TypeContractJobServiceService.addTypeContractJobs(this.FormsTypeContract.getRawValue()).subscribe({
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
    } else if (this.action === 'edit-type') {
      this._TypeContractJobServiceService.updateTypeContractJobs(this.FormsTypeContract.getRawValue()).subscribe({
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
