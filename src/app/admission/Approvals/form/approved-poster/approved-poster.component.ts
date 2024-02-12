import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PosterRequest } from 'app/admission/models/GetOneActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  poster: PosterRequest;
  accion: string;
}
@Component({
  selector: 'app-approved-poster',
  templateUrl: './approved-poster.component.html',
  styleUrls: ['./approved-poster.component.scss']
})
export class ApprovedPosterComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_poster: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedPosterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {

    this.action = data.accion;

    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar Poster";
      this.id_poster = data.poster.id;
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

    this._ActivityService.ApprovedPoster(this.ApprovedForm.getRawValue()).subscribe({
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