import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequiredDocument } from '../models/RequiredDocument';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from '../services/teacher.service';

export interface DialogData {
  id: string;
  action: string;
  requiredDocument: RequiredDocument;
}
@Component({
  selector: 'app-required-document-form',
  templateUrl: './required-document-form.component.html',
  styleUrls: ['./required-document-form.component.scss']
})
export class RequiredDocumentFormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  requiredDocumentForm!: UntypedFormGroup;
  requiredDocument: RequiredDocument;

  processList = [
    { id: "", name: '' },
    { id: "1", name: 'Formación especializada' },
    { id: "2", name: 'Entrenamiento' },
    { id: "3", name: 'Ambos' }
  ];
  constructor(
    public dialogRef: MatDialogRef<RequiredDocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teacherService: TeacherService,
    private fb: UntypedFormBuilder,
    private cb: ChangeDetectorRef
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar documento";
      this.requiredDocument = data.requiredDocument;
    } else {
      this.dialogTitle = 'Crear documento';
      this.requiredDocument = new RequiredDocument();
    }

  }
  ngOnInit(): void {
    this.requiredDocumentForm = this.createContactForm();
    console.log("-----")
    console.log(this.requiredDocument)
   // this.requiredDocumentForm.controls[""].patchValue();
    this.cb.detectChanges();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      documentId: [this.requiredDocument.documentId],
      name: [this.requiredDocument.name, [Validators.required]],
      description: [this.requiredDocument.description, [Validators.required]],
      /*point: [this.requiredDocument.point, [Validators.required]],
      isRecord:[this.requiredDocument.isRecord, [Validators.required]],*/
      statusId: [this.requiredDocument.statusId, [Validators.required]],
      typeEducationId: [this.requiredDocument.typeEducationId.toString(), [Validators.required]],
      createdBy: [''],
    });
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
      this.teacherService.updateRequiredDocument(this.requiredDocumentForm.getRawValue())
        .subscribe({
          next: () => {

           this.dialogRef.close(1);
          },
          error: () => {

            this.dialogRef.close(0);
          }
      });


  }

}
