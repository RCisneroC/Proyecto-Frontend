import { Subject } from './../../../Models/Subject';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  accion: string;
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
    this.action = data.accion;
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
    if (this.data.subject.hasLaboratory) {
      this.data.subject.hasLaboratory = '1';
    } else {
      this.data.subject.hasLaboratory = '2';
    }
    console.log('====================================');
    console.log(this.data.subject.hasLaboratory);
    console.log('====================================');
    return this.fb.group({
      id:[this.data.subject.id],
      name:[this.data.subject.name,[Validators.required]],
      description:[this.data.subject.description],
      acronym:[this.data.subject.acronym,[Validators.required]],
      code:[this.data.subject.code,[Validators.required]],
      numOfCredits:[this.data.subject.numOfCredits,[Validators.required]],
      numOfHours:[this.data.subject.numOfHours,[Validators.required]],
      numOfClasses:[this.data.subject.numOfClasses,[Validators.required]],
      hasLaboratory:[this.data.subject.hasLaboratory,[Validators.required]],
      evaluationCriteria:[this.data.subject.evaluationCriteria],
      statusId:[this.data.subject.statusId],

    });
  }
  ngOnInit(): void {
      
  }
  submit() {
   
  }
  confirmAdd() {
    if (this._SubjectModalForms.controls['hasLaboratory'].value == "1") {
      this._SubjectModalForms.controls['hasLaboratory'].setValue(true);
    } else {
      this._SubjectModalForms.controls['hasLaboratory'].setValue(false);
    }
    if (this.action == 'add-asignaturas') {
      let valor = this._SubjectModalForms.controls['code'].value;
      this._SubjectModalForms.controls['code'].setValue(valor.toString())
      this._SubjectService.addSubject(this._SubjectModalForms.getRawValue())
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
       this._SubjectService.updateSubject(this._SubjectModalForms.getRawValue())
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
    console.log('====================================');
    console.log(this._SubjectModalForms.getRawValue());
    console.log('====================================');
  }
  onNoClick(){

  }
}
