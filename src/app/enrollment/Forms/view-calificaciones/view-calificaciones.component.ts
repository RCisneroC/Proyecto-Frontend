import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { CalificacionesModels } from 'app/enrollment/models/calificacion';


export interface DialogData {
  id: string;
  accion: string;
  calificaciones: CalificacionesModels[];
}


@Component({
  selector: 'app-view-calificaciones',
  templateUrl: './view-calificaciones.component.html',
  styleUrls: ['./view-calificaciones.component.scss']
})
export class ViewCalificacionesComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'tarea',
    'descripcion',
    'calificacion',
    'fecha',
  ]
  StudenAsistenceSource: CalificacionesModels[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      scoreType: {
        id: 0,
        name: '',
      },
      academicSubjectRecords: {
        id: 0,
        academicRecord: '',
        efAcademicRecordId: 0,
        subjectId: 0,
      },
      subjectTask: {
        title: '',
        subjectId: 0,
        taskType: '',
        description: '',
      },
      academicSubjectRecordId: 0,
      score: 0,
      scoreTypeId: 0,
      subjectTaskId: 0,
    }
  ]
  IsLoading: boolean = false;
  action: string = '';
  dialogTitle: string = '';
  ListadoCalificacion = new MatTableDataSource<CalificacionesModels>(this.StudenAsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListadoCalificacion.paginator = value;
    }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<ViewCalificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogTitle = 'Calificaciones';
    console.log('====================================');
    console.log(data.calificaciones);
    this.ListadoCalificacion = new MatTableDataSource<CalificacionesModels>(this.data.calificaciones);
    this.ListadoCalificacion.paginator = this.paginator;
    console.log('====================================');
    console.log(this.ListadoCalificacion);
    console.log('====================================');
    console.log('====================================');
  }
  ngOnInit(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoCalificacion.filter = filterValue.trim().toLowerCase();
  }
}

