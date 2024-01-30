import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { InscriptionResponse } from 'app/admission/models/ParticipantesEF';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id: string;
  participant: InscriptionResponse;
  accion: string;
}
@Component({
  selector: 'app-approval-incription',
  templateUrl: './approval-incription.component.html',
  styleUrls: ['./approval-incription.component.scss']
})
export class ApprovalIncriptionComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_participant: number = 0;
  useJson: any;
  localUser: any;

  constructor(
    public dialogRef: MatDialogRef<ApprovalIncriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _InscriptionService: InscriptionService,
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
      inscriptionId: [data.participant.inscriptionId, [Validators.required]],
      cedula: [data.participant.cedula, [Validators.required]],
      statusId: ['', [Validators.required]],
      createdBy: [this.useJson.id, [Validators.required]],
      comment: ['', [Validators.required]],
      meetsrequirements: [true]
    });

    // _ActivityService.GetParticipanteCedula(data.participant.cedula).subscribe({
    //   next: (res: ApiResponse) => {
    //     console.log(res);
    //     if (res.participants.length > 0) {
    //       this.ApprovedForm = this.fb.group({
    //         id: [res.participants[0].id, [Validators.required]],
    //         cedula: [data.participant.cedula, [Validators.required]],
    //         statusId: ['', [Validators.required]],
    //         userid: [this.useJson.id, [Validators.required]]
    //       });
    //     }
    //   },
    //   error: () => {
    //     location.reload();
    //   }
    // });

  }
  submit() {
    console.log(this.ApprovedForm.getRawValue());
    this._InscriptionService.ApproveParticipant(this.ApprovedForm.getRawValue()).subscribe({
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
