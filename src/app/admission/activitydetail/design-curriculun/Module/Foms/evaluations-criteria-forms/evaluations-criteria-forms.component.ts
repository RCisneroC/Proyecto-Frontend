import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityStudyPlanModuleLearningActivity } from 'app/admission/models/ActivityDetailModules';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ResponseMessageMaestra } from '../../../../../models/ResponseMessage';
import Swal from 'sweetalert2';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
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
    public _ActivityDetailService: ActivityDetailService,
    public _SubjectService: SubjectListService,
    public _ActivityListService: ActivityListService
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
      id_learning: [data.ActivityLearning.IdTask],
      id_task: [data.ActivityLearning.IdTask],
      Title: [data.ActivityLearning.Title, [Validators.required]],
      FinalDate: [data.ActivityLearning.FinalDate, [Validators.required]],
      TaskTypeId: [data.ActivityLearning.TaskTypeId, [Validators.required]],
      Description: [data.ActivityLearning.DescriptionTask, [Validators.required]],
      MoodleSectionId: [data.ActivityLearning.MoodleSectionId, [Validators.required]],
      Observation: [data.ActivityLearning.Observation, [Validators.required]],
      statusId: [data.ActivityLearning.statusId, [Validators.required]],
      Content: [[]]
    });

  }
  ngOnInit(): void {
    this.getTypeTask();
  }
  getTypeTask() {
    this._SubjectService.getTypeTask().subscribe({
      next: (res) => {
        console.log(res);

        this._SubjectService._ApiResponseInternal = res;

      }
    })
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
    let learning = 0;
    let data = {
      "statusId": this.trainingForm.controls['statusId'].value,
      "id": 0,
      "activityStudyPlanModuleId": this.data.id_modulo,
      "name": this.trainingForm.controls['Title'].value,
      "description": this.trainingForm.controls['Description'].value
    }
    if (this.action === 'edit-criterio') {
      console.log(data);
      return;
      this._ActivityDetailService.UpdateLearningActivity(data).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }, complete: () => {
          let dataTask = {
            "finalDate": this.trainingForm.controls['FinalDate'].value,
            "taskTypeId": this.trainingForm.controls['TaskTypeId'].value,
            "learningActivityId": this.trainingForm.controls['id_learning'].value,
            "observation": this.trainingForm.controls['Observation'].value,
            "activityId": this.data.id_actividad,
            "id": this.trainingForm.controls['id_task'].value,
            "title": this.trainingForm.controls['Title'].value,
            "description": this.trainingForm.controls['Description'].value
          }
          console.log('====================================');
          console.log(dataTask);
          console.log('====================================');
          return;
          this._ActivityListService.UpdateTask(this.trainingForm.getRawValue()).subscribe({
            next: (res) => {
              if (res.success) {
                this.ResponseMessage.CodError = res.statusCode;
                this.ResponseMessage.Message = 'Tarea Actualizada correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              } else {
                this.ResponseMessage.CodError = res.statusCode;
                this.ResponseMessage.Message = 'Faltarón datos requeridos.';
                this.dialogRef.close(this.ResponseMessage);
              }
            }, error: (res) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'Intente nuevamente';
              this.dialogRef.close(this.ResponseMessage);
            }
          })

        }
      });
    } else {
      console.log("Guardar evaluación");
      console.log(data);
      this._ActivityDetailService.CreateLearningActivity(data).subscribe({
        next: (res: any) => {
          learning = res.id;
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
          let formData = new FormData();
          formData.append('Title', this.trainingForm.controls['Title'].value);
          formData.append('FinalDate', this.trainingForm.controls['FinalDate'].value);
          formData.append('TaskTypeId', this.trainingForm.controls['TaskTypeId'].value);
          formData.append('Description', this.trainingForm.controls['Description'].value);
          formData.append('ActivityId', this.data.id_actividad.toString());
          formData.append('Observation', this.trainingForm.controls['Observation'].value);
          formData.append('LearningActivityId', learning.toString());
          formData.append('MoodleSectionId', this.trainingForm.controls['MoodleSectionId'].value);
          this._File.forEach((file) => {
            formData.append('Content', file);
          });
          console.log("Guardar tarea actividad");
          this._ActivityListService.SaveTask(formData).subscribe({
            next: (res) => {
              if (res.success) {
                this.ResponseMessage.CodError = res.statusCode;
                this.ResponseMessage.Message = 'Tarea Creada correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              } else {
                this.ResponseMessage.CodError = res.statusCode;
                this.ResponseMessage.Message = 'Faltarón datos requeridos.';
                this.dialogRef.close(this.ResponseMessage);
              }
            }, error: (res) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = 'Intente nuevamente';
              this.dialogRef.close(this.ResponseMessage);
            }
          })

        }
      });
    }

  }
}
