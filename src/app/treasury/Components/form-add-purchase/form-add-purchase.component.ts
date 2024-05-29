import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { ConfirmaCompra } from '../../Models/AddPurchaseRequest';
import { ListCategory } from 'app/treasury/Models/Categories';
import { BudgetSubCondificationCatalogService } from 'app/treasury/Services/budget-sub-condification-catalog.service';

export interface DialogData {
  solicituCompraMenorId: number
}


@Component({
  selector: 'app-form-add-purchase',
  templateUrl: './form-add-purchase.component.html',
  styleUrls: ['./form-add-purchase.component.scss']
})
export class FormAddPurchaseComponent implements OnDestroy, OnInit {

  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  solicituCompraMenorId: number;
  listaConfirmaCompra: ConfirmaCompra[] = [];
  categoria: number = 0;
  codigoFinanciero: string = '';
  valor: number = 0;
  public codes: ListCategory[] = [];


  constructor(
    public dialogRef: MatDialogRef<FormAddPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceMinorPurchase: MinorPurchaseService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private serviceBudgetSubCondificationCatalogService:BudgetSubCondificationCatalogService
  ) {
    this.dialogTitle = 'Nueva Confirmación de Compra';
    this.solicituCompraMenorId = data.solicituCompraMenorId;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadCode();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  createForm(): UntypedFormGroup {

    const confirmaForm = this.fb.group({
      categoriaId: ['', [Validators.required]],
     codigoFinaciero: ['', [Validators.required]],
     valor: ['', [Validators.required,
     Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]]
    });

    return this.fb.group({
      solicituCompraMenorId: [this.solicituCompraMenorId],
      cedula: [''],
      autorizadoPor: [''],
      entregadoPor: [''],
      nombreRecibe: [''],
      firmaAnallistaPresupestaria: [''],
      firma: [''],
      creartedBy: this.authService.currentUserValue.id,
      confirmaCompras: this.fb.array([confirmaForm])
    });



  }

  get pConformaForms() {
    return this.form.controls["confirmaCompras"] as FormArray;
  }

  confirmAdd() {
    if (!this.form.valid) {
      return;
    }
    this.IsLoading = true;

    this.subscriptions.push(
      this.serviceMinorPurchase.addPurchase(this.form.getRawValue()).subscribe(
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

  loadCode():void{
    this.subscriptions.push(
      this.serviceBudgetSubCondificationCatalogService.getCategory().subscribe({
        next : (request)=>{
                this.codes = request.categorias;
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
        }
       })
    );
  }

}
