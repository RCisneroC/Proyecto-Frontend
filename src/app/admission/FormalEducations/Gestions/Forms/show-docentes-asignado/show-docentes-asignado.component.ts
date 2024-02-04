import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocentesAsignados } from 'app/admission/FormalEducations/Models/DocentesA';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  periodId: string;
  accion: string;
  year: string;
  subjectId: Subject;
  roomId: string;
}
@Component({
  selector: 'app-show-docentes-asignado',
  templateUrl: './show-docentes-asignado.component.html',
  styleUrls: ['./show-docentes-asignado.component.scss']
})
export class ShowDocentesAsignadoComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
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
  public DocentesM: DocentesAsignados[] = [{
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }];

  public DocentesV: DocentesAsignados[] = [{
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }];

  public DocentesN: DocentesAsignados[] = [{
    statusId: 0,
    teacherCedula: '',
    teacherFullName: ''
  }];
  constructor(
    public dialogRef: MatDialogRef<ShowDocentesAsignadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService
  ) {
    this.dialogTitle = `Docentes asignados para la asignatura ${data.subjectId.name}`;
    this.action = data.accion;
    console.log(data);
    var dataFinal = {
      periodId: data.periodId,
      year: data.year,
      subjectId: data.subjectId.id,
      roomId: data.roomId,
      ClassShift: 1
    }
    _DegreeService.getDocenteAsignado(dataFinal).subscribe({
      next: (res) => {
        this.DocentesM = res;
        console.log(this.DocentesM);

      }
    })
    dataFinal.ClassShift = 2;
    _DegreeService.getDocenteAsignado(dataFinal).subscribe({
      next: (res) => {
        this.DocentesV = res;
        console.log(this.DocentesV);

      }
    })
    dataFinal.ClassShift = 3;
    _DegreeService.getDocenteAsignado(dataFinal).subscribe({
      next: (res) => {
        this.DocentesN = res;
        console.log(this.DocentesN);

      }
    })
  }

  eliminarDocente(deleteNumber: number, teacherCedula: string) {
    let dataEliminar = {
      classShift: deleteNumber,
      periodId: this.data.periodId,
      year: this.data.year,
      subjectId: this.data.subjectId.id,
      roomId: this.data.roomId,
      teacherCedula
    };
    let dataFinal = {
      periodId: this.data.periodId,
      year: this.data.year,
      subjectId: this.data.subjectId.id,
      roomId: this.data.roomId,
      ClassShift: deleteNumber
    }
    this._DegreeService.deleteTeachers(dataEliminar).subscribe({
      next: () => {
        this._DegreeService.getDocenteAsignado(dataFinal).subscribe({
          next: (res) => {
            if (deleteNumber == 1) {
              this.DocentesM = res;
            }
            if (deleteNumber == 2) {
              this.DocentesV = res;
            }
            if (deleteNumber == 3) {
              this.DocentesN = res;
            }
          }
        })
      }
    })
  }
  ngOnInit(): void {

  }

}
