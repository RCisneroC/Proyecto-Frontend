import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GetPeriodContable } from 'app/treasury/Models/AccountPeriodResponse';
import { ResponseCompraMenor } from 'app/treasury/Models/GetAprobacionResponse';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { AccountPeriodService } from 'app/treasury/Services/account-period.service';

export interface DialogData {
  detail: ResponseCompraMenor;
}


@Component({
  selector: 'app-form-minor-purchase',
  templateUrl: './form-minor-purchase.component.html',
  styleUrls: ['./form-minor-purchase.component.scss']
})
export class FormMinorPurchaseComponent implements OnInit,OnDestroy {

  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  compraMenor : ResponseCompraMenor = {};
  public periodos: GetPeriodContable[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormMinorPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private  serviceMinorPurchase:MinorPurchaseService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private  serviceAccountPeriodService:AccountPeriodService,
  ) {
    this.action = data.detail.actions!;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Solicitud Compra Menor";
      this.compraMenor = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nueva Solicitud Compra Menor';
    }
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    if(this.action == "new"){
      this.loadPeriods();
    }
  }

  createForm(): UntypedFormGroup {

    let periodo : number = 0;
    if(this.action == "edit"){
      periodo = 1;
    }

    return this.fb.group({
      solicitudCompraMenorId : [this.compraMenor.compraMenorId!],
      periodoContableId: [periodo, [Validators.required]],
      unidadSolicitante: [this.compraMenor.unidadSolicitante!, [Validators.required]],
      entregueseA: [this.compraMenor.entregueseA!, [Validators.required]],
      sumaDe: [this.compraMenor.sumaDe, [Validators.required,
        Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]],
      conceptoDe: [this.compraMenor.conceptoDe!, [Validators.required]],
      createdBy: this.authService.currentUserValue.id,
      lasModifiedBy: this.authService.currentUserValue.id
    });

  }


  loadPeriods():void{
    this.periodos = [];
    this.subscriptions.push(
      this.serviceAccountPeriodService.getAll().subscribe({
        next : (request)=>{
                 const  r = request.getPeriodContables;
                 r.forEach(
                  (p)=>{
                    this.periodos.push(
                      {
                        periodoId: p.periodoId,
                        fechaInicio: p.fechaInicio,
                        fechaFin: p.fechaFin,
                        descripcion: p.descripción,
                        statusId: p.statusId,
                        createdBy: p.createdBy,
                        createdDate: p.createdDate
                      }
                    )
                  }
                 );
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
        }
       })
    );
}


confirmAdd() {
  if (!this.form.valid) {
    return;
  }
  this.IsLoading = true;
  if (this.action == "new") {

    this.subscriptions.push(
      this.serviceMinorPurchase.addMinorPurchase(this.form.getRawValue()).subscribe(
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

    this.subscriptions.push(
      this.serviceMinorPurchase.updateMinorPurchase(this.form.getRawValue()).subscribe(
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






}
