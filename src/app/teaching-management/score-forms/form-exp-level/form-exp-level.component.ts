import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TeacherPointsCat} from "../../models/TeacherPoints";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScoreListService} from "../../services/score-list.service";
import {AuthService} from "@core";

export interface DialogData {
  action: string;
  teacherpointcat: TeacherPointsCat;
}
@Component({
  selector: 'app-form-exp-level',
  templateUrl: './form-exp-level.component.html',
  styleUrls: ['./form-exp-level.component.scss']
})
export class FormExpLevelComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public _Model!: TeacherPointsCat;
  gradosInstruccion: { id: number; nombre: string; }[];
  constructor(
    public dialogRef: MatDialogRef<FormExpLevelComponent>,
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
    this.gradosInstruccion = [
      {
        id: 1,
        nombre: "1-3",
      },
      {
        id: 2,
        nombre: "4-9",
      },
      {
        id: 3,
        nombre: "10+",
      }
    ];
    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._Model.id],
      description: [this._Model.description],
      points: [this._Model.points, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      const objrequest = {
        description: this._Forms.getRawValue().description,
        category: "Experiencia",
        points: this._Forms.getRawValue().points,
        createdDate: new Date,
        createdBy: this.authService.currentUserValue.firstName,
        lastModifiedDate: new Date,
        lastModifiedBy: this.authService.currentUserValue.firstName
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
        id: this._Model.id,
        description: this._Forms.getRawValue().description,
        category: "Experiencia",
        points: this._Forms.getRawValue().points,
        createdDate: new Date,
        createdBy: this.authService.currentUserValue.firstName,
        lastModifiedDate: new Date,
        lastModifiedBy: this.authService.currentUserValue.firstName
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

