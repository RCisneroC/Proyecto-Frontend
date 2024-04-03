import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService, User } from '@core';
import { AddAttendanceFormsComponent } from 'app/teaching-management/add-attendance-forms/add-attendance-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { StudenAsistence, Student } from '../models/Asistencias';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'cedula',
    'firstName',
    'lastName',
    'email',
    'gender',
    'actions'

  ]
  dataSourseUser: Student[] = []
  dataSou = new MatTableDataSource<Student>(this.dataSourseUser);
  public id: string = '';
  public ubicacion: string = '';
  idGeneral!: number;
  user!: User;
  typeUser!: string;
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    // setTimeout(() => {
    //   this.dataSou.paginator = value;
    // }, 1000);
  }

  constructor(public _TeacherService: TeacherService,
  public dialog: MatDialog, private _Router: Router,
  private activatedRoute: ActivatedRoute,
  public authenticationService: AuthService,
  public _RequestService: RequestServicesService,

  ) {
    //this.getOneStudents();
    this.activatedRoute.params.subscribe((params) => {

      this.id = params['id'];
      this.idGeneral = Number(localStorage.getItem('id')) || 0;
      this.user = this.authenticationService.currentUserValue;
      this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
      const local = localStorage.getItem('tipoSolicitud') || '';
      if (local != '') {
        if (local == "1") {
          this.getOneStudents();
          this.ubicacion = 'Asignaturas';
        } else {
          this.getOneStudentsAct();
          this.ubicacion = 'Actividad';
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
  // getOneStudents() {
  //   this._TeacherService.getStudents("Estudiante").subscribe({
  //     next: (res) => {
  //       this.dataSou = new MatTableDataSource<User>(res.filter((x) => x.cedula != null));
  //     }
  //   })
  // }

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
  volverAtras() {

    const local = localStorage.getItem('tipoSolicitud')
    if(local==="1"){
      if(this.typeUser==="Administrador"){
        this._Router.navigate(['/teaching-management/teacher-history-list/',localStorage.getItem('cedula')]);
      }else{
        this._Router.navigate(['/teaching-management/teacher-history-list/']);
      }
    }else{
      if(this.typeUser==="Administrador"){

        this._Router.navigate(['/teaching-management/career-list/',localStorage.getItem('cedula')]);
      }else{
        this._Router.navigate(['/teaching-management/career-list/']);
      }
    }

  }


  Addasistencia(row: Student) {

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAttendanceFormsComponent, {
      data: {
        student: row,
        action: 'add',
        id: this.id
      },
      direction: tempDirection,
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
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  verAsignatura(row: Student) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAttendanceFormsComponent, {
      data: {
        student: row,
        action: 'view',
        id: this.id,
      },
      direction: tempDirection,
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
