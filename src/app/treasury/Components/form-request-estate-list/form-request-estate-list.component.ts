import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "@core";
import {RequestEstateList} from "../../Models/RequestEstate";
import {RequestEstateListService} from "../../Services/request-estate-list.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {AccountPeriodService} from "../../Services/account-period.service";
import {GetPeriodContable} from "../../Models/AccountPeriodResponse";

export interface DialogData {
  action: string;
  GenericModel: RequestEstateList;
}
@Component({
  selector: 'app-form-request-estate-list',
  templateUrl: './form-request-estate-list.component.html',
  styleUrls: ['./form-request-estate-list.component.scss']
})
export class FormRequestEstateListComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public subscriptions: Subscription[] = [];
  public periodos: GetPeriodContable[] = [];

  public _Model!: RequestEstateList;
  category: any;
  period: any;
  constructor(
    public dialogRef: MatDialogRef<FormRequestEstateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: RequestEstateListService,
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
   /* this._Service.loadcategory().subscribe({
      next:(res)=>{
        this.category = res.categorias
      }
    });*/

    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      requestId: [this._Model.requestId],
      unitId: [this._Model.unitId],
      telephone: [this._Model.telephone, [Validators.required]],
      numeroUsoSolicitante: [this._Model.numeroUsoSolicitante],
      daa_Number: [this._Model.daa_Number],
      descripcion: [this._Model.descripcion, [Validators.required]],
      revisionDate: [this._Model.revisionDate],
      numeroRevision: [this._Model.numeroRevision, [Validators.required]],
      bienes: [this._Model.bienes? "1": "2"],
      service: [this._Model.service? "1": "2"],
      obras: [this._Model.obras? "1": "2", [Validators.required]],
      nombreSolicitante: [this._Model.nombreSolicitante, [Validators.required]],
      firmaSolicitante: [this._Model.firmaSolicitante],
      firmaAprobacion: [this._Model.firmaAprobacion],
      codigoId: [this._Model.codigoId],
      periodoContableId: [this._Model.periodoContableId, [Validators.required]],
      statusId: [this._Model.statusId],
      modifiedBy: [this.authService.currentUserValue.firstName],
    });
  }

  ngOnInit(): void {
    this.loadPeriods();
  }
  submit() {

  }

  loadPeriods():void{
    this.periodos = [];
    this.subscriptions.push(
      this.serviceAccountPeriodService.getAll().subscribe({
        next : (request)=>{
          const  r = request.getPeriodContables;
          r.forEach(
            (p)=>{
              this.periodos.push(
                {
                  periodoId: p.periodoId,
                  fechaInicio: p.fechaInicio,
                  fechaFin: p.fechaFin,
                  descripcion: p.descripción,
                  statusId: p.statusId,
                  createdBy: p.createdBy,
                  createdDate: p.createdDate
                }
              )
            }
          );
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
        }
      })
    );
  }

  confirmAdd() {
    if (this.action == 'add') {
      const objrequest = {
        unitId: this._Forms.getRawValue().unitId,
        telephone: this._Forms.getRawValue().telephone,
        numeroUsoSolicitante: this._Forms.getRawValue().numeroUsoSolicitante,
        daA_Number: this._Forms.getRawValue().daa_Number,
        descripcion: this._Forms.getRawValue().descripcion,
        revisionNumber: this._Forms.getRawValue().numeroRevision,
        bienes: this._Forms.getRawValue().bienes == "1",
        servicios: this._Forms.getRawValue().service == "1",
        obras: this._Forms.getRawValue().obras == "1",
        nombreSolicitante: this._Forms.getRawValue().nombreSolicitante,
        createdBy: this.authService.currentUserValue.id,
        //codigoId: this._Forms.getRawValue().codigoId,
        periodoContableId: this._Forms.getRawValue().periodoContableId,
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
        requestId: this.data.GenericModel.requestId,
        unitId: this._Forms.getRawValue().unitId,
        telephone: this._Forms.getRawValue().telephone,
        numeroUsoSolicitante: this._Forms.getRawValue().numeroUsoSolicitante,
        daa_Number: this._Forms.getRawValue().daa_Number,
        descripcion: this._Forms.getRawValue().descripcion,
        revisionDate: new Date(),
        numeroRevision: this._Forms.getRawValue().numeroRevision,
        bienes: this._Forms.getRawValue().bienes == "1",
        service: this._Forms.getRawValue().service == "1",
        obras: this._Forms.getRawValue().obras == "1",
        nombreSolicitante: this._Forms.getRawValue().nombreSolicitante,
        firmaSolicitante: null,
        firmaAprobacion: null,
        //codigoId: this._Forms.getRawValue().codigoId,
        periodoContableId: this._Forms.getRawValue().periodoContableId,
        modifiedBy: this.authService.currentUserValue.firstName
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
