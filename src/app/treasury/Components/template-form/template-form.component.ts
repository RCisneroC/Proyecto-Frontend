import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Template } from 'app/treasury/Models/Template';
import { TemplateService } from 'app/treasury/Services/template.service';
export interface DialogData {
  id: string;
  action: string;
  template: Template;
}
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public templateForm: UntypedFormGroup;
  public template: Template = {
    id: 0,
    description: '',
    statusId: 1,
    modifiedBy: '',
    createdBy: ''
  }
  constructor(
    public dialogRef: MatDialogRef<TemplateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public templateService: TemplateService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar plantilla ";
      this.template = data.template;
    } else {
      this.dialogTitle = 'Nueva  plantilla';
    }
    this.templateForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.template.id],
      description: [this.template.description, [Validators.required]],
      statusId: [this.template.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.templateService.updateTemplateMode(this.templateForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this.templateService.addTemplateMode(this.templateForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}

