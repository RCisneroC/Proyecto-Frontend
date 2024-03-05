import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id_carrera: string;
  accion: string;
}
@Component({
  selector: 'app-add-poster',
  templateUrl: './add-poster.component.html',
  styleUrls: ['./add-poster.component.scss']
})
export class AddPosterComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PosterForm: UntypedFormGroup;
  id_carrera: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddPosterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Agregar Afiche";
      this.id_carrera = data.id_carrera;
    }
    this.PosterForm = this.fb.group({
      Poster: ['', [Validators.required]],
      PosterType: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      id_carrera: [data.id_carrera, [Validators.required]]
    });
  }
  ngOnInit(): void {

  }

  submit() {
    var _Form_Data = new FormData();

    _Form_Data.append('DegreeId', this.PosterForm.get('id_carrera')?.value);
    _Form_Data.append('Comment', this.PosterForm.get('Comment')?.value);
    _Form_Data.append('Poster', this.PosterForm.get('Poster')?.value);
    _Form_Data.append('PosterType', this.PosterForm.get('PosterType')?.value);
    this._DegreeService.SavePoster(_Form_Data).subscribe({
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
