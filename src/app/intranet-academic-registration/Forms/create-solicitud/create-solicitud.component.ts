import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { RequestVarious } from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { ActivityService } from '../../../admission/maestros/services/activity.service';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id: string;
  action: string;
  request: RequestVarious;
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
  RequestVarious: RequestVarious;

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

  public TypeRequest = [
    {
      id: 1,
      name: 'Peticiones informativas',
    },
    {
      id: 2,
      name: 'Quejas',
    },
    {
      id: 3,
      name: 'Sugerencias',
    },
    {
      id: 4,
      name: 'Reclamos por actividad o examen en plataforma',
    },
    {
      id: 5,
      name: 'Retiros',
    },
    {
      id: 6,
      name: 'Reingresos',
    },
    {
      id: 7,
      name: 'Reclamos por deficiencias de servicios tecnologicas de la entidad educativa',
    },
    {
      id: 8,
      name: 'Solicitudes de estudiantes y participantes',
    },
  ];
  public _GetOneActivity: GetOneActivity[] = [
    this._ActivityService._GetOneActivity
  ];
  public _DataLocal: RequestVarious[] = [
    // {
    //   id: 0,
    //   name: '',
    //   lastname: '',
    //   idSolicitante: 0,
    //   numberPhone: '',
    //   email: '',
    //   typeUser: 0,
    //   typeRequest: 0,
    //   nameTypeRequest: '',
    //   typeActivityAcademy: 0,
    //   idSubjectOrActivity: 0,
    //   nameActivitySubject: '',
    //   dateCreate: new Date(),
    //   statusId: 0,
    //   comments: ''
    // }
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
  constructor(
    public dialogRef: MatDialogRef<CreateSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public RequestVariousService: RequestServicesService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    public _SubjectService: SubjectServiceService,
    public _ActivityService: ActivityDetailService
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
    } this.getActivityOneStatus();
    this.getSubjectStatus();
    this.RequestVarious.statusId = 1;
    this.RequestVariousForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    if (this.action === 'edit') {
      console.log(this.data.request);

      return this.fb.group({
        idSolicitante: [this.data.request.idSolicitante, [Validators.required]],
        name: [this.authService.currentUserValue.firstName, [Validators.required]],
        lastname: [this.authService.currentUserValue.lastName, [Validators.required]],
        typeUser: [this.data.request.typeUser, [Validators.required]],
        typeRequest: [this.data.request.typeRequest, [Validators.required]],
        typeActivityAcademy: [this.data.request.typeActivityAcademy, [Validators.required]],
        idSubjectOrActivity: [this.data.request.idSubjectOrActivity, [Validators.required]],
        dateCreate: [this.data.request.dateCreate, [Validators.required]],
        statusId: [this.data.request.statusId, [Validators.required]],
        comments: [this.data.request.comments, [Validators.required]],
        email: [this.data.request.email, [Validators.required]],
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

      this._DataLocal[parseInt(this.data.id)] = this.RequestVariousForm.getRawValue();
      console.log('====================================');
      console.log(this._DataLocal);
      console.log('====================================');
      localStorage.setItem('solicitudes', JSON.stringify(this._DataLocal));
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Editado correctamente.';
      this.dialogRef.close(this.ResponseMessage);
    } else {
      console.log(this._DataLocal);

      this._DataLocal.push(this.RequestVariousForm.getRawValue());
      localStorage.setItem('solicitudes', JSON.stringify(this._DataLocal));
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Creado correctamente.';
      this.dialogRef.close(this.ResponseMessage);
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
