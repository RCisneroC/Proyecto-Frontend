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
import {  Tickets } from 'app/treasury/Models/GetTicketResponse';
import { TicketService } from 'app/treasury/Services/ticket.service';
import { FormTicketComponent } from '../form-ticket/form-ticket.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.scss']
})
export class ListTicketComponent implements OnInit,
OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: Tickets[] = [];

  displayedColumns = [
    'numeroBoleta',
    'descripcion',
    'monto',
    'statusId',
    'createdBy',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<Tickets>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  serviceTicket:TicketService){}

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
        this.serviceTicket.getAll().subscribe({
          next : (request)=>{
                   this.lstResultados = request.getBoletas;
                   this.dataSource = new MatTableDataSource<Tickets>(this.lstResultados);
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


open(row:Tickets){
  row.actions = "edit";
  const dialogRef = this.dialog.open(FormTicketComponent, {
    data: {
      detail: row
    },
    disableClose: true,
    width: '600px',
    height: '680px'
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

  const row: Tickets = {
    actions: "new"
  };

  const dialogRef = this.dialog.open(FormTicketComponent, {
    data: {
      detail: row
    },
    disableClose: true,
    width: '600px',
    height: '680px'
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
    "Id": x.boletaId,
    'Número de Boleta': x.numeroBoleta,
    'Descripción': x.descripcion,
    'Monto': x.monto,
    'Archivo': x.docFile,
    'Tipo de Archivo': x.fileType,
    'Estado': (x.statusId == 1 ? 'Activo' : 'Inactivo'),
    'Creado por': x.createdBy
  }));
TableExportUtil.exportToExcel(exportData, 'excel');
}

sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<Tickets>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'numeroBoleta':
        return this.compare(a.numeroBoleta!, b.numeroBoleta!, isAsc);
      case 'descripcion':
        return this.compare(a.descripcion!, b.descripcion!, isAsc);
      case 'monto':
        return this.compare(a.monto!, b.monto!, isAsc);
      case 'statusId':
        return this.compare(a.statusId!, b.statusId!, isAsc);
      case 'docFile':
          return this.compare(a.docFile!, b.docFile!, isAsc);
      case 'createdBy':
        return this.compare(a.createdBy!, b.createdBy!, isAsc);
      case 'file':
          return this.compare(a.file!, b.file!, isAsc);
      case 'fileType':
            return this.compare(a.fileType!, b.fileType!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<Tickets>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

delete(row:Tickets){
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
      this.serviceTicket.delete(row.boletaId!).subscribe({
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

ViewExpediente(row: Tickets) {
  this.subscriptions.push(
    this.serviceTicket.get(row.boletaId!).subscribe({
      next : (request)=>{
        console.log(request)
        this.dialog.open(ViewPosterPDFComponent, {
          data: {
            type: 'pdf',
            accion: 'view-poster',
            posterFile: request.getBoletas[0].docFile,
            comment: [],
            poster: request.getBoletas[0].docFile,
          },
          width: '1200px',
          disableClose: true,
        });
      },
      error : (err:HttpErrorResponse) =>{
        console.log(err);
      }
     })
  );

}


}
