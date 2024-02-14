import { Component, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskActivity } from 'app/intranet-academic-registration/Models/TaskSubject';
import { ApiResponseInternal } from 'app/intranet-academic-registration/Models/TypeTask';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
import Swal from 'sweetalert2';
export interface DialogData {
  task: TaskActivity;
  action: string,
  activity: GetOneActivity,
  TypeTask: ApiResponseInternal;
}
@Component({
  selector: 'app-forms-create-task',
  templateUrl: './forms-create-task.component.html',
  styleUrls: ['./forms-create-task.component.scss']
})
export class FormsCreateTaskComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  public _File: File[] = [];
  action: string;
  dialogTitle: string = '';
  trainingForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<FormsCreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityListService: ActivityListService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === 'add') {
      this.dialogTitle = "Agregar Nueva Tarea";
    } else {

      this.dialogTitle = "Editar Tarea";
    }
    this.trainingForm = this.fb.group({
      id: [data.task.id],
      Title: [data.task.title, [Validators.required]],
      FinalDate: [data.task.finalDate, [Validators.required]],
      TaskTypeId: [data.task.taskTypeId, [Validators.required]],
      Description: [data.task.description, [Validators.required]],
      ActivityId: [data.activity.id, [Validators.required]],
      Observation: [data.task.observation, [Validators.required]],
      Content: [[]]
    });
  }
  confirmAdd() {

    if (this.data.action == 'add') {
      let formData = new FormData();
      formData.append('Title', this.trainingForm.controls['Title'].value);
      formData.append('FinalDate', this.trainingForm.controls['FinalDate'].value);
      formData.append('TaskTypeId', this.trainingForm.controls['TaskTypeId'].value);
      formData.append('Description', this.trainingForm.controls['Description'].value);
      formData.append('ActivityId', this.trainingForm.controls['ActivityId'].value);
      formData.append('Observation', this.trainingForm.controls['Observation'].value);
      this._File.forEach((file) => {
        formData.append('Content', file);
      });
      console.log('====================================');
      console.log(formData);
      console.log('====================================');
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
    } else {

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
  }
  submit() {
    console.log(this.trainingForm.getRawValue());
  }
  onChangeFile(event: any) {
    let files: FileList = event.target.files;

    console.log(files);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log(file);
      this._File.push(file);
    }
    Swal.fire({
      title: "Escuela Judicial",
      text: 'Archivos Cargados, Guardar la tarea para confirmar.',
      icon: "success"
    });
  }
}
