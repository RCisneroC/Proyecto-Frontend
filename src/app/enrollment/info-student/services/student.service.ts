import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Student } from '../models/Student';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { UntypedFormGroup } from '@angular/forms';
import { RequiredDocument } from '../models/RequiredDocument';
import { User } from '@core';
import { AcademicRecord, Asist } from '../models/Asistencias';
import { ResponseModifyStudent } from 'app/admission/models/InscripcionEFResponse';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  public isTblLoading = true;
  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<
    Student[]
  >([]);

  dataChange2: BehaviorSubject<RequiredDocument[]> = new BehaviorSubject<
    RequiredDocument[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Student;
  dialogData2!: RequiredDocument;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Student[] {
    return this.dataChange.value;
  }

  get data2(): RequiredDocument[] {
    return this.dataChange2.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getDialogData2() {
    return this.dialogData2;
  }
  /** CRUD METHODS */
  getAllTeachers(): void {
    this.subs.sink = this.httpClient
      .get<Student[]>(environment.apiUrlTeacher + 'GetAll')
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


  getAllRequiredDocument() {
    this.subs.sink = this.httpClient
      .get<RequiredDocument[]>(environment.apiUrlDocument + 'GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange2.next(data);

        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }


  searchSubjectTask(filter: any) {
    return this.httpClient.post(environment.apiIntranet + "SearchSubjectTask", filter);
  }







  updateRequiredDocument(requiredDocument: RequiredDocument) {
    return this.httpClient.post(environment.apiUrlDocument + 'Save', requiredDocument);

  }



  archivo(data: any): Observable<any> {

    return this.httpClient.post(environment.apiUrlTeacher + 'archivo', data);
  }

  aprovedTeacher(data: UntypedFormGroup) {

    return this.httpClient.post<Student>(environment.apiUrlTeacher + 'Aproved', data);
  }
  getTeacherByCedula(cedula: string) {
    return this.httpClient.get<Student>(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula=' + cedula);
  }

  getSubjectsByCedula(data: any) {

    return this.httpClient.post(environment.apiUrlEF + 'GetSubjectsBy', data);
  }
  getSubjectsByCedulaNewApi(cedula: any) {

    return this.httpClient.get(environment.apiEF + 'Period/GetPeriodSubjectRoomTeachersBy?TeacherCedula=' + cedula);
  }

  getActivitiesByCedula(cedula: string) {

    return this.httpClient.get(environment.apiUrlEC + 'GetActivitiesBy?TeacherCedula=' + cedula);
  }



  getExisteCedula(cedula: string) {

    return this.httpClient.get<Student>(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula=' + cedula).pipe(
      map(resp => {
        return (resp.studentId > 0) ? { cedulaExists: true } : null
      })
    );
  }

  getRequiredDocument() {

    return this.httpClient.get<RequiredDocument[]>(environment.apiUrlDocument + 'GetAll');
  }

  getStudents(rolname: string) {

    return this.httpClient.get<User[]>(environment.apiUrl + '/GetUsersBy?RoleName=' + rolname);
  }

  getStudentSubject(SubjectId: number): Observable<any> {
    return this.httpClient.get(environment.apiEC + "EJMatricula/GetDegreeSubject?SubjectId=" + SubjectId);
  }

  getStudentSubjectAct(ActId: number): Observable<any> {

    return this.httpClient.get(environment.apiEC + "ContinuingEducation/GetActivityStudents?ActivityId=" + ActId);
  }

  GetAcademicSubject(data: any) {
    return this.httpClient
      .post<AcademicRecord>(environment.apiIntranet + 'SearchAcademicSubjectRecord', data);
  }

  GetAcademicSubject2(data: any) {
    return this.httpClient
      .post<AcademicRecord>(environment.apiIntranet + 'SearchEFAcademicRecord', data);
  }




  GetAcademicActivity(data: any) {
    return this.httpClient
      .post<AcademicRecord>(environment.apiIntranet + 'SearchECAcademicRecord', data);
  }

  UpdateECAcademicRecord(data: any) {
    return this.httpClient
      .put<any>(environment.apiIntranet + 'UpdateECAcademicRecord', data);
  }



  AddCalifTask(data: any) {
    return this.httpClient
      .post(environment.apiIntranet + 'CreateSubjectRecordScores', data);
  }

  AddCalifTaskActi(data: any) {
    return this.httpClient
      .post(environment.apiIntranet + 'CreateActivityRecordScores', data);
  }

  AddAsistStudent(data: any) {
    return this.httpClient
      .post(environment.apiIntranet + 'CreateAcademicSubjectAttendanceRecord', data);
  }

  AddAsistStudentAct(data: any) {
    return this.httpClient
      .post(environment.apiIntranet + 'CreateAcademicActivityAttendanceRecord', data);
  }

  GetAsistStudentAct(data: any) {
    return this.httpClient
      .post<Asist>(environment.apiIntranet + 'SearchAcademicActivityAttendanceRecord', data);
  }

  GetAsistStudentSubject(data: any) {
    return this.httpClient
      .post<Asist>(environment.apiIntranet + 'SearchAcademicSubjectAttendanceRecord', data);
  }

  GetCalifSubject(data: any) {
    return this.httpClient
      .post<any>(environment.apiIntranet + 'SearchSubjectRecordScores', data);
  }

  GetCalifActi(data: any) {
    return this.httpClient
      .post<any>(environment.apiIntranet + 'SearchActivityRecordScores', data);
  }




  updateAspirantEF(data: any): Observable<ResponseModifyStudent> {
    const url = `${environment.apiEC}`;
    return this.httpClient.put<ResponseModifyStudent>(url + "EFInscription/UpdateAspirant", data);
  }

  updateParticipantEF(data: any): Observable<ResponseModifyStudent> {
    const url = `${environment.apiEC}`;
    return this.httpClient.put<ResponseModifyStudent>(url + "ContinuingEducation/UpdateParticipant", data);
  }

  updateAspirantParticipantEF(data: any): Observable<ResponseModifyStudent> {
    const url = `${environment.apiEC}`;
    return this.httpClient.put<ResponseModifyStudent>(url + "EJMatricula/UpdateStudent", data);
  }

}
