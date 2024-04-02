import { Component, Inject, OnDestroy } from '@angular/core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DomSanitizer } from '@angular/platform-browser';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Calls } from '../models/CallsModel';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

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
export class CallsNewComponent implements OnDestroy {
  form!: UntypedFormGroup;
  subscriptions: Subscription[] = [];
  public Editor: any = ClassicEditor;
  public IsLoading: boolean = false;
  public resp: ResponseMessageMaestra | undefined = { CodError:0,Message:""};

  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }

  constructor(
    public dialogRef: MatDialogRef<CallsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    private serviceCallsTeachers: CallsTeachersService
  ) {
    this.form = this.createForm();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      proceso: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
      funciones: ['', Validators.required],
      requisitos: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  save(): void {
    const data = {
      titulo: this.form.controls["titulo"].value,
      funciones: this.form.controls["funciones"].value,
      requisitos: this.form.controls["requisitos"].value,
      descripcion: this.form.controls["descripcion"].value,
      fechaInicio: this.form.controls["fechaInicio"].value,
      fechaFin: this.form.controls["fechaFin"].value,
      proceso: parseInt(this.form.controls["proceso"].value),
      actions: "",
      statusId: 3
    };
    this.IsLoading = true;
    this.subscriptions.push(
      this.serviceCallsTeachers.saveOrUpdate(data).subscribe(
        {
          next: (request: any) => {
            console.log(request)
            this.IsLoading = false;
            this.resp!.CodError = 200;
            this.resp!.Message = "Convocatoria creada con éxito.";
            this.dialogRef.close(this.resp);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.resp!.CodError = 404;
            this.resp!.Message = "No se pudo crear la convocatoria.";
            this.dialogRef.close(this.resp);
            this.IsLoading = false;
          }
        }
      )
    );
  }

  public SafeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }

}
