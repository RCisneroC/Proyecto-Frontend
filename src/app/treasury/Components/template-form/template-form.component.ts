import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
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
    logo:'',
    modifiedBy: '',
    createdBy: ''
  }
  constructor(
    public dialogRef: MatDialogRef<TemplateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public templateService: TemplateService,
    private authService: AuthService,
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
      createdBy:this.authService.currentUserValue.id,
      modifiedBy:this.authService.currentUserValue.id
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const formData = new FormData();
    formData.append('Id', this.templateForm.controls['id'].value);
    formData.append('Description', this.templateForm.controls['description'].value);
    formData.append('CreatedBy', this.templateForm.controls['createdBy'].value);
    formData.append('ModifiedBy', this.templateForm.controls['modifiedBy'].value);
    formData.append('Logo','');
    formData.append('StatusId', this.templateForm.controls['statusId'].value);
    
  
    if (this.action === 'edit') {
      this.templateService.updateTemplateMode(formData)
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 400;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this.templateService.addTemplateMode(formData)
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 400;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}

