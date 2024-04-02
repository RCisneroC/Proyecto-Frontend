import { Component, ElementRef, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Calls } from 'app/CallsTeachers/models/CallsModel';
import { MatTableDataSource } from '@angular/material/table';
import { CallsNewComponent } from '../calls-new/calls-new.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AprovedCallsTeachersComponent } from '../aproved-calls-teachers/aproved-calls-teachers.component';
import { CallsEditComponent } from '../calls-edit/calls-edit.component';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss']
})
export class CallsListComponent implements OnInit,
OnDestroy {
  public subscriptions: Subscription[] = [];
  public lstResultados: Calls[] = [];

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


  constructor(public dialog: MatDialog, private  serviceCallsTeachers:CallsTeachersService){}

  ngOnInit(): void {
   this.loadData();
  }

  loadData():void{
    this.IsLoading = true;
    this.subscriptions.push(
      this.serviceCallsTeachers.getCallsAll().subscribe({
        next : (request:Calls[])=>{
                 this.lstResultados = request;
                 this.dataSource = new MatTableDataSource<Calls>(this.lstResultados);
                 this.IsLoading = false;
        },
        error : (err:HttpErrorResponse) =>{
          this.IsLoading = false;
          console.log(err);
        }
       })
    );
  }

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
        this.loadData();
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
        this.loadData();
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
    this.loadData();
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
        this.loadData();
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

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }



sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<Calls>(data);
    return;
  }

  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'titulo':
        return this.compare(a.titulo!, b.titulo!, isAsc);
      case 'proceso':
        return this.compare(a.proceso!, b.proceso!, isAsc);
      case 'fechaInicio':
        return this.compare(a.fechaInicio!, b.fechaInicio!, isAsc);
      case 'fechaFin':
        return this.compare(a.fechaFin!, b.fechaFin!, isAsc);
      case 'statusId':
        return this.compare(a.statusId!, b.statusId!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<Calls>(this.lstResultados);
}

 compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


}
