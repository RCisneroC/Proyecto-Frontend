import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Rooms} from "../../../admission/FormalEducations/Models/Rooms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScoreListService} from "../../services/score-list.service";
import {TeacherPointsCat, TeacherPointsEduLevel} from "../../models/TeacherPoints";
import {AuthService} from "@core";

export interface DialogData {
  action: string;
  teacherpointcat: TeacherPointsEduLevel;
}
@Component({
  selector: 'app-form-edu-level',
  templateUrl: './form-edu-level.component.html',
  styleUrls: ['./form-edu-level.component.scss']
})
export class FormEduLevelComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public _Model!: TeacherPointsEduLevel;
  gradosInstruccion: any;
  constructor(
    public dialogRef: MatDialogRef<FormEduLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: ScoreListService,
    private authService: AuthService,
  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo";
      this._Model = data.teacherpointcat;
    } else {
      this.dialogTitle = "Editar";
      this._Model = data.teacherpointcat;
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
      id: [this._Model.id],
      description: [this._Model.name],
      points: [this._Model.points, [Validators.required]],
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
        id: this._Model.id,
        name: this._Forms.getRawValue().description,
        points: points,
        createdBy: this.authService.currentUserValue.firstName,
        estatus: true
      }

      this._Service.updateEduLevel(objrequest)
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
