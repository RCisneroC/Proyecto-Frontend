import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskSubject } from '../../../../Models/TaskSubject';
import { Subject } from '../../../../../admission/FormalEducations/Models/Subject';
import { ApiResponseInternal } from 'app/intranet-academic-registration/Models/TypeTask';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

export interface DialogData {
  task: TaskSubject;
  action: string,
  subject: Subject,
  TypeTask: ApiResponseInternal;
}
@Component({
  selector: 'app-create-task-subject',
  templateUrl: './create-task-subject.component.html',
  styleUrls: ['./create-task-subject.component.scss']
})
export class CreateTaskSubjectComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  public _File: File[] = [];
  action: string;
  dialogTitle: string = '';
  trainingForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: SubjectListService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === 'add') {
      this.dialogTitle = "Agregar Nueva Tarea";
    } else {
      console.log(data);

      this.dialogTitle = "Editar Tarea";
    }
    this.trainingForm = this.fb.group({
      id: [data.task.id],
      Title: [data.task.title, [Validators.required]],
      FinalDate: [data.task.finalDate, [Validators.required]],
      TaskTypeId: [data.task.taskTypeId, [Validators.required]],
      Description: [data.task.description, [Validators.required]],
      SubjectId: [data.subject.id, [Validators.required]],
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
      formData.append('SubjectId', this.trainingForm.controls['SubjectId'].value);
      formData.append('Observation', this.trainingForm.controls['Observation'].value);
      this._File.forEach((file) => {
        formData.append('Content', file);
      });
      console.log('====================================');
      console.log(formData);
      console.log('====================================');
      this._ActivityService.SaveTask(formData).subscribe({
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

      this._ActivityService.UpdateTask(this.trainingForm.getRawValue()).subscribe({
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