import { Component, Inject, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { AddHeadCustodiaCajaRequest } from 'app/treasury/Models/AddHeadCustodiaCajaRequest';


export interface DialogData {
  detail: AddHeadCustodiaCajaRequest
}

@Component({
  selector: 'app-form-confirm-purchase',
  templateUrl: './form-confirm-purchase.component.html',
  styleUrls: ['./form-confirm-purchase.component.scss']
})
export class FormConfirmPurchaseComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  parametros: AddHeadCustodiaCajaRequest = {
    solicituCompraMenorId: 0,
    adelanto: 0
  };

  constructor(
    public dialogRef: MatDialogRef<FormConfirmPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceMinorPurchase: MinorPurchaseService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
  ) {
    this.dialogTitle = 'Nueva Confirmación de Compra menor';
    this.parametros.solicituCompraMenorId = data.detail.solicituCompraMenorId;
    this.parametros.adelanto = data.detail.adelanto;
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }


  createForm(): UntypedFormGroup {
    return this.fb.group({
      solicituCompraMenorId: [this.parametros.solicituCompraMenorId],
      adelanto: [this.parametros.adelanto, [Validators.required,
      Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]],
      importeFactura: ['', [Validators.required,Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]],
      proveedor: ['', [Validators.required]],
      ajuste: ['', [Validators.required,
      Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]],
      numFactura: ['', [Validators.required]],
      createdBy: this.authService.currentUserValue.id
    });

  }

  confirmAdd() {
    if (!this.form.valid) {
      return;
    }
    this.IsLoading = true;

    this.subscriptions.push(
      this.serviceMinorPurchase.addHeadCustodiaCajaRequest(this.form.getRawValue()).subscribe(
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

  onNoClick() {
    this.dialogRef.close();
  }

}
