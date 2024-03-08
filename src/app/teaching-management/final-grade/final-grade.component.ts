import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../models/Asistencias';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Direction } from '@angular/cdk/bidi';
import { AddFinalGradeComponent } from '../add-final-grade/add-final-grade.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { User } from '@core/models/user';
import { AuthService } from '@core/service/auth.service';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';

@Component({
  selector: 'app-final-grade',
  templateUrl: './final-grade.component.html',
  styleUrls: ['./final-grade.component.scss']
})
export class FinalGradeComponent implements OnInit {
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
      const nameLocal = localStorage.getItem('actividadEscogida') || '';
      if (local != '') {
        if (local == "1") {
          this.getOneStudents();
          this.ubicacion = 'Asignatura ' + nameLocal;
        } else {
          this.getOneStudentsAct();
          this.ubicacion = 'Actividad ' + nameLocal;
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
    if(local=="1"){
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
    console.log(row);

    const local = localStorage.getItem('tipoSolicitud') || '';
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddFinalGradeComponent, {
      data: {
        accion: 'add',
        studentId: row.studentId,
        participantId: row.participantId,
        id: this.id,
        tipo_solicitud: local,
        estudiante: row,
        mallaId: row.mallaId
      },
      direction: tempDirection,
      width: "400px"
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
    const local = localStorage.getItem('tipoSolicitud') || '';
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddFinalGradeComponent, {
      data: {
        accion: 'view',
        studentId: row.studentId,
        participantId: row.participantId,
        id: this.id,
        tipo_solicitud: local,
        estudiante: row,
        mallaId: row.mallaId
      },
      direction: tempDirection,
      width: "400px"
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
