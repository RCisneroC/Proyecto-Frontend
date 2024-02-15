import {Component, ElementRef, ViewChild} from '@angular/core';
import {StudenAsistence} from "../../teaching-management/models/Asistencias";
import {EnrollDummy} from "../models/EnrollDummy";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDetailService} from "../../admission/services/activity-detail.service";
import {InscriptionService} from "../../admission/inscription/services/inscription.service";
import {EnrollmentService} from "../services/enrollment.service";
import {AuthService} from "@core";
import {MatDialog} from "@angular/material/dialog";
import {DetailsParticipanteEF} from "../../admission/models/participant";
import {Direction} from "@angular/cdk/bidi";
import {
  AddAttendanceFormsComponent
} from "../../teaching-management/add-attendance-forms/add-attendance-forms.component";
import {subjectEnrollmentResult} from "../../admission/models/AddEFacademicResponse";
import {Career} from "../models/Career";

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
    private _inscriptionService: InscriptionService,
    private _enrollservice: EnrollmentService,
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
      },
      error: (err) => {
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
    this._router.navigate(['/enrollment/enroll-details/'+ row.degreeCurriculumDesignId]);
  }


  protected readonly Date = Date;
}

