import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { GetBudget } from 'app/treasury/Models/budgetRequest';
import { BudgetServicesService } from 'app/treasury/Services/budget-services.service';
export interface DialogData {
  detail: GetBudget;
}
@Component({
  selector: 'app-budget-forms',
  templateUrl: './budget-forms.component.html',
  styleUrls: ['./budget-forms.component.scss']
})
export class BudgetFormsComponent implements OnInit,OnDestroy {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action?: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  _GetBudget : GetBudget = {}; 

  constructor(
    public dialogRef: MatDialogRef<BudgetFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _BudgetServicesService: BudgetServicesService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Detalle del Presupuesto";
      this._GetBudget = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nuevo Presupuesto';
    }
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    if(this.action == "new"){ 
    }
  }

  createForm(): UntypedFormGroup {
    let periodoContableId:number = 0;
    let statusId:number = 0;

    if(this.action == "new"){
      this._GetBudget.statusId = 1;
    }
    if(this.action == "edit"){
      statusId = 1;
    }

    return this.fb.group({
      id:[this._GetBudget.id],
      typeOfBudget: [this._GetBudget.typeOfBudget, [Validators.required]],
      year: [this._GetBudget.year, [Validators.required]],
      administrativeUnitOrDependency: [this._GetBudget.administrativeUnitOrDependency, [Validators.required]],
      subProgramOrProject: [this._GetBudget.subProgramOrProject, [Validators.required]],
      statusId : [this._GetBudget.statusId, [Validators.required]],
      ModifiedBy :[this.authService.currentUserValue.userName],
      CreatedBy :[this.authService.currentUserValue.userName]
    });
  }
confirmAdd() {
  if (!this.form.valid) {
    return;
  }
  this.IsLoading = true;
  if (this.action == "new") {
      this._BudgetServicesService.save(this.form.getRawValue()).subscribe(
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
  }
  else if (this.action == "edit") {
    
      this._BudgetServicesService.update(this.form.getRawValue()).subscribe(
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