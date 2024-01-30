import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequirementAdmision } from 'app/admission/FormalEducations/Models/RequirementAdmision';
import { AdmisionRequirimentService } from 'app/admission/FormalEducations/Services/admision-requiriment.service';
import { RequirementService } from 'app/admission/maestros/services/requirement.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  requirementAdmision : RequirementAdmision;
}
@Component({
  selector: 'app-forms-requirement-degree',
  templateUrl: './forms-requirement-degree.component.html',
  styleUrls: ['./forms-requirement-degree.component.scss']
})
export class FormsRequirementDegreeComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _RequirementAdmisionModalForms!: UntypedFormGroup;
  public _RequirementAdmisionModal!: RequirementAdmision;
  constructor(
    public dialogRef: MatDialogRef<FormsRequirementDegreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _RequirementService: AdmisionRequirimentService
  ) {
    console.log(data);
    this.action = data.action;
   if (this.action === 'add') {
      this.dialogTitle = "Nuevo Requerimiento de Admisión";
     this._RequirementAdmisionModal = data.requirementAdmision;
   } else {
     this.dialogTitle = "Editar Requerimiento de Admisión";
     this._RequirementAdmisionModal = data.requirementAdmision;
   }
   this._RequirementAdmisionModalForms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._RequirementAdmisionModal.id],
      name: [this._RequirementAdmisionModal.name, [Validators.required]],
      description: [this._RequirementAdmisionModal.description],
      statusId: [this._RequirementAdmisionModal.statusId, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {
    
  }

  confirmAdd(){
    if (this.action == 'add') {
      this._RequirementService.addRequirementAdmision(this._RequirementAdmisionModalForms.getRawValue())
        .subscribe({
          next:(res)=>{
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
             this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
       this._RequirementService.updateRequirementAdmision(this._RequirementAdmisionModalForms.getRawValue())
        .subscribe({
          next:(res)=>{
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
             this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick(){
this.dialogRef.close();
  }
}
