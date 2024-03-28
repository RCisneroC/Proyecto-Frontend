import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Calls } from 'app/CallsTeachers/models/CallsModel';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';

@Component({
  selector: 'app-teacher-apply-calls',
  templateUrl: './teacher-apply-calls.component.html',
  styleUrls: ['./teacher-apply-calls.component.scss']
})
export class TeacherApplyCallsComponent {

  public lstResultados: Calls[] = [
    {
      id:1,
      titulo: "Convocatoria de Prueba",
      proceso: 1,
      descripcion: "Se solicita un docente tiempo parcial para dictar la cátedra de matemáticas",
      funciones:"<ul><li>Dictar clases</li></ul>",
      requisitos:"<ul><li>Especialización en Docencia</li></ul>",
      fechaInicio: "2024-26-01",
      fechaFin:"2024-06-30",
      actions:"",
      statusId:1
    },
    {
      id:2,
      titulo: "Convocatoria de Prueba 2",
      proceso: 2,
      descripcion: "Se solicita un docente tiempo parcial para dictar la cátedra de historia",
      funciones:"<ul><li>Dictar clases</li></ul>",
      requisitos:"<ul><li>Especialización en Docencia</li></ul>",
      fechaInicio: "2024-05-01",
      fechaFin:"2024-06-30",
      actions:"",
      statusId:2
    }
    ];

      displayedColumns = [
        'titulo'
      ];
      public IsLoading: boolean = false;
      dataSource = new MatTableDataSource<Calls>(this.lstResultados);
      @ViewChild('paginator', { static: true })
      paginator!: MatPaginator;


      getVacancy(value:any):void{

      }
}
