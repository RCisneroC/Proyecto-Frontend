import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ResponseMessageExtended, ResponseMessageMaestra} from 'app/admission/models/ResponseMessage';
import { ApiResponse, ApiResponseOne, GetDataResultResponse, Participant } from 'app/admission/models/participant';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  participant: GetDataResultResponse;
  accion: string;
}
@Component({
  selector: 'app-approve-participant',
  templateUrl: './approve-participant.component.html',
  styleUrls: ['./approve-participant.component.scss']
})
export class ApproveParticipantComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: '',
  }

  public ResponseMessageExt: ResponseMessageExtended = {
    CodError: 0,
    Message: '',
    status: 0
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_participant: number = 0;
  useJson: any;
  localUser: any;

  constructor(
    public dialogRef: MatDialogRef<ApproveParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.localUser = localStorage.getItem('currentUser') || null;

    if (this.localUser != '') {
      this.useJson = JSON.parse(this.localUser);
    }

    this.action = data.accion;
    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar Participante";
      this.id_participant = data.participant.inscriptionId;
    }
    this.ApprovedForm = this.fb.group({
      id: ['', [Validators.required]],
      cedula: [data.participant.cedula, [Validators.required]],
      statusId: ['', [Validators.required]],
      userid: [this.useJson.id, [Validators.required]],

    });

    _ActivityService.GetParticipanteCedula(data.participant.cedula).subscribe({
      next: (res: ApiResponse) => {
        console.log(res);
        if (res.participants.length > 0) {
          this.ApprovedForm = this.fb.group({
            id: [res.participants[0].id, [Validators.required]],
            cedula: [data.participant.cedula, [Validators.required]],
            statusId: ['', [Validators.required]],
            userid: [this.useJson.id, [Validators.required]]
          });
        }
      },
      error: () => {
        location.reload();
      }
    });

  }
  submit() {
    console.log(this.ApprovedForm.getRawValue());
    this._ActivityService.ApproveParticipant(this.ApprovedForm.getRawValue()).subscribe({
      next: (res) => {

        this.ResponseMessageExt.CodError = 200;
        this.ResponseMessageExt.Message = 'Aprobado correctamente.';
        this.ResponseMessageExt.status =  + this.ApprovedForm.getRawValue().statusId;

        this.dialogRef.close(this.ResponseMessageExt);
      },
      error: (err) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }

}
