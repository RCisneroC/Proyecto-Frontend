import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { TableElement, TableExportUtil } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { GetConfirmaCompraResponse } from 'app/treasury/Models/GetPurchaseResponse';
import { FormConfirmPurchaseComponent } from '../form-confirm-purchase/form-confirm-purchase.component';
import { AddHeadCustodiaCajaRequest } from 'app/treasury/Models/AddHeadCustodiaCajaRequest';
import { FormAddPurchaseComponent } from '../form-add-purchase/form-add-purchase.component';
import { GetConfirmacionCustodio } from '../../Models/getConfirmaCustodioCaja';

@Component({
  selector: 'app-list-confirm-purchase',
  templateUrl: './list-confirm-purchase.component.html',
  styleUrls: ['./list-confirm-purchase.component.scss']
})
export class ListConfirmPurchaseComponent implements OnInit,
  OnDestroy, AfterViewInit {

  public addHeadCustodiaCajaRequest:AddHeadCustodiaCajaRequest = {
    solicituCompraMenorId: 0,
    adelanto: 0
  };

  id: number = 0;

  public subscriptions: Subscription[] = [];
  public lstResultados: GetConfirmaCompraResponse[] = [];
  public lstResultadosCustodio: GetConfirmacionCustodio[] = [];
  public hideHeader:boolean = true;
  public hideDetail:boolean = true;
  public HideButton:boolean = false;

  displayedColumns = [
    'numFactura',
    'adelanto',
    'importeFactura',
    'ajuste',
    // 'codigoFinaciero',
    // 'valor',
    'proveedor',
    // 'entregadoPor',
    // 'nombreRecibe',
    'createdDate',
    'estado',
    'actions'
  ];

  displayedColumnsCustodios = [
    'Codificacion_Presupuestaria',
    'Codigo_Financiero',
    'Valor',
    'Creado_Por',
    'createdDate',
    'estado',
    'actions'
  ];


  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
  dataSourceCustodio = new MatTableDataSource<GetConfirmacionCustodio>(this.lstResultadosCustodio);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
 
  @ViewChild('#paginatorSegundo')
  set paginatorSegundo(value: MatPaginator) {
    this.dataSourceCustodio.paginator = value;
  }
  constructor(private _nav: ActivatedRoute,
    private servicioMinorPurchase: MinorPurchaseService,
    public dialog: MatDialog,
    private router: Router,
    private cb: ChangeDetectorRef
  ) {
    if (_nav.snapshot.params["id"] != undefined) {
      this.id = parseInt(_nav.snapshot.params["id"]);
    }

   const t =  this.router.getCurrentNavigation()?.extras.state;
   if(t != undefined){
    this.addHeadCustodiaCajaRequest = t!['data'] as AddHeadCustodiaCajaRequest;
   }
   else{
    this.router.navigate(['treasury/list-minor-purchase'])
   }
  }


  ngAfterViewInit(): void {
    setTimeout(
      ()=>{
        if(this.lstResultados.length>0){
          this.hideHeader = true;
          this.hideDetail = false;
        
          
          this.cb.detectChanges();
        }
        else{
          this.hideHeader = false;
          this.hideDetail = true;
          this.cb.detectChanges();
        }
        console.log(this.hideHeader, this.hideDetail, this.HideButton);
        if(this.lstResultadosCustodio.length>0){
          this.HideButton = true; 
        }

      },1000)
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDataCustodio();
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
            if (request.getConfirmaCompraResponses != null) {
              this.lstResultados = request.getConfirmaCompraResponses;
              this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
              if(this.lstResultados.length>0){
                this.hideHeader = true;
                this.hideDetail = false;
              }
              this.dataSource.paginator = this.paginator;
            }
            else{
              this.lstResultados = [];
            }
            this.IsLoading = false;
            this.ngAfterViewInit();
            this.cb.detectChanges();
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
            if (request.getConfirmaCompraResponses != null) {
              this.lstResultados = request.getConfirmaCompraResponses;
              this.dataSource = new MatTableDataSource<GetConfirmaCompraResponse>(this.lstResultados);
              this.dataSource.paginator = this.paginator;
            }
            else{
              this.lstResultados = [];
            }
            this.IsLoading = false;
            this.ngAfterViewInit();
            this.cb.detectChanges();
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

  loadDataCustodio(): void {
    this.IsLoading = true;
    this.lstResultados = [];
    if (this.id != 0) {
      this.subscriptions.push(
        this.servicioMinorPurchase.GetConfirmCustodioCaja(this.id).subscribe({
          next: (request) => {
            if (request.getConfirmacionCustodio != null) {
              this.lstResultadosCustodio = request.getConfirmacionCustodio;
              console.log(this.lstResultadosCustodio);
              
              this.dataSourceCustodio = new MatTableDataSource<GetConfirmacionCustodio>(this.lstResultadosCustodio);
              this.dataSourceCustodio.paginator = this.paginatorSegundo;
            }
            else{
              this.lstResultadosCustodio = [];
            }
            this.IsLoading = false;
            this.ngAfterViewInit();
            this.cb.detectChanges();
          },
          error: (err: HttpErrorResponse) => {
            this.IsLoading = false;
            this.dataSource.paginator = this.paginatorSegundo;
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

    const dialogRef = this.dialog.open(FormConfirmPurchaseComponent, {
      data: {
        detail: this.addHeadCustodiaCajaRequest
      },
      disableClose: true,
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

  filtrarCustodio(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceCustodio.filter = filtro.trim().toLowerCase();
  }

  refreshCustodio(): void {
    this.loadDataCustodio();
  }


  exportExcel(): void {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'solicituCompraMenorId': x.solicituCompraMenorId,
        'numFactura': x.numFactura,
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
          this.servicioMinorPurchase.deleteConfirmPurchase(this.id,row.confirmaCompraId!,1).subscribe({
            next: () => {
              Swal.fire({
                title: "Eliminado!",
                text: "Compra menor # " + row.solicituCompraMenorId! + " fue eliminado.",
                icon: "success"
              });
              this.router.navigate(['/treasury/list-minor-purchase'])
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


addCompra() {

    const dialogRef = this.dialog.open(FormAddPurchaseComponent, {
      data: {
        solicituCompraMenorId: this.addHeadCustodiaCajaRequest.solicituCompraMenorId
      },
      disableClose: true,
      width: '650px', 
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }

      if (result.CodError == 200) {
        this.loadData();
        this.loadDataCustodio();
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

  deleteConfirmacion(row: GetConfirmacionCustodio) {
    console.log(row);
    
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminará Compra Menor #" + row.solicitudCompraMenorId!,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.servicioMinorPurchase.deleteConfirmPurchaseCustodio(row.idCompra!).subscribe({
            next: () => {
              Swal.fire({
                title: "Eliminado!",
                text: "Confirmación de Compra de custodio # " + row.solicitudCompraMenorId! + " fue eliminado.",
                icon: "success"
              });
              this.router.navigate(['/treasury/list-confirm-purchase/'+this.id])
              this.loadData();
              this.loadDataCustodio();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              Swal.fire({
                title: "Intente nuevamente!",
                text: "Compra menor # " + row.solicitudCompraMenorId! + " no se pudo eliminar.",
                icon: "warning"
              });
            }
          })
        );

      }
    });
  }

  finConfirmacion(row: GetConfirmaCompraResponse) {
   
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La compra se confirmara, y no se podra agregar nuevos articulos dentro del mismo gasto, ajuste sera devuelto a la caja menuda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioMinorPurchase.ConfirmCompraValid(row.solicituCompraMenorId).subscribe({
          next: (res) => {
            Swal.fire({
              title: "Confirmado Correctamente!",
              text: res.message,
              icon: "success"
            });
            this.router.navigate(['/treasury/list-confirm-purchase/'+row.solicituCompraMenorId])
            this.loadData();
            this.loadDataCustodio();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: "Intente nuevamente!.",
              icon: "warning"
            });
          }
        })
      }
    });
  }


}
