import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Rooms} from "../../../admission/FormalEducations/Models/Rooms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScoreListService} from "../../services/score-list.service";
import {TeacherPointsCat} from "../../models/TeacherPoints";
import {AuthService} from "@core";

export interface DialogData {
  action: string;
  teacherpointcat: TeacherPointsCat;
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
  public _Model!: TeacherPointsCat;
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
      const temparr =  this.gradosInstruccion.filter((x: { name: string; })=>x.name == this._Forms.getRawValue().description);
      const objrequest = {
        description: this._Forms.getRawValue().description,
        category: "nivel educativo",
        points: this._Forms.getRawValue().points,
        createdDate: new Date,
        createdBy: this.authService.currentUserValue.firstName,
        lastModifiedDate: new Date,
        lastModifiedBy: this.authService.currentUserValue.firstName,
        idNivelEducativo:temparr[0].id
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
      const temparr =  this.gradosInstruccion.filter((x: { name: string; })=>x.name == this._Forms.getRawValue().description);
      const objrequest = {
        id: this._Model.id,
        description: this._Forms.getRawValue().description,
        category: "nivel educativo",
        points: this._Forms.getRawValue().points,
        createdDate: new Date,
        createdBy: this.authService.currentUserValue.firstName,
        lastModifiedDate: new Date,
        lastModifiedBy: this.authService.currentUserValue.firstName,
        idNivelEducativo:temparr[0].id
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
