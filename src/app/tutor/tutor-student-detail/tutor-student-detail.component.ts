import {Component, ElementRef, ViewChild} from '@angular/core';
import {Career} from "../../enrollment/models/Career";
import {StudenAsistence} from "../../teaching-management/models/Asistencias";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDetailService} from "../../admission/services/activity-detail.service";
import {InscriptionService} from "../../admission/inscription/services/inscription.service";
import {EnrollmentService} from "../../enrollment/services/enrollment.service";
import {AuthService} from "@core";
import {MatDialog} from "@angular/material/dialog";
import {DetailsParticipante, DetailsParticipanteEF} from "../../admission/models/participant";
import {getStudentsActivityResponse, subjectEnrollmentResult} from "../../admission/models/AddEFacademicResponse";
import {EnrollAttendenceFormComponent} from "../../enrollment/enroll-attendence-form/enroll-attendence-form.component";
import {Direction} from "@angular/cdk/bidi";
import {TutorECAttendenceFormComponent} from "../tutor-ecattendence-form/tutor-ecattendence-form.component";
import {ViewCalificacionesComponent} from "../../enrollment/Forms/view-calificaciones/view-calificaciones.component";
import {TutorECCalificationFormComponent} from "../tutor-eccalification-form/tutor-eccalification-form.component";

@Component({
  selector: 'app-tutor-student-detail',
  templateUrl: './tutor-student-detail.component.html',
  styleUrls: ['./tutor-student-detail.component.scss']
})
export class TutorStudentDetailComponent {

  DisplayNameInfo: string[] = [
    'SubjectName',
    'DegreeName',
    'ClassShift',
    'RoomName',
    'createDate',
    'accion'
  ];

  dataSourceActInfo: getStudentsActivityResponse[] = [{
    participantId:'',
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
  part:boolean = false;
  asp:boolean = false;
  eCAcademicRecordId:number=0;
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
  id: string = '';
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
    private _inscriptionService: InscriptionService,
    private _enrollservice: EnrollmentService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public _EnrollmentService: EnrollmentService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getDetails();
    });

  }

  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetVerifyStudent(this.id).subscribe({
      next:(res)=>{
        console.log("GetVerifyStudent",res.verifyUsersResult[0].part);
        this.part = res.verifyUsersResult[0].part;
        this.asp = res.verifyUsersResult[0].asp;
        if(this.part){
          this._ActivityService.GetDetailsCedula(this.id).subscribe({
            next:(res: DetailsParticipante)=>{
              this._ActivityService._DetailsParticipante = res;
              if(res.detailsResponse.length > 0){
                this._ActivityService._DetailsResponse = this._ActivityService._DetailsParticipante.detailsResponse[0];
              }
              this._ActivityService.loading = false;
              this.getInfo();
              this.loadactivity();
            },error: (err) => {
            }
          })
        }
        else if(this.asp) {
          this._ActivityService.GetDetailsEFCedula(this.id).subscribe({
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
      }
    })
  }

  loadactivity() {
    this._EnrollmentService.GetStudentsActivity(this.id).subscribe({
      next: (res) => {
        this.dataSourceActInfo = res.getStudentsActivityResponse;
        this.dataActInfo = new MatTableDataSource<getStudentsActivityResponse>(res.getStudentsActivityResponse);
        this.loading = false;
      }
    })
  }

  getInfo() {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsmesh(this._ActivityService._DetailsResponseEF.cedula).subscribe({
      next:(res)=>{
        console.log("Result", res.studentInnfo);
        this.dataInfo = new MatTableDataSource<Career>(res.studentInnfo);
      }
    })



  }

  goSubjects(row:Career){
    localStorage.setItem('tutor-student-uri-selected','/tutor/student-detail/'+this._ActivityService._DetailsResponseEF.cedula);
    localStorage.setItem('tutor-student-selected',this._ActivityService._DetailsResponseEF.cedula);
    this._router.navigate(['/tutor/subject-detail/'+ row.degreeCurriculumDesignId]);
  }


  verAsistencia(row:getStudentsActivityResponse){

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    this._enrollservice.SearchECAcademicRecordMethod(row.acivityId, false, row.participantId).subscribe({
      next:(res)=>{
        this.eCAcademicRecordId = + res.data[0].id;
        if(this.eCAcademicRecordId){
          this._enrollservice.SearchAcademicActivityAttendanceRecordMethod(this.eCAcademicRecordId).subscribe({
            next:(res)=>{
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

  verCalificaciones(row:getStudentsActivityResponse){
    this._enrollservice.SearchECAcademicRecordMethod(row.acivityId, false, row.participantId).subscribe({
      next:(res)=>{
        this.eCAcademicRecordId = + res.data[0].id;
        if(this.eCAcademicRecordId){
          this._enrollservice.SearchActivityRecordScoresMethod(this.eCAcademicRecordId).subscribe({
            next:(res)=>{
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


  protected readonly Date = Date;
}
