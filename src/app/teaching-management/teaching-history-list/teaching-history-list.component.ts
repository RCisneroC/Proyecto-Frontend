import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { AuthService, User } from '@core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Activity, Subject } from '../models/Teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';


@Component({
  selector: 'app-teaching-history-list',
  templateUrl: './teaching-history-list.component.html',
  styleUrls: ['./teaching-history-list.component.scss']
})
export class TeachingHistoryListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {


  displayedColumns = [
    'name',
    'numOfCredits',
    'numOfHours',
    'numOfClasses',
    'hasLaboratory',
    'actions',


  ];

  displayedColumns2 = [
    'name',
    'activityModeName',
    'activityTypeName',
    'activityLocationName',
    'isExecuted',
    'actions',

  ];

  processList = [
    { id: 1, name: 'Formación Especializada' },
    { id: 2, name: 'Entrenamiento' },

  ];
  user!: User;
  cedula!: string;
  DataSubjects!: any;
  //subjects:Subject[] = [];
  DataActivities!: any;
  //activities:Activity[] = [];
  docForm!: UntypedFormGroup;
  view: boolean = false;
  selectedOption: number = 2;


  public typeUser: string = '';
  constructor(public _teacherService: TeacherService,
    private authenticationService: AuthService,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _RequestService: RequestServicesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super()
  }
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
    this.cedula=this.activatedRoute.snapshot.params["cedula"];
    if(this.cedula==undefined){
    this.cedula=this.user.cedula;
    }
    this.docForm = this.fb.group({
      code: new FormControl(""),
      name: new FormControl(""),
      teacherCedula: new FormControl(this.cedula),
    });

    //this.guardarTemporal()
     this.getSubjects(); 
     this.getActivities();

    // const subjectStr = localStorage.getItem('subjects');
    // const activitiesStr = localStorage.getItem('activities');
    // if (subjectStr) {
    //   this.subjects = JSON.parse(subjectStr);
    // }

    // if (activitiesStr) {
    //   this.activities = JSON.parse(activitiesStr);
    // }
    // this.DataSubjects = new MatTableDataSource<Subject>(this.subjects);
    // this.DataActivities = new MatTableDataSource<any>(this.activities);

  }

  guardarTemporal() {
    // const subjectStr = JSON.stringify(this.subjects);
    // const activitiesStr = JSON.stringify(this.activities);
    // localStorage.setItem('subjects', subjectStr);
    // localStorage.setItem('activities', activitiesStr);
  }

  viewTable(id: number) {
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    localStorage.setItem('tipoSolicitud', id.toString());
    if (id == 1) {
      this.view = true;

    } else {
      this.view = false;

    }
  }

  calificacionesActividades(row: Activity) {
    // console.log(row);
    localStorage.setItem('actividadEscogida', JSON.stringify(row));
    this._nav.navigate(['/teaching-management/detail-asignatura/', row.id]);
  }


  calificacionesAasignatura(row: Subject) {
    localStorage.setItem('actividadEscogida', JSON.stringify(row));
    this._nav.navigate(['/teaching-management/detail-asignatura/', row.id]);
  }

  Detail(row: Subject) {
    localStorage.setItem('actividadEscogida', JSON.stringify(row));
    this._nav.navigate(['/teaching-management/detail-subject/', row.id]);
  }
  async getSubjects() {
    this._teacherService.getSubjectsByCedula(this.docForm.value).subscribe({
      next: (res) => {

        this.DataSubjects = res;
        console.log(this.DataSubjects);

      }
    })
  }

  async getActivities() {
    //const ced=this.docForm.get('teacherCedula')?.value;
    this._teacherService.getActivitiesByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataActivities = res;
        console.log(res);

      }
    })
  }
}
