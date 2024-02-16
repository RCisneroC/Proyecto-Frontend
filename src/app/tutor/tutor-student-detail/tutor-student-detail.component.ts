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
import {DetailsParticipanteEF} from "../../admission/models/participant";
import {getStudentsActivityResponse, subjectEnrollmentResult} from "../../admission/models/AddEFacademicResponse";

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


  protected readonly Date = Date;
}
