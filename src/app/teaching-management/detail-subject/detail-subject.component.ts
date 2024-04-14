import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskSubject } from '../models/Teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../models/Teacher';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { TeacherService } from '../services/teacher.service';
import { UntypedFormBuilder } from '@angular/forms';
import { DataTaskSubject } from 'app/intranet-academic-registration/Models/ResponseListTaskSubject';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';

import { AuthService, User } from '@core';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { CreateTaskSubjectComponent } from 'app/intranet-academic-registration/Task/Subject/Forms/create-task-subject/create-task-subject.component';


@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.scss']
})


export class DetailSubjectComponent implements OnInit {
  //this.cedula=this.activatedRoute.snapshot.params["cedula"];
  //dataSou!: MatTableDataSource<TaskSubject>;
  public _Subject!: Subject;
  taskSubject: TaskSubject = {
    id: 0,
    Titulo: '',
    observacion: '',
    tipoTarea: '',
    nombre: '',
    fechaEntrega: new Date(),
    idAsignatura: '',
    type: '',
  };


  displayedColumnssssss: string[] = [
    'id',
    'Titulo',
    'observacion',
    'tipoTarea',
    'nombre',
    'fechaEntrega',
    'actions'

  ]

  displayedColumns: string[] = [
    'name',
    'tipo',
    'observation',
    'finalDate',
    'accion',
  ]

