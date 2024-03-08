import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlan } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  accion: string;
  AnnualPlan: AnnualPlan;
}
@Component({
  selector: 'app-edit-add-forms',
  templateUrl: './edit-add-forms.component.html',
  styleUrls: ['./edit-add-forms.component.scss'],
})
export class EditAddFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  AnnualPlamForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditAddFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AnnualPlanService: AnnualPlanService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Plan Anual";
    } else {
      this.dialogTitle = "Editar Plan Anual";
    }
    this.AnnualPlamForm = this.fb.group({
      name: [data.AnnualPlan.name, [Validators.required]],
      description: [data.AnnualPlan.description, [Validators.required]],
      statusId: [data.AnnualPlan.statusId, [Validators.required]],
      id: [data.AnnualPlan.id],
      startDate: [data.AnnualPlan.startDate, [Validators.required]],
      endDate: [data.AnnualPlan.endDate, [Validators.required]],
    });
  }
  ngOnInit(): void {

  }

  submit() {
    if (this.action === 'add') {
      this._AnnualPlanService.addAnnualPlan(this.AnnualPlamForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Intento Nuevamente.";
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    } else {
      this._AnnualPlanService.updateAnnualPlan(this.AnnualPlamForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Editado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Intento Nuevamente.";
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }

  }
}

