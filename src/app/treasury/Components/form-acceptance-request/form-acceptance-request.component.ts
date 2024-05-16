import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {GetPeriodContable} from "../../Models/AccountPeriodResponse";
import {RequestEstateDetail} from "../../Models/RequestEstate";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestEstateDetailsService} from "../../Services/request-estate-details.service";
import {AuthService} from "@core";
import {AccountPeriodService} from "../../Services/account-period.service";
import {AcceptanceRequest} from "../../Models/AcceptanceRequest";
import {AcceptanceRequestService} from "../../Services/acceptance-request.service";

export interface DialogData {
  action: string;
  GenericModel: AcceptanceRequest;
}
@Component({
  selector: 'app-form-acceptance-request',
  templateUrl: './form-acceptance-request.component.html',
  styleUrls: ['./form-acceptance-request.component.scss']
})
export class FormAcceptanceRequestComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public subscriptions: Subscription[] = [];
  public periodos: GetPeriodContable[] = [];

  public _Model!: AcceptanceRequest;
  solicitudes: any;
  period: any;
  constructor(
    public dialogRef: MatDialogRef<FormAcceptanceRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: AcceptanceRequestService,
    private authService: AuthService,
    private  serviceAccountPeriodService:AccountPeriodService
  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo";
      this._Model = data.GenericModel;
    } else {
      this.dialogTitle = "Editar";
      this._Model = data.GenericModel;
    }
    this._Service.loadSolicitudes().subscribe({
      next:(res)=>{
        this.solicitudes = res.dataResult
      }
    });

    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      solicitudId: [this._Model.solicitudId, [Validators.required]],
      firmaSolicitante: [this._Model.firmaSolicitante? "1": "2", [Validators.required]],
      firmaAprobacion: [this._Model.firmaAprobacion? "1": "2", [Validators.required]],
    });
  }

  ngOnInit(): void {

  }
  submit() {

  }


  confirmAdd() {
    if (this.action == 'add') {
      const objrequest = {
        solicitudId: this._Forms.getRawValue().solicitudId,
        firmaSolicitante: this._Forms.getRawValue().firmaSolicitante == "1",
        firmaAprobacion: this._Forms.getRawValue().firmaAprobacion == "1",
        createdBy: this.authService.currentUserValue.id,
        statusId: 3
      }
      this._Service.add(objrequest)
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
      const objrequest = {
        aprobacionId: this.data.GenericModel.detalleId,
        solicitudId: this._Forms.getRawValue().solicitudId,
        firmaSolicitante: this._Forms.getRawValue().firmaSolicitante == "1",
        firmaAprobacion: this._Forms.getRawValue().firmaAprobacion == "1",
        statusId: 3,
        modifiedBy: this.authService.currentUserValue.id
      }

      this._Service.update(objrequest)
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}

