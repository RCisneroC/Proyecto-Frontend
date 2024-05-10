import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Category } from 'app/exchange/models/Category';
import { Foro } from 'app/exchange/models/Foro';
import { ForoService } from 'app/exchange/services/foro.service';

export interface DialogData {
  categoria: Category[];
  accion: string;
  foro: Foro
}

@Component({
  selector: 'app-forms-foro-create',
  templateUrl: './forms-foro-create.component.html',
  styleUrls: ['./forms-foro-create.component.scss']
})
export class FormsForoCreateComponent {
  action: string;
  dialogTitle: string = '';
  public Editor: any = ClassicEditor;
  FormsForo!: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }
  constructor(
    public dialogRef: MatDialogRef<FormsForoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _JobServiceService: ForoService,
    public _Auth: AuthService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-foro') {
      this.dialogTitle = "Crear Nuevo Foro";
    }
    this.FormsForo = this.fb.group({
      title: [data.foro.title, [Validators.required]],
      description: [data.foro.description, [Validators.required]],
      categoriesId: [data.foro.categoriesId, [Validators.required]],
      startDayForo: [new Date(), [Validators.required]],
      endDayForo: [new Date(), [Validators.required]],
      createdBy: [_Auth.currentUserValue.id, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {
    console.log('====================================');
    console.log(this.FormsForo.getRawValue());
    console.log('====================================');
    // return;
    if (this.action === 'add-foro') {
      this._JobServiceService.AddForo(this.FormsForo.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    } else if (this.action === 'edit-foro') {
      this._JobServiceService.AddForo(this.FormsForo.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    }


  }

  onNoClick() {
    this.dialogRef.close();
  }
}

