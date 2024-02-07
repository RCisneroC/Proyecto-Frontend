import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { AuthService, User } from '@core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Activity, Subject } from '../models/Teacher';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
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
    { id: 1, name: 'Formación Especialidad' },
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

  subjects = [
    {
      id: 1,
      name: "Matemáticas",
      description: "Introducción a los conceptos matemáticos básicos y técnicas de resolución de problemas.",
      acronym: "MAT",
      code: "MAT101",
      numOfCredits: 3,
      numOfHours: 4,
      numOfClasses: 3,
      hasLaboratory: false,
      evaluationCriteria: "Exámenes, cuestionarios, tareas",
      statusId: 1,
      listTask: [
        {
          Titulo: "Investigación sobre el cambio climático",
          observacion: "Utilizar fuentes confiables y variadas.",
          tipoTarea: "Investigación",
          nombre: "Tarea 1",
          fechaEntrega: new Date("2024-03-08"),
        },
        {
          Titulo: "Análisis del poema 'Piedra negra sobre una piedra blanca' de Octavio Paz",
          observacion: "Enfatizar en las figuras literarias y el simbolismo.",
          tipoTarea: "Análisis",
          nombre: "Tarea 2",
          fechaEntrega: new Date("2024-03-15"),
        },
        {
          Titulo: "Diseño de un prototipo de aplicación móvil para gestión de tareas",
          observacion: "Utilizar herramientas de diseño como Figma o Adobe XD.",
          tipoTarea: "Diseño",
          nombre: "Tarea 3",
          fechaEntrega: new Date("2024-04-05"),
        },
        {
          Titulo: "Exposición oral sobre la historia del rock and roll",
          observacion: "Preparar una presentación multimedia atractiva e informativa.",
          tipoTarea: "Exposición",
          nombre: "Tarea 4",
          fechaEntrega: new Date("2024-04-20"),
        },
      ],

    },
    {
      id: 2,
      name: "Estructura de datos",
      description: "Estructura de datos.",
      acronym: "ED",
      code: "12222",
      numOfCredits: 3,
      numOfHours: 3,
      numOfClasses: 2,
      hasLaboratory: false,
      evaluationCriteria: "Ensayos, trabajos, presentaciones",
      statusId: 1,
      listTask: [], // Puedes agregar objetos TaskSubject aquí si es necesario
    },
    {
      id: 3,
      name: "Estructura de datos 2",
      description: "Estructura de datos 2",
      acronym: "ED2",
      code: "12223",
      numOfCredits: 4,
      numOfHours: 4,
      numOfClasses: 3,
      hasLaboratory: true,
      evaluationCriteria: "Laboratorios, exámenes, cuestionarios",
      statusId: 1,
      listTask: [], // Puedes agregar objetos TaskSubject aquí si es necesario
    },

    {
      id: 4,
      name: "Matemática",
      description: "Matemática",
      acronym: "MA",
      code: "1",
      numOfCredits: 4,
      numOfHours: 4,
      numOfClasses: 3,
      hasLaboratory: true,
      evaluationCriteria: "Laboratorios, exámenes, cuestionarios",
      statusId: 1,
      listTask: [], // Puedes agregar objetos TaskSubject aquí si es necesario
    },

  ];

  activities = [
    {
      id: 1,
      name: "Taller de escritura creativa",
      activityTypeName: "Taller", // Suponiendo que 2 representa "Taller"
      activityModeName: "Presencial", // Suponiendo que 1 representa "Presencial"
      activityLocationName: "psub1",
      startDate: "2024-02-15",
      plannedEndDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Conferencia sobre marketing digital",
      activityTypeName: "Conferencia", // Suponiendo que 1 representa "Conferencia"
      activityModeName: "Virtual", // Suponiendo que 3 representa "Virtual"
      startDate: "2024-02-20",
      activityLocationName: "psub2",
      plannedEndDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Curso de programación en Python",
      activityTypeName: "Curso", // Suponiendo que 3 representa "Curso"
      activityModeName: "Semipresencial", // Suponiendo que 2 representa "Semipresencial"
      activityLocationName: "psub3",
      startDate: "2024-03-01",
      plannedEndDate: "2024-04-30",
    },
  ];
  public typeUser: string = '';
  constructor(public _teacherService: TeacherService,
    private authenticationService: AuthService,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _RequestService: RequestServicesService
  ) {
    super()
  }
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
    this.docForm = this.fb.group({
      code: new FormControl(""),
      name: new FormControl(""),
      teacherCedula: new FormControl(this.user.cedula),
    });

    this.guardarTemporal()
    // this.getSubjects(); 
    // this.getActivities();

    const subjectStr = localStorage.getItem('subjects');
    const activitiesStr = localStorage.getItem('activities');
    if (subjectStr) {
      this.subjects = JSON.parse(subjectStr);
    }

    if (activitiesStr) {
      this.activities = JSON.parse(activitiesStr);
    }
    this.DataSubjects = new MatTableDataSource<Subject>(this.subjects);
    this.DataActivities = new MatTableDataSource<any>(this.activities);

  }

  guardarTemporal() {
    const subjectStr = JSON.stringify(this.subjects);
    const activitiesStr = JSON.stringify(this.activities);
    localStorage.setItem('subjects', subjectStr);
    localStorage.setItem('activities', activitiesStr);
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
    this._teacherService.getActivitiesByCedula(this.user.cedula).subscribe({
      next: (res) => {

        this.DataActivities = res;
        console.log(res);

      }
    })
  }
}
