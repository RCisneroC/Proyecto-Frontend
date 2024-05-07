import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { BudgetCoding } from 'app/treasury/Models/BudgetCoding';
import { BudgetCodingService } from 'app/treasury/Services/budget-coding.service';

export interface DialogData {
  id: string;
  action: string;
  budgetCoding: BudgetCoding;
}


@Component({
  selector: 'app-add-budget-coding',
  templateUrl: './add-budget-coding.component.html',
  styleUrls: ['./add-budget-coding.component.scss']
})
export class AddBudgetCodingComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public budgetCodingForm: UntypedFormGroup;
  public budgetCoding: BudgetCoding = {
    id: 0,
    name: '',
    statusId: 1,
    descripcion: '',
    code: '',
    createdBy: this.authService.currentUserValue.id,
    createdDate: '',
    getCatalogoIngresos: []
  }
  constructor(
    public dialogRef: MatDialogRef<AddBudgetCodingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public budgetCodingService: BudgetCodingService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Codificación Presupuestaria";
      this.budgetCoding = data.budgetCoding;
    } else {
      this.dialogTitle = 'Nueva Codificación Presupuestaria';
    }
    this.budgetCodingForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.budgetCoding.id],
      descripcion: [this.budgetCoding.descripcion, [Validators.required]],
      statusId: [this.budgetCoding.statusId, [Validators.required]],
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
      this.budgetCodingService.updateBudgetCodingMode(this.budgetCodingForm.getRawValue())
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
      this.budgetCodingService.addBudgetCodingMode(this.budgetCodingForm.getRawValue())
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

