import { Component, Inject, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Subscription } from 'rxjs';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse } from '@angular/common/http';


export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-aproved-calls-teachers',
  templateUrl: './aproved-calls-teachers.component.html',
  styleUrls: ['./aproved-calls-teachers.component.scss']
})
export class AprovedCallsTeachersComponent implements OnDestroy {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: '',
  }
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AprovedCallsTeachersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private serviceCallsTeachers: CallsTeachersService
  ) {

    this.dialogTitle = "Abrir/Cerrar convocatoria docente"
    this.ApprovedForm = this.fb.group({
      statusId: ['', [Validators.required]],
      approvalMessage: ['', [Validators.required]]
    });
  }


  ngOnDestroy(): void {
   this.subscriptions.forEach(s => s.unsubscribe())
  }

  submit():void{
    const dataP = {
      id: parseInt(this.data.id),
      statusId: parseInt(this.ApprovedForm.controls["statusId"].value),
      ApprovalMessage: this.ApprovedForm.controls["approvalMessage"].value,
    };
    this.subscriptions.push(
      this.serviceCallsTeachers.UpdateStatus(dataP).subscribe(
        {
          next: (request: any) => {
            console.log(request)
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Convocatoria creada con éxito.";
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.ResponseMessage.CodError = 404;
            this.ResponseMessage.Message = "No se pudo crear la convocatoria.";
            this.dialogRef.close(this.ResponseMessage);
          }
        }
      )
    );
  }

}
