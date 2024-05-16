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
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ResponseCompraMenor } from 'app/treasury/Models/GetAprobacionResponse';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { FormMinorPurchaseComponent } from '../form-minor-purchase/form-minor-purchase.component';
import { Router } from '@angular/router';
import { AddHeadCustodiaCajaRequest } from 'app/treasury/Models/AddHeadCustodiaCajaRequest';

@Component({
  selector: 'app-list-minor-purchase',
  templateUrl: './list-minor-purchase.component.html',
  styleUrls: ['./list-minor-purchase.component.scss']
})
export class ListMinorPurchaseComponent implements OnInit,
OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: ResponseCompraMenor[] = [];

  displayedColumns = [
    'unidadSolicitante',
    'entregueseA',
    'sumaDe',
    'statusId',
    'conceptoDe',
    'createDate',
    'createdBy',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<ResponseCompraMenor>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  serviceMinorPurchase:MinorPurchaseService,
    private router: Router){}


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
        this.serviceMinorPurchase.getMinorPurchaseAll().subscribe({
          next : (request)=>{
              if(request.statusCode == 200){
                this.lstResultados = request.responseCompraMenor;
                this.dataSource = new MatTableDataSource<ResponseCompraMenor>(this.lstResultados);
                 this.dataSource.paginator = this.paginator;
              }
                this.IsLoading = false;
          },
          error : (err:HttpErrorResponse) =>{
            this.IsLoading = false;
            this.dataSource.paginator = this.paginator;
            console.log(err);
          }
         })
      );
   }



open(row:ResponseCompraMenor){
  row.actions = "edit";
  const dialogRef = this.dialog.open(FormMinorPurchaseComponent, {
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

  const row: ResponseCompraMenor = {
    actions: "new"
  };

  const dialogRef = this.dialog.open(FormMinorPurchaseComponent, {
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
    "Id": x.compraMenorId,
    'Unidad Solicitante': x.unidadSolicitante,
    'Entréguese A': x.entregueseA,
    'Suma De': x.sumaDe,
    'Estado': (x.statusId == 3 ? 'Proceso' : 'Aceptada'),
    'Creado por': x.createdBy,
    'Fecha de Creación': x.createDate,
  }));
TableExportUtil.exportToExcel(exportData, 'excel');
}

sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<ResponseCompraMenor>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'compraMenorId':
        return this.compare(a.compraMenorId!, b.compraMenorId!, isAsc);
      case 'unidadSolicitante':
        return this.compare(a.unidadSolicitante!, b.unidadSolicitante!, isAsc);
      case 'conceptoDe':
        return this.compare(a.conceptoDe!, b.conceptoDe!, isAsc);
      case 'statusId':
        return this.compare(a.statusId!, b.statusId!, isAsc);
      case 'sumaDe':
          return this.compare(a.sumaDe!, b.sumaDe!, isAsc);
      case 'entregueseA':
          return this.compare(a.entregueseA!, b.entregueseA!, isAsc);
      case 'createdBy':
        return this.compare(a.createdBy!, b.createdBy!, isAsc);
      case 'createDate':
          return this.compare(a.createDate!, b.createDate!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<ResponseCompraMenor>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

delete(row:ResponseCompraMenor){
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Eliminará Compra Menor #" + row.compraMenorId!,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.subscriptions.push(
      this.serviceMinorPurchase.deleteMinorPurchase(row.compraMenorId!).subscribe({
      next:()=>{
           Swal.fire({
            title: "Eliminado!",
            text: "Compra menor # "+ row.compraMenorId! +" fue eliminado.",
            icon: "success"
          });
          this.loadData();
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
           Swal.fire({
            title: "Intente nuevamente!",
            text: "Compra menor # "+ row.compraMenorId!+" no se pudo eliminar.",
            icon: "warning"
          });
        }
    })
    );

    }
  });
}

ViewExpediente(row: ResponseCompraMenor) {
  this.subscriptions.push(
    this.serviceMinorPurchase.getPdfSmallCashReceipt(row.compraMenorId!).subscribe({
      next : (request)=>{
        console.log(request)
        this.dialog.open(ViewPosterPDFComponent, {
          data: {
            type: 'pdf',
            accion: 'view-poster',
            posterFile: request.responseComprobanteCajaMenudas.docFile,
            comment: [],
            poster: request.responseComprobanteCajaMenudas.docFile,
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


addConfirmacionCompra(row:ResponseCompraMenor){

const obj:AddHeadCustodiaCajaRequest = {
  solicituCompraMenorId : row.compraMenorId!,
  adelanto : row.sumaDe!
}

this.router.navigate(['treasury/list-confirm-purchase/' + row.compraMenorId], { state: { data: obj } })
}


}
