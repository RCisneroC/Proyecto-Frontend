import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TableElement, TableExportUtil } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ActivatedRoute } from '@angular/router';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { GetConfirmaCompraResponse } from 'app/treasury/Models/GetPurchaseResponse';
import { FormConfirmPurchaseComponent } from '../form-confirm-purchase/form-confirm-purchase.component';

@Component({
  selector: 'app-list-confirm-purchase',
  templateUrl: './list-confirm-purchase.component.html',
  styleUrls: ['./list-confirm-purchase.component.scss']
})
export class ListConfirmPurchaseComponent implements OnInit,
  OnDestroy {
  id: number = 0;

  public subscriptions: Subscription[] = [];
  public lstResultados: GetConfirmaCompraResponse[] = [];

  displayedColumns = [
    'numFactura',
    'importeFactura',
    'adelanto',
    'ajuste',
    'codigoFinaciero',
    'valor',
    'proveedor',
    'entregadoPor',
    'nombreRecibe',
    'createdDate',
    'statusId',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(private _nav: ActivatedRoute,
    private servicioMinorPurchase: MinorPurchaseService,
    public dialog: MatDialog,
  ) {
    if (_nav.snapshot.params["id"] != undefined) {
      this.id = parseInt(_nav.snapshot.params["id"]);
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  loadData(): void {
    this.IsLoading = true;
    this.lstResultados = [];
    if (this.id == 0) {
      this.subscriptions.push(
        this.servicioMinorPurchase.getConfirmPurchaseAll().subscribe({
          next: (request) => {
            if (request.statusCode == 200) {
              this.lstResultados = request.getConfirmaCompraResponses;
              this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
              this.dataSource.paginator = this.paginator;
            }
            this.IsLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.IsLoading = false;
            this.dataSource.paginator = this.paginator;
            console.log(err);
          }
        })
      );
    }
    else {
      this.subscriptions.push(
        this.servicioMinorPurchase.getConfirmPurchaseById(this.id).subscribe({
          next: (request) => {
            if (request.statusCode == 200) {
              this.lstResultados = request.getConfirmaCompraResponses;
              this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
              this.dataSource.paginator = this.paginator;
            }
            this.IsLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.IsLoading = false;
            this.dataSource.paginator = this.paginator;
            console.log(err);
          }
        })
      );
    }
  }

  open(row: GetConfirmaCompraResponse) {
    row.actions = "edit";
    const dialogRef = this.dialog.open(FormConfirmPurchaseComponent, {
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


  addNew() {

    const row: GetConfirmaCompraResponse = {
      actions: "new"
    };

    const dialogRef = this.dialog.open(FormConfirmPurchaseComponent, {
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
        'solicituCompraMenorId': x.solicituCompraMenorId,
        'numFactura': x.numFactura,
        'Estado': (x.statusId == 3 ? 'Proceso' : 'Aceptada'),
        'importeFactura': x.importeFactura,
        'adelanto': x.adelanto,
        'ajuste': x.ajuste,
        'proveedor': x.proveedor,
        'categoriaId': x.categoriaId,
        'codigoFinaciero': x.codigoFinaciero,
        'valor': x.valor,
        'firmaAnallistaPresupestaria': x.firmaAnallistaPresupestaria ? "Sí" : "No",
        'autorizadoPor': x.autorizadoPor,
        'entregadoPor': x.entregadoPor,
        'nombreRecibe': x.nombreRecibe,
        'firma': x.firma ? "Sí" : "No",
        'cedula': x.cedula,
        'createdBy': x.createdBy,
        'createdDate': x.createdDate
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  sortData(sort: Sort) {
    const data = this.lstResultados.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(data);
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.lstResultados = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'compraMenorId':
          return this.compare(a.numFactura!, b.numFactura!, isAsc);
        case 'importeFactura':
          return this.compare(a.importeFactura!, b.importeFactura!, isAsc);
        case 'adelanto':
          return this.compare(a.adelanto!, b.adelanto!, isAsc);
        case 'statusId':
          return this.compare(a.statusId!, b.statusId!, isAsc);
        case 'ajuste':
          return this.compare(a.ajuste!, b.ajuste!, isAsc);
        case 'entreguescodigoFinacieroeA':
          return this.compare(a.codigoFinaciero!, b.codigoFinaciero!, isAsc);
        case 'valor':
          return this.compare(a.valor!, b.valor!, isAsc);
        case 'proveedor':
          return this.compare(a.proveedor!, b.proveedor!, isAsc);
        case 'entregueseA':
          return this.compare(a.entregadoPor!, b.entregadoPor!, isAsc);
        case 'nombreRecibe':
          return this.compare(a.nombreRecibe!, b.nombreRecibe!, isAsc);
       case 'createdBy':
          return this.compare(a.createdBy!, b.createdBy!, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
    this.dataSource.paginator = this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  delete(row: GetConfirmaCompraResponse) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminará Compra Menor #" + row.solicituCompraMenorId!,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.servicioMinorPurchase.deleteConfirmPurchase(row.solicituCompraMenorId!).subscribe({
            next: () => {
              Swal.fire({
                title: "Eliminado!",
                text: "Compra menor # " + row.solicituCompraMenorId! + " fue eliminado.",
                icon: "success"
              });
              this.loadData();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              Swal.fire({
                title: "Intente nuevamente!",
                text: "Compra menor # " + row.solicituCompraMenorId! + " no se pudo eliminar.",
                icon: "warning"
              });
            }
          })
        );

      }
    });
  }

}
