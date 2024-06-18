import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { GetBudgetDetail } from '../../../Models/BudgetDetails';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BudgetDetailsServicesService } from 'app/treasury/Services/budget-details-services.service';
import { AuthService } from '@core';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestEstateDetailsService } from 'app/treasury/Services/request-estate-details.service';
import { BudgetSubCondificationCatalogService } from 'app/treasury/Services/budget-sub-condification-catalog.service';
import { ListCategory } from 'app/treasury/Models/Categories';
export interface DialogData {
  detail: GetBudgetDetail;
}
@Component({
  selector: 'app-budget-details-forms',
  templateUrl: './budget-details-forms.component.html',
  styleUrls: ['./budget-details-forms.component.scss']
})
export class BudgetDetailsFormsComponent implements OnInit,OnDestroy {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public category: any;
  public action?: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  public categorias: ListCategory[] = [];
  public Insert = {
    budgetDetailId: 0,
    budgetTermMonthId: 0,
    amount: 0,
    createdBy: ''
  };
  IsLoading: boolean = false;
  _GetBudgetDetails : GetBudgetDetail = {}; 

  constructor(
    public dialogRef: MatDialogRef<BudgetDetailsFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _BudgetDetailsServicesService: BudgetDetailsServicesService,
    private serviceBudgetSubCondificationCatalog: BudgetSubCondificationCatalogService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions;
    this._GetBudgetDetails = data.detail;
    console.log(this._GetBudgetDetails);
    
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Detalle del Presupuesto";
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nuevo Detalle de Presupuesto';
    }
    this.form = this.createForm();
    this.loadCategory();
  }

  ngOnDestroy(): void {
    
  }

  loadCategory() { 
      this.serviceBudgetSubCondificationCatalog.getCategory().subscribe(
        {
          next: (data) => {
            this.categorias = data.categorias;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      ) 
  }

  ngOnInit(): void {
    if(this.action == "new"){ 
    }
  }

  createForm(): UntypedFormGroup {
    console.log(this._GetBudgetDetails);
    
    let periodoContableId:number = 0;
    let statusId:number = 0;

    if(this.action == "new"){
      this._GetBudgetDetails.statusId = 1;
    }
    if(this.action == "edit"){
      statusId = 1;
    } 
    return this.fb.group({
      id:[this._GetBudgetDetails.id],
      description: [this._GetBudgetDetails.description, [Validators.required]],
      budgetId: [this._GetBudgetDetails.budgetId, [Validators.required]],
      categoriaId: [this._GetBudgetDetails.categoriaId, [Validators.required]],
      statusId : [this._GetBudgetDetails.statusId, [Validators.required]],
      modifiedBy: [this.authService.currentUserValue.userName],
      CreatedBy :[this.authService.currentUserValue.userName]
    });
  }
confirmAdd() {
  if (!this.form.valid) {
    return;
  }
  this.IsLoading = true;
  if (this.action == "new") {
      this._BudgetDetailsServicesService.AddBudgetDetail(this.form.getRawValue()).subscribe(
        {
          next: (data) => {
            console.log(data);
            
            if (data.statusCode == 200) {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Guardado correctamente.';
             

              this.Insert.amount=0;
              this.Insert.budgetDetailId=data.id;
              this.Insert.budgetTermMonthId=5;
              this.Insert.createdBy=this.authService.currentUserValue.userName;

              this._BudgetDetailsServicesService.AddBudgetDetailAmount(this.Insert).subscribe({
                next:()=>{
                }
              });
              this.Insert.budgetTermMonthId=9;
              this._BudgetDetailsServicesService.AddBudgetDetailAmount(this.Insert).subscribe({
                next:()=>{
                }
              });
              this.Insert.budgetTermMonthId=13;
              this._BudgetDetailsServicesService.AddBudgetDetailAmount(this.Insert).subscribe({
                next:()=>{
                }
              });
              this.Insert.budgetTermMonthId=16;
              this._BudgetDetailsServicesService.AddBudgetDetailAmount(this.Insert).subscribe({
                next:()=>{
                }
              });
              // location.reload();
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
  }
  else if (this.action == "edit") {
    
      this._BudgetDetailsServicesService.UpdateBudgetDetail(this.form.getRawValue()).subscribe(
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

  }
}

onNoClick() {
  this.dialogRef.close();
}


}
