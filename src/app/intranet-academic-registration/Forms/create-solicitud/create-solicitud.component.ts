import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import {
  RequestVarious,
  RequestVariousItem,
  RequestVariousType
} from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { ActivityService } from '../../../admission/maestros/services/activity.service';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { EnrollmentService } from "../../../enrollment/services/enrollment.service";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { subjectEnrollmentResult } from "../../../admission/models/AddEFacademicResponse";
import { Career } from "../../../enrollment/models/Career";
export interface DialogData {
  id: string;
  action: string;
  request: RequestVariousItem;
}
@Component({
  selector: 'app-create-solicitud',
  templateUrl: './create-solicitud.component.html',
  styleUrls: ['./create-solicitud.component.scss']
})
export class CreateSolicitudComponent {
  action: string;
  dialogTitle: string;
  RequestVariousForm: UntypedFormGroup;
  RequestVarious: RequestVariousItem;

  public typeActivityAcademy = [
    {
      id: 1,
      name: 'Formación Especializada'
    },
    {
      id: 2,
      name: 'Entrenamiento'
    }
  ];

  public _GetOneActivity: GetOneActivity[] = [
    this._ActivityService._GetOneActivity
  ];
  public _DataLocal: RequestVariousItem[] = [
  ];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public _Subject: Subject[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      number: 0,
      acronym: '',
      code: '',
      numOfCredits: 0,
      numOfHours: 0,
      numOfClasses: 0,
      hasLaboratory: false,
      evaluationCriteria: '',
      synchronousHours:0,
      asynchronousHours:0,
    }
  ];

  public _Career: Career[] = [{
    aspirantId: 0,
    ejInscriptionId: 0,
    createDate: '',
    firstName: '',
    lastName: '',
    degreeCurriculumDesignId: 0,
    mCurriculumName: '',
    descriptionName: '',
    degreeId: 0,
    cedula: '',
    telephoneNumber: '',
    email: '',
    statusDegreeCurriculumDesign: 0,
    annualPlanId: 0,
    startDate: new Date,
    endDate: new Date,
    degreeCurriculumDesignTarget: 0
  }]

  public _SubjectMatriculas: subjectEnrollmentResult[] = [{
    studentId: 0,
    firstName: "",
    lastName: "",
    cedula: "",
    asignaturaId: 1,
    asignatura: "",
    codigo: "",
    descriptionSuject: "",
    periodsId: 0,
    periodName: "",
    periodDescription: "",
    mallaId: 0,
    mallaName: "",
    degreeId: 0,
    nAmeDegree: "",
    teacherCedula: "",
    years: 0,
    subjectStatusId: 0

  }]

  public userType: string = '';
  public IdTypeUser: number = 0;
  public DestinationEFRecordID: number = 0;
  public EFRecordID: number = 0;
  public ECRecordID: number = 0;
  public RequesttypeList: RequestVariousType[] = [];
  public RequesttypeSelect: number = 0;
  public typeActivityAcademySelected: number = 1;
  public careerSelected: number = 1;
  public careerDestinySelected: number = 1;
  public idSubjectOrActivity: number = 1;
  public valueDesabled: boolean = false;
  public typeDesabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public RequestVariousService: RequestServicesService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    public _SubjectService: SubjectServiceService,
    public _ActivityService: ActivityDetailService,
    public _EnrolmentService: EnrollmentService
  ) {
    // Set the defaults

    this.userType = this.getRoleFromToken(this.authService.currentUserValue.token);
    _SubjectService.init_Subject();
    this.action = data.action;
    console.log('====================================');
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Solicitud";
      this.RequestVarious = data.request;
    } else {
      this.dialogTitle = 'Crear Solicitud';
      this.RequestVarious = data.request;

    }
    if (this.userType == 'Administrador') {
      this.IdTypeUser = 3;
    }
    if (this.userType == 'Estudiante') {
      this.IdTypeUser = 2;
    }
    if (this.userType == 'Profesor') {
      this.IdTypeUser = 1;
    }
    this.getActivityOneStatus();
    this.getSubjectStatus();
    this.RequestVarious.requestVariousStatusTypeId = 1;
    this.RequestVariousForm = this.createContactForm();
    this.loadNeededData();
    this.loadrequestType();
  }

  loadNeededData() {
    this._EnrolmentService.GetStudentsmesh(this.authService.currentUserValue.cedula).subscribe({
      next: (rest) => {
        if(rest.studentInnfo){
          this._Career = rest.studentInnfo;
          this.careerSelected = rest.studentInnfo[0].degreeCurriculumDesignId;
        }

        this._EnrolmentService.GetStudentsSubjects(rest.studentInnfo[0].degreeCurriculumDesignId.toString(), this.authService.currentUserValue.cedula).subscribe({
          next: (result) => {
            this._SubjectMatriculas = result.subjectEnrollmentResult;
            if (rest.studentInnfo) {
              this._EnrolmentService.SearchEFAcademicRecordMethod(result.subjectEnrollmentResult[0].studentId, rest.studentInnfo[0].degreeCurriculumDesignId).subscribe({
                next: (res) => {
                  if (res.data) {
                    this.EFRecordID = res.data[0].id;
                  }
                }
              })
            }
          }
        })


      }
    })

    this._EnrolmentService.GetStudentsActivity(this.authService.currentUserValue.cedula).subscribe({
      next: (res) => {
        console.log(res);
        if (res.getStudentsActivityResponse) {
          this._EnrolmentService.SearchECAcademicRecordMethod(res.getStudentsActivityResponse[0].acivityId, false, res.getStudentsActivityResponse[0].participantId).subscribe({
            next: (res) => {
              if (res.data) {
                this.ECRecordID = res.data[0].id;
              }
            }
          })
        }
      }
    })

  }

  loadrequestType() {
    this.RequestVariousService.GetAllRequestVariousType().subscribe({
      next: (res) => {
        if (this.IdTypeUser == 1) {
          this.RequesttypeList = res.data.filter(x => x.id == 12 || x.id == 13 || x.id == 15  || x.id == 3 || x.id == 2 || x.id == 3 || x.id == 1);
        }
        if (this.IdTypeUser == 2) {
          this.RequesttypeList = res.data.filter(x => x.id == 10 || x.id == 11 || x.id == 14 || x.id == 16 || x.id == 5 || x.id == 6 || x.id == 9 || x.id == 8 || x.id == 7 || x.id == 4 || x.id == 3 || x.id == 2 || x.id == 1 || x.id == 20);
        }
        if (this.IdTypeUser == 3) {
          this.RequesttypeList = res.data
        }
        //const req1: RequestVariousType = {id: 30, name: "Retirar todas las asignaturas de periódo actual", description: "Retirar todas las carreras de periódo actual"};
        //const req2: RequestVariousType = {id: 31, name: "Reingresar a la carrera", description: "Reingresar todas las carreras de periódo actual"};
        //this.RequesttypeList.push(req1);
        //this.RequesttypeList.push(req2);

      }
    })
  }

  changeRequesttype() {
    this.RequesttypeSelect = + this.RequesttypeSelect;
    switch (this.RequesttypeSelect) {
      case 1:
      //true
        this.valueDesabled = false;
        //true
        this.typeDesabled = false;
        break;
      case 2:
       //true
        this.valueDesabled = false;
        //true
        this.typeDesabled = false;
        break;
      case 3:
       //true
        this.valueDesabled = false;
        //true
        this.typeDesabled = false;
        break;
      case 7:
      //true
        this.valueDesabled = false;
        //true
        this.typeDesabled = false;
        break;
      case 10:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        //true
        this.typeDesabled = false;
        break;
      case 11:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        //true
        this.typeDesabled = false;
        break;
      case 12:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        //true
        this.typeDesabled = false;
        break;
      case 13:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 2
        //true
        this.typeDesabled = false;
        break;
      case 14:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        this.typeDesabled = false;
        break;
      case 15:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 2
        this.typeDesabled = true;
        break;
      case 16:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 2
        //true
        this.typeDesabled = false;
        break;
     /* case 5:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        this.typeDesabled = true;
        break;
      case 6:
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        this.typeDesabled = true;
        break;*/
      case 9:
      
        this.valueDesabled = false;
        this.typeActivityAcademySelected = 1
        //true
        this.typeDesabled = false;
        break;
      case 30:
      //true
        this.valueDesabled = false
        break;
      default:
        this.valueDesabled = false;
        this.typeDesabled = false;
        break;
    }
  }

  createContactForm(): UntypedFormGroup {
    if (this.action === 'edit') {
      console.log('Update request', this.data.request);

      return this.fb.group({
        idSolicitante: [this.data.request.userRequest, [Validators.required]],
        name: [this.authService.currentUserValue.firstName, [Validators.required]],
        lastname: [this.authService.currentUserValue.lastName, [Validators.required]],
        typeUser: [this.data.request.requestVariousApplicantUserTypeId, [Validators.required]],
        typeRequest: [this.data.request.requestVariousTypeId, [Validators.required]],
        typeActivityAcademy: [this.data.request.subject ? 1 : 2, [Validators.required]],
        career: [''],
        idSubjectOrActivity: [this.data.request.subjectId ? this.data.request.subjectId : this.data.request.activityId, [Validators.required]],
        dateCreate: [this.data.request.createdDate, [Validators.required]],
        statusId: [this.data.request.requestVariousStatusTypeId, [Validators.required]],
        comments: [this.data.request.description, [Validators.required]],
        email: [this.data.request.infoUserRquest.email, [Validators.required]],
      });
    } else {
      return this.fb.group({
        idSolicitante: [this.authService.currentUserValue.id, [Validators.required]],
        name: [this.authService.currentUserValue.firstName, [Validators.required]],
        lastname: [this.authService.currentUserValue.lastName, [Validators.required]],
        typeUser: [this.userType, [Validators.required]],
        typeRequest: ['', [Validators.required]],
        typeActivityAcademy: ['', [Validators.required]],
        career: [''],
        idSubjectOrActivity: ['', [Validators.required]],
        dateCreate: [new Date(), [Validators.required]],
        statusId: ['3', [Validators.required]],
        comments: ['', [Validators.required]],
        email: [this.authService.currentUserValue.email, [Validators.required]],
      });


    }
  }
  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    let dataL = localStorage.getItem('solicitudes') || '';
    if (dataL != '') {
      this._DataLocal = JSON.parse(dataL);
    }

    console.log(this.RequestVariousForm);
    
    // emppty stuff
    if (this.action === 'edit') {
      console.log(this.data);
      const value = this.RequestVariousForm.getRawValue();
      const UpdateRequestVariousData = {
        id: this.data.request.id,
        description: value.comments,
        assignedUser: value.idSolicitante,
        requestVariousStatusTypeId: value.statusId,
        response: "pendiente"
      }
      this.RequestVariousService.UpdateRequestVarious(UpdateRequestVariousData).subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        }
      })

    } else {
      const value = this.RequestVariousForm.getRawValue();
      if (value.typeRequest == 1 || value.typeRequest == 2 || value.typeRequest == 3 || value.typeRequest == 7 || value.typeRequest == 12 || value.typeRequest == 13 || value.typeRequest == 15) {

        const generalrequest = {
          userRequest: value.idSolicitante,
          description: value.comments,
          requestVariousTypeId: value.typeRequest,
          requestVariousApplicantUserTypeId: this.IdTypeUser,
          periodId: this.typeActivityAcademySelected === 2 ? 0 : (this._SubjectMatriculas[0]?.periodsId || 0),
          subjectId: this.typeActivityAcademySelected === 1 ? value.idSubjectOrActivity :0 ,
          ActivityId: this.typeActivityAcademySelected === 2 ? value.idSubjectOrActivity:0 ,
        }
        
        this.RequestVariousService.CreateGeneralRequestVarious(generalrequest).subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusCode == 200) {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Creado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        })
      }
      else {
        if (value.typeRequest == 20 || value.typeRequest == 6 || value.typeRequest == 9) {
          if (value.typeRequest == 20) {
            const EFCreateWithdrawalAndReentryRequestData = {
              userRequest: value.idSolicitante,
              description: value.comments,
              requestVariousTypeId: 5,
              requestVariousApplicantUserTypeId: this.IdTypeUser,
              subjectId: null,
              efAcademicRecordId: this.EFRecordID == 0 ? null : this.EFRecordID
            }
            this.RequestVariousService.EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData).subscribe({
              next: (res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Creado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              }
            })
          }
          if (value.typeRequest == 6) {
            const EFCreateWithdrawalAndReentryRequestData = {
              userRequest: value.idSolicitante,
              description: value.comments,
              requestVariousTypeId: 6,
              requestVariousApplicantUserTypeId: this.IdTypeUser,
              subjectId: null,
              efAcademicRecordId: this.EFRecordID == 0 ? null : this.EFRecordID
            }
            this.RequestVariousService.EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData).subscribe({
              next: (res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Creado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              }
            })
          }
          if (value.typeRequest == 9) {
            const EFCreateWithdrawalAndReentryRequestData = {
              userRequest: value.idSolicitante,
              description: value.comments,
              requestVariousTypeId: value.typeRequest,
              requestVariousApplicantUserTypeId: this.IdTypeUser,
              subjectId: value.idSubjectOrActivity,
              efAcademicRecordId: this.EFRecordID == 0 ? null : this.EFRecordID,
              destinationEFAcademicRecordId: this.DestinationEFRecordID
            }
            this.RequestVariousService.EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData).subscribe({
              next: (res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Creado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              }
            })
          }

        }
        else {
          if (value.typeActivityAcademy == 1) {
            const EFCreateWithdrawalAndReentryRequestData = {
              userRequest: value.idSolicitante,
              description: value.comments,
              requestVariousTypeId: value.typeRequest,
              requestVariousApplicantUserTypeId: this.IdTypeUser,
              subjectId: value.idSubjectOrActivity,
              efAcademicRecordId: this.EFRecordID == 0 ? null : this.EFRecordID
            }
            this.RequestVariousService.EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData).subscribe({
              next: (res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Creado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              }
            })
          }
          if (value.typeActivityAcademy == 2) {
            const ECCreateWithdrawalAndReentryRequestData = {
              userRequest: value.idSolicitante,
              description: value.comments,
              requestVariousTypeId: value.typeRequest,
              requestVariousApplicantUserTypeId: this.IdTypeUser,
              ecAcademicRecordId: this.ECRecordID
            }
            this.RequestVariousService.ECCreateWithdrawalAndReentryRequest(ECCreateWithdrawalAndReentryRequestData).subscribe({
              next: (res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Creado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              }
            })
          }
        }

      }


    }

  }

  changecarrer(event: any) {
    console.log('careerSelected:', event);
    this._EnrolmentService.GetStudentsSubjects(event.toString(), this.authService.currentUserValue.cedula).subscribe({
      next: (res) => {
        this._SubjectMatriculas = res.subjectEnrollmentResult;
        if (this.RequesttypeSelect == 9) {
          this._EnrolmentService.SearchEFAcademicRecordMethod(res.subjectEnrollmentResult[0].studentId, event).subscribe({
            next: (res) => {
              if (res.data) {
                this.ECRecordID = res.data[0].id;
              }
            }
          })
        }
      }
    })
  }

  changeDestinycarrer(event: any) {
    console.log('careerdestinySelected:', event);
    this._EnrolmentService.GetStudentsSubjects(event.toString(), this.authService.currentUserValue.cedula).subscribe({
      next: (res) => {
        //this._SubjectMatriculas = res.subjectEnrollmentResult;
        if (this.RequesttypeSelect == 9) {
          this._EnrolmentService.SearchEFAcademicRecordMethod(res.subjectEnrollmentResult[0].studentId, event).subscribe({
            next: (res) => {
              if (res.data) {
                this.DestinationEFRecordID = res.data[0].id;
                console.log("DestinationEFRecordID", this.DestinationEFRecordID);
              }
            }
          })
        }
      }
    })
  }

  getActivityOneStatus() {
    this._ActivityService.getActivityStatus(5).subscribe({
      next: (res: any) => {
        this._GetOneActivity = res;
      }
    })
  }

  getSubjectStatus() {
    this._SubjectService.getAllSubjectFiltro(1).subscribe({
      next: (res: any) => {
        this._Subject = res;

      }
    })
  }


  public getRoleFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  public decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    return JSON.parse(decodedPayload);
  }

  protected readonly pdfDefaultOptions = pdfDefaultOptions;
}
