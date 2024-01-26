import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { Subject } from '../Models/Subject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Subject!: Subject;
  dataChange: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Subject;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Subject[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSubject(): void {
    this.subs.sink = this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          console.log(data);
          
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllSubject2(id:any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll?StatusId='+id);
  }

  getAllSubjectNotPendingDegree(id:any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'DegreeCurriculumDesign/GetSubjectsBy?DegreeCurriculumDesignId='+id);
  }
  getAllSubjectPendingDegree(id:any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'DegreeCurriculumDesign/GetPendingSubjectsBy?DegreeCurriculumDesignId='+id);
  }
  getDependencias(id:any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetParentSubjectsBy?SubjectId='+id);
  }

  getOneAsignaturas(id:any) {
    return this.httpClient
      .get<Subject>(environment.apiEF + 'Subject/GetBy?Id='+id);
  }




  getAllSubjectFiltro(id: any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll?StatusId=' + id);
  }

  addSubject(Subject: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Subject/Create', Subject);
  }

  updateSubject(Subject: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'Subject/Update', Subject);
  }

  DeleteSubject(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Subject/Delete', options);
  }

  //asignar asignaturas dependencias.
  SetDependenceSubject(Subject: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Subject/CreateSubjectDependency', Subject);
  }

   DeleteDependenceSubject(Id: any,parentSubjectId:any) {
    let data = {
      subjectId: Id,
      parentSubjectId: parentSubjectId,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Subject/DeleteSubjectDependency', options);
   }
  
  //asignar y eliminar asignaturas
  CreateSubject(Subject: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'DegreeCurriculumDesign/CreateSubject', Subject);
  }
  
  DeleteSubjectDegree(Id: any,subjectId:any) {
    let data = {
      degreeCurriculumDesignId: Id,
      subjectId: subjectId
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'DegreeCurriculumDesign/DeleteSubject', options);
  }
  
  

  init_Subject() {
    this._Subject = {
      statusId:0,
      id:0,
      name:'',
      description:'',
      number:0,
      acronym:'',
      code:'',
      numOfCredits:0,
      numOfHours:0,
      numOfClasses:0,
      hasLaboratory:false,
      evaluationCriteria:'',
    }
  }
}