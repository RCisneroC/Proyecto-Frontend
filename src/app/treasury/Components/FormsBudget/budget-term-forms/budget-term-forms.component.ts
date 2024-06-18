import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { GetBudgetTerm } from 'app/treasury/Models/BudgetTerm';
import { BudgetTermServicesService } from 'app/treasury/Services/budget-term-services.service';
export interface DialogData {
  detail: GetBudgetTerm;
}
@Component({
  selector: 'app-budget-term-forms',
  templateUrl: './budget-term-forms.component.html',
  styleUrls: ['./budget-term-forms.component.scss']
})
export class BudgetTermFormsComponent implements OnInit,OnDestroy {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action?: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  _GetBudgetTerm : GetBudgetTerm = {}; 

  constructor(
    public dialogRef: MatDialogRef<BudgetTermFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _BudgetTermServicesService: BudgetTermServicesService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Mes";
      this._GetBudgetTerm = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nuevo Mes';
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
      this._GetBudgetTerm.statusId = 1;
    }
    if(this.action == "edit"){
      statusId = 1;
    }

    return this.fb.group({
      id:[this._GetBudgetTerm.id],
      name: [this._GetBudgetTerm.name, [Validators.required]],
      description: [this._GetBudgetTerm.description, [Validators.required]],
      statusId : [this._GetBudgetTerm.statusId, [Validators.required]],
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
      this._BudgetTermServicesService.save(this.form.getRawValue()).subscribe(
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
    
      this._BudgetTermServicesService.update(this.form.getRawValue()).subscribe(
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
