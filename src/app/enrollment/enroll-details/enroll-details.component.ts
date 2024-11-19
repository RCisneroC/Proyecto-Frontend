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
import { ViewCalificacionesComponent } from '../Forms/view-calificaciones/view-calificaciones.component';
import { EnrollAttendenceFormComponent } from "../enroll-attendence-form/enroll-attendence-form.component";
import { AddFinalGradeComponent } from 'app/teaching-management/add-final-grade/add-final-grade.component';

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
    nAmeDegree: '',
    teacherCedula: '',
    years: 0,
    subjectStatusId: 0
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
  efAcademicRecordId: number = 0;
  academicSubjectRecordId: number = 0;

  enrollDummyList: EnrollDummy[] = [];
  subjectEnrollmentResult: subjectEnrollmentResult[] = []

  dataInfo = new MatTableDataSource<subjectEnrollmentResult>(this.dataSourceInfo);
  public _RecordIdEF: number = 0;
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
    super();
    this.getDetails();

  }
  ngOnInit(): void {
  }

  GetRecordIdStuudent(id_estudiante: any, id_degree: any) {
    //traer el recordidEF
    this._enrollservice.GetRecordIdStuudent(id_estudiante, id_degree).subscribe({
      next: (res) => {
        if (res.success) {
          this._RecordIdEF = res.data[0].id
          console.log("recordId");
          console.log(this._RecordIdEF);
        }

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
        this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          if (this.id) {
            this.getInfo(this.id)
          }

        })
      },
      error: (err) => {
      }
    })
  }

  getInfo(id: string) {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsSubjects(id, this._ActivityService._DetailsResponseEF.cedula).subscribe({
      next: (res) => {
        console.log(res.subjectEnrollmentResult);
        this.dataSourceInfo = res.subjectEnrollmentResult;
        this.dataInfo = new MatTableDataSource<subjectEnrollmentResult>(res.subjectEnrollmentResult.filter(x=>x.subjectStatusId==8));
        // this.EncuestForms();
      },
      complete: () => {
        if (this.dataSourceInfo.length > 0) {

          this.GetRecordIdStuudent(this.dataSourceInfo[0].studentId, this.dataSourceInfo[0].mallaId);
        }
      }
    })
  }

  verAsignatura(row: subjectEnrollmentResult) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    this._StudenAsistence.cedula = this._ActivityService._DetailsResponseEF.cedula;
    localStorage.setItem('tipoSolicitud', '1');

    this._enrollservice.SearchEFAcademicRecordMethod(row.studentId, row.mallaId).subscribe({
      next: (res) => {
        this.efAcademicRecordId = + res.data[0].id;
        this._enrollservice.SearchAcademicSubjectRecordMethod(this.efAcademicRecordId, row.asignaturaId, row.mallaId, row.studentId).subscribe({
          next: (res) => {
            this.academicSubjectRecordId = + res.data[0].id;
            this._enrollservice.SearchAcademicSubjectAttendanceRecordMethod(this.academicSubjectRecordId, row.mallaId, row.asignaturaId, row.studentId).subscribe({
              next: (res) => {
                const dialogRef = this.dialog.open(EnrollAttendenceFormComponent, {
                  data: {
                    students: this._StudenAsistence,
                    action: 'view',
                    id: row.asignaturaId,
                    asistence: res.data,
                    details: this._ActivityService._DetailsResponseEF
                  },
                  direction: tempDirection,
                });
              }
            })
          }
        })
      }
    })


  }

  verCalificaciones(row: subjectEnrollmentResult) {
    this._enrollservice.init_ResponseSubjectRecord();
    let recordSubjectId = 0;
    let data = {
      "efAcademicRecordId": this._RecordIdEF,
      "subjectId": row.asignaturaId,
      "degreeCurriculumDesignId": row.mallaId,
      "studentId": row.studentId
    };
    //traer el recordSubjectid
    this._enrollservice.SearchAcademicSubjectRecord(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          recordSubjectId = res.data[0].id;
          console.log(recordSubjectId, this._RecordIdEF);
        }
      },
      complete: () => {
        let data_calificacion = {
          "academicSubjectRecordId": recordSubjectId
        }
        //traer las calificaciones.
        this._enrollservice.SearchSubjectRecordScores(data_calificacion).subscribe({
          next: (res) => {
            this._enrollservice._ResponseSubjectRecord = res
            console.log(this._enrollservice._ResponseSubjectRecord.data);

          },
          complete: () => {
            this._StudenAsistence.cedula = this._ActivityService._DetailsResponseEF.cedula;
            localStorage.setItem('tipoSolicitud', '1');
            const dialogRef = this.dialog.open(ViewCalificacionesComponent, {
              data: {
                calificaciones: this._enrollservice._ResponseSubjectRecord.data,
                action: 'view',
              }
            });
          }
        });
      }
    })
  }

  EncuestForms() {
    const dialogRef = this.dialog.open(EncuestaSubjectComponent, {
      data: {
        subject: this.dataSourceInfo,
        action: 'encuesta',
      },
      width: '1200px',
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

  VerNotaFinal(row: subjectEnrollmentResult) {
    const local = "1";
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
        studentId: row.studentId,
        participantId: null,
        id: row.asignaturaId,
        tipo_solicitud: local,
        estudiante: row,
        mallaId: row.mallaId
      },
      direction: tempDirection,
      width: "400px"
    });
  }


  protected readonly Date = Date;
}