  dataSourceEvent: DataTaskSubject[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      taskFiles: [
        {
          name: '',
          fileType: '',
          content: '',
          subjectTaskId: 0,
          activityTaskId: 0,
        }
      ],
      taskType: {
        name: '',
        id: 0,
      },
      subject: {
        id: 0,
        name: '',
      },
      title: '',
      description: '',
      finalDate: new Date(),
      taskTypeId: 0,
      subjectId: 0,
      observation: '',
    }
  ]
  dataTask = new MatTableDataSource<any>(this.dataSourceEvent);
  public id: string = '';
  public NameActivitySubject: string = '';
  public pantalla: string = '';
  TaskSubjectArray: TaskSubject[] = [];
  TaskSubject!: TaskSubject;
  user: User;
  typeUser: string;
  cedula: string;
  public IsActivity: boolean = false;
  //calendarOptions: any;
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.dataTask.paginator = value;
    }, 1000);
  }
  constructor(private _nav: Router,
    public _dialog: MatDialog,
    public activeRouter: ActivatedRoute,
    public _teacherService: TeacherService,
    private fb: UntypedFormBuilder,
    public _SubjectService: SubjectListService,
    public _ActivityListService: ActivityListService,
    public authenticationService: AuthService,
    public _RequestService: RequestServicesService,
  ) {
    this.activeRouter.params.subscribe((params) => {

      this.id = params['id'];
    });

    this.user = this.authenticationService.currentUserValue;
    this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
    this.cedula = this.activeRouter.snapshot.params["cedula"];
  }

  ngOnInit() {
    this.load();
    this.getTypeTask();

    // this.calendarOptions = {
    //   plugins: [dayGridPlugin, interactionPlugin], // Add plugins to the options
    //   defaultView: 'dayGridMonth', // Set the default view to month grid
    //   events: [], // Initially empty array for events (populate later)
    //   // Other options as desired (see FullCalendar documentation)
    // };
    // //   //this.dataSou.paginator = this.paginator;

  }




  getTypeTask() {
    this._SubjectService.getTypeTask().subscribe({
      next: (res) => {
        this._SubjectService._ApiResponseInternal = res;

      }
    })
  }
  load() {
    const local = localStorage.getItem('tipoSolicitud') || '';
    this.NameActivitySubject = localStorage.getItem('actividadEscogida') || '';
    if (local != '') {
      if (local == "1") {
        this.getAllTaskSubject();
        this.pantalla = 'de asignatura';
      } else {
        this.getAllTaskActivity();
        this.pantalla = 'de actividades';
        this.IsActivity = true;
      }

    }


  }
  getAllTaskSubject() {
    const data = {
      periodYearSubjectRoomId: Number(localStorage.getItem("periodYearSubjectRoomId"))
    }
    this._SubjectService.GetTaskSubject(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.data.length > 0) {
          this.dataTask = new MatTableDataSource<DataTaskSubject>(res.data);
          this.dataTask.paginator = this.paginator;
          this.taskSubject.nombre = res.data[0].subject.name
        } else {
          this.taskSubject.nombre = this.NameActivitySubject;
        }

      }
    })
  }

  getAllTaskActivity() {
    const data = {
      activityId: this.id
    }
    this._ActivityListService.GetTaskActivity(data).subscribe({
      next: (res) => {
        if (res.data.length > 0) {
          this.dataTask = new MatTableDataSource<any>(res.data);
          this.taskSubject.nombre = res.data[0].activity.name
          //this.dataTask.paginator = this.paginator_;
        } else {
          this.taskSubject.nombre = this.NameActivitySubject;
          //this.dataTask.paginator = this.paginator_;
        }
      }
    })
  }

  addNew() {

  }



  volverAtras() {
    const local = localStorage.getItem('tipoSolicitud')
    if (local == "1") {
      if (this.typeUser === "Administrador") {
        this._nav.navigate(['/teaching-management/teacher-history-list/', localStorage.getItem('cedula')]);
      } else {
        this._nav.navigate(['/teaching-management/teacher-history-list/']);
      }

    } else {
      if (this.typeUser === "Administrador") {

        this._nav.navigate(['/teaching-management/career-list/', localStorage.getItem('cedula')]);
      } else {
        this._nav.navigate(['/teaching-management/career-list/']);
      }
    }



  }

  Detail(row: any): void {
    let datasend: TaskSubject = {
      id: row.id,
      Titulo: row.title,
      observacion: row.observation,
      tipoTarea: row.taskType.name,
      nombre: row.description,
      fechaEntrega: row.finalDate,
      idAsignatura: row.periodYearSubjectRoomId,
      type: row.taskTypeId,
    }
    console.log(datasend);
    localStorage.setItem('details_task', JSON.stringify(datasend));
    localStorage.setItem('id', this.id);
    this._nav.navigate(['/teaching-management/detail-task/', datasend.id]);
  }

  editCall(row: TaskSubject) {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: {
        taskSubject: row,
        accion: 'edit-taskSubject',
        id: this.id
      },
      disableClose: true,
      width: '900px'
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        this.load();
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

  refresh() {
  }

  exportExcel() {
  }

  EliminarTarea(row: TaskSubject) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        const dataL = localStorage.getItem('task') || '';
        if (dataL != '') {
          this.TaskSubjectArray = JSON.parse(dataL);
          const indice = this.TaskSubjectArray.findIndex(x => x.id === row.id);


          if (indice !== -1) {
            this.TaskSubjectArray.splice(indice, 1);
          }
          localStorage.setItem('task', JSON.stringify(this.TaskSubjectArray));
          this.load();
        }


      }
    });
  }



  NewTask() {

    const dialogRef = this._dialog.open(CreateTaskSubjectComponent, {
      data: {
        task: this._SubjectService._TaskSubject,
        action: 'add',
        subject: this._Subject,
        TypeTask: this._SubjectService._ApiResponseInternal
      },
      width: '900px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getAllTaskSubject();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  editarTarea(row: TaskSubject) {
    const dialogRef = this._dialog.open(CreateTaskSubjectComponent, {
      data: {
        task: row,
        action: 'edit',
        subject: this._Subject,
        TypeTask: this._SubjectService._ApiResponseInternal
      },
      width: '900px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getAllTaskSubject();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  AddTask() {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: {
        taskSubject: this.taskSubject,
        accion: 'add-taskSubject',
        id: this.id
      },
      disableClose: true,
      width: '900px'
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        this.load();
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
}
