import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudyMode } from 'app/admission/FormalEducations/Models/StudyMode';
import { StudyModeService } from 'app/admission/FormalEducations/Services/study-mode.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  studyMode: StudyMode;
}
@Component({
  selector: 'app-forms-study-mode',
  templateUrl: './forms-study-mode.component.html',
  styleUrls: ['./forms-study-mode.component.scss']
})
export class FormsStudyModeComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _StudyModeModalForms!: UntypedFormGroup;
  public _StudyModeModal!: StudyMode;
  constructor(
    public dialogRef: MatDialogRef<FormsStudyModeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _StudyModeService: StudyModeService
  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Modo de Estudio";
      this._StudyModeModal = data.studyMode;
    } else {
      this.dialogTitle = "Editar Modo de Estudio";
      this._StudyModeModal = data.studyMode;
    }
    this._StudyModeModalForms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._StudyModeModal.id],
      name: [this._StudyModeModal.name, [Validators.required]],
      description: [this._StudyModeModal.description],
      statusId: [this._StudyModeModal.statusId, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      this._StudyModeService.addStudyMode(this._StudyModeModalForms.getRawValue())
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
      this._StudyModeService.updateStudyMode(this._StudyModeModalForms.getRawValue())
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