import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ProvinceJobs } from 'app/Job/Interfaces/Province-jobs';
import { ProvinciaJobServiceService } from 'app/Job/Services/provincia-job-service.service';

export interface DialogData {
  provincias: ProvinceJobs;
  accion: string;
}
@Component({
  selector: 'app-province-forms',
  templateUrl: './province-forms.component.html',
  styleUrls: ['./province-forms.component.scss']
})

export class ProvinceFormsComponent {
  action: string;
  dialogTitle: string = '';
  FormsProvincia: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<ProvinceFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _ProvinciaJobServiceService: ProvinciaJobServiceService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-category') {
      this.dialogTitle = "Agregar province";
    } else if (this.action === 'edit-category') {
      this.dialogTitle = "Editar province";
    }
    this.FormsProvincia = this.fb.group({
      statusId: [data.provincias.statusId, [Validators.required]],
      id: [data.provincias.id, [Validators.required]],
      name: [data.provincias.name, [Validators.required]],
      description: [data.provincias.description, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-province') {
      this._ProvinciaJobServiceService.addProvinciaJobs(this.FormsProvincia.getRawValue()).subscribe({
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
    } else if (this.action === 'edit-province') {
      this._ProvinciaJobServiceService.updateProvinciaJobs(this.FormsProvincia.getRawValue()).subscribe({
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
