import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ResponseMessageMaestra } from "../../admission/models/ResponseMessage";
import { AcademicRecord, StudenAsistence, Student } from "../../teaching-management/models/Asistencias";
import { AttenderECResponse } from "../../enrollment/models/Career";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AnnualPlanService } from "../../admission/FormalEducations/Services/annual-plan.service";
import { AuthService } from "@core";
import { TeacherService } from "../../teaching-management/services/teacher.service";
import { DetailsResponseEF } from "../../admission/models/participant";

export interface DialogData {
  id: string;
  action: string;
  student: Student;
  asistence: AttenderECResponse[];
  details: DetailsResponseEF
}
@Component({
  selector: 'app-tutor-ecattendence-form',
  templateUrl: './tutor-ecattendence-form.component.html',
  styleUrls: ['./tutor-ecattendence-form.component.scss']
})
export class TutorECAttendenceFormComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public Asistencia: StudenAsistence[] = [];
  displayedColumns: string[] = [
    // 'cedula',
    // 'name',
    // 'lastname',
    'fecha',
    'asistio',
  ]

  AsistenceSource: AttenderECResponse[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: new Date(),
      lastModifiedBy: '',
      totalRecords: 0,
      ecAcademicRecordId: 0,
      date: new Date(),
      attended: true
    }
  ]
  IsLoading: boolean = false;
  action: string;
  dialogTitle: string = '';
  AsistenciaForms: UntypedFormGroup;
  ListAsistence = new MatTableDataSource<AttenderECResponse>(this.AsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListAsistence.paginator = value;
    }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<TutorECAttendenceFormComponent>,
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
      this.getAsistencias();
    }
    console.log(data);

    this.AsistenciaForms = this.fb.group({
      statusId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],

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

  getAsistencias() {

    console.log('asistencialist', this.data.asistence);
    this.ListAsistence = new MatTableDataSource<AttenderECResponse>(this.data.asistence);
    this.ListAsistence.paginator = this.paginator;
  }
}
