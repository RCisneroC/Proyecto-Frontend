import { Component, ElementRef, ViewChild } from '@angular/core';
import { AcadInfoEF, DetailsParticipanteEF } from "../../admission/models/participant";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDetailService } from "../../admission/services/activity-detail.service";
import { MatDialog } from "@angular/material/dialog";
import { VerificarBS64Pipe } from "../../pipes/verificar-bs64.pipe";
import { InscriptionService } from "../../admission/inscription/services/inscription.service";
import { AuthService } from "@core";
import { EnrollDummy } from "../models/EnrollDummy";
import { AddAttendanceFormsComponent } from 'app/teaching-management/add-attendance-forms/add-attendance-forms.component';
import { Direction } from '@angular/cdk/bidi';
import { StudenAsistence } from 'app/teaching-management/models/Asistencias';
import {subjectEnrollmentResult} from "../../admission/models/AddEFacademicResponse";
import {EnrollmentService} from "../services/enrollment.service";

@Component({
  selector: 'app-enroll-details',
  templateUrl: './enroll-details.component.html',
  styleUrls: ['./enroll-details.component.scss']
})
export class EnrollDetailsComponent {

  DisplayNameInfo: string[] = [
    'SubjectName',
    'DegreeName',
    'ClassShift',
    'RoomName',
    'createDate',
    'accion'
  ];

  dataSourceInfo: subjectEnrollmentResult[] = [{
    studentId: 0,
    firstName: '',
    lastName: '',
    cedula: '',
    asignaturaId: 1,
    asignatura: '',
    codigo: '',
    descriptionSuject: '',
    periodsId: 0,
    periodName: '',
    periodDescription: '',
    mallaId: 0,
    mallaName: '',
    degreeId: 0,
    nAmeDegree: ''
  }];
  public _StudenAsistence: StudenAsistence = {
    statusId: 0,
    startDate: new Date(),
    idEstudiante: '',
    cedula: '',
    name: '',
    lastname: '',
    id: 0,
    docente: '',
    idasignatura: '',
    type: ''
  }
  id: string = '';
  enrollDummyList: EnrollDummy[] = [];
  subjectEnrollmentResult: subjectEnrollmentResult[] = []

  dataInfo = new MatTableDataSource<subjectEnrollmentResult>(this.dataSourceInfo);

  @ViewChild('ListaInfo')
  set paginatorInfo(value: MatPaginator) {
    this.dataInfo.paginator = value;
  }

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public elm: ElementRef,
    private _inscriptionService: InscriptionService,
    private _enrollservice: EnrollmentService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {

    this.getDetails();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if(this.id){
        this.getInfo(this.id)
      }

    })
  }

  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetDetailsEFCedula(this.authService.currentUserValue.cedula).subscribe({
      next: (res: DetailsParticipanteEF) => {
        this._ActivityService._DetailsParticipanteEF = res;
        console.log("Activity obj", res);
        if (res.getDetailsResponse.length > 0) {
          this._ActivityService._DetailsResponseEF = this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0];
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }

  getInfo(id: string) {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsSubjects(id,this.authService.currentUserValue.cedula).subscribe({
      next:(res)=>{
        console.log("subjectEnrollmentResult", res.subjectEnrollmentResult);
        this.dataInfo = new MatTableDataSource<subjectEnrollmentResult>(res.subjectEnrollmentResult);
      }
    })



  }

  verAsignatura(row: EnrollDummy) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this._StudenAsistence.cedula = this._ActivityService._DetailsResponseEF.cedula;
    localStorage.setItem('tipoSolicitud', '1');
    const dialogRef = this.dialog.open(AddAttendanceFormsComponent, {
      data: {
        students: this._StudenAsistence,
        action: 'view',
        id: row.SubjectId,
      },
      direction: tempDirection,
    });
  }

  verCalificaciones(row: EnrollDummy) {

  }

  protected readonly Date = Date;
}
