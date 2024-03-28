import { Component, Inject } from '@angular/core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DomSanitizer } from '@angular/platform-browser';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Calls } from '../models/CallsModel';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface DialogData {
  id: number;
  action: string;
  calls: Calls;
}

@Component({
  selector: 'app-calls-new',
  templateUrl: './calls-new.component.html',
  styleUrls: ['./calls-new.component.scss']
})
export class CallsNewComponent {
  form!: UntypedFormGroup;

  public Editor: any = ClassicEditor;

  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }


  constructor(
    public dialogRef: MatDialogRef<CallsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ){
    this.form = this.createForm();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
    titulo: ['',Validators.required],
    proceso: ['',Validators.required],
    fechaInicio:['',Validators.required],
    fechaFin: ['',Validators.required],
    descripcion: ['',Validators.required],
    funciones: ['',Validators.required],
    requisitos: ['',Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }


  save(): void {

  }


  public SafeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }

}
