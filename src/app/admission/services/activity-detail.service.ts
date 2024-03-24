import { Injectable } from '@angular/core';
import { ActivityActivityRequirement, ActivityCooperatingOrganization, ActivityRequirement, ActivityTeachers, GetOneActivity, Poster, PosterComment, PosterRequest, RoomRequest, RoomRequestRoom, RoomRequestRoomRequirement } from '../models/GetOneActivity';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from '../models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';
import { DetalleDocente, ListCourse, ListSpecialty, ListTraining } from '../models/docentes';
import { Cooperating } from '../models/Cooperating';
import { EditActivity } from '../models/EditActivity';
import * as CryptoJS from 'crypto-js';
import { RequestRooms } from '../models/RequestRooms';
import {
  ApiResponse,
  ApiResponseOne,
  DetailsParticipante,
  DetailsParticipanteEF,
  DetailsResponse, DetailsResponseEF,
  Participant
} from '../models/participant';
import { DTCertificate } from '../models/DTCertificate';
import { PlanStudyActivity } from '../models/PlanStudyActivity';
import { ActivityDetailModules, ActivityStudyPlanModuleLearningActivity } from '../models/ActivityDetailModules';
import { EventsActivity } from '../models/EventsActivity';
import { EstadisticasActivity } from 'app/estadisticas/Models/EstadisticasModelActivity';
import { GraficasEC } from 'app/estadisticas/Models/GraficasEC';
@Injectable({
  providedIn: 'root'
})
export class ActivityDetailService extends UnsubscribeOnDestroyAdapter {

