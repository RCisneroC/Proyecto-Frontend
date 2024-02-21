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
import {EnrollmentService} from "../../../enrollment/services/enrollment.service";
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
    }
  ];

  public userType: string = '';
  public IdTypeUser: number = 0;
  public EFRecordID: number = 0;
  public ECRecordID: number = 0;
  public RequesttypeList: RequestVariousType[] = [];

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

  loadNeededData(){
    this._EnrolmentService.GetStudentsmesh(this.authService.currentUserValue.cedula).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.studentInnfo){
          this._EnrolmentService.SearchEFAcademicRecordMethod(res.studentInnfo[0].aspirantId,res.studentInnfo[0].degreeCurriculumDesignId).subscribe({
            next:(res)=>{
              if(res.data){
                this.EFRecordID = res.data[0].id;
              }
            }
          })
        }

      }
    })

    this._EnrolmentService.GetStudentsActivity(this.authService.currentUserValue.cedula).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.getStudentsActivityResponse){
          this._EnrolmentService.SearchECAcademicRecordMethod(res.getStudentsActivityResponse[0].acivityId,false, res.getStudentsActivityResponse[0].participantId).subscribe({
            next:(res)=>{
              if(res.data){
                this.ECRecordID = res.data[0].id;
              }
            }
          })
        }
      }
    })
  }

  loadrequestType(){
    this.RequestVariousService.GetAllRequestVariousType().subscribe({
      next:(res)=>{
        this.RequesttypeList = res.data;
      }
    })
  }

  createContactForm(): UntypedFormGroup {
    if (this.action === 'edit') {
      console.log('Update request',this.data.request);

      return this.fb.group({
        idSolicitante: [this.data.request.userRequest, [Validators.required]],
        name: [this.authService.currentUserValue.firstName, [Validators.required]],
        lastname: [this.authService.currentUserValue.lastName, [Validators.required]],
        typeUser: [this.data.request.requestVariousApplicantUserTypeId, [Validators.required]],
        typeRequest: [this.data.request.requestVariousTypeId, [Validators.required]],
        typeActivityAcademy: [this.data.request.subject ? 1 : 2, [Validators.required]],
        idSubjectOrActivity: [this.data.request.subjectId ? this.data.request.subjectId: this.data.request.activityId , [Validators.required]],
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
        next:(res)=>{
          if(res.statusCode == 200){
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        }
      })

    } else {
      const value = this.RequestVariousForm.getRawValue();
      if(value.typeRequest != 5 && value.typeRequest != 6){

        const generalrequest = {
          userRequest: value.idSolicitante,
          description: value.comments,
          requestVariousTypeId: value.typeRequest,
          requestVariousApplicantUserTypeId: this.IdTypeUser,
          subjectId: value.idSubjectOrActivity
        }
        this.RequestVariousService.CreateGeneralRequestVarious(generalrequest).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.statusCode == 200){
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Creado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        })
      }
      else {
        if(value.typeActivityAcademy == 1){
          const EFCreateWithdrawalAndReentryRequestData = {
            userRequest: value.idSolicitante,
            description: value.comments,
            requestVariousTypeId: value.typeRequest,
            requestVariousApplicantUserTypeId: this.IdTypeUser,
            subjectId: value.idSubjectOrActivity,
            efAcademicRecordId: this.EFRecordID
          }
          this.RequestVariousService.EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData).subscribe({
            next:(res)=>{
              console.log(res);
              if(res.statusCode == 200){
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Creado correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              }
            }
          })
        }
        if(value.typeActivityAcademy == 2){
          const ECCreateWithdrawalAndReentryRequestData = {
            userRequest: value.idSolicitante,
            description: value.comments,
            requestVariousTypeId: value.typeRequest,
            requestVariousApplicantUserTypeId: this.IdTypeUser,
            ecAcademicRecordId: this.ECRecordID
          }
          this.RequestVariousService.ECCreateWithdrawalAndReentryRequest(ECCreateWithdrawalAndReentryRequestData).subscribe({
            next:(res)=>{
              console.log(res);
              if(res.statusCode == 200){
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

}
