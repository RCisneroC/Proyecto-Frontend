import { Injectable } from '@angular/core';
import { ActivityActivityRequirement, ActivityCooperatingOrganization, ActivityRequirement, ActivityTeachers, GetOneActivity, Poster, PosterComment, PosterRequest, RoomRequest, RoomRequestRoom, RoomRequestRoomRequirement } from '../models/GetOneActivity';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from '../models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';
import { DetalleDocente, ListCourse, ListSpecialty, ListTraining } from '../models/docentes';

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
        statusId:0,
        id:0,
        name:'',
        logo:'',
        description:'',
    }
  }
  public _ActivityTeachers: ActivityTeachers = {
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }

    public _GetOneActivity:GetOneActivity={
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
      startTime: new Date(),
      endTime: new Date(),
      isExecuted: false,
      numOfAssignedTeachers: 0,
      hasDataSheet: false,
      dataSheetDeliveryDate: new Date(),
      digitalReportDeliveryDate: new Date(),
      physicalReportDeliveryDate: new Date(),
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
      certificatesReceived: 0,
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
    public _ListCourse:ListCourse={
      courseId: 0,
      year:0
    }
    public _ListSpecialty:ListSpecialty={
      specialtyId:0
    }
    public _ListTraining:ListTraining={
      trainingId: 0,
      typeId: 0,
      year:0
    }
 

  public _DetalleDocente: DetalleDocente = {
    cedula:                 0,
    name:                   '',
    lastName:               '',
    applicationDate:        new Date(),
    selected:               false,
    dischargeDate:          new Date(),
    placeResidence:         '',
    jobTitle:               '',
    graduateDegree:         '',
    professionalExperience: '',
    teachingExperience:     '',
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
    process:                0,
    topics:                 0,
  };
   public _ListadoDocentes: DetalleDocente[] = [this._DetalleDocente];
  public loading: boolean = false;
   isTblLoading = true;
  dataChange: BehaviorSubject<PosterRequest[]> = new BehaviorSubject<
  PosterRequest[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
    // this.initService()
  }
  get data(): PosterRequest[] {
    return this.dataChange.value;
  }
  GetOneActivity(id:string) {
    return this.httpClient.get<GetOneActivity>(environment.apiUrlSchedule + 'Activity/GetBy?Id=' + id);
  }
  SavePoster(data:any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'PosterRequest/Create',data);
  }
 
  GetAllTeacher() {
    return this.httpClient.get<DetalleDocente[]>(environment.ConsultaDocentes + 'Teacher/GetAll');
  }

  AddTeachers(data:any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateActivityTeacher',data);
  }

  AddCooperating(data:any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateCooperatingOrganization',data);
  }

  
  DeleteTeacherRequirement(id_actividad:any,teacherCedula:any) {
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
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteActivityTeacher',options);
  }
    DeleteCooperating(id_actividad:any,cooperatingOrganizationId:any) {
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
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteCooperatingOrganization',options);
  }



  ApproveCurilculum(data:any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/Approve',data);
  }
  ApproveCurilculumActivity(data:any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/ApproveActivity',data);
  }

  ApprovedPoster(data:any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'PosterRequest/Approve',data);
  }

    getPosterRequest(id:number) {
    return this.httpClient.get<PosterRequest>(environment.apiUrlSchedule + 'PosterRequest/GetBy?Id='+id);
  }


  
  getRequestPoster(id:any) {
    return this.httpClient.get<PosterRequest[]>(environment.apiUrlSchedule + 'PosterRequest/GetAll?StatusId='+id).subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        },
      });
  }

  // API GUARDAR DOCUMENTO.

  AddDocumentRequirement(data:any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Activity/CreateActivityRequirement',data);
  }

  DeleteDocumentRequirement(id_requirement:any,id_actividad:any) {
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
    return this.httpClient.delete(environment.apiUrlSchedule + 'Activity/DeleteActivityRequirement',options);
  }

    DeletePoster(id_poster:any) {
    let data = {
      id: id_poster
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'PosterRequest/Delete',options);
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
      startTime: new Date(),
      endTime: new Date(),
      isExecuted: false,
      numOfAssignedTeachers: 0,
      hasDataSheet: false,
      dataSheetDeliveryDate: new Date(),
      digitalReportDeliveryDate: new Date(),
      physicalReportDeliveryDate: new Date(),
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
      certificatesReceived: 0,
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
    this._ActivityRequirement={
      statusId:0,
      id:0,
      name:'',
      description:'',
    }
    this._ActivityActivityRequirement={
      statusId:0,
      id:0,
      activityRequirement: this._ActivityRequirement
    }
    this._PosterRequest={
      statusId:0,
      id:0,
      approvedBy:'',
      approvalDate:new Date(),
      approvalMessage:'',
      activityId:0,
      poster: this._Poster,
      activityName:'',
      posterComments: [
        this._PosterComment
      ]
    }
    this._Poster={
      fileContents:'',
      contentType:'',
      fileDownloadName:'',
      lastModified:'',
      entityTag:'',
      enableRangeProcessing:false,
    }
    this._PosterComment={
      text:'',
      userId:'',
    }
    this._RoomRequest={
      statusId:0,
      id:0,
      startDate:new Date(),
      endDate:new Date(),
      approvedBy:'',
      approvalDate:new Date(),
      approvalMessage:'',
      activityId:0,
      roomRequestRooms:[
        this._RoomRequestRoom
      ],
      roomRequestRoomRequirements:[
        this._RoomRequestRoomRequirement
      ],
    }
    this._RoomRequestRoomRequirement={
      statusId:0,
      id:0,
      roomRequirement:this._ActivityRequirement,
    }
    this._ActivityTeachers = {
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }

    this._RoomRequestRoom={
      statusId:0,
      id:0,
      room:this._ActivityRequirement,
    }
  }
}
