import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GetPeriodContable } from 'app/treasury/Models/AccountPeriodResponse';
import { AccountPeriodService } from 'app/treasury/Services/account-period.service';

export interface DialogData {
  detail: GetPeriodContable;
}

@Component({
  selector: 'app-form-account-period',
  templateUrl: './form-account-period.component.html',
  styleUrls: ['./form-account-period.component.scss']
})
export class FormAccountPeriodComponent {
  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  periodo : GetPeriodContable = {};

  constructor(
    public dialogRef: MatDialogRef<FormAccountPeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceAccountPeriodService: AccountPeriodService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions!;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Periodo Contable";
      this.periodo = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nuevo Periodo Contable';
    }
    this.form = this.createForm();
  }

  createForm(): UntypedFormGroup {
    if(this.action == "new"){
      this.periodo.statusId = 1;
    }
    return this.fb.group({
      fechaInicio: [this.periodo.fechaInicio, [Validators.required]],
      fechaFin: [this.periodo.fechaFin, [Validators.required]],
      descripcion: [this.periodo.descripcion, [Validators.required]],
      statusId: [this.periodo.statusId, [Validators.required]]
    });
  }

  confirmAdd() {
    if (!this.form.valid) {
      return;
    }
    this.IsLoading = true;
    if (this.action == "new") {
      const data = {
        fechaInicio: this.form.value.fechaInicio,
        fechaFin: this.form.value.fechaFin,
        codigoRubro: 0,
        descripción: this.form.value.descripcion,
        createdBy: this.authService.currentUserValue.id
      }
      this.subscriptions.push(
        this.serviceAccountPeriodService.save(data).subscribe(
          {
            next: (data) => {
              if (data.statusCode == 200) {
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Guardado correctamente.';
                this.IsLoading = false;
                this.dialogRef.close(this.ResponseMessage);

              }
              else {
                this.ResponseMessage.CodError = 400;
                this.ResponseMessage.Message = 'Intente nuevamente.';
                this.IsLoading = false;
                this.dialogRef.close(this.ResponseMessage);
              }

            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.ResponseMessage.CodError = 400;
              this.ResponseMessage.Message = 'Intente nuevamente.';
              this.IsLoading = false;
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        )
      );
    }
    else if (this.action == "edit") {
      const data = {
        periodoContableId : this.periodo.periodoId,
        fechaInicio: this.form.value.fechaInicio,
        fechaFin: this.form.value.fechaFin,
        codigoRubro: 0,
        descripción: this.form.value.descripcion,
        statusId : parseInt(this.form.value.statusId),
        modifiedBy: this.authService.currentUserValue.id
      }

      this.subscriptions.push(
        this.serviceAccountPeriodService.update(data).subscribe(
          {
            next: (data) => {
              if (data.statusCode == 200) {
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Editado correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              }
              else {
                this.ResponseMessage.CodError = 400;
                this.ResponseMessage.Message = 'Intente nuevamente.';
                this.dialogRef.close(this.ResponseMessage);
              }

            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.ResponseMessage.CodError = 400;
              this.ResponseMessage.Message = 'Intente nuevamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        )
      );

    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  validDate(){
    const f1: Date  = this.form.controls["fechaInicio"].value;
    const f2: Date  = this.form.controls["fechaFin"].value;

    if(this.form.value.fechaInicio != undefined
      && this.form.value.fechaFin != undefined){
        if(parseInt(f1.toLocaleDateString().replaceAll('/',''))
        > parseInt(f2.toLocaleDateString().replaceAll('/','')) )
      {
       this.form.controls["fechaInicio"].patchValue("");
      }


    }
  }

}