  public _ActivityRequirement: ActivityRequirement = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  };
  public _ActivityActivityRequirement: ActivityActivityRequirement = {
    statusId: 0,
    id: 0,
    activityRequirement: this._ActivityRequirement
  };


  public _Poster: Poster = {
    fileContents: '',
    contentType: '',
    fileDownloadName: '',
    lastModified: '',
    entityTag: '',
    enableRangeProcessing: false,
  };

  public _PosterComment: PosterComment = {
    text: '',
    userId: '',
  };

  public _PosterRequest: PosterRequest = {
    statusId: 0,
    id: 0,
    approvedBy: '',
    approvalDate: new Date(),
    approvalMessage: '',
    activityId: 0,
    activityName: '',
    poster: this._Poster,
    posterType: 0,
    posterComments: [
      this._PosterComment
    ]
  };

  public _RoomRequestRoom: RoomRequestRoom = {
    statusId: 0,
    id: 0,
    room: this._ActivityRequirement,
  };

  public _RoomRequestRoomRequirement: RoomRequestRoomRequirement = {
    statusId: 0,
    id: 0,
    roomRequirement: this._ActivityRequirement,
  };

  public _RoomRequest: RoomRequest = {
    statusId: 0,
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    approvedBy: '',
    approvalDate: new Date(),
    approvalMessage: '',
    activityId: 0,
    activityName: '',
    roomRequestRooms: [
      this._RoomRequestRoom
    ],
    roomRequestRoomRequirements: [
      this._RoomRequestRoomRequirement
    ]
  };
  public _ActivityCooperatingOrganization: ActivityCooperatingOrganization = {
    statusId: 0,
    id: 0,
    cooperatingOrganization: {
      statusId: 0,
      id: 0,
      name: '',
      logo: '',
      description: '',
    }
  }
  public _ActivityTeachers: ActivityTeachers = {
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }

  public _GetOneActivity: GetOneActivity = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    curriculumDesignId: 0,
    curriculumDesignName: '',
    activityModeId: 0,
    activityModeName: '',
    activityTypeId: 0,
    activityTypeName: '',
    activityFundsSourceId: 0,
    activityFundsSourceName: '',
    activityReasonId: 0,
    activityReasonName: '',
    activityLocationId: 0,
    activityLocationName: '',
    assignedCoordinatorId: '',
    assignedCoordinatorName: '',
    planningDate: new Date(),
    startDate: new Date(),
    plannedEndDate: new Date(),
    effectiveEndDate: new Date(),
    inscriptionStartDate: new Date(),
    inscriptionEndDate: new Date(),
    isExecuted: false,
    hasDataSheet: false,
    dataSheetDeliveryDate: new Date(),
    digitalReportDeliveryDate: new Date(),
    physicalReportDeliveryDate: new Date(),
    studentWithdrawalEndDate: new Date(),
    isEvaluation: false,
    observations: '',
    duration: 0,
    totalHours: 0,
    onSiteHours: 0,
    synchronousHours: 0,
    asynchronousHours: 0,
    competencies: '',
    content: '',
    learningActivities: '',
    electronicEvaluation: false,
    enrolledStudentsDiploma: 0,
    retiredStudentsDiploma: 0,
    participants: 0,
    male: 0,
    female: 0,
    activityTarget: 0,
    participationProfile: 0,
    studentQuota: 0,
    certificatesReceived: 0,
    hasCertificate: false,
    endTime: new Date(),
    startTime: new Date(),
    generalGoals: '',
    hasSurvey: false,
    justification: '',
    meetLink: '',
    participantAdmissionProfile: '',
    participantGraduateProfile: '',
    specificGoals: '',
    teachingMethodology: '',
    virtualRoom: '',
    activityTrainingType: 0,
    evaluation: '',
    bibliographicCitation: '',
    rubric: false,
    activityClass: 0,
    roomRequests: [
      this._RoomRequest
    ],
    posterRequests: [
      this._PosterRequest
    ],
    activityActivityRequirements: [
      this._ActivityActivityRequirement
    ],
    activityTeachers: [
      this._ActivityTeachers
    ],
    activityCooperatingOrganizations: [
      this._ActivityCooperatingOrganization
    ]
  };
  public _Cooperating: Cooperating = {
    statusId: 0,
    id: 0,
    name: '',
    logo: '',
    description: '',
  }
  public _ListCourse: ListCourse = {
    courseId: 0,
    year: 0
  }
  public _ListSpecialty: ListSpecialty = {
    specialtyId: 0
  }
  public _ListTraining: ListTraining = {
    trainingId: 0,
    typeId: 0,
    year: 0
  }


  public _DetalleDocente: DetalleDocente = {
    cedula: 0,
    name: '',
    lastName: '',
    applicationDate: new Date(),
    selected: false,
    dischargeDate: new Date(),
    placeResidence: '',
    jobTitle: '',
    graduateDegree: '',
    professionalExperience: '',
    teachingExperience: '',
    listCourse:
      [
        this._ListCourse
      ],
    listTraining:
      [
        this._ListTraining
      ],
    listSpecialty:
      [
        this._ListSpecialty
      ],
    process: 0,
    topics: 0,
  };
  public _RequestRooms: RequestRooms = {
    activityId: 0,
    endDate: new Date(),
    startDate: new Date(),
    id: 0,
    statusId: 0,
  }
  public _DetailsParticipante: DetailsParticipante = {
    isError: false,
    message: '',
    statusCode: 0,
    detailsResponse: [
      {
        inscriptionId: 0,
        firstName: '',
        lastName: '',
        secondsurname: '',
        gender: '',
        cedula: '',
        email: '',
        institution: '',
        university: '',
        dependency: '',
        cooperatingEntity: '',
        position: '',
        province: '',
        judicialDistrict: '',
        activityName: '',
        startDate: new Date(),
        inviationDate: new Date(),
        duration: 0,
        totalHours: 0,
        activityMode: '',
        activityType: '',
        activityLocation: '',
        observation: '',
        createDate: new Date(),
        name: '',
      }
    ]
  }
  public _DetailsResponse: DetailsResponse = {
    inscriptionId: 0,
    firstName: '',
    lastName: '',
    secondsurname: '',
    gender: '',
    cedula: '',
    email: '',
    institution: '',
    university: '',
    dependency: '',
    cooperatingEntity: '',
    position: '',
    province: '',
    judicialDistrict: '',
    activityName: '',
    startDate: new Date(),
    inviationDate: new Date(),
    duration: 0,
    totalHours: 0,
    activityMode: '',
    activityType: '',
    activityLocation: '',
    observation: '',
    createDate: new Date(),
    name: '',
  };

  public _DetailsParticipanteEF: DetailsParticipanteEF = {
    isError: false,
    message: '',
    statusCode: 0,
    getDetailsResponse: [
      {
        inscriptionId: "",
        bloodtype: "",
        caseOfemergency: "",
        degreeName: "",
        durationInYears: 0,
        maritalStatus: "",
        nameOfspouse: "",
        numOfCredits: 0,
        numberofchildren: 0,
        statusName: "",
        studyModeName: "",
        telephoneNumber: "",
        telephoneNumberEmergency: "",
        specialCapacity: "",
        firstName: '',
        lastName: '',
        secondsurname: '',
        gender: '',
        cedula: '',
        email: '',
        visual: false,
        auditory: false,
        cognitive: false,
        physical: false,
        usesAwheelchair: false,
        others: '',
        specific: '',
        observation: ''
      }
    ]
  }
  public _DetailsResponseEF: DetailsResponseEF = {
    inscriptionId: "",
    bloodtype: "",
    caseOfemergency: "",
    degreeName: "",
    durationInYears: 0,
    maritalStatus: "",
    nameOfspouse: "",
    numOfCredits: 0,
    numberofchildren: 0,
    statusName: "",
    studyModeName: "",
    telephoneNumber: "",
    telephoneNumberEmergency: "",
    specialCapacity: "",
    firstName: '',
    lastName: '',
    secondsurname: '',
    gender: '',
    cedula: '',
    email: '',
    visual: false,
    auditory: false,
    cognitive: false,
    physical: false,
    usesAwheelchair: false,
    others: '',
    specific: '',
    observation: ''
  };
  public _PlanStudyActivity: PlanStudyActivity = {
    statusId: 0,
    id: 0,
    activityId: 0,
    name: '',
    description: '',
    courseOutline: {
      fileContents: '',
      contentType: '',
      fileDownloadName: '',
      lastModified: '',
      entityTag: '',
      enableRangeProcessing: false,
    }
  }
  public _ActivityDetailModules: ActivityDetailModules = {
    statusId: 0,
    id: 0,
    activityStudyPlanId: 0,
    name: '',
    description: '',
    synchronousHours: 0,
    asynchronousHours: 0,
    inPersonHours: 0,
    totalHours: 0,
    percentageValue: 0,
    learningGoals: '',
    competencies: '',
    subTopics: '',
    methodologicalStrategy: '',
    bibliographicCitation: '',
    learningStrategies: '',
    evaluation: '',
    teachingResources: '',
    createdDate: new Date(),
    activityStudyPlanModuleLearningActivities: [
      {
        statusId: 0,
        id: 0,
        activityStudyPlanModuleId: 0,
        name: '',
        description: ''
      }
    ]
  }
  public _ActivityStudyPlanModuleLearningActivity: ActivityStudyPlanModuleLearningActivity = {
    statusId: 0,
    id: 0,
    activityStudyPlanModuleId: 0,
    name: '',
    description: ''
  }
  public _EventsActivity: EventsActivity = {
    statusId: 0,
    id: 0,
    activityId: 0,
    name: '',
    description: '',
    date: new Date(), // O simplemente '', dependiendo de cómo quieras manejar las fechas
    startTime: new Date(), // O simplemente ''
    endTime: new Date(), // O simplemente ''
    teacherCedula: '',
    teacherFullName: '',
    teacherStatusId: '',
  }
  public _EstadisticasActivity: EstadisticasActivity = {
    activitiesByAll: [
      this._GetOneActivity
    ],
    planningDate: '',
    activityCountByPlanningDate: 0,
    activitiesByPlanningDate: [
      this._GetOneActivity
    ],
    activityModeId: 0,
    activityModeName: '',
    activityCountByActivityModeId: 0,
    activitiesByActivityModeId: [
      this._GetOneActivity
    ],
    activityLocationName: '',
    activityCountByActivityLocationId: 0,
    activitiesByActivityLocationId: [
      this._GetOneActivity
    ],
    assignedCoordinatorId: '',
    activityCountByAssignedCoordinatorId: 0,
    activitiesByAssignedCoordinatorId: [
      this._GetOneActivity
    ],
    activityReasonId: '',
    activityReasonName: '',
    activityCountByActivityReasonId: 0,
    activitiesByActivityReasonId: [
      this._GetOneActivity
    ],
    activityFundsSourceId: '',
    activityFundsSourceName: '',
    activityCountByActivityFundsSourceId: 0,
    activitiesByActivityFundsSourceId: [
      this._GetOneActivity
    ],
    inscriptionStartDate: '',
    activityCountByInscriptionStartDate: 0,
    activitiesByInscriptionStartDate: [
      this._GetOneActivity
    ],
    inscriptionEndDate: '',
    activityCountByInscriptionEndDate: 0,
    activitiesByInscriptionEndDate: [
      this._GetOneActivity
    ],
    startDate: '',
    activityCountByStartDate: 0,
    activitiesByStartDate: [
      this._GetOneActivity
    ],
    plannedEndDate: '',
    activityCountByPlannedEndDate: 0,
    activitiesByPlannedEndDate: [
      this._GetOneActivity
    ],
    effectiveEndDate: '',
    activityCountByEffectiveEndDate: 0,
    activitiesByEffectiveEndDate: [
      this._GetOneActivity
    ],
    dataSheetDeliveryDate: '',
    activityCountByDataSheetDeliveryDate: 0,
    activitiesByDataSheetDeliveryDate: [
      this._GetOneActivity
    ],
    digitalReportDeliveryDate: '',
    activityCountByDigitalReportDeliveryDate: 0,
    activitiesByDigitalReportDeliveryDate: [
      this._GetOneActivity
    ],
    physicalReportDeliveryDate: '',
    activityCountByPhysicalReportDeliveryDate: 0,
    activitiesByPhysicalReportDeliveryDate: [
      this._GetOneActivity
    ],
    statusId: '',
    statusName: '',
    activityCountByStatusId: 0,
    activitiesByStatusId: [
      this._GetOneActivity
    ],
    curriculumDesignId: '',
    curriculumDesignName: '',
    activityCountByCurriculumDesignId: 0,
    activitiesByCurriculumDesignId: [
      this._GetOneActivity
    ],
    hasDataSheet: '',
    activityCountByHasDataSheet: 0,
    activitiesByHasDataSheet: [
      this._GetOneActivity
    ],
  }
  public _ListadoDocentes: DetalleDocente[] = [this._DetalleDocente];
  public loading: boolean = false;
  isTblLoading = true;
  dataChange: BehaviorSubject<PosterRequest[]> = new BehaviorSubject<PosterRequest[]>([]);
  dataChangeRooms: BehaviorSubject<RoomRequest[]> = new BehaviorSubject<RoomRequest[]>([]);
  public _EditActivity!: EditActivity;
  constructor(private httpClient: HttpClient) {
    super();
    // this.initService()
  }
  get data(): PosterRequest[] {
    return this.dataChange.value;
  }

  get dataRooms(): RoomRequest[] {
    return this.dataChangeRooms.value;
  }

  GetOneActivity(id: string) {
    return this.httpClient.get<GetOneActivity>(environment.apiUrlSchedule + 'Activity/GetBy?Id=' + id);
  }
  UpdateActivity(data: EditActivity) {
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/UpdateActivity', data);
  }

  SavePoster(data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'PosterRequest/Create', data);
  }

  SaveCertificate(data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'Activity/UploadCertificateTemplate', data);
  }


  GetAllTeacher() {
    return this.httpClient.get<DetalleDocente[]>(environment.ConsultaDocentes + 'Teacher/GetAll');
  }

  getDocentesActividad(idactivity: any) {
    return this.httpClient.get<DetalleDocente[]>(
      environment.apiUrlTeacher + 'GetActivityTeacher?activity=' + idactivity
    );
  }

  AddTeachers(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateActivityTeacher', data);
  }

  AddCooperating(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateCooperatingOrganization', data);
  }


  DeleteTeacherRequirement(id_actividad: any, teacherCedula: any) {
    let data = {
      activityId: id_actividad,
      teacherCedula: teacherCedula
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteActivityTeacher', options);
  }
  DeleteCooperating(id_actividad: any, cooperatingOrganizationId: any) {
    let data = {
      activityId: id_actividad,
      cooperatingOrganizationId: cooperatingOrganizationId
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteCooperatingOrganization', options);
  }



  ApproveCurilculum(data: any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/Approve', data);
  }

  ApproveCurilculumActivity(data: any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/ApproveActivity', data);
  }

  ApprovedPoster(data: any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'PosterRequest/Approve', data);
  }

  ApprovedRooms(data: any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'Room/ApproveRequest', data);
  }

  getPosterRequest(id: number) {
    return this.httpClient.get<PosterRequest>(environment.apiUrlSchedule + 'PosterRequest/GetBy?Id=' + id);
  }


  getRequestPoster(id: any) {
    return this.httpClient.get<PosterRequest[]>(environment.apiUrlSchedule + 'PosterRequest/GetAll?StatusId=' + id).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
      },
    });
  }

  getRoomsRequest(id: any) {
    return this.httpClient.get<RoomRequest[]>(environment.apiUrlSchedule + 'Room/GetAllRequest?StatusId=' + id).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChangeRooms.next(data);
      },
      error: (error: HttpErrorResponse) => {
      },
    });
  }


  // API GUARDAR DOCUMENTO.

  AddDocumentRequirement(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateActivityRequirement', data);
  }

  DeleteDocumentRequirement(id_requirement: any, id_actividad: any) {
    let data = {
      activityId: id_actividad,
      activityRequirementId: id_requirement
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteActivityRequirement', options);
  }

  DeletePoster(id_poster: any) {
    let data = {
      id: id_poster
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'PosterRequest/Delete', options);
  }
  saveRequestRooms(data: RequestRooms) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'Room/CreateRequest', data);
  }
  EditRequestRooms(data: RequestRooms) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'Room/UpdateRequest', data);
  }

  DeleteRequestRooms(id_request: any) {
    let data = {
      id: id_request
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'Room/DeleteRequest', options);
  }

  VerificarDisponibilidadActividad(id: any) {
    return this.httpClient.get<boolean>(environment.apiUrlSchedule + 'Activity/CheckConditionsBy?ActivityId=' + id);
  }

  getOneDocumento(id: any) {
    return this.httpClient.get<ActivityRequirement>(environment.apiUrlSchedule + 'ActivityRequirement/GetBy?Id=' + id);
  }


  GetParticipanteCedula(cedula: any) {
    return this.httpClient.get<ApiResponse>(environment.apiEC + 'GetData/GetParticipants?Cedula=' + cedula);
  }

  ApproveParticipant(data: any) {
    return this.httpClient.post(environment.apiEC + 'ContinuingEducation/AddAR', data);
  }

  GetDetailsCedula(cedula: any) {
    return this.httpClient.get<DetailsParticipante>(environment.apiEC + 'GetData/GetDetail?cedula=' + cedula);
  }

  GetDetailsEFCedula(cedula: any) {
    return this.httpClient.get<DetailsParticipanteEF>(environment.apiEC + 'EFInscription/EFDetails?cedula=' + cedula);
  }

  GetVerifyStudent(cedula: any) {
    return this.httpClient.get<any>(environment.apiEC + 'GetData/GetVerifyStudent?cedula=' + cedula);
  }

  encryptData(data: string, secretKey: string): string {
    try {
      let cadena = CryptoJS.AES.encrypt(data, secretKey).toString();
      const cadenaModificada = cadena.replace(/\//g, '~').replace(/\+/g, '_');
      return cadenaModificada;
    } catch (e) {
      console.error('Error during encryption', e);
      return '';
    }
  }
  decryptData(encryptedData: string, secretKey: string): string {
    try {
      const cadenaModificada = encryptedData.replace(/~/g, '/').replace(/_/g, '+');

      const bytes = CryptoJS.AES.decrypt(cadenaModificada, secretKey);
      if (bytes.toString()) {
        let cadena = bytes.toString(CryptoJS.enc.Utf8);
        return cadena;
      }
      return '';
    } catch (e) {
      console.error('Error during decryption', e);
      return '';
    }
  }

  getActivityStatus(id: number) {
    return this.httpClient.get<GetOneActivity[]>(environment.apiUrlSchedule + 'Activity/GetAll?StatusId=' + id);
  }


  getTemplateActivity(id: any) {
    return this.httpClient.get<DTCertificate>(environment.apiUrlSchedule + 'Activity/GetCertificateTemplateBy?ActivityId=' + id);
  }


  /////////Diseño curricular.

  GetAllPlanStudyActivity(id: any) {
    return this.httpClient.get<PlanStudyActivity[]>(environment.apiUrlSchedule + 'Activity/GetActivityStudyPlansBy?ActivityId=' + id);
  }

  GetOnePlanStudyActivity(id: any) {
    return this.httpClient.get<PlanStudyActivity>(environment.apiUrlSchedule + 'ActivityStudyPlan/GetBy?Id=' + id);
  }
  GetModulesByPlanStudy(id: any) {
    return this.httpClient.get<ActivityDetailModules[]>(environment.apiUrlSchedule + '/ActivityStudyPlan/GetActivityStudyPlanModulesBy?ActivityStudyPlanId=' + id);
  }

  GetModulesByIdModules(id: any) {
    return this.httpClient.get<ActivityDetailModules>(environment.apiUrlSchedule + 'ActivityStudyPlanModule/GetBy?Id=' + id);
  }

  DeleteOneModule(id: any,) {
    let data = {
      id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'ActivityStudyPlan/DeleteModule', options);
  }

  UpdateStudyPlan(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/UpdateStudyPlan', data);
  }
  CreateStudyPlan(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateStudyPlan', data);
  }

  UpdateModule(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'ActivityStudyPlan/UpdateModule', data);
  }
  CreateModule(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'ActivityStudyPlan/CreateModule', data);
  }


  UpdateLearningActivity(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'ActivityStudyPlanModule/UpdateLearningActivity', data);
  }
  CreateLearningActivity(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'ActivityStudyPlanModule/CreateLearningActivity', data);
  }
  DeleleCriterio(id: any,) {
    let data = {
      id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'ActivityStudyPlanModule/DeleteLearningActivity', options);
  }


  UpdateEventsActivity(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/UpdateEvent', data);
  }
  CreateEventsActivity(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateEvent', data);
  }

  DeleteEvents(id: any,) {
    let data = {
      id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteEvent', options);
  }

  GetEventsActivity(id: any) {
    return this.httpClient.get<EventsActivity[]>(environment.apiUrlSchedule + 'Activity/GetEventsBy?ActivityId=' + id);
  }
  GetEncuestaLista(StudentId: any, ActivityId: any, type: any, docente?: string) {
    if (type == 3) {
      return this.httpClient.get<any>(environment.apiUrlSchedule + `Survey/GetSurveysBy?ActivityId=${ActivityId}&SurveyType=${type}&TeacherCedula=${docente}`);

    } else {
      return this.httpClient.get<any>(environment.apiUrlSchedule + `Survey/GetSurveysBy?StudentId=${StudentId}&ActivityId=${ActivityId}&SurveyType=${type}`);

    }
  }

  SaveEncuesta(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Survey/Create', data);
  }

  PostFilterGraficas(data: any) {
    return this.httpClient.post<GraficasEC>(environment.apiUrlSchedule + 'Activity/GetActivitiesStatisticsGroupedBy', data);
  }

  SaveComment(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Survey/CreateComment', data);
  }

  SaveCommentEF(data: any) {
    return this.httpClient.post(environment.apiEF + 'Survey/CreateComment', data);
  }
  AddFileActivity(data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'CurriculumDesign/CreateActivityFromExcel', data);
  }


  initService() {
    this._GetOneActivity = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      curriculumDesignId: 0,
      curriculumDesignName: '',
      activityModeId: 0,
      activityModeName: '',
      activityTypeId: 0,
      activityTypeName: '',
      activityFundsSourceId: 0,
      activityFundsSourceName: '',
      activityReasonId: 0,
      activityReasonName: '',
      activityLocationId: 0,
      activityLocationName: '',
      assignedCoordinatorId: '',
      assignedCoordinatorName: '',
      planningDate: new Date(),
      startDate: new Date(),
      plannedEndDate: new Date(),
      effectiveEndDate: new Date(),
      inscriptionStartDate: new Date(),
      inscriptionEndDate: new Date(),
      isExecuted: false,
      hasDataSheet: false,
      dataSheetDeliveryDate: new Date(),
      digitalReportDeliveryDate: new Date(),
      physicalReportDeliveryDate: new Date(),
      studentWithdrawalEndDate: new Date(),
      isEvaluation: false,
      observations: '',
      duration: 0,
      activityTarget: 0,
      participationProfile: 0,
      studentQuota: 0,
      totalHours: 0,
      onSiteHours: 0,
      synchronousHours: 0,
      asynchronousHours: 0,
      competencies: '',
      content: '',
      learningActivities: '',
      electronicEvaluation: false,
      enrolledStudentsDiploma: 0,
      retiredStudentsDiploma: 0,
      participants: 0,
      male: 0,
      female: 0,
      certificatesReceived: 0,
      hasCertificate: false,
      endTime: new Date(),
      startTime: new Date(),
      generalGoals: '',
      hasSurvey: false,
      justification: '',
      meetLink: '',
      participantAdmissionProfile: '',
      participantGraduateProfile: '',
      specificGoals: '',
      teachingMethodology: '',
      virtualRoom: '',
      activityTrainingType: 0,
      evaluation: '',
      bibliographicCitation: '',
      rubric: false,
      activityClass: 0,
      roomRequests: [
        this._RoomRequest
      ],
      posterRequests: [
        this._PosterRequest
      ],
      activityActivityRequirements: [
        this._ActivityActivityRequirement
      ],
      activityTeachers: [
        this._ActivityTeachers
      ],
      activityCooperatingOrganizations: [
        this._ActivityCooperatingOrganization
      ]
    };
    this._ActivityRequirement = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
    this._ActivityActivityRequirement = {
      statusId: 0,
      id: 0,
      activityRequirement: this._ActivityRequirement
    }
    this._PosterRequest = {
      statusId: 0,
      id: 0,
      approvedBy: '',
      approvalDate: new Date(),
      approvalMessage: '',
      activityId: 0,
      poster: this._Poster,
      activityName: '',
      posterType: 0,
      posterComments: [
        this._PosterComment
      ]
    }
    this._Poster = {
      fileContents: '',
      contentType: '',
      fileDownloadName: '',
      lastModified: '',
      entityTag: '',
      enableRangeProcessing: false,
    }
    this._PosterComment = {
      text: '',
      userId: '',
    }
    this._RoomRequest = {
      statusId: 0,
      id: 0,
      startDate: new Date(),
      endDate: new Date(),
      approvedBy: '',
      approvalDate: new Date(),
      approvalMessage: '',
      activityId: 0,
      activityName: '',
      roomRequestRooms: [
        this._RoomRequestRoom
      ],
      roomRequestRoomRequirements: [
        this._RoomRequestRoomRequirement
      ],
    }
    this._RoomRequestRoomRequirement = {
      statusId: 0,
      id: 0,
      roomRequirement: this._ActivityRequirement,
    }
    this._ActivityTeachers = {
      statusId: 0,
      teacherCedula: '',
      teacherFullName: ''
    }

    this._RoomRequestRoom = {
      statusId: 0,
      id: 0,
      room: this._ActivityRequirement,
    }
  }

  init_EditActivity() {
    this._EditActivity = {
      statusId: 0,
      name: '',
      description: '',
      id: 0,
      activityModeId: 0,
      activityTypeId: 0,
      activityLocationId: 0,
      activityFundsSourceId: 0,
      activityReasonId: 0,
      curriculumDesignId: 0,
      assignedCoordinatorId: '',
      studentQuota: 0,
      planningDate: new Date(),
      startDate: new Date(),
      plannedEndDate: new Date(),
      effectiveEndDate: new Date(),
      inscriptionStartDate: new Date(),
      inscriptionEndDate: new Date(),
      studentWithdrawalEndDate: new Date(),
      dataSheetDeliveryDate: new Date(),
      digitalReportDeliveryDate: new Date(),
      physicalReportDeliveryDate: new Date(),
      isExecuted: false,
      hasDataSheet: false,
      isEvaluation: false,
      observations: '',
      duration: 0,
      totalHours: 0,
      onSiteHours: 0,
      synchronousHours: 0,
      asynchronousHours: 0,
      competencies: '',
      content: '',
      learningActivities: '',
      electronicEvaluation: false,
      participationProfile: 0,
      activityTarget: 0,
      certificatesReceived: 0,
      hasCertificate: false,
      endTime: new Date(),
      startTime: new Date(),
      generalGoals: '',
      hasSurvey: false,
      justification: '',
      meetLink: '',
      participantAdmissionProfile: '',
      participantGraduateProfile: '',
      specificGoals: '',
      teachingMethodology: '',
      virtualRoom: '',
      activityTrainingType: 0,
      evaluation: '',
      bibliographicCitation: '',
      rubric: false,
      activityClass: 0,
    }
  }
  init_RequestRooms() {
    this._RequestRooms = {
      activityId: 0,
      endDate: new Date(),
      startDate: new Date(),
      id: 0,
      statusId: 0,
    }
  }

  init_PlanStudy() {
    this._PlanStudyActivity = {
      statusId: 1,
      id: 0,
      activityId: 0,
      name: '',
      description: '',
      courseOutline: {
        fileContents: '',
        contentType: '',
        fileDownloadName: '',
        lastModified: '',
        entityTag: '',
        enableRangeProcessing: false,
      }
    }
  }

  init_modules_study() {
    this._ActivityDetailModules = {
      statusId: 0,
      id: 0,
      activityStudyPlanId: 0,
      name: '.',
      description: '.',
      synchronousHours: 1,
      asynchronousHours: 1,
      inPersonHours: 1,
      totalHours: 1,
      percentageValue: 1,
      learningGoals: '.',
      competencies: '.',
      subTopics: '.',
      methodologicalStrategy: '.',
      bibliographicCitation: '.',
      learningStrategies: '.',
      evaluation: '.',
      teachingResources: '.',
      createdDate: new Date(),
      activityStudyPlanModuleLearningActivities: [
        {
          statusId: 1,
          id: 0,
          activityStudyPlanModuleId: 0,
          name: '.',
          description: '.'
        }
      ]
    }
  }
  init_ActivityStudyPlanModuleLearningActivity() {
    this._ActivityStudyPlanModuleLearningActivity = {
      statusId: 0,
      id: 0,
      activityStudyPlanModuleId: 0,
      name: '',
      description: ''
    }
  }
  init_EventActivity() {
    this._EventsActivity = {
      statusId: 0,
      id: 0,
      activityId: 0,
      name: '',
      description: '',
      date: new Date(), // O simplemente '', dependiendo de cómo quieras manejar las fechas
      startTime: new Date(), // O simplemente ''
      endTime: new Date(), // O simplemente ''
      teacherCedula: '',
      teacherFullName: '',
      teacherStatusId: '',
    }
  }
  init_estadisticas() {

    this._EstadisticasActivity = {
      activitiesByAll: [
        this._GetOneActivity
      ],
      planningDate: '',
      activityCountByPlanningDate: 0,
      activitiesByPlanningDate: [
        this._GetOneActivity
      ],
      activityModeId: 0,
      activityModeName: '',
      activityCountByActivityModeId: 0,
      activitiesByActivityModeId: [
        this._GetOneActivity
      ],
      activityLocationName: '',
      activityCountByActivityLocationId: 0,
      activitiesByActivityLocationId: [
        this._GetOneActivity
      ],
      assignedCoordinatorId: '',
      activityCountByAssignedCoordinatorId: 0,
      activitiesByAssignedCoordinatorId: [
        this._GetOneActivity
      ],
      activityReasonId: '',
      activityReasonName: '',
      activityCountByActivityReasonId: 0,
      activitiesByActivityReasonId: [
        this._GetOneActivity
      ],
      activityFundsSourceId: '',
      activityFundsSourceName: '',
      activityCountByActivityFundsSourceId: 0,
      activitiesByActivityFundsSourceId: [
        this._GetOneActivity
      ],
      inscriptionStartDate: '',
      activityCountByInscriptionStartDate: 0,
      activitiesByInscriptionStartDate: [
        this._GetOneActivity
      ],
      inscriptionEndDate: '',
      activityCountByInscriptionEndDate: 0,
      activitiesByInscriptionEndDate: [
        this._GetOneActivity
      ],
      startDate: '',
      activityCountByStartDate: 0,
      activitiesByStartDate: [
        this._GetOneActivity
      ],
      plannedEndDate: '',
      activityCountByPlannedEndDate: 0,
      activitiesByPlannedEndDate: [
        this._GetOneActivity
      ],
      effectiveEndDate: '',
      activityCountByEffectiveEndDate: 0,
      activitiesByEffectiveEndDate: [
        this._GetOneActivity
      ],
      dataSheetDeliveryDate: '',
      activityCountByDataSheetDeliveryDate: 0,
      activitiesByDataSheetDeliveryDate: [
        this._GetOneActivity
      ],
      digitalReportDeliveryDate: '',
      activityCountByDigitalReportDeliveryDate: 0,
      activitiesByDigitalReportDeliveryDate: [
        this._GetOneActivity
      ],
      physicalReportDeliveryDate: '',
      activityCountByPhysicalReportDeliveryDate: 0,
      activitiesByPhysicalReportDeliveryDate: [
        this._GetOneActivity
      ],
      statusId: '',
      statusName: '',
      activityCountByStatusId: 0,
      activitiesByStatusId: [
        this._GetOneActivity
      ],
      curriculumDesignId: '',
      curriculumDesignName: '',
      activityCountByCurriculumDesignId: 0,
      activitiesByCurriculumDesignId: [
        this._GetOneActivity
      ],
      hasDataSheet: '',
      activityCountByHasDataSheet: 0,
      activitiesByHasDataSheet: [
        this._GetOneActivity
      ]
    }
  }



}
