import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TeacherPointsEduLevel} from "../../../teaching-management/models/TeacherPoints";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScoreListService} from "../../../teaching-management/services/score-list.service";
import {AuthService} from "@core";
import {RequestEstateList} from "../../Models/RequestEstate";
import {RequestEstateListService} from "../../Services/request-estate-list.service";

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
  public _Model!: RequestEstateList;
  gradosInstruccion: any;
  constructor(
    public dialogRef: MatDialogRef<FormRequestEstateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: RequestEstateListService,
    private authService: AuthService,
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
    this._Service.loadEdulevel().subscribe({
      next:(res)=>{
        this.gradosInstruccion = res
      }
    });
    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._Model.requestId],
      description: [this._Model.unitId],
      points: [this._Model.createdBy, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      const points = + this._Forms.getRawValue().points;
      const objrequest = {
        name: this._Forms.getRawValue().description,
        points: points,
        createdBy: this.authService.currentUserValue.firstName,
        estatus: true
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
      const points = + this._Forms.getRawValue().points;
      const objrequest = {
        id: this._Model.requestId,
        name: this._Forms.getRawValue().description,
        points: points,
        createdBy: this.authService.currentUserValue.firstName,
        estatus: true
      }

      this._Service.add(objrequest)
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
