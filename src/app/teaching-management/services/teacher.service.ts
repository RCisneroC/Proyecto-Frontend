import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseSaveTeacher, Teacher } from '../models/Teacher';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { UntypedFormGroup } from '@angular/forms';
import { RequiredDocument } from '../models/RequiredDocument';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  public isTblLoading = true;
  dataChange: BehaviorSubject<Teacher[]> = new BehaviorSubject<
  Teacher[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Teacher;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teacher[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTeachers(): void {
    this.subs.sink = this.httpClient
      .get<Teacher[]>(environment.apiUrlTeacher+'GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
       
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  

  addUpdateTeacher(teacher: Teacher) {

    return this.httpClient.post<ResponseSaveTeacher>(environment.apiUrlTeacher+'Save', teacher);
  }
  
 archivo(data :any):Observable<any> {

    return this.httpClient.post(environment.apiUrlTeacher + 'archivo',data);
  }
  
  aprovedTeacher(data:UntypedFormGroup) {

    return this.httpClient.post(environment.apiUrlTeacher+'Aproved', data);
  }
  getTeacherByCedula(cedula :string) {
 
    return this.httpClient.get<Teacher>(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula='+cedula);
  }
  
  getSubjectsByCedula(data :any) {
 
    return this.httpClient.post(environment.apiUrlEF + 'GetSubjectsBy',data);
  }
  
  getActivitiesByCedula(cedula:string) {
 
    return this.httpClient.get(environment.apiUrlEC + 'GetActivitiesBy?TeacherCedula='+cedula);
  }
  
  getExisteCedula(cedula :string) {
 
    return this.httpClient.get(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula='+cedula).pipe(
      map(() => null), // Email is valid if request succeeds
      catchError((err) => of({ cedulaExists: true, message: err.message })) // Return error object for invalid email
    );
  }
  
  getRequiredDocument() {
 
    return this.httpClient.get<RequiredDocument[]>(environment.apiUrlDocument + 'GetAll');
  }
  

}
