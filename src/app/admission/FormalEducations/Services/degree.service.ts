import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Degree,
  DegreeCurriculumDesign,
  DegreeDegreeAdmissionRequirement,
  DegreeDegreeCompetence,
  DetalleDegree,
  Poster,
  PosterComment,
  PosterRequest,
} from '../Models/Degree';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DetalleMalla } from '../Models/DetalleMalla';
import { Subject } from '../Models/Subject';
import { Teacher } from 'app/teaching-management/models/Teacher';
import { DocentesAsignados } from '../Models/DocentesA';
import { DegreesByAll, EstadisticasEFormal } from 'app/estadisticas/Models/EstadisticasEFormal';

@Injectable({
  providedIn: 'root',
})
export class DegreeService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Degree[]> = new BehaviorSubject<Degree[]>([]);
  dataChangeDegreesByAll: BehaviorSubject<DegreesByAll[]> = new BehaviorSubject<DegreesByAll[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Degree;
  public _Degree!: Degree;
  public _DegreeDegreeAdmissionRequirement!: DegreeDegreeAdmissionRequirement;
  public _DegreeDegreeCompetence!: DegreeDegreeCompetence;
  public _DegreeCurriculumDesign!: DegreeCurriculumDesign;
  public _PosterRequest!: PosterRequest;
  public _DetalleDegree!: DetalleDegree;
  public _Poster!: Poster;
  public _PosterComment!: PosterComment;
  public _DetalleMalla!: DetalleMalla;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Degree[] {
    return this.dataChange.value;
  }

  get dataDegreesByAll(): DegreesByAll[] {
    console.log(this.dataChangeDegreesByAll);

    return this.dataChangeDegreesByAll.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDegree(id: any = 0): void {
    if (id == 0) {
      this.subs.sink = this.httpClient
        .get<Degree[]>(environment.apiEF + 'Degree/GetAll')
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isTblLoading = false;
            this.dataChange.next(data);
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
    } else {
      this.subs.sink = this.httpClient
        .get<Degree[]>(environment.apiEF + 'DegreeCurriculumDesign/GetAll?StatusId=' + id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isTblLoading = false;
            this.dataChange.next(data);
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
    }
  }

  getAllDegreeId(id: string): void {
    this.subs.sink = this.httpClient
      .get<Degree[]>(environment.apiEF + 'DegreeCurriculumDesign/GetAll?StatusId=' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }


  GetDegreesStatisticsBy(data: any): void {
    this.subs.sink = this.httpClient
      .get<EstadisticasEFormal>(environment.apiEF + 'Degree/GetDegreesStatisticsBy?' + data)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChangeDegreesByAll.next(data.degreesByAll);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  GetDegreesStatisticsByFilter(data: any) {
    return this.httpClient
      .get<EstadisticasEFormal>(environment.apiEF + 'Degree/GetDegreesStatisticsBy?' + data);
  }


  getAllDegree2() {
    return this.httpClient.get<Degree[]>(environment.apiEF + 'Degree/GetAll');
  }

  getAllDegreesFiltro(id: any) {
    return this.httpClient.get<Degree[]>(
      environment.apiEF + 'Degree/GetAll?StatusId=' + id
    );
  }

  addDegree(Degree: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'Degree/Create',
      Degree
    );
  }

  getAllMallasCurriculares(id: any) {
    return this.httpClient.get<DegreeCurriculumDesign[]>(
      environment.apiEF + 'AnnualPlan/GetPendingDegreeCurriculumDesignsBy?AnnualPlanId=' + id
    );
  }

  getOneMallaCurricular(id: any) {
    return this.httpClient.get<DetalleMalla>(
      environment.apiEF + 'DegreeCurriculumDesign/GetBy?Id=' + id
    );
  }

  getSalonesPeriod(data: any) {
    return this.httpClient.get<any>(
      environment.apiEF + 'Period/GetRoomsBy?PeriodId=' + data.PeriodId + '&Year=' + data.Year
    ); 0
  }


  updateDegree(Degree: any) {
    return this.httpClient.put<ResponseGenerica>(
      environment.apiEF + 'Degree/Update',
      Degree
    );
  }

  DeleteDegree(Id: number) {
    let data = {
      id: Id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'Degree/Delete',
      options
    );
  }

  SavePoster(data: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'PosterRequest/Create',
      data
    );
  }

  //getOneDegreeDetails

  getOneDegreeDetails(id: any) {
    return this.httpClient.get<Degree>(
      environment.apiEF + 'Degree/GetBy?Id=' + id
    );
  }

  DeleteDegreeAdmission(degreeId: any, degreeAdmissionRequirementId: any) {
    let data = {
      degreeId: degreeId,
      degreeAdmissionRequirementId: degreeAdmissionRequirementId,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'Degree/DeleteDegreeAdmissionRequirement',
      options
    );
  }

  DeletePoster(Id: any) {
    let data = {
      id: Id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'PosterRequest/Delete',
      options
    );
  }

  DeleteCompetence(Id: any) {
    let data = {
      id: Id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'DegreeCompetence/Delete',
      options
    );
  }

  SaveCurriculumDesign(data: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'Degree/CreateCurriculumDesign',
      data
    );
  }

  UpdateCurriculumDesign(data: any) {
    return this.httpClient.put<ResponseGenerica>(
      environment.apiEF + 'Degree/UpdateCurriculumDesign',
      data
    );
  }

  SaveRoomsPeriod(data: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'Period/CreateRoom',
      data
    );
  }

  SaveCreateTeacher(data: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'Period/CreateTeacher',
      data
    );
  }


  DeleteDegreeAdminssion(id: any) {
    let data = {
      id: id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'Degree/DeleteCurriculumDesign',
      options
    );
  }

  DeleteDegreeCompetence(id: any) {
    let data = {
      id: id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'DegreeCompetence/Delete',
      options
    );
  }


  SaveMallaCurricular(data: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/CreateDegreeCurriculumDesign',
      data
    );
  }

  ApprovedMallaCurricular(data: any) {
    return this.httpClient.put(environment.apiEF + 'Degree/ApproveCurriculumDesign', data);
  }

  DeleteRooms(data: any) {
    let dataEliminar = {
      periodId: data.periodId,
      year: data.year,
      roomId: data.roomId,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: dataEliminar,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'Period/DeleteRoom',
      options
    );
  }

  getSubject(periodo: any, years: any) {
    return this.httpClient.get<Subject[]>(
      environment.apiEF + 'Period/GetSubjectsBy?PeriodId=' + periodo + '&Year=' + years
    );
  }


  getDocenteAsignado(data: any) {
    return this.httpClient.get<DocentesAsignados[]>(
      environment.apiEF + `Period/GetTeachersBy?ClassShift=${data.ClassShift}&PeriodId=${data.periodId}&Year=${data.year}&SubjectId=${data.subjectId}&RoomId=${data.roomId}`
    );
  }



  getDocentes(idSubject: any) {
    return this.httpClient.get<Teacher[]>(
      environment.apiUrlTeacher + 'GetSubjectTeacher?subject=' + idSubject
    );
  }


  deleteTeachers(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + '/Period/DeleteTeacher',
      options
    );
  }
  init_Degree() {
    this._DetalleDegree = {
      description: '',
      id: 0,
      name: '',
      statusId: 0,
    };
    this._DegreeDegreeAdmissionRequirement = {
      statusId: 0,
      id: 0,
      degreeAdmissionRequirement: this._DetalleDegree,
    };
    this._DegreeDegreeCompetence = {
      statusId: 0,
      id: 0,
      degreeId: 0,
      degreeName: '',
      description: '',
      name: '',
    };
    this._DegreeCurriculumDesign = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: 0,
    };
    this._Poster = {
      fileContents: '',
      contentType: '',
      fileDownloadName: '',
      lastModified: '',
      entityTag: '',
      enableRangeProcessing: false,
    };
    this._PosterComment = {
      text: '',
      userId: '',
    };
    this._PosterRequest = {
      statusId: 0,
      id: 0,
      approvedBy: '',
      approvalDate: '',
      approvalMessage: '',
      degreeId: 0,
      degreeName: '',
      poster: this._Poster,
      posterType: 0,
      posterComments: [this._PosterComment],
    };
    this._Degree = {
      name: '',
      id: 0,
      description: '',
      graduationProfile: '',
      admissionProfile: '',
      generalGoals: '',
      durationInYears: 0,
      numOfCredits: 0,
      assignedCoordinatorId: '',
      assignedCoordinatorName: '',
      studyModeId: 0,
      studyModeName: '',
      degreeDegreeAdmissionRequirements: [
        this._DegreeDegreeAdmissionRequirement,
      ],
      degreeCompetences: [this._DegreeDegreeCompetence],
      degreeCurriculumDesigns: [this._DegreeCurriculumDesign],
      posterRequests: [this._PosterRequest],
      statusId: 0,
    };
  }
  init_DetalleMalla() {
    this._DetalleMalla = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: '',
      approvedBy: '',
      approvalDate: new Date(),
      approvalMessage: '',
      degree: {
        statusId: 0,
        id: 0,
        name: '',
        description: '',
        graduationProfile: '',
        admissionProfile: '',
        generalGoals: '',
        durationInYears: 0,
        numOfCredits: 0,
        assignedCoordinatorId: '',
        assignedCoordinatorName: '',
        studyModeId: 0,
        studyModeName: '',
      },
      periods: [],
    }
  }
}
