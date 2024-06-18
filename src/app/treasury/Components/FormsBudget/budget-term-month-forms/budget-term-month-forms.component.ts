import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { GetBudgetTermMonth } from 'app/treasury/Models/BudgetTermMonth';
import { BudgetTermServicesService } from 'app/treasury/Services/budget-term-services.service';
import { ResponseMessageMaestra } from '../../../../admission/models/ResponseMessage';
import { BudgetTermMonthServicesService } from 'app/treasury/Services/budget-term-month-services.service';
import { GetBudgetTerm } from 'app/treasury/Models/BudgetTerm';

export interface DialogData {
  detail: GetBudgetTermMonth;
}
@Component({
  selector: 'app-budget-term-month-forms',
  templateUrl: './budget-term-month-forms.component.html',
  styleUrls: ['./budget-term-month-forms.component.scss']
})
export class BudgetTermMonthFormsComponent implements OnInit,OnDestroy {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action?: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  _GetBudgetTermMonth : GetBudgetTermMonth = {}; 
  _getBudgetTerms:GetBudgetTerm[]=[];
  constructor(
    public dialogRef: MatDialogRef<BudgetTermMonthFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _BudgetTermMonthServicesService: BudgetTermMonthServicesService,
    private _BudgetTermServicesService: BudgetTermServicesService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Periodos";
      this._GetBudgetTermMonth = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nueva Periodo';
    }
    this.getAll();
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    
  }

  getAll(){
    this._BudgetTermServicesService.getAll().subscribe({
      next:(res)=>{
        console.log('====================================');
        this._getBudgetTerms=res.getBudgetTerms;
        console.log(this._getBudgetTerms);
        console.log('====================================');
      }
    })
  }
  ngOnInit(): void {
    if(this.action == "new"){ 
    }
  }

  createForm(): UntypedFormGroup {
    let periodoContableId:number = 0;
    let statusId:number = 0;

    if(this.action == "new"){
      this._GetBudgetTermMonth.statusId = 1;
    }
    if(this.action == "edit"){
      statusId = 1;
    }

    return this.fb.group({
      id:[this._GetBudgetTermMonth.id],
      name: [this._GetBudgetTermMonth.name, [Validators.required]],
      description: [this._GetBudgetTermMonth.description, [Validators.required]],
      statusId : [this._GetBudgetTermMonth.statusId, [Validators.required]],
      budgetTermId:[this._GetBudgetTermMonth.budgetTermId,[Validators.required]],
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
      this._BudgetTermMonthServicesService.save(this.form.getRawValue()).subscribe(
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
    
      this._BudgetTermMonthServicesService.update(this.form.getRawValue()).subscribe(
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