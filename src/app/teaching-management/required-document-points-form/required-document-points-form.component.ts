import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RequiredDocument} from "../models/RequiredDocument";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../services/teacher.service";
import {DialogData} from "../required-document-form/required-document-form.component";

@Component({
  selector: 'app-required-document-points-form',
  templateUrl: './required-document-points-form.component.html',
  styleUrls: ['./required-document-points-form.component.scss']
})
export class RequiredDocumentPointsFormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  requiredDocumentForm!: UntypedFormGroup;
  requiredDocument: RequiredDocument;

  processList = [
    { id: "", name: '' },
    { id: "1", name: 'Entrenamiento' },
    { id: "2", name: 'Formación especializada' },
    { id: "3", name: 'Ambos' }
  ];
  constructor(
    public dialogRef: MatDialogRef<RequiredDocumentPointsFormComponent>,
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
      point: [this.requiredDocument.point, [Validators.required]],
      isRecord:[this.requiredDocument.isRecord, [Validators.required]],
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
    this.requiredDocumentForm.controls['isRecord'].setValue(this.requiredDocumentForm.getRawValue().isRecord == 'true')
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

