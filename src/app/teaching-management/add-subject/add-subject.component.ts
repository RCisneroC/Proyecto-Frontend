import { Component, Inject, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Subject, Teacher } from '../models/Teacher';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from '../services/teacher.service';

import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';

export interface DialogData {
  teacher: Teacher;
  accion: string;
}
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent {
  public ResponseMessage: ResponseMessageMaestra = {
  CodError: 0,
  Message:''
}
displayedColumns: string[] = [
  'id',
  'name',
];
action: string;
dialogTitle: string='';
AsignarSubjectForm: UntypedFormGroup;
id_actividad: string = '';  


dataSourceSubject: Subject[] = [];
subjectList = new MatTableDataSource<Subject>(this.dataSourceSubject);
public IsLoading: boolean = true;
 @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {
 
   setTimeout(() => {

     this.subjectList.paginator = value;
     this.IsLoading = false;
   }, 3000);
}

constructor(
  public dialogRef: MatDialogRef<AddSubjectComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public _teacherService:TeacherService,
  public _subjectServiceService:SubjectServiceService,
  private fb: UntypedFormBuilder
) {
  // Set the defaults
  this.action = data.accion;

  if (this.action === 'add-subjects') {
    this.dialogTitle ="Agregar asignaturas";
  }
  this.LoadSubject();
  this.AsignarSubjectForm = this.fb.group({
    teacherId:[data.teacher.teacherId,[Validators.required]],
    subjectList: this.fb.array([]),
    Action:1
  });
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
   this.subjectList.paginator = this.paginator;
} 

   applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.subjectList.filter = filterValue.trim().toLowerCase();
}

LoadSubject() {
  this._teacherService.getAllSubject3().subscribe({
    next: (res: Subject[]) => {

      const interseccion = res.filter(obj1 => !this.data.teacher.listSubject.some(obj2 => obj2.id === obj1.id));
      this.subjectList =new MatTableDataSource<Subject>(interseccion);
    }
  });
}


submit() {
  // AddTeachers
  this._teacherService.addSubjectTeacher(this.AsignarSubjectForm.getRawValue()).subscribe({
    next: (res: any) => {
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Cargado correctamente.';
      this.dialogRef.close(this.ResponseMessage);
    },
    error: (err: any) => {
      this.ResponseMessage.CodError = 500;
      this.ResponseMessage.Message = err;
      this.dialogRef.close(this.ResponseMessage);
    }
  });
}
get checkboxesFormArray(): UntypedFormArray {
 
  
  return this.AsignarSubjectForm.get('subjectList') as UntypedFormArray;
}

  checkboxChange(event: any, checkboxId: any): void {
  if (event.checked) {
    this.checkboxesFormArray.push(this.fb.control(checkboxId.toString()));
  } else {
    const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
    if (index !== -1) {
      this.checkboxesFormArray.removeAt(index);
    }
  }
}
}