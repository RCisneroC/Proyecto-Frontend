import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ScheduleActivityDetail } from 'app/admission/models/scheduleActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  scheduleActivity: ScheduleActivityDetail;
  accion: string;
}
@Component({
  selector: 'app-approved-activity',
  templateUrl: './approved-activity.component.html',
  styleUrls: ['./approved-activity.component.scss']
})
export class ApprovedActivityComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_cronograma: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar Actividad " + data.scheduleActivity.name;
      this.id_cronograma = data.scheduleActivity.id;
    }
    this.ApprovedForm = this.fb.group({
      id: [data.scheduleActivity.id, [Validators.required]],
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

    this._ActivityService.ApproveCurilculumActivity(this.ApprovedForm.getRawValue()).subscribe({
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

