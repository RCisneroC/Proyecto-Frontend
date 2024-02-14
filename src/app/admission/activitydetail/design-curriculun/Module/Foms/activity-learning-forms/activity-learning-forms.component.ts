import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivityDetailModules } from 'app/admission/models/ActivityDetailModules';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  module: ActivityDetailModules;
  accion: string;
  id_actividad: string;
  id_plan: number;
};

@Component({
  selector: 'app-activity-learning-forms',
  templateUrl: './activity-learning-forms.component.html',
  styleUrls: ['./activity-learning-forms.component.scss']
})
export class ActivityLearningFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string = '';
  dialogTitle: string = '';
  EditModuleForms!: UntypedFormGroup;
  id_actividad: string = '';
  public Editor: any = ClassicEditor;

  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }
  @ViewChild('stepper') stepper: MatStepper | undefined;
  constructor(
    public dialogRef: MatDialogRef<ActivityLearningFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityDetailService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {

    console.log(data);
    this.dialogTitle = 'Editar Modulo';
    this.EditModuleForms = this.fb.group({
      statusId: [data.module.statusId, Validators.required],
      id: [data.module.id, Validators.required],
      activityStudyPlanId: [data.id_plan, Validators.required],
      name: [data.module.name, Validators.required],
      description: [data.module.description, Validators.required],
      synchronousHours: [data.module.synchronousHours, Validators.required],
      asynchronousHours: [data.module.asynchronousHours, Validators.required],
      inPersonHours: [data.module.inPersonHours, Validators.required],
      totalHours: [data.module.totalHours, Validators.required],
      percentageValue: [data.module.percentageValue, Validators.required],
      learningStrategies: [data.module.learningStrategies, Validators.required],
      learningGoals: [data.module.learningGoals, Validators.required],
      competencies: [data.module.competencies, Validators.required],
      subTopics: [data.module.subTopics, Validators.required],
      methodologicalStrategy: [data.module.methodologicalStrategy, Validators.required],
      bibliographicCitation: [data.module.bibliographicCitation, Validators.required],
      evaluation: [data.module.evaluation, Validators.required],
      teachingResources: [data.module.teachingResources, Validators.required],
    });
  }

  ngOnInit(): void {

  }
  submit() {

    this._ActivityDetailService.UpdateModule(this.EditModuleForms.getRawValue()).subscribe({
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
