import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {Mesh} from "../../admission/FormalEducations/Models/Degree";
import {VerificarDocumentacion} from "../../admission/models/VerificacionDocumentacion";
import {BehaviorSubject, Observable} from "rxjs";
import {
  GetDataResultResponse,
  Participant,
} from "../../admission/models/participant";
import {
  InscriptionResponse,
} from "../../admission/models/ParticipantesEF";
import {documentosIncripcion} from "../../admission/models/documentosIncripcion";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {
  CreateEnrollmentResult,
  GetSubjectEnrollmentResult,
  ResponseAddEFcademicInfo
} from "../../admission/models/AddEFacademicResponse";
import {Period} from "../models/Period";
import {Subject} from "../models/Subject";
import {Room} from "../models/Room";
import {Career, CareerResponse} from "../models/Career";
import {an} from "@fullcalendar/core/internal-common";

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
      .post<CareerResponse>(environment.apiEC + 'EJMatricula/GetSubjectDegree',{cedula:id})
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

  AddSubjectStudent(createEnrollmentdSubjectDta: any) {

    const url = `${environment.apiEC}`;
    return this.httpClient.post<ResponseAddEFcademicInfo>(url + "EJMatricula/AddSubjectStudent", createEnrollmentdSubjectDta);
  }

  GetStudentsSubjects(DegreeId: string, id: string) {
    return this.httpClient.get<GetSubjectEnrollmentResult>(
      environment.apiEC + 'EJMatricula/GetSubjectEnrollment?DegreeId=' + DegreeId +'&Cedula='+id
    );
  }

  getPeriodCurriculumdesingById(id: number): void {
    this.subs.sink = this.httpClient
      .get<Period[]>(environment.apiEF + 'DegreeCurriculumDesign/GetPeriodsBy?DegreeCurriculumDesignId='+id)
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

  GetSubjectsBy(year: number,id: number): void {
    this.subs.sink = this.httpClient
      .get<Subject[]>(environment.apiEF + 'Period/GetSubjectsBy?Year='+year+'&DegreeCurriculumDesignId='+id)
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

  GetAssignedRoomsBy(classshift: number,periodid: number,year:number,subjectid: number): void {
    this.subs.sink = this.httpClient
      .get<Room[]>(environment.apiEF + 'Period/GetAssignedRoomsBy?ClassShift='+classshift+'&PeriodId='+periodid+'&Year='+year+'&SubjectId=' +subjectid)
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

}

