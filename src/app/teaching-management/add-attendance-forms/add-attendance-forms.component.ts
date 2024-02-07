import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService, User } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { StudenAsistence } from '../models/Asistencias';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface DialogData {
  id: string;
  action: string;
  students: User;
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
  IsLoading: boolean = false;
  action: string;
  dialogTitle: string = '';
  AsistenciaForms: UntypedFormGroup;
  ListAsistence = new MatTableDataSource<StudenAsistence>(this.StudenAsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListAsistence.paginator = value;
    }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<AddAttendanceFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AnnualPlanService: AnnualPlanService,
    private fb: UntypedFormBuilder,
    public authservice: AuthService
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
      idEstudiante: [data.students.id, [Validators.required]],
      cedula: [data.students.cedula, [Validators.required]],
      name: [data.students.firstName, [Validators.required]],
      lastname: [data.students.lastName, [Validators.required]],
      docente: [this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.lastName, [Validators.required]],
      idasignatura: [this.data.id, [Validators.required]],
      type: [localStorage.getItem('tipoSolicitud') || '', [Validators.required]]
    });
  }
  ngOnInit(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListAsistence.filter = filterValue.trim().toLowerCase();
  }
  submit() {
    let type = localStorage.getItem('tipoSolicitud');
    let local = localStorage.getItem('asitencias') || '';
    if (local != '') {
      this.Asistencia = JSON.parse(local);
      let fecha = this.AsistenciaForms.controls['startDate'].value;
      let existe = this.Asistencia.filter(x => this.formatearFecha(x.startDate.toString()) == this.formatearFecha(fecha) && x.cedula == this.AsistenciaForms.controls['cedula'].value && x.idasignatura == this.data.id && x.type == type);
      if (existe.length > 0) {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = 'Ya mantiene una asistencia para la fecha seleccionada.';
        this.dialogRef.close(this.ResponseMessage);
        return;
      }
      this.AsistenciaOne = {
        statusId: this.AsistenciaForms.controls['statusId'].value,
        startDate: this.AsistenciaForms.controls['startDate'].value,
        idEstudiante: this.AsistenciaForms.controls['idEstudiante'].value,
        cedula: this.AsistenciaForms.controls['cedula'].value,
        name: this.AsistenciaForms.controls['name'].value,
        lastname: this.AsistenciaForms.controls['lastname'].value,
        id: this.Asistencia.length + 1,
        docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.lastName,
        idasignatura: this.data.id,
        type: localStorage.getItem('tipoSolicitud') || ''

      };
      this.Asistencia.push(this.AsistenciaOne);
      localStorage.setItem('asitencias', JSON.stringify(this.Asistencia));
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Registrado correctamente.';
      this.dialogRef.close(this.ResponseMessage);
    } else {
      this.Asistencia.push(this.AsistenciaForms.getRawValue());
      localStorage.setItem('asitencias', JSON.stringify(this.Asistencia));
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Cargado correctamente.';
      this.dialogRef.close(this.ResponseMessage);
    }



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
    let local = localStorage.getItem('asitencias') || '';
    if (local != '') {
      this.Asistencia = JSON.parse(local);
      let type = localStorage.getItem('tipoSolicitud');
      console.log(type);

      this.AsistenciaUser = this.Asistencia.filter(x => x.cedula == this.data.students.cedula && x.idasignatura == this.data.id && x.type == type);
      console.log('====================================');
      console.log(this.AsistenciaUser);
      console.log('====================================');
      this.ListAsistence = new MatTableDataSource<StudenAsistence>(this.AsistenciaUser);
      this.ListAsistence.paginator = this.paginator;
    }

  }
}
