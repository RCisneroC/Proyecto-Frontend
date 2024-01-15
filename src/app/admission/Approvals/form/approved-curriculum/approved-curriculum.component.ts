import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ScheduleActivity } from 'app/admission/models/scheduleActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  scheduleActivity: ScheduleActivity;
  accion:string;
}

@Component({
  selector: 'app-approved-curriculum',
  templateUrl: './approved-curriculum.component.html',
  styleUrls: ['./approved-curriculum.component.scss']
})
export class ApprovedCurriculumComponent {
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
}
  
  action: string;
  dialogTitle: string='';
  ApprovedForm: UntypedFormGroup;
  id_cronograma: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedCurriculumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService:ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'approved') {
      this.dialogTitle ="Aprobar Cronograma";
      this.id_cronograma = data.scheduleActivity.id;
    }
    this.ApprovedForm = this.fb.group({
      id: [data.scheduleActivity.id,[Validators.required]],
      isApproved:['',[Validators.required]],
      approvalMessage:['',[Validators.required]]
    });
  }
  submit() {
    console.log(this.ApprovedForm.getRawValue());
    if (this.ApprovedForm.controls['isApproved'].value == "1") {
      this.ApprovedForm.controls['isApproved'].setValue(true);
    } else if(this.ApprovedForm.controls['isApproved'].value == "2") {
      this.ApprovedForm.controls['isApproved'].setValue(false);
    }
    
    this._ActivityService.ApproveCurilculumActivity(this.ApprovedForm.getRawValue()).subscribe({
      next: (res) => {
        console.log(res);
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
