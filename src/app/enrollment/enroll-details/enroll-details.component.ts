import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { subjectEnrollmentResult } from "../../admission/models/AddEFacademicResponse";
import { EnrollmentService } from "../services/enrollment.service";
import { EncuestaSubjectComponent } from '../Encuestas/encuesta-subject/encuesta-subject.component';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll-details',
  templateUrl: './enroll-details.component.html',
  styleUrls: ['./enroll-details.component.scss']
})
export class EnrollDetailsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

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
    public dialog: MatDialog
  ) {
    super();
    this.getDetails();
    this.getInfo();
  }
  ngOnInit(): void {

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

  getInfo() {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsSubjects('3', this.authService.currentUserValue.cedula).subscribe({
      next: (res) => {
        this.dataSourceInfo = res.subjectEnrollmentResult;
        console.log("subjectEnrollmentResult", res.subjectEnrollmentResult);
        this.dataInfo = new MatTableDataSource<subjectEnrollmentResult>(res.subjectEnrollmentResult);
        this.EncuestForms();
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

  EncuestForms() {
    const dialogRef = this.dialog.open(EncuestaSubjectComponent, {
      data: {
        subject: this.dataSourceInfo,
        action: 'encuesta',
      },
      width: '900px',
      disableClose: true
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }


  protected readonly Date = Date;
}
