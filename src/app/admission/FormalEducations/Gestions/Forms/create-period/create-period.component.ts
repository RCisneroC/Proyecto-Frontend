import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlan, Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  accion: string;
  id_curriculum: string;
  Period: Period;
}
@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.scss']
})
export class CreatePeriodComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PeriodForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreatePeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AnnualPlanService: AnnualPlanService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Periodo";
    } else {
      this.dialogTitle = "Editar Periodo";
    }
    this.PeriodForm = this.fb.group({
      name: [data.Period.name, [Validators.required]],
      description: [data.Period.description, [Validators.required]],
      statusId: [data.Period.statusId, [Validators.required]],
      id: [data.Period.id],
      startDate: [data.Period.startDate, [Validators.required]],
      endDate: [data.Period.endDate, [Validators.required]],
      maxNumOfParticipants: [data.Period.maxNumOfParticipants, [Validators.required]],
      degreeCurriculumDesignId: [data.id_curriculum, [Validators.required]],
    });
  }
  ngOnInit(): void {

  }

  submit() {
    if (this.action === 'add') {
      this._AnnualPlanService.addAnnualPlanPeriod(this.PeriodForm.getRawValue()).subscribe({
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
      this._AnnualPlanService.updateAnnualPlanPeriod(this.PeriodForm.getRawValue()).subscribe({
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
