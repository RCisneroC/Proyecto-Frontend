import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "@shared";
import { Mesh } from "../../admission/FormalEducations/Models/Degree";
import { VerificarDocumentacion } from "../../admission/models/VerificacionDocumentacion";
import { BehaviorSubject } from "rxjs";
import {
  GetDataResultResponse,
  Participant,
} from "../../admission/models/participant";
import {
  InscriptionResponse,
} from "../../admission/models/ParticipantesEF";
import { documentosIncripcion } from "../../admission/models/documentosIncripcion";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import {
  CreateCertificateResponse,
  CreateEnrollmentResult, GetStudentsActivityResponse,
  GetSubjectEnrollmentResult,
  ResponseAddEFcademicInfo
} from "../../admission/models/AddEFacademicResponse";
import { Period } from "../models/Period";
import { Subject } from "../models/Subject";
import { Room } from "../models/Room";
import {
  Career,
  CareerResponse,
  SearchAcademicActivityAttendanceRecord,
  SearchAcademicSubjectAttendanceRecord
} from "../models/Career";
import { an } from "@fullcalendar/core/internal-common";
import { ResponseSubjectRecord } from '../models/calificacion';
import { ResponseActivityRecord } from "../models/calificacionEC";
import { CurriculumDesign } from '../models/CurriculumDesign';
import { DegreeCurriculumDesignEnrollment } from '../models/DegreeCurriculumDesignEnrollment';
import { StudentModel } from '../models/StudentModel';
import { GraficasMatricula } from 'app/estadisticas/Models/GraficasMatricula';
import { GraficasEntrenamiento } from 'app/estadisticas/Models/GraficasEntrenamiento';
import { subjectHistory } from '../models/subjectHistory';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends UnsubscribeOnDestroyAdapter {
  baseApiUrl = "https://file.io"
  isTblLoading = true;
  public _Mesh!: Mesh;
  public _Career!: Career;
  public _Period!: Period;
  public _Subject!: Subject;
  public _Room!: Room;
  public _ResponseSubjectRecord: ResponseSubjectRecord =
    {
      statusCode: 0,
      success: false,
      message: '',
      data: [{
        id: 0,
        createdDate: new Date(),
        createdBy: '',
        lastModifiedDate: '',
        lastModifiedBy: '',
        totalRecords: 0,
        scoreType: {
          id: 0,
          name: '',
        },
        academicSubjectRecords: {
          id: 0,
          academicRecord: '',
          efAcademicRecordId: 0,
          subjectId: 0,
        },
        subjectTask: {
          title: '',
          subjectId: 0,
          taskType: '',
          description: ''
        },
        academicSubjectRecordId: 0,
        score: 0,
        scoreTypeId: 0,
        subjectTaskId: 0,
      }],
      errors: '',
    };
  public _VerificarDocumentacion!: VerificarDocumentacion;
  dataChange: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  dataChangeMesh: BehaviorSubject<Mesh[]> = new BehaviorSubject<Mesh[]>([]);
  dataChangePeriod: BehaviorSubject<Period[]> = new BehaviorSubject<Period[]>([]);
  dataChangeSubject: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  dataChangeCareer: BehaviorSubject<Career[]> = new BehaviorSubject<Career[]>([]);
  dataChangeRoom: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  dataChangeParticipant: BehaviorSubject<GetDataResultResponse[]> = new BehaviorSubject<GetDataResultResponse[]>([]);
  dataChangeParticipantEF: BehaviorSubject<InscriptionResponse[]> = new BehaviorSubject<InscriptionResponse[]>([]);


  public _documentosIncripcion!: documentosIncripcion;
  get data(): Participant[] {
    return this.dataChange.value || [];
  }
  get dataMesh(): Mesh[] {
    return this.dataChangeMesh.value || [];
  }

  get dataCareer(): Career[] {
    return this.dataChangeCareer.value || [];
  }
  get dataPeriod(): Period[] {
    return this.dataChangePeriod.value || [];
  }
  get dataSubject(): Subject[] {
    return this.dataChangeSubject.value || [];
  }
  get dataRoom(): Room[] {
    return this.dataChangeRoom.value || [];
  }
  get dataParticipantActivity(): GetDataResultResponse[] {
    return this.dataChangeParticipant.value || [];
  }

  get dataParticipantEF(): InscriptionResponse[] {
    return this.dataChangeParticipantEF.value || [];
  }

  constructor(private httpClient: HttpClient) { super(); }

  getMeshCurriculumdesingByPlan(id: number): void {
    this.subs.sink = this.httpClient
      .get<Mesh[]>(environment.ConsultaMallaCurrcularByPlan + id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTblLoading = false;
          this.dataChangeMesh.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  GetSubjectDegree(id: string): void {
    this.subs.sink = this.httpClient
      .post<CareerResponse>(environment.apiEC + 'EJMatricula/GetSubjectDegree', { cedula: id })
      .subscribe({
        next: (data) => {
          console.log(data.studentInnfo);
          this.isTblLoading = false;
          this.dataChangeCareer.next(data.studentInnfo);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  CreateEnrollment(createEnrollmentdDta: any) {

    const url = `${environment.apiEC}`;
    return this.httpClient.post<CreateEnrollmentResult>(url + "EJMatricula/CreateEnrollment", createEnrollmentdDta);
  }

  CreateEFAcademicRecord(CreateEFAcademicRecorddata: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "CreateEFAcademicRecord", CreateEFAcademicRecorddata);
  }

  CreateAcademicSubjectRecord(CreateAcademicSubjectRecorddata: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "CreateAcademicSubjectRecord", CreateAcademicSubjectRecorddata);
  }

  searchGraficasMatriculados(dataGraficas: any) {

    const url = `${environment.apiEC}`;
    return this.httpClient.post<GraficasMatricula>(url + "EstadisticaMatricula/GetEstadistica", dataGraficas);
  }

  searchGraficasMatriculadosParticipantes(dataGraficas: any) {

    const url = `${environment.apiEC}`;
    return this.httpClient.post<GraficasEntrenamiento>(url + "EstadisticaMatricula/GetStatisticalGraph", dataGraficas);
  }


  AddSubjectStudent(createEnrollmentdSubjectDta: any) {

    const url = `${environment.apiEC}`;
    return this.httpClient.post<ResponseAddEFcademicInfo>(url + "EJMatricula/AddSubjectStudent", createEnrollmentdSubjectDta);
  }

  GetStudentsActivity(id: string) {
    return this.httpClient.get<GetStudentsActivityResponse>(
      environment.apiEC + 'ContinuingEducation/GetStudentsActivity?Cedula=' + id
    );
  }

  GetStudentsSubjects(DegreeId: string, id: string) {
    return this.httpClient.get<GetSubjectEnrollmentResult>(
      environment.apiEC + 'EJMatricula/GetSubjectEnrollment?DegreeId=' + DegreeId + '&Cedula=' + id
    );
  }

  GetStudentsmesh(id: string) {
    return this.httpClient.post<CareerResponse>(
      environment.apiEC + 'EJMatricula/GetSubjectDegree', { cedula: id }
    );
  }

  SearchEFAcademicRecordMethod(studentId: number, degreeCurriculumDesignId: number) {
    return this.httpClient.post<any>(
      environment.apiEira + 'SearchEFAcademicRecord', { studentId: studentId, degreeCurriculumDesignId: degreeCurriculumDesignId }
    );
  }

  SearchAcademicSubjectRecordMethod(efAcademicRecordId: number, subjectId: number, degreeCurriculumDesignId: number, studentId: number) {
    return this.httpClient.post<any>(
      environment.apiEira + 'SearchAcademicSubjectRecord', { efAcademicRecordId: efAcademicRecordId, subjectId: subjectId, degreeCurriculumDesignId: degreeCurriculumDesignId, studentId: studentId }
    );
  }

  SearchAcademicSubjectAttendanceRecordMethod(academicSubjectRecordId: number, degreeCurriculumDesignId: number, subjectId: number, studentId: number) {
    return this.httpClient.post<SearchAcademicSubjectAttendanceRecord>(
      environment.apiEira + 'SearchAcademicSubjectAttendanceRecord', { academicSubjectRecordId: academicSubjectRecordId, degreeCurriculumDesignId: degreeCurriculumDesignId, subjectId: subjectId, studentId: studentId }
    );
  }

  SearchECAcademicRecordMethod(activityId: number, isReentry: boolean, participantId: string) {
    return this.httpClient.post<any>(
      environment.apiEira + 'SearchECAcademicRecord', { activityId: activityId, isReentry: isReentry, participantId: participantId }
    );
  }

  SearchAcademicActivityAttendanceRecordMethod(recordId: number) {
    return this.httpClient.post<SearchAcademicActivityAttendanceRecord>(
      environment.apiEira + 'SearchAcademicActivityAttendanceRecord', { ecAcademicRecordId: recordId }
    );
  }

  SearchActivityRecordScoresMethod(recordId: number) {
    return this.httpClient.post<ResponseActivityRecord>(
      environment.apiEira + 'SearchActivityRecordScores', { ecAcademicRecordId: recordId }
    );
  }

  getPeriodCurriculumdesingById(id: number): void {
    this.subs.sink = this.httpClient
      .get<Period[]>(environment.apiEF + 'DegreeCurriculumDesign/GetPeriodsBy?DegreeCurriculumDesignId=' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTblLoading = false;
          this.dataChangePeriod.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  GetSubjectsBy(year: number, id: number): void {
    this.subs.sink = this.httpClient
      .get<Subject[]>(environment.apiEF + 'Period/GetSubjectsBy?Year=' + year + '&DegreeCurriculumDesignId=' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTblLoading = false;
          this.dataChangeSubject.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  GetAssignedRoomsBy(classshift: number, periodid: number, year: number, subjectid: number): void {
    this.subs.sink = this.httpClient
      .get<Room[]>(environment.apiEF + 'Period/GetAssignedRoomsBy?ClassShift=' + classshift + '&PeriodId=' + periodid + '&Year=' + year + '&SubjectId=' + subjectid)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTblLoading = false;
          this.dataChangeRoom.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  GetRecordIdStuudent(studentId: any, degreeCurriculumDesignId: any) {
    let data = {
      studentId,
      degreeCurriculumDesignId
    }
    const url = `${environment.apiIntranet}`;
    return this.httpClient.post<any>(url + "SearchEFAcademicRecord", data);
  }
  SearchAcademicSubjectRecord(data: any) {
    const url = `${environment.apiIntranet}`;
    return this.httpClient.post<any>(url + "SearchAcademicSubjectRecord", data);
  }
  SearchSubjectRecordScores(data: any) {
    const url = `${environment.apiIntranet}`;
    return this.httpClient.post<ResponseSubjectRecord>(url + "SearchSubjectRecordScores", data);
  }
  getDegreeCurriculumDesign() {
    const url = `${environment.apiEF}`;
    return this.httpClient.get<DegreeCurriculumDesignEnrollment[]>(url + "DegreeCurriculumDesign/GetAll?StatusId=5");
  }
  getCurriculumDesign() {
    const url = `${environment.apiUrlSchedule}`;
    return this.httpClient.get<CurriculumDesign[]>(url + "CurriculumDesign/GetAll?StatusId=5");
  }
  CreateCertificate(CreateCertificateDta: any) {
    const url = `${environment.apiUrlSchedule}`;
    return this.httpClient.post<CreateCertificateResponse>(url + "Certificate/CreateCertificate", CreateCertificateDta);
  }

  init_ResponseSubjectRecord() {
    this._ResponseSubjectRecord = {
      statusCode: 0,
      success: false,
      message: '',
      data: [{
        id: 0,
        createdDate: new Date(),
        createdBy: '',
        lastModifiedDate: '',
        lastModifiedBy: '',
        totalRecords: 0,
        scoreType: {
          id: 0,
          name: '',
        },
        academicSubjectRecords: {
          id: 0,
          academicRecord: '',
          efAcademicRecordId: 0,
          subjectId: 0,
        },
        subjectTask: {
          title: '',
          subjectId: 0,
          taskType: '',
          description: ''
        },
        academicSubjectRecordId: 0,
        score: 0,
        scoreTypeId: 0,
        subjectTaskId: 0,
      }],
      errors: '',
    }
  }


  getStudentData(cedula: string) {
    const url = `${environment.apiEC}`;
    return this.httpClient.get<StudentModel>(url + "GetData/GetVerifyStudent?cedula=" + cedula);
  }

  getSubjectsHitory(id: number, cedula: string) {
    const url = `${environment.apiEC}`;
    return this.httpClient.get<subjectHistory>(url + "EJMatricula/GetallSubjectEnrollment?DegreeId=" + id + "&Cedula=" + cedula+ "&StausId=0" );
  }
}

