import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Calls } from 'app/CallsTeachers/models/CallsModel';
import { MatTableDataSource } from '@angular/material/table';
import { CallsNewComponent } from '../calls-new/calls-new.component';
import { Direction } from '@angular/cdk/bidi';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AprovedCallsTeachersComponent } from '../aproved-calls-teachers/aproved-calls-teachers.component';
import { CallsEditComponent } from '../calls-edit/calls-edit.component';

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss']
})
export class CallsListComponent {
  public lstResultados: Calls[] = [
{
  id:1,
  titulo: "Convocatoria de Prueba",
  proceso: 1,
  descripcion: "Se solicita un docente tiempo parcial para dictar la cátedra de matemáticas",
  funciones:"<ul><li>Dictar clases</li></ul>",
  requisitos:"<ul><li>Especialización en Docencia</li></ul>",
  fechaInicio: "2024-06-01",
  fechaFin:"2024-06-30",
  actions:"",
  statusId:3
}
  ];

  displayedColumns = [
    'titulo',
    'proceso',
    'fechaInicio',
    'fechaFin',
    'statusId',
    'actions'
  ];
  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<Calls>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;


  constructor(public dialog: MatDialog){}

  OpenCalls(row: Calls): void {
    const dialogRef = this.dialog.open(AprovedCallsTeachersComponent, {
      data: {
        id: row.id,
      },
      disableClose: true,
      width: '600px',
      height: '600px'
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

  Detail(row: Calls): void {
    const dialogRef = this.dialog.open(CallsEditComponent, {
      data: {
        id: row.id,
        action: "edit",
        calls : row
      },
      disableClose: true,
      width: '1800px',
      height: '900px'
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

  exportExcel(): void {

  }

  refresh(): void {

  }

  addNew():void{

    const dialogRef = this.dialog.open(CallsNewComponent, {
      data: {
        id: 0,
        action: "new",
        calls : null
      },
      disableClose: true,
      width: '1800px',
      height: '900px'
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
