import { Component,  OnInit, ViewChild,OnDestroy } from '@angular/core';
import { TableElement, TableExportUtil } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {  Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DatePipe } from '@angular/common';
import { GetPeriodContable } from 'app/treasury/Models/AccountPeriodResponse';
import { AccountPeriodService } from 'app/treasury/Services/account-period.service';
import { FormAccountPeriodComponent } from '../form-account-period/form-account-period.component';

@Component({
  selector: 'app-list-account-period',
  templateUrl: './list-account-period.component.html',
  styleUrls: ['./list-account-period.component.scss']
})
export class ListAccountPeriodComponent implements OnInit,
OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: GetPeriodContable[] = [];

  displayedColumns = [
    'periodoId',
    'fechaInicio',
    'fechaFin',
    'descripcion',
    'statusId',
    'createdDate',
    'createBy',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<GetPeriodContable>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  serviceAccountPeriodService:AccountPeriodService,
    private datePipe:DatePipe){}

    ngOnInit(): void {
      this.loadData();
    }

     ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe())
    }

    loadData():void{
      this.IsLoading = true;
      this.lstResultados = [];
      this.subscriptions.push(
        this.serviceAccountPeriodService.getAll().subscribe({
          next : (request)=>{
                   const  r = request.getPeriodContables;
                   r.forEach(
                    (p)=>{
                      this.lstResultados.push(
                        {
                          periodoId: p.periodoId,
                          fechaInicio: p.fechaInicio,
                          fechaFin: p.fechaFin,
                          descripcion: p.descripción,
                          statusId: p.statusId,
                          createdBy: p.createdBy,
                          createdDate: p.createdDate
                        }
                      )
                    }
                   );
                   this.dataSource = new MatTableDataSource<GetPeriodContable>(this.lstResultados);
                   this.IsLoading = false;
                   this.dataSource.paginator = this.paginator;
          },
          error : (err:HttpErrorResponse) =>{
            this.IsLoading = false;
            this.dataSource.paginator = this.paginator;
            console.log(err);
          }
         })
      );
    }

    open(row:GetPeriodContable){
      row.actions = "edit";
      const dialogRef = this.dialog.open(FormAccountPeriodComponent, {
        data: {
          detail: row
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


    addNew(){

      const row: GetPeriodContable = {
        actions: "new"
      };

      const dialogRef = this.dialog.open(FormAccountPeriodComponent, {
        data: {
          detail: row
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


  filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }

  refresh(): void {
      this.loadData();
  }


  exportExcel(): void {
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
      "Id": x.periodoId,
      'Descripción': x.descripcion,
      'Fecha Inicio': this.datePipe.transform(x.fechaInicio,'dd/MM/yyyy')!,
      'Fecha Fin': this.datePipe.transform(x.fechaFin,'dd/MM/yyyy')!,
      'Estado': (x.statusId == 1 ? 'Activo' : 'Inactivo'),
      'Creado por': x.createdBy,
      'Fecha de Creación':  this.datePipe.transform(x.createdDate,'dd/MM/yyyy')!,
    }));
  TableExportUtil.exportToExcel(exportData, 'excel');
  }

  sortData(sort: Sort) {
    const data = this.lstResultados.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<GetPeriodContable>(data);
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.lstResultados = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'periodoId':
          return this.compare(a.periodoId!, b.periodoId!, isAsc);
        case 'fechaInicio':
          return this.compare(a.fechaInicio!, b.fechaInicio!, isAsc);
        case 'fechaFin':
          return this.compare(a.fechaFin!, b.fechaFin!, isAsc);
        case 'statusId':
          return this.compare(a.statusId!, b.statusId!, isAsc);
        case 'descripción':
            return this.compare(a.descripcion!, b.descripcion!, isAsc);
        case 'createdBy':
          return this.compare(a.createdBy!, b.createdBy!, isAsc);
        case 'createdDate':
            return this.compare(a.createdDate!, b.createdDate!, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<GetPeriodContable>(this.lstResultados);
    this.dataSource.paginator = this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean):number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  delete(row:GetPeriodContable){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminará " + row.descripcion!,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
        this.serviceAccountPeriodService.delete(row.periodoId!).subscribe({
        next:()=>{
             Swal.fire({
              title: "Eliminado!",
              text: row.descripcion! +" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:HttpErrorResponse) => {
            console.log(err);
             Swal.fire({
              title: "Intente nuevamente!",
              text: row.descripcion!+" no se pudo eliminar.",
              icon: "warning"
            });
          }
      })
      );

      }
    });
  }

}
