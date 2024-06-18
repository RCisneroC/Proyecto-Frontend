import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import {
  RequestVariousItem,
  RequestVariousType
} from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { EnrollmentService } from "../../../enrollment/services/enrollment.service";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { Degree } from 'app/admission/FormalEducations/Models/Degree';

export interface DialogData {
  id: string;
  action: string;
  request: RequestVariousItem;
}
@Component({
  selector: 'app-create-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.scss']
})
export class EditSolicitudComponent {
  dialogTitle: string;
  RequestVariousForm: UntypedFormGroup;
  RequestVarious: RequestVariousItem;


  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

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
    public dialogRef: MatDialogRef<EditSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public RequestVariousService: RequestServicesService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    public _SubjectService: SubjectServiceService,
    public _ActivityService: ActivityDetailService,
    public _EnrolmentService: EnrollmentService,
    public degreeService:DegreeService
  ) {
    this.userType = this.getRoleFromToken(this.authService.currentUserValue.token);

    this.dialogTitle = "Agregar Comentarios";
    this.RequestVarious = data.request;

    if (this.userType == 'Administrador') {
      this.IdTypeUser = 3;
    }
    if (this.userType == 'Estudiante') {
      this.IdTypeUser = 2;
    }
    if (this.userType == 'Profesor') {
      this.IdTypeUser = 1;s

    }

    this.RequestVariousForm = this.createContactForm();
    console.log(this.data)
  }

  createContactForm(): UntypedFormGroup {
      return this.fb.group({
        idSolicitante: [this.data.request.userRequest],
        name: [this.authService.currentUserValue.firstName],
        lastname: [this.authService.currentUserValue.lastName],
        typeUser: [this.data.request.requestVariousApplicantUserTypeId],
        typeRequest: [this.data.request.requestVariousTypeId],
        typeActivityAcademy: [this.data.request.subject ? 1 : 2],
        career: [''],
        idSubjectOrActivity: [this.data.request.subjectId ? this.data.request.subjectId : this.data.request.activityId],
        dateCreate: [this.data.request.createdDate],
        statusId: [this.data.request.requestVariousStatusTypeId],
        comments: [this.data.request.description],
        email: [this.data.request.infoUserRquest.email],
      });
  }



  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
      const value = this.RequestVariousForm.getRawValue();
      const UpdateRequestVariousData = {
        id: this.data.request.id,
        description: value.comments,
        assignedUser: value.idSolicitante,
        requestVariousStatusTypeId: value.statusId,
        response: "pendiente",
        statusId:value.statusId
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

  public getDegree(){

    this.degreeService.getAllDegree2().subscribe(
      {
        next : (request:Degree[]) =>{

        }
      }
    )


  }

  protected readonly pdfDefaultOptions = pdfDefaultOptions;
}
