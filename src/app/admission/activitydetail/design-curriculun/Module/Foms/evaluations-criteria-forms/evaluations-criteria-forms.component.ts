import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityStudyPlanModuleLearningActivity } from 'app/admission/models/ActivityDetailModules';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ResponseMessageMaestra } from '../../../../../models/ResponseMessage';
import Swal from 'sweetalert2';
export interface DialogData {
  id_actividad: string;
  accion: string;
  ActivityLearning: ActivityStudyPlanModuleLearningActivity,
  id_modulo: string;
};
@Component({
  selector: 'app-evaluations-criteria-forms',
  templateUrl: './evaluations-criteria-forms.component.html',
  styleUrls: ['./evaluations-criteria-forms.component.scss']
})
export class EvaluationsCriteriaFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  public _File: File[] = [];
  dialogTitle: string = '';
  NewCriterioForms: UntypedFormGroup;
  trainingForm: UntypedFormGroup;
  id_actividad: string = '';
  constructor(
    public dialogRef: MatDialogRef<EvaluationsCriteriaFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _ActivityDetailService: ActivityDetailService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add-criterio') {
      this.dialogTitle = "Agregar Criterio de Evaluación";
      this.id_actividad = data.id_actividad;
    } else {
      this.dialogTitle = "Editar Criterio de Evaluación";
      this.id_actividad = data.id_actividad;
    }
    this.NewCriterioForms = this.fb.group({
      statusId: [data.ActivityLearning.statusId],
      id: [data.ActivityLearning.id],
      name: [data.ActivityLearning.name, [Validators.required]],
      description: [data.ActivityLearning.description, [Validators.required]],
      activityStudyPlanModuleId: [data.id_modulo, [Validators.required]]
    });
    
    this.trainingForm = this.fb.group({
      id: [data.ActivityLearning.IdTask],
      Title: [data.ActivityLearning.Title, [Validators.required]],
      FinalDate: [data.ActivityLearning.FinalDate, [Validators.required]],
      TaskTypeId: [data.ActivityLearning.TaskTypeId, [Validators.required]],
      Description: [data.ActivityLearning.DescriptionTask, [Validators.required]],
      Observation: [data.ActivityLearning.Observation, [Validators.required]],
      Content: [[]]
    });
    
  }
  ngOnInit(): void {

  }

  onChangeFile(event: any) {
    const files: FileList = event.target.files;


    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      this._File.push(file);
    }
    Swal.fire({
      title: "Escuela Judicial",
      text: 'Archivos Cargados, Guardar la tarea para confirmar.',
      icon: "success"
    });
  }
  submit() {
    if (this.action === 'edit-criterio') {
      this._ActivityDetailService.UpdateLearningActivity(this.NewCriterioForms.getRawValue()).subscribe({
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
      this._ActivityDetailService.CreateLearningActivity(this.NewCriterioForms.getRawValue()).subscribe({
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
