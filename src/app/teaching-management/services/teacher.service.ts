import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { RequestActivityTeacher, RequestSubjectTeacher, ResponseSaveTeacher, Subject, Teacher } from '../models/Teacher';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { UntypedFormGroup } from '@angular/forms';
import { RequiredDocument } from '../models/RequiredDocument';
import { User } from '@core';
import { ApiResponseInternalData } from 'app/intranet-academic-registration/Models/ResponseListTaskSubject';
import { RespuestaServicio } from '../add-calif/add-calif.component';
import { AcademicRecord, Asist, StudenAsistence } from '../models/Asistencias';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  public isTblLoading = true;
  dataChange: BehaviorSubject<Teacher[]> = new BehaviorSubject<
    Teacher[]
  >([]);

  dataChange2: BehaviorSubject<RequiredDocument[]> = new BehaviorSubject<
    RequiredDocument[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Teacher;
  dialogData2!: RequiredDocument;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teacher[] {
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
      .get<Teacher[]>(environment.apiUrlTeacher + 'GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.filter(f => f.type == null));

        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getAllTeachersFilters(Data: any): void {
    this.subs.sink = this.httpClient
      .post<Teacher[]>(environment.apiUrlTeacher + 'GetAllTeacherFilter', Data)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.filter(f => f.type == null));

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
  addUpdateTeacher(teacher: Teacher, id: number = 0, type: string | null = null) {
    if (type != null) {
      teacher.type = type;
      teacher.id = id;
    }

    return this.httpClient.post<ResponseSaveTeacher>(environment.apiUrlTeacher + 'Save', teacher);
  }

  addActivitiesTeacher(data: RequestActivityTeacher) {

    return this.httpClient.post<ResponseSaveTeacher>(environment.apiUrlTeacher + 'SaveActivities', data);
  }

  addSubjectTeacher(data: RequestSubjectTeacher) {

    return this.httpClient.post<ResponseSaveTeacher>(environment.apiUrlTeacher + 'SaveSubject', data);
  }

  GetTeacherPoint() {
    return this.httpClient.get<any>(environment.apiUrlTeacher + 'GetTeacherPoint');
  }

  GetTeacherPointByCedula(id: string) {
    return this.httpClient.get<any>(environment.apiUrlTeacher + 'GetTeacherByPoint?Cedula=' + id);
  }

  SavePointTeacher(data: any) {

    return this.httpClient.post<any>(environment.apiUrlTeacher + 'SavePointTeacher', data);
  }

  SaveUpdatePointTeacher(data: any) {

    return this.httpClient.post<any>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', data);
  }



  updateRequiredDocument(requiredDocument: RequiredDocument) {
    return this.httpClient.post(environment.apiUrlDocument + 'Save', requiredDocument);

  }



  archivo(data: any) {

    return this.httpClient.post(environment.apiUrlTeacher + 'archivo', data);
  }

  aprovedTeacher(data: UntypedFormGroup) {

    return this.httpClient.post<Teacher>(environment.apiUrlTeacher + 'Aproved', data);
  }
  getTeacherByCedula(cedula: string) {
    return this.httpClient.get<Teacher>(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula=' + cedula);
  }

  getSubjectsByCedula(data: any) {

    return this.httpClient.post(environment.apiUrlEF + 'GetSubjectsBy', data);
  }
  getSubjectsByCedulaNewApi(cedula: string, idCareer: number) {

    return this.httpClient.get(environment.apiEF + 'Period/GetPeriodSubjectRoomTeachersBy?TeacherCedula=' + cedula + '&DegreeCurriculumDesignId=' + idCareer);
  }

  getActivitiesByCedula(cedula: string) {

    return this.httpClient.get(environment.apiUrlEC + 'GetActivitiesBy?TeacherCedula=' + cedula);
  }
  getCareer(cedula: string) {
    return this.httpClient.get(environment.apiEF + 'Period/GetDegreeCurriculumDesignsBy?TeacherCedula=' + cedula);
  }

  getAllSubject3() {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll');
  }
  getExisteCedula(cedula: string) {

    return this.httpClient.get<Teacher>(environment.apiUrlTeacher + 'GetTeacherByCedula?Cedula=' + cedula).pipe(
      map(resp => {
        return (resp.teacherId > 0) ? { cedulaExists: true } : null
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
    var carier = localStorage.getItem('DegreeCurriculumDesignId') || '';
    return this.httpClient.get(environment.apiEC + "EJMatricula/GetDegreeSubject?SubjectId=" + SubjectId + "&DegreeCurriculumDesignId=" + carier);
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

  UpdateAcademicSubjectRecord(data: any) {
    return this.httpClient
      .put<any>(environment.apiIntranet + 'UpdateAcademicSubjectRecord', data);
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

  ValidateDocument(docId: number, email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.httpClient
      .post<any>(environment.apiUrlTeacher + 'ValidateDocumentTeacher?docId=' + docId + '&LastModifiedBy=' + email, httpOptions);
  }






}
