import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '@core';
import { AddAttendanceFormsComponent } from '../add-attendance-forms/add-attendance-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { StudenAsistence } from '../models/Asistencias';

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
  dataSourseUser: User[] = []
  dataSou = new MatTableDataSource<User>(this.dataSourseUser);
  public id: string = '';
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.dataSou.paginator = value;
    }, 1000);
  }

  constructor(public _TeacherService: TeacherService, public dialog: MatDialog, private _Router: Router, private activatedRoute: ActivatedRoute) {
    this.getOneStudents();
    this.activatedRoute.params.subscribe((params) => {

      this.id = params['id'];
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
    this._TeacherService.getStudents("Estudiante").subscribe({
      next: (res) => {
        this.dataSou = new MatTableDataSource<User>(res.filter((x) => x.cedula != null));
      }
    })
  }
  volverAtras() {
    this._Router.navigate(['/teaching-management/teacher-history-list']);
  }
  Addasistencia(row: User) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAttendanceFormsComponent, {
      data: {
        students: row,
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

  verAsignatura(row: User) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddAttendanceFormsComponent, {
      data: {
        students: row,
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
