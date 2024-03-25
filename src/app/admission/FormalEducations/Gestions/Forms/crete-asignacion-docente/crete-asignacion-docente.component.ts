import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Period } from 'app/enrollment/models/Period';
import { Teacher } from 'app/teaching-management/models/Teacher';
export interface DialogData {
  periodId: string;
  accion: string;
  year: string;
  subjectId: string;
  roomId: string;
  dataPeriod: Period;
}
@Component({
  selector: 'app-crete-asignacion-docente',
  templateUrl: './crete-asignacion-docente.component.html',
  styleUrls: ['./crete-asignacion-docente.component.scss']
})
export class CreteAsignacionDocenteComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PeriodForm: UntypedFormGroup;
  public Turno: any[] = [
    {
      id: 1,
      name: 'Matutino',
    },
    {
      id: 2,
      name: 'Vespertino',
    },
    {
      id: 3,
      name: 'Nocturno'
    }
  ];

  public ListTeacher!: Teacher[];
  constructor(
    public dialogRef: MatDialogRef<CreteAsignacionDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Asignación de Docente";
    }
    this.PeriodForm = this.fb.group({
      classShift: ['', [Validators.required]],
      periodId: [data.periodId, [Validators.required]],
      year: [data.year, [Validators.required]],
      subjectId: [data.subjectId, [Validators.required]],
      roomId: [data.roomId, [Validators.required]],
      teacherCedulas: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      examDate: ['', [Validators.required]],
      // virtualRoom: ['001', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getDocentes();
  }
  getDocentes() {
    this._DegreeService.getDocentes(this.data.subjectId).subscribe({
      next: (res) => {
        this.ListTeacher = res;
      }
    });
  }
  submit() {
    let senData = {
      classShift: this.PeriodForm.controls['classShift'].value,
      periodId: this.PeriodForm.controls['periodId'].value,
      year: this.PeriodForm.controls['year'].value,
      subjectId: this.PeriodForm.controls['subjectId'].value,
      roomId: this.PeriodForm.controls['roomId'].value,
      teacherCedulas: [this.PeriodForm.controls['teacherCedulas'].value],
      startDate: this.PeriodForm.controls['startDate'].value,
      endDate: this.PeriodForm.controls['endDate'].value,
      examDate: this.PeriodForm.controls['examDate'].value
    }
    this._DegreeService.SaveCreateTeacher(senData).subscribe({
      next: (res: any) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err: any) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = "Intento Nuevamente.";
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }
}
