import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Income } from 'app/treasury/Models/income';
import { IncomeService } from 'app/treasury/Services/income.service';

export interface DialogData {
  id: string;
  action: string;
  income: Income;
}

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public incomeForm: UntypedFormGroup;
  public income: Income = {
    id: 0,
    statusId: 1,
    description: '',
    createdBy: this.authService.currentUserValue.id,
    createdDate: '',
    modifiedBy: this.authService.currentUserValue.id,
    name: '',
    code: ''
  }
  constructor(
    public dialogRef: MatDialogRef<AddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public incomeService: IncomeService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Ingresos";
      this.income = data.income;
    } else {
      this.dialogTitle = 'Nuevo Ingreso';
    }
    this.incomeForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
  catalogoIngresoId: [this.income.id,Validators.required], // Set initial value
  statusId: [this.income.statusId, Validators.required], // Set initial value and validation
  description: [this.income.description, Validators.required], // Empty string and validation
  createdBy: [this.authService.currentUserValue.id,Validators.required], // Dynamic value
  modifiedBy: [this.authService.currentUserValue.id,Validators.required], // Dynamic value
  name: [this.income.name, Validators.required], // Empty string and validation
  code: [this.income.code, Validators.required], // Empty string and validation

      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.incomeService.updateIncomeMode(this.incomeForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this.incomeService.addIncomeMode(this.incomeForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}

