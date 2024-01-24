import { Subject } from './../../../Models/Subject';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  subject : Subject;
}
@Component({
  selector: 'app-forms-subject',
  templateUrl: './forms-subject.component.html',
  styleUrls: ['./forms-subject.component.scss']
})
export class FormsSubjectComponent  implements OnInit{
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public _SubjectModalForms!: UntypedFormGroup;
  public _SubjectModal!: Subject;
  constructor(
    public dialogRef: MatDialogRef<FormsSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _SubjectService:SubjectServiceService
  ) {
    console.log(data);
    
    _SubjectService.init_Subject()
    this._SubjectModal = _SubjectService._Subject;
    this.action = data.action;
    console.log(this.action);
    
    if (this.action == 'add-asignaturas') {
        this.dialogTitle ="Nueva Asignatura";
        this._SubjectModal = data.subject;
    } else {
      this.dialogTitle ="Editar Asignatura";
        this._SubjectModal = data.subject;
    }
    this._SubjectModalForms = this.createContactForm();
  }
    createContactForm(): UntypedFormGroup{
    return this.fb.group({
      name:['',[Validators.required]],
      description:[''],
      acronym:['',[Validators.required]],
      code:['',[Validators.required]],
      numOfCredits:['',[Validators.required]],
      numOfHours:['',[Validators.required]],
      numOfClasses:['',[Validators.required]],
      hasLaboratory:[false,[Validators.required]],
      evaluationCriteria:[''],

    });
  }
  ngOnInit(): void {
      
  }
  submit() {
    
  }
  confirmAdd(){

  }
  onNoClick(){

  }
}
