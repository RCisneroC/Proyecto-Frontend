import { Component, ElementRef, ViewChild } from '@angular/core';
import { StudenAsistence } from "../../teaching-management/models/Asistencias";
import { EnrollDummy } from "../models/EnrollDummy";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDetailService } from "../../admission/services/activity-detail.service";
import { InscriptionService } from "../../admission/inscription/services/inscription.service";
import { EnrollmentService } from "../services/enrollment.service";
import { AuthService } from "@core";
import { MatDialog } from "@angular/material/dialog";
import { DetailsParticipanteEF } from "../../admission/models/participant";
import { Direction } from "@angular/cdk/bidi";
import {
  AddAttendanceFormsComponent
} from "../../teaching-management/add-attendance-forms/add-attendance-forms.component";
import { getStudentsActivityResponse, subjectEnrollmentResult } from "../../admission/models/AddEFacademicResponse";
import { Career } from "../models/Career";
import { TutorECAttendenceFormComponent } from "../../tutor/tutor-ecattendence-form/tutor-ecattendence-form.component";
import {
  TutorECCalificationFormComponent
} from "../../tutor/tutor-eccalification-form/tutor-eccalification-form.component";
import { AddFinalGradeComponent } from 'app/teaching-management/add-final-grade/add-final-grade.component';
import { ViewPosterPDFComponent } from "../../admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import { VerificarBS64Pipe } from "../../pipes/verificar-bs64.pipe";
import Swal from "sweetalert2";

@Component({
  selector: 'app-enroll-details-mesh',
  templateUrl: './enroll-details-mesh.component.html',
  styleUrls: ['./enroll-details-mesh.component.scss']
})
export class EnrollDetailsMeshComponent {

  DisplayNameInfo: string[] = [
    'SubjectName',
    'DegreeName',
    'ClassShift',
    'RoomName',
    'createDate',
    'accion'
  ];

  dataSourceActInfo: getStudentsActivityResponse[] = [{
    participantId: '',
    acivityId: 0,
    cedula: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    acitityName: '',
    duration: 0,
    totalHours: 0,
    activityModeName: '',
    activityTypeName: '',
    activityLocationName: '',
    degreeCurriculumDesignId: 0
  }];

  dataActInfo = new MatTableDataSource<getStudentsActivityResponse>(this.dataSourceActInfo);
  loading: boolean = true;
  eCAcademicRecordId: number = 0;
  dataSourceInfo: Career[] = [{
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
    startDate: new Date(),
    endDate: new Date(),
    degreeCurriculumDesignTarget: 0
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

  subjectEnrollmentResult: subjectEnrollmentResult[] = []

  dataInfo = new MatTableDataSource<Career>(this.dataSourceInfo);

  @ViewChild('ListaInfo')
  set paginatorInfo(value: MatPaginator) {
    this.dataInfo.paginator = value;
  }

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public elm: ElementRef,
    private _enrollservice: EnrollmentService,
    public _dialog: MatDialog,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.getDetails();
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
        this.getInfo();
        this.loadactivity();
      },
      error: (err) => {
      }
    })
  }

  getInfo() {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsmesh(this._ActivityService._DetailsResponseEF.cedula).subscribe({
      next: (res) => {
        console.log("Result", res.studentInnfo);
        this.dataInfo = new MatTableDataSource<Career>(res.studentInnfo);
      }
    })

  }

  loadactivity() {
    this._enrollservice.GetStudentsActivity(this._ActivityService._DetailsResponseEF.cedula).subscribe({
      next: (res) => {
        this.dataSourceActInfo = res.getStudentsActivityResponse;
        this.dataActInfo = new MatTableDataSource<getStudentsActivityResponse>(res.getStudentsActivityResponse);
        this.loading = false;
      }
    })
  }

  goSubjects(row: Career) {
    this._router.navigate(['/enrollment/enroll-details/' + row.degreeCurriculumDesignId]);
  }

  verAsistencia(row: getStudentsActivityResponse) {

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    this._enrollservice.SearchECAcademicRecordMethod(row.acivityId, false, row.participantId).subscribe({
      next: (res) => {
        this.eCAcademicRecordId = + res.data[0].id;
        if (this.eCAcademicRecordId) {
          this._enrollservice.SearchAcademicActivityAttendanceRecordMethod(this.eCAcademicRecordId).subscribe({
            next: (res) => {
              const dialogRef = this.dialog.open(TutorECAttendenceFormComponent, {
                data: {
                  students: this._StudenAsistence,
                  action: 'view',
                  id: row.acivityId,
                  asistence: res.data,
                  details: this._ActivityService._DetailsResponseEF
                },
                direction: tempDirection,
              });
            }
          })
        }
      }
    })
  }

  verCalificaciones(row: getStudentsActivityResponse) {
    this._enrollservice.SearchECAcademicRecordMethod(row.acivityId, false, row.participantId).subscribe({
      next: (res) => {
        this.eCAcademicRecordId = + res.data[0].id;
        if (this.eCAcademicRecordId) {
          this._enrollservice.SearchActivityRecordScoresMethod(this.eCAcademicRecordId).subscribe({
            next: (res) => {
              const dialogRef = this.dialog.open(TutorECCalificationFormComponent, {
                data: {
                  calificaciones: res.data,
                  action: 'view',
                }
              });

            }
          })
        }
      }
    })
  }

  VerNotaFinal(row: getStudentsActivityResponse) {
    const local = "2";
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    console.log(row);

    const dialogRef = this.dialog.open(AddFinalGradeComponent, {
      data: {
        accion: 'view',
        studentId: null,
        participantId: row.participantId,
        id: row.acivityId,
        tipo_solicitud: local,
        estudiante: row,
        mallaId: row.degreeCurriculumDesignId
      },
      direction: tempDirection,
      width: "400px"
    });
  }
  generarcertificado(row: getStudentsActivityResponse) {
    const CreateCertificateData = {
      activityId: row.acivityId,
      studentFullName: row.firstName + ' ' + row.lastName,
      studentCedula: row.cedula
    }
    this._enrollservice.CreateCertificate(CreateCertificateData).subscribe({
      next: (res) => {
        console.log('Certificado', res)
        if (res.certificate) {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.certificate.fileContents,
              comment: [],
              poster: res,
            },
            width: '1200px',
            disableClose: true,
          });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "La actividad tiene que estar finalizada para generar el certificado",
            icon: "warning"
          });
        }

      }
    })
  }



  protected readonly Date = Date;
}

