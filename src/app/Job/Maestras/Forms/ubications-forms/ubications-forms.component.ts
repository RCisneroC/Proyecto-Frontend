import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UbicationsJobs } from 'app/Job/Interfaces/Company-jobs';
import { ProvinceJobs } from 'app/Job/Interfaces/Province-jobs';
import { UbicationsServicesService } from 'app/Job/Services/ubications-services.service';
export interface DialogData {
  ubications: UbicationsJobs;
  accion: string;
  companyId: string;
  province: ProvinceJobs[];

}
@Component({
  selector: 'app-ubications-forms',
  templateUrl: './ubications-forms.component.html',
  styleUrls: ['./ubications-forms.component.scss']
})
export class UbicationsFormsComponent {
  action: string;
  dialogTitle: string = '';
  FormsUbications: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<UbicationsFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _UbicationsServicesService: UbicationsServicesService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-ubications') {
      this.dialogTitle = "Agregar Ubicación";
    } else if (this.action === 'edit-ubications') {
      this.dialogTitle = "Editar Ubicación";
    }
    this.FormsUbications = this.fb.group({
      statusId: [data.ubications.statusId, [Validators.required]],
      id: [data.ubications.id],
      name: [data.ubications.name, [Validators.required]],
      description: [data.ubications.description, [Validators.required]],
      provinceId: [data.ubications.provinceId, [Validators.required]],
      companyId: [data.companyId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-ubications') {
      this._UbicationsServicesService.addUbicationsJobs(this.FormsUbications.getRawValue()).subscribe({
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
    } else if (this.action === 'edit-ubications') {
      this._UbicationsServicesService.updateUbicationsJobs(this.FormsUbications.getRawValue()).subscribe({
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
