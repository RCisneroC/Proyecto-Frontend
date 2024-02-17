import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CalificacionesModels} from "../../enrollment/models/calificacion";
import {ResponseMessageMaestra} from "../../admission/models/ResponseMessage";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalificacionesECModels} from "../../enrollment/models/calificacionEC";

export interface DialogData {
  id: string;
  accion: string;
  calificaciones: CalificacionesECModels[];
}

@Component({
  selector: 'app-tutor-eccalification-form',
  templateUrl: './tutor-eccalification-form.component.html',
  styleUrls: ['./tutor-eccalification-form.component.scss']
})
export class TutorECCalificationFormComponent implements OnInit {
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
  StudenAsistenceSource: CalificacionesECModels[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      scoreType: {
        name: '',
        isActive: true,
        id: 0,
        createdDate: new Date,
        createdBy: '',
        lastModifiedDate: new Date,
        lastModifiedBy: ''
      },
      activityTask: {
        title: '',
        finalDate: new Date,
        taskTypeId: '',
        description: '',
        observation:'',
        activityId: 0,
        id: 0,
        createdDate: new Date,
        createdBy: '',
        lastModifiedDate: new Date,
        lastModifiedBy: ''
      },
      ecAcademicRecordId: 0,
      score: 0,
      scoreTypeId: 0,
      activityTaskId: 0,
    }
  ]
  IsLoading: boolean = false;
  action: string = '';
  dialogTitle: string = '';
  ListadoCalificacion = new MatTableDataSource<CalificacionesECModels>(this.StudenAsistenceSource);
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListadoCalificacion.paginator = value;
    }, 1000);
  }
  constructor(
    public dialogRef: MatDialogRef<TutorECCalificationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogTitle = 'Calificaciones';
    console.log('====================================');
    console.log(data.calificaciones);
    this.ListadoCalificacion = new MatTableDataSource<CalificacionesECModels>(this.data.calificaciones);
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

