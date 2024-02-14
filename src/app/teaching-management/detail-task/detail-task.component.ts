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
  dataSourseUser: User[] = []
  dataSou = new MatTableDataSource<User>(this.dataSourseUser);
  public id: string = '';
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    // setTimeout(() => {
    //   this.dataSou.paginator = value;
    // }, 1000);
  }
  constructor(private _nav: Router,
    public _dialog: MatDialog,
    public _TeacherService: TeacherService, private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe((params) => {
      //this.getOneLocal();
      this.id = params['id'];
      const local = localStorage.getItem('tipoSolicitud') || '';
      if (local != '') {
        if (local == "1") {
          this.getOneStudents();
        } else {
          this.getOneStudentsAct();
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
    this._TeacherService.getStudentSubject(Number(this.id)).subscribe({
      next: (res) => {
        this.dataSou = new MatTableDataSource<User>(res["getDegreeSubject"]);
      }
    })
  }
  getOneStudentsAct() {
    this._TeacherService.getStudentSubjectAct(Number(this.id)).subscribe({
      next: (res) => {
        this.dataSou = new MatTableDataSource<User>(res["getStudentsActivityResponse"]);
      }
    })
  }

  // ngOnInit() {
  //   this.dataSou = new MatTableDataSource<any>(this.users);
  //   //   //this.dataSou.paginator = this.paginator;
  // }
  getOneLocal() {
    let dataLocal = localStorage.getItem('details_task') || '';
    if (dataLocal != '') {
      this.taskSubject = JSON.parse(dataLocal);
      console.log(this.taskSubject);

    } else {
      this._nav.navigate(['/teaching-management/detail-subject/', 1]);
    }
  }
  addNew() {

  }
  AddCalif(row: User) {
    this.taskSubject.idAsignatura = "1";
    this.taskSubject.tipoTarea = this.id;
    const dialogRef = this._dialog.open(AddCalifComponent, {
      data: {
        user: row,
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
        this.getOneStudents();
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
  volverAtras() {
    this._nav.navigate(['/teaching-management/detail-subject/' + this.id]);
  }

  editCall(row: User) {
  }
  verAsignatura(row: User) {
    const dialogRef = this._dialog.open(AddCalifComponent, {
      data: {
        user: row,
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
        this.getOneStudents();
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
}

