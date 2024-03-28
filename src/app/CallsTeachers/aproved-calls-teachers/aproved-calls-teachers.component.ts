import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-aproved-calls-teachers',
  templateUrl: './aproved-calls-teachers.component.html',
  styleUrls: ['./aproved-calls-teachers.component.scss']
})
export class AprovedCallsTeachersComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: '',
  }
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<AprovedCallsTeachersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
  ) {

    this.dialogTitle = "Aprobar convocatoria docente"
    this.ApprovedForm = this.fb.group({
      statusId: ['', [Validators.required]],
      approvalMessage: ['', [Validators.required]]
    });
  }

  submit():void{

  }

}
