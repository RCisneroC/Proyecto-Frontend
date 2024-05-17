import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {GetPeriodContable} from "../../Models/AccountPeriodResponse";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "@core";
import {AccountPeriodService} from "../../Services/account-period.service";
import {Expenses} from "../../Models/Expenses";
import {ExpensesService} from "../../Services/expenses.service";

export interface DialogData {
  action: string;
  GenericModel: Expenses;
}
@Component({
  selector: 'app-form-update-expenses',
  templateUrl: './form-update-expenses.component.html',
  styleUrls: ['./form-update-expenses.component.scss']
})
export class FormUpdateExpensesComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public subscriptions: Subscription[] = [];
  public periodos: GetPeriodContable[] = [];

  public _Model!: Expenses;
  solicitudes: any;
  period: any;
  constructor(
    public dialogRef: MatDialogRef<FormUpdateExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: ExpensesService,
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

    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      identifyStatusId: ["", [Validators.required]],
      descripcion: [this._Model.descripcion, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }
  submit() {

  }


  confirmAdd() {
    if (this.action == 'add') {
      /*const objrequest = {
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
        });*/
    } else {
      const objrequest = {
        identifyStatusId: this._Forms.getRawValue().identifyStatusId,
        descripcion: this._Forms.getRawValue().descripcion,
        statusId: 7,
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

