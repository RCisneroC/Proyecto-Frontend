import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import {RequestVarious, RequestVariousItem} from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
export interface DialogData {
  id: string;
  action: string;
  request: RequestVariousItem;
}
@Component({
  selector: 'app-approved-solicitud',
  templateUrl: './approved-solicitud.component.html',
  styleUrls: ['./approved-solicitud.component.scss']
})
export class ApprovedSolicitudComponent {
  action: string;
  dialogTitle: string;
  RequestVariousApprovedForm: UntypedFormGroup;
  RequestVariousApproved: RequestVariousItem;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public _DataLocal: RequestVarious[] = [];
  public userType: string = '';
  public IdTypeUser: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public RequestVariousService: RequestServicesService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
  ) {
    // Set the defaults

    this.userType = this.getRoleFromToken(this.authService.currentUserValue.token);
    this.action = data.action;
    this.dialogTitle = 'Aprobar Solicitud';
    this.RequestVariousApproved = data.request;
    this.RequestVariousApprovedForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idSolicitud: [this.data.request.id, [Validators.required]],
      statusId: [this.data.request.requestVariousStatusTypeId, [Validators.required]],
      approvalMessage: ['']
    });

  }
  submit() {


    if (this.action === 'edit') {

      const value = this.RequestVariousApprovedForm.getRawValue();
      if(value.statusId === '5'){
        const UpdateRequestVariousData = {
          id: this.data.request.id,
          description: this.data.request.description,
          assignedUser: this.authService.currentUserValue.id,
          requestVariousStatusTypeId: 3,
          response: value.approvalMessage,
          statusId: 3
        }
        this.RequestVariousService.UpdateRequestVarious(UpdateRequestVariousData).subscribe({
          next:(res)=>{
            if(res.statusCode == 200){
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Aprobado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        })
      }
      if(value.statusId === '4'){
        const UpdateRequestVariousData = {
          id: this.data.request.id,
          description: this.data.request.description,
          assignedUser: this.authService.currentUserValue.id,
          requestVariousStatusTypeId: 4,
          response: value.approvalMessage,
          statusId:4
        }
        this.RequestVariousService.UpdateRequestVarious(UpdateRequestVariousData).subscribe({
          next:(res)=>{
            if(res.statusCode == 200){
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Cancelado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        })
      }


  }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // let dataL = localStorage.getItem('solicitudes') || '';
    // if (dataL != '') {
    //   this._DataLocal = JSON.parse(dataL);
    // }
    // // emppty stuff
    // if (this.action === 'edit') {
    //   console.log(this.data);

    //   this._DataLocal[parseInt(this.data.id)] = this.RequestVariousForm.getRawValue();
    //   console.log('====================================');
    //   console.log(this._DataLocal);
    //   console.log('====================================');
    //   localStorage.setItem('solicitudes', JSON.stringify(this._DataLocal));
    //   this.ResponseMessage.CodError = 200;
    //   this.ResponseMessage.Message = 'Editado correctamente.';
    //   this.dialogRef.close(this.ResponseMessage);
    // } else {
    //   console.log(this._DataLocal);

    //   this._DataLocal.push(this.RequestVariousForm.getRawValue());
    //   localStorage.setItem('solicitudes', JSON.stringify(this._DataLocal));
    //   this.ResponseMessage.CodError = 200;
    //   this.ResponseMessage.Message = 'Creado correctamente.';
    //   this.dialogRef.close(this.ResponseMessage);
    // }

  }



  public getRoleFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  public decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    return JSON.parse(decodedPayload);
  }

}

