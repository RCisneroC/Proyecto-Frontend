import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {GetPeriodContable} from "../../Models/AccountPeriodResponse";
import {RequestEstateDetail} from "../../Models/RequestEstate";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestEstateListService} from "../../Services/request-estate-list.service";
import {AuthService} from "@core";
import {AccountPeriodService} from "../../Services/account-period.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RequestEstateDetailsService} from "../../Services/request-estate-details.service";

export interface DialogData {
  action: string;
  GenericModel: RequestEstateDetail;
  request_id: string;
}
@Component({
  selector: 'app-form-details-request-estate',
  templateUrl: './form-details-request-estate.component.html',
  styleUrls: ['./form-details-request-estate.component.scss']
})
export class FormDetailsRequestEstateComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public subscriptions: Subscription[] = [];
  public periodos: GetPeriodContable[] = [];

  public _Model!: RequestEstateDetail;
  category: any;
  period: any;
  constructor(
    public dialogRef: MatDialogRef<FormDetailsRequestEstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: RequestEstateDetailsService,
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
    this._Service.loadcategory().subscribe({
      next:(res)=>{
        this.category = res.categorias
      }
    });

    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      quantity: [this._Model.quantity, [Validators.required]],
      unit: [this._Model.unit, [Validators.required]],
      code: [this._Model.code, [Validators.required]],
      price: [this._Model.price, [Validators.required]],
      unidadExistente:[this._Model.unidadExistente, [Validators.required]],
      quantityToSupply: [this._Model.quantityToSupply, [Validators.required]],
      goodsOrServiceDetail: [this._Model.goodsOrServiceDetail, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }
  submit() {

  }


  confirmAdd() {
    if (this.action == 'add') {
      const objrequest = {
        requestId: this.data.request_id,
        detailInfo: {
          additionalProp1: {
            unidadExistente: this._Forms.getRawValue().unidadExistente,
            quantity: this._Forms.getRawValue().quantity,
            unit: this._Forms.getRawValue().unit,
            code: this._Forms.getRawValue().code,
            price: this._Forms.getRawValue().price,
            quantityToSupply: this._Forms.getRawValue().quantityToSupply,
            goodsOrServiceDetail: this._Forms.getRawValue().goodsOrServiceDetail
          },
        },
        createdBy: this.authService.currentUserValue.id
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
        detailId: this.data.GenericModel.detailId,
        requestForGoodsAndServicesId: this.data.request_id,
        lineNumber: null,
        quantity: this._Forms.getRawValue().quantity,
        unit: this._Forms.getRawValue().unit,
        code: this._Forms.getRawValue().code,
        price: this._Forms.getRawValue().price,
        quantityToSupply: this._Forms.getRawValue().quantityToSupply,
        goodsOrServiceDetail: this._Forms.getRawValue().goodsOrServiceDetail,
        unidadExistente: this._Forms.getRawValue().unidadExistente,
        modifiedBy: this.authService.currentUserValue.id,
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

