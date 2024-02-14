import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-poster-requeridos',
  templateUrl: './poster-requeridos.component.html',
  styleUrls: ['./poster-requeridos.component.scss']
})
export class PosterRequeridosComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PosterForm: UntypedFormGroup;
  id_actividad: string = '';
  ListadoDocumentos: any;
  constructor(
    public dialogRef: MatDialogRef<PosterRequeridosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add-poster') {
      this.dialogTitle = "Agregar Afiche";
      this.id_actividad = data.id_actividad;
    }
    this.PosterForm = this.fb.group({
      Poster: ['', [Validators.required]],
      PosterType: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      ActivityId: [data.id_actividad, [Validators.required]]
    });
  }

  submit() {
    console.log(this.PosterForm.getRawValue());
    var _Form_Data = new FormData();
    _Form_Data.append('ActivityId', this.PosterForm.get('ActivityId')?.value);
    _Form_Data.append('Comment', this.PosterForm.get('Comment')?.value);
    _Form_Data.append('Poster', this.PosterForm.get('Poster')?.value);
    _Form_Data.append('PosterType', this.PosterForm.get('PosterType')?.value);
    this._ActivityService.SavePoster(_Form_Data).subscribe({
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
    })
  }
}
