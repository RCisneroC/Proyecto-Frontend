import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskSubject } from '../models/Teacher';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCalifComponent } from '../add-calif/add-calif.component';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from '../services/teacher.service';
import { User } from '@core';
import { MatPaginator } from '@angular/material/paginator';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { Student } from '../models/Asistencias';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {
  //this.cedula=this.activatedRoute.snapshot.params["cedula"];
  //displayedColumns: string[] = ['nombre', 'descripcion', 'fechaEntrega', 'materia'];
  displayedColumns: string[] = [
    'cedula',
    'firstName',
    'lastName',
    'email',
    'gender',
    'actions'

  ];

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
  dataSourseUser: Student[] = []
  dataSou = new MatTableDataSource<Student>(this.dataSourseUser);
  public id: string = '';
  idGeneral!: number;
  title!: string;
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    // setTimeout(() => {
    //   this.dataSou.paginator = value;
    // }, 1000);
  }
  constructor(private _nav: Router,
    public _dialog: MatDialog,
    public _SubjectService: SubjectListService,
    public _ActivityListService: ActivityListService,
    public _TeacherService: TeacherService, private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe((params) => {
      //this.getOneLocal();
      this.id = params['id'];
      this.idGeneral = Number(localStorage.getItem('id')) || 0;

      const local = localStorage.getItem('tipoSolicitud') || '';
      if (local != '') {
        if (local == "1") {
          this.title = "Listado de Estudiantes";
          this.getOneStudents();
          let localData = localStorage.getItem('details_task') || ''; 
          this.taskSubject = JSON.parse(localData);
          // this.getAllTaskSubject()
        } else {
          this.title = "Listado de Participantes";
          this.getOneStudentsAct();
          this.getAllTaskActivity();
          let localData = localStorage.getItem('details_task') || ''; 
          this.taskSubject = JSON.parse(localData);
          console.log('====================================');
          console.log(this.taskSubject);
          console.log('====================================');
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSou.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.dataSou.paginator = this.paginator;
  }
  getOneStudents() {
    this._TeacherService.getStudentSubject(Number(this.idGeneral)).subscribe({
      next: (res) => {
        this.dataSou = new MatTableDataSource<Student>(res["getDegreeSubject"]);
      }
    })
  }
  getOneStudentsAct() {
    this._TeacherService.getStudentSubjectAct(Number(this.idGeneral)).subscribe({
      next: (res) => {
        this.dataSou = new MatTableDataSource<Student>(res["getStudentsActivityResponse"]);
      }
    })
  }

  getAllTaskSubject() {
    const data = {
      subjectId: this.idGeneral
    }
    this._SubjectService.GetTaskSubject(data).subscribe({
      next: (res) => {
        console.log(res);

        this.taskSubject.Titulo = res.data[0].title;
        this.taskSubject.observacion = res.data[0].observation;
        this.taskSubject.fechaEntrega = res.data[0].finalDate;
        this.taskSubject.tipoTarea = res.data[0].taskType.name;
      }
    })
  }

  getAllTaskActivity() {
    const data = {
      activityId: this.idGeneral
    }
    this._ActivityListService.GetTaskActivity(data).subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        this.taskSubject.Titulo = this.taskSubject.Titulo;
        this.taskSubject.observacion = this.taskSubject.observacion;
        this.taskSubject.fechaEntrega = this.taskSubject.fechaEntrega;
        this.taskSubject.tipoTarea = this.taskSubject.tipoTarea;


      }
    })
  }

  addNew() {

  }
  AddCalif(row: Student) {
    console.log(row);

    this.taskSubject.idAsignatura = this.idGeneral.toString();
    this.taskSubject.tipoTarea = "1";
    this.taskSubject.id = Number(this.id);
    const dialogRef = this._dialog.open(AddCalifComponent, {
      data: {
        student: row,
        studentId: row.studentId,
        participantId: row.participantId,
        taskSubject: this.taskSubject,
        accion: 'add-calificacion'
      },
      disableClose: true,
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
        this.getOneStudents();

      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  volverAtras() {
    this._nav.navigate(['/teaching-management/detail-subject/' + this.idGeneral]);
  }

  editCall(row: User) {
  }
  verAsignatura(row: Student) {
    this.taskSubject.idAsignatura = this.idGeneral.toString();
    this.taskSubject.tipoTarea = "1";
    this.taskSubject.id = Number(this.id);
    const dialogRef = this._dialog.open(AddCalifComponent, {
      data: {
        student: row,
        studentId: row.studentId,
        participantId: row.participantId,
        taskSubject: this.taskSubject,
        accion: 'view'
      },
      disableClose: true,
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
        this.getOneStudents();
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
}

