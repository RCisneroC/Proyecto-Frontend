import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService, User } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { AcademicRecord, Asist, StudenAsistence, Student } from '../models/Asistencias';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TeacherService } from '../services/teacher.service';
import { AttenderResponse } from "../../enrollment/models/Career";
import { DetailsResponseEF } from "../../admission/models/participant";
export interface DialogData {
  id: string;
  action: string;
  student: Student;
  asistence: AttenderResponse[];
  details: DetailsResponseEF
}
@Component({
  selector: 'app-add-attendance-forms',
  templateUrl: './add-attendance-forms.component.html',
  styleUrls: ['./add-attendance-forms.component.scss']
})
export class AddAttendanceFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public Asistencia: StudenAsistence[] = [];
  public AsistenciaUser: StudenAsistence[] = [];
  public AsistenciaOne!: StudenAsistence;
  displayedColumns: string[] = [
    // 'cedula',
    // 'name',
    // 'lastname',
    'date',
    'attended',
    //'profesor',
  ]
  StudenAsistenceSource: StudenAsistence[] = [
    {
      statusId: 0,
      startDate: new Date(),
      idEstudiante: '',
      cedula: '',
      name: '',
      lastname: '',
      id: 0,
      docente: '',
      idasignatura: '',
      type: '',
      attended: false,
      date: new Date()
    }
  ]
  IsLoading: boolean = false;
  action: string;
  dialogTitle: string = '';
  AsistenciaForms: UntypedFormGroup;
  ListAsistence = new MatTableDataSource<StudenAsistence>(this.StudenAsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    // setTimeout(() => {
    //   this.ListAsistence.paginator = value;
    // }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<AddAttendanceFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AnnualPlanService: AnnualPlanService,
    private fb: UntypedFormBuilder,
    public authservice: AuthService,
    public _TeacherService: TeacherService,
  ) {
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Registro de asistencia";
    } else if (this.action === 'add') {
      this.dialogTitle = "Editar Registro de Asistencia";
    } else if (this.action === 'view') {
      this.dialogTitle = "Detalle de Asistencia.";

      let local = localStorage.getItem('tipoSolicitud') || '';
      if (local != '') {
        if (local == "1") {
          this.getAsisSubject();
        } else {
          this.getasistAct();
        }
      }
    }
    console.log(data);

    this.AsistenciaForms = this.fb.group({
      statusId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      // docente: [this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.lastName, [Validators.required]],
      // idasignatura: [this.data.id, [Validators.required]],
      // type: [localStorage.getItem('tipoSolicitud') || '', [Validators.required]]
    });
  }
  ngOnInit(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListAsistence.filter = filterValue.trim().toLowerCase();
  }

  getRecordAcademic() {

    const data = {
      subjectId: this.data.student.asignaturaId,
      studentId: this.data.student.studentId,
      degreeCurriculumDesignId: this.data.student.degreeCurriculumDesignId,
    }

    this._TeacherService.GetAcademicSubject(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);


        const datos = {
          academicSubjectRecordId: res["data"][0].id,
          date: this.AsistenciaForms.get("startDate")?.value,
          attended: this.AsistenciaForms.get("statusId")?.value,

        }

        this._TeacherService.AddAsistStudent(datos).subscribe(
          (data) => {
            console.log(data)
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Asistencia correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }


  getRecordAcademicAct() {
    const idGeneral = Number(localStorage.getItem('id')) || 0;
    const data = {
      activityId: idGeneral,
      //studentId: this.data.student.studentId,
    }



    this._TeacherService.GetAcademicActivity(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);


        const datos = {
          ecAcademicRecordId: res["data"][0].id,
          date: this.AsistenciaForms.get("startDate")?.value,
          attended: this.AsistenciaForms.get("statusId")?.value,
        }

        this._TeacherService.AddAsistStudentAct(datos).subscribe(
          (data) => {
            console.log(data)
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Asistencia correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }



  submit() {

    let local = localStorage.getItem('tipoSolicitud') || '';
    if (local != '') {
      if (local == "1") {
        this.getRecordAcademic()
      } else {
        this.getRecordAcademicAct()
      }
    }
  }
  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    return fecha.toISOString().split('T')[0];
  }

  getasistAct() {
    const idGeneral = Number(localStorage.getItem('id')) || 0;
    const data = {
      activityId: idGeneral,
      //studentId: this.data.student.studentId,
    }

    this._TeacherService.GetAcademicActivity(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);

        const datos = {
          ecAcademicRecordId: res["data"][0].id,
          studentId: this.data.student.studentId,
        }

        this._TeacherService.GetAsistStudentAct(datos).subscribe(
          (data: StudenAsistence[]) => {

            this.ListAsistence = new MatTableDataSource<StudenAsistence>(data);
            this.ListAsistence.paginator = this.paginator;
          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }

  getAsisSubject() {

    const data = {
      subjectId: this.data.student.asignaturaId,
      studentId: this.data.student.studentId,
      degreeCurriculumDesignId: this.data.student.degreeCurriculumDesignId,
    }

    this._TeacherService.GetAcademicSubject(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);


        const datos = {
          academicSubjectRecordId: res["data"][0].id,
        }

        this._TeacherService.GetAsistStudentSubject(datos).subscribe(
          (res: Asist) => {
            this.ListAsistence = new MatTableDataSource<StudenAsistence>(res["data"]);
            this.ListAsistence.paginator = this.paginator;
          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }


}
