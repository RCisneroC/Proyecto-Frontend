import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id_curriculum: string;
  action: string;
}
@Component({
  selector: 'app-upload-activity-all',
  templateUrl: './upload-activity-all.component.html',
  styleUrls: ['./upload-activity-all.component.scss']
})
export class UploadActivityAllComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PosterForm: UntypedFormGroup;
  id_plan_anual: string = '';

  constructor(
    public dialogRef: MatDialogRef<UploadActivityAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    console.log(data);
    if (this.action === 'upload') {
      this.dialogTitle = "Cargar Actividades";
      this.id_plan_anual = data.id_curriculum;
    }
    this.PosterForm = this.fb.group({
      Activities: ['', [Validators.required]],
      CurriculumDesignId: [data.id_curriculum, [Validators.required]]
    });
  }

  submit() {
    var formdata = new FormData();
    formdata.append('Activities', this.PosterForm.controls['Activities'].value);
    formdata.append('CurriculumDesignId', this.PosterForm.controls['CurriculumDesignId'].value);
    this._ActivityService.AddFileActivity(formdata).subscribe({
      next: (res: ResponseGenerica) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });

  }


}
