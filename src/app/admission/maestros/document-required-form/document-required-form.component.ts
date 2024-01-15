import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Requirement } from 'app/admission/models/Requeriminet';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { RequirementService } from '../services/requirement.service';

export interface DialogData {
  id: string;
  action: string;
  requirement : Requirement;
}
@Component({
  selector: 'app-document-required-form',
  templateUrl: './document-required-form.component.html',
  styleUrls: ['./document-required-form.component.scss']
})
export class DocumentRequiredFormComponent {
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public requirementForm: UntypedFormGroup;
  public requirement: Requirement = {
    id: 0,
    description: '',
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<DocumentRequiredFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public requirementService: RequirementService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Documento Requerido";
      this.requirement = data.requirement;
    } else {
      this.dialogTitle = 'Nuevo Documento Requerido';
    }
    this.requirementForm = this.createContactForm();
  }


    createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.requirement.id],
      name: [this.requirement.name, [Validators.required]],
      description: [this.requirement.description],
      statusId: [this.requirement.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    public confirmAdd(): void {
    if  (this.action==='edit'){
      this.requirementService.updateRequirement(this.requirementForm.getRawValue())
        .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
      });
          
    } else {
      this.requirementService.addRequirement(this.requirementForm.getRawValue())
      .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
      });
    }
  }
}
