import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ResponseMessageMaestra} from "../../admission/models/ResponseMessage";
import {AcademicRecord, StudenAsistence} from "../../teaching-management/models/Asistencias";
import {AttenderResponse} from "../models/Career";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnnualPlanService} from "../../admission/FormalEducations/Services/annual-plan.service";
import {AuthService} from "@core";
import {TeacherService} from "../../teaching-management/services/teacher.service";
import {DialogData} from "../../teaching-management/add-attendance-forms/add-attendance-forms.component";

@Component({
  selector: 'app-enroll-attendence-form',
  templateUrl: './enroll-attendence-form.component.html',
  styleUrls: ['./enroll-attendence-form.component.scss']
})
export class EnrollAttendenceFormComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public Asistencia: StudenAsistence[] = [];
  public AsistenciaUser: StudenAsistence[] = [];
  public AsistenciaOne!: StudenAsistence;
  displayedColumns: string[] = [
    'cedula',
    'name',
    'lastname',
    'fecha',
    'asistio',
    'profesor',
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
      type: ''
    }
  ]

  AsistenceSource: AttenderResponse[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: new Date(),
      lastModifiedBy: '',
      totalRecords: 0,
      academicSubjectRecordId: 0,
      date: new Date(),
      attended: true
    }
  ]
  IsLoading: boolean = false;
  action: string;
  dialogTitle: string = '';
  AsistenciaForms: UntypedFormGroup;
  ListAsistence = new MatTableDataSource<AttenderResponse>(this.AsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListAsistence.paginator = value;
    }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<EnrollAttendenceFormComponent>,
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
      subjectId:this.data.student.asignaturaId,
      studentId: this.data.student.studentId,
      degreeCurriculumDesignId:this.data.student.degreeCurriculumDesignId ,
    }

    this._TeacherService.GetAcademicSubject(data).subscribe(
      (res:AcademicRecord) => {
        console.log(res);


        const datos = {
          academicSubjectRecordId:res["data"][0].id,
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
      activityId:idGeneral,
      //studentId: this.data.student.studentId,
    }



    this._TeacherService.GetAcademicActivity(data).subscribe(
      (res:AcademicRecord) => {
        console.log(res);


        const datos = {
          ecAcademicRecordId:res["data"][0].id,
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


    // let type = localStorage.getItem('tipoSolicitud');
    // let local = localStorage.getItem('asitencias') || '';
    // if (local != '') {
    //   this.Asistencia = JSON.parse(local);
    //   let fecha = this.AsistenciaForms.controls['startDate'].value;
    //   let existe = this.Asistencia.filter(x => this.formatearFecha(x.startDate.toString()) == this.formatearFecha(fecha) && x.cedula == this.AsistenciaForms.controls['cedula'].value && x.idasignatura == this.data.id && x.type == type);
    //   if (existe.length > 0) {
    //     this.ResponseMessage.CodError = 500;
    //     this.ResponseMessage.Message = 'Ya mantiene una asistencia para la fecha seleccionada.';
    //     this.dialogRef.close(this.ResponseMessage);
    //     return;
    //   }
    //   this.AsistenciaOne = {
    //     statusId: this.AsistenciaForms.controls['statusId'].value,
    //     startDate: this.AsistenciaForms.controls['startDate'].value,
    //     idEstudiante: this.AsistenciaForms.controls['idEstudiante'].value,
    //     cedula: this.AsistenciaForms.controls['cedula'].value,
    //     name: this.AsistenciaForms.controls['name'].value,
    //     lastname: this.AsistenciaForms.controls['lastname'].value,
    //     id: this.Asistencia.length + 1,
    //     docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.lastName,
    //     idasignatura: this.data.id,
    //     type: localStorage.getItem('tipoSolicitud') || ''

    //   };
    //   this.Asistencia.push(this.AsistenciaOne);
    //   localStorage.setItem('asitencias', JSON.stringify(this.Asistencia));
    //   this.ResponseMessage.CodError = 200;
    //   this.ResponseMessage.Message = 'Registrado correctamente.';
    //   this.dialogRef.close(this.ResponseMessage);
    // } else {
    //   this.Asistencia.push(this.AsistenciaForms.getRawValue());
    //   localStorage.setItem('asitencias', JSON.stringify(this.Asistencia));
    //   this.ResponseMessage.CodError = 200;
    //   this.ResponseMessage.Message = 'Cargado correctamente.';
    //   this.dialogRef.close(this.ResponseMessage);
    // }



    // Asistencia

    // if (this.action === 'add') {
    //   this._AnnualPlanService.addAnnualPlanPeriod(this.PeriodForm.getRawValue()).subscribe({
    //     next: (res: any) => {
    //       this.ResponseMessage.CodError = 200;
    //       this.ResponseMessage.Message = 'Cargado correctamente.';
    //       this.dialogRef.close(this.ResponseMessage);
    //     },
    //     error: (err: any) => {
    //       this.ResponseMessage.CodError = 500;
    //       this.ResponseMessage.Message = err;
    //       this.dialogRef.close(this.ResponseMessage);
    //     }
    //   });
    // } else {
    //   this._AnnualPlanService.updateAnnualPlanPeriod(this.PeriodForm.getRawValue()).subscribe({
    //     next: (res: any) => {
    //       this.ResponseMessage.CodError = 200;
    //       this.ResponseMessage.Message = 'Editado correctamente.';
    //       this.dialogRef.close(this.ResponseMessage);
    //     },
    //     error: (err: any) => {
    //       this.ResponseMessage.CodError = 500;
    //       this.ResponseMessage.Message = err;
    //       this.dialogRef.close(this.ResponseMessage);
    //     }
    //   });
    // }
  }
  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    return fecha.toISOString().split('T')[0];
  }

  getAsistencias() {

    console.log('asistencialist',this.data.asistence);
    this.ListAsistence = new MatTableDataSource<AttenderResponse>(this.data.asistence);
    this.ListAsistence.paginator = this.paginator;
  }
}



