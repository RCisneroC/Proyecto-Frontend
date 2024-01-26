import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequirementAdmision } from 'app/admission/FormalEducations/Models/RequirementAdmision';
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
    private _RequirementService: RequirementService
  ) {
    console.log(data);
    // this._SubjectModal = _SubjectService._Subject;
    this.action = data.action;
    // if (this.action === 'add-asignaturas') {
      this.dialogTitle = "Nuevo Requerimiento de Admisión";
    //   this._SubjectModal = data.subject;
    // } else {
    //   this.dialogTitle = "Editar Asignatura";
    //   this._SubjectModal = data.subject;
    // }
    // this.locationActivityForm = this.createContactForm();
  }
  ngOnInit(): void {
      
  }
}
