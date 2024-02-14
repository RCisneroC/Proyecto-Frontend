import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityDetailModules } from 'app/admission/models/ActivityDetailModules';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
export interface DialogData {
  id_actividad: string;
  accion: string;
  module: ActivityDetailModules,
  id_plan: number;
}
@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.scss']
})
export class CreateModulesComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }


  action: string;
  dialogTitle: string = '';
  EditarModulosForms: UntypedFormGroup;
  id_actividad: string = '';


  public IsLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<CreateModulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _ActivityDetailService: ActivityDetailService,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'edit-modulos') {
      this.dialogTitle = "Editar Modulo " + data.module.name;
      this.id_actividad = data.id_actividad;
    } else if (this.action === 'add-modulos') {
      this.dialogTitle = "Agregar Modulo";
      this.id_actividad = data.id_actividad;
    }

    this.EditarModulosForms = this.fb.group({
      statusId: [data.module.statusId, [Validators.required]],
      id: [data.module.id],
      activityStudyPlanId: [data.id_plan, [Validators.required]],
      name: [data.module.name, [Validators.required]],
      description: [data.module.description, [Validators.required]],
      synchronousHours: [data.module.synchronousHours],
      asynchronousHours: [data.module.asynchronousHours],
      inPersonHours: [data.module.inPersonHours],
      totalHours: [data.module.totalHours],
      percentageValue: [data.module.percentageValue],
      learningGoals: [data.module.learningGoals],
      competencies: [data.module.competencies],
      subTopics: [data.module.subTopics],
      methodologicalStrategy: [data.module.methodologicalStrategy],
      bibliographicCitation: [data.module.bibliographicCitation],
      learningStrategies: [data.module.learningStrategies],
    });
  }
  ngOnInit(): void {

  }

  submit() {

    if (this.data.accion == 'edit-modulos') {
      this._ActivityDetailService.UpdateModule(this.EditarModulosForms.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    } else {
      this._ActivityDetailService.CreateModule(this.EditarModulosForms.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }

  }
}
