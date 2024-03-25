import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityStudyPlanModuleLearningActivity } from 'app/admission/models/ActivityDetailModules';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ResponseMessageMaestra } from '../../../../../models/ResponseMessage';
import Swal from 'sweetalert2';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
import { TaskActivityData } from 'app/intranet-academic-registration/Models/ResponseListTaskActivity';
import * as moment from 'moment';
export interface DialogData {
  id_actividad: string;
  accion: string;
  ActivityLearning: ActivityStudyPlanModuleLearningActivity,
  id_modulo: string;
  dataActivity: TaskActivityData;
}
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
    this.trainingForm = this.fb.group({
      id_learning: [data.dataActivity.learningActivityId],
      id: [data.dataActivity.id],
      Title: [data.dataActivity.title, [Validators.required]],
      FinalDate: [data.dataActivity.finalDate, [Validators.required]],
      TaskTypeId: [data.dataActivity.taskTypeId, [Validators.required]],
      Description: [data.dataActivity.description, [Validators.required]],
      MoodleSectionId: [data.dataActivity.moodleSectionId, [Validators.required]],
      Observation: [data.dataActivity.observation, [Validators.required]],
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
      "id": this.trainingForm.controls['id_learning'].value,
      "activityStudyPlanModuleId": this.data.id_modulo,
      "name": this.trainingForm.controls['Title'].value,
      "description": this.trainingForm.controls['Description'].value
    }
    if (this.action === 'edit-criterio') {

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
            "finalDate": moment(this.trainingForm.controls['FinalDate'].value).format("YYYY-MM-DD"),
            "taskTypeId": this.trainingForm.controls['TaskTypeId'].value,
            "learningActivityId": this.trainingForm.controls['id_learning'].value,
            "observation": this.trainingForm.controls['Observation'].value,
            "activityId": this.data.id_actividad,
            "id": this.trainingForm.controls['id'].value,
            "title": this.trainingForm.controls['Title'].value,
            "description": this.trainingForm.controls['Description'].value
          }

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
          formData.append('FinalDate', moment(this.trainingForm.controls['FinalDate'].value).format("YYYY-MM-DD"));
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
