import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomRequest } from 'app/admission/models/GetOneActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  rooms: RoomRequest;
  accion: string;
}
@Component({
  selector: 'app-approved-rooms',
  templateUrl: './approved-rooms.component.html',
  styleUrls: ['./approved-rooms.component.scss']
})
export class ApprovedRoomsComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_solicitud: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedRoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {

    this.action = data.accion;

    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar solicitud de salón";
      this.id_solicitud = data.rooms.id;
    }

    this.ApprovedForm = this.fb.group({
      Ids: [[data.rooms.id], [Validators.required]],
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

    this._ActivityService.ApprovedRooms(this.ApprovedForm.getRawValue()).subscribe({
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
