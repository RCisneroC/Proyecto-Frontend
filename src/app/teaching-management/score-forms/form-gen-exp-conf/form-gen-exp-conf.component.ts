import {Component, Inject, OnInit} from '@angular/core';
import {ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TeacherGenPointsExp} from "../../models/TeacherPoints";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScoreListService} from "../../services/score-list.service";
import {AuthService} from "@core";
import {DialogData} from "../form-exp-level/form-exp-level.component";
import {ExpPreview, PointsListClass} from "../../models/Teacher";

@Component({
  selector: 'app-form-gen-exp-conf',
  templateUrl: './form-gen-exp-conf.component.html',
  styleUrls: ['./form-gen-exp-conf.component.scss']
})
export class FormGenExpConfComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _Forms!: UntypedFormGroup;
  public _Model!: TeacherGenPointsExp;
  listPreviewgenerated: ExpPreview[] = [];
  gradosInstruccion: any;
  Preview: boolean = false;

  displayedColumnsPreview: string[] = [
    'experiencia',
    'puntos',
  ];

  constructor(
    public dialogRef: MatDialogRef<FormGenExpConfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _Service: ScoreListService,
    private authService: AuthService,
  ) {
    console.log(data);
    this.action = data.action;
    this.dialogTitle = "Nuevo";
    if (this.action === 'add') {
      this._Model = { maxExperiencia: 0, createdBy:"", intervaloExp: 0, minExperiencia: 0};
    }



    this._Forms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      minExperiencia: [this._Model.minExperiencia, [Validators.required]],
      maxExperiencia: [this._Model.maxExperiencia, [Validators.required]],
      intervaloExp: [this._Model.intervaloExp, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      const objrequest = {
        minExperiencia: this._Forms.getRawValue().minExperiencia,
        maxExperiencia: this._Forms.getRawValue().maxExperiencia,
        intervaloExp: this._Forms.getRawValue().intervaloExp,
        createdBy: this.authService.currentUserValue.firstName,
      }
      this._Service.GenerateExpLevel(objrequest)
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
    }
  }

  generatePreview(){
    this.Preview = false;
    const request = {
      MinExperiencia: this._Forms.getRawValue().minExperiencia,
      MaxExperiencia: this._Forms.getRawValue().maxExperiencia,
      intervaloExp: this._Forms.getRawValue().intervaloExp,
    }

    const inter = + request.intervaloExp;
    let rangoMin = + request.MinExperiencia;
    const rangoMax = + request.MaxExperiencia;
    const yearExperience: ExpPreview[] = [];

    for (let i = rangoMin; i <= rangoMax; i = rangoMin) {
      const valor = rangoMin + inter;
      yearExperience.push({
        experiencia: (rangoMin.toString() +'-' + valor.toString()),
        points: 0
      });
      rangoMin = rangoMin + inter + 1;
    }

    this.listPreviewgenerated = yearExperience;
    this.Preview = true;

  }
  onNoClick() {
    this.dialogRef.close();
  }
}

