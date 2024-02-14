import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PosterRequest } from 'app/admission/FormalEducations/Models/Degree';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  poster: PosterRequest;
  accion: string;
}
@Component({
  selector: 'app-approved-poster-two',
  templateUrl: './approved-poster-two.component.html',
  styleUrls: ['./approved-poster-two.component.scss']
})
export class ApprovedPosterTwoComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_plan_anuel: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedPosterTwoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AnnualPlanService: AnnualPlanService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar Poster";
      this.id_plan_anuel = data.poster.id;
    }
    this.ApprovedForm = this.fb.group({
      Ids: [[data.poster.id], [Validators.required]],
      isApproved: ['', [Validators.required]],
      approvalMessage: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.ApprovedForm.controls['isApproved'].value == "1") {
      this.ApprovedForm.controls['isApproved'].setValue(true);
    } else if (this.ApprovedForm.controls['isApproved'].value == "2") {
      this.ApprovedForm.controls['isApproved'].setValue(false);
    }

    this._AnnualPlanService.ApprobedPoster(this.ApprovedForm.getRawValue()).subscribe({
      next: (res) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Aprobado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }
}