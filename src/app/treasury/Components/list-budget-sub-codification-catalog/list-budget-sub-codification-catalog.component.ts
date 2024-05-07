import { Component,  OnInit, ViewChild,OnDestroy } from '@angular/core';
import { TableElement, TableExportUtil } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {  Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Subcategoria } from 'app/treasury/Models/ListBudgetSubCodificationCatalog';
import { BudgetSubCondificationCatalogService } from 'app/treasury/Services/budget-sub-condification-catalog.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { FormBudgetSubCodificationCatalogComponent } from '../form-budget-sub-codification-catalog/form-budget-sub-codification-catalog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-budget-sub-codification-catalog',
  templateUrl: './list-budget-sub-codification-catalog.component.html',
  styleUrls: ['./list-budget-sub-codification-catalog.component.scss']
})
export class ListBudgetSubCodificationCatalogComponent implements  OnInit,
OnDestroy {
  public subscriptions: Subscription[] = [];
  public lstResultados: Subcategoria[] = [];

  displayedColumns = [
    'codigoSubcategoria',
    'descripcion',
    'categoriaId',
    'statusId',
    'createdDate',
    'createBy',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<Subcategoria>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  serviceBudgetSubCondificationCatalog:BudgetSubCondificationCatalogService,
    private datePipe:DatePipe){}


  ngOnInit(): void {
    this.loadData();
  }

   ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }


  loadData():void{
    this.IsLoading = true;
    this.subscriptions.push(
      this.serviceBudgetSubCondificationCatalog.getAll().subscribe({
        next : (request)=>{
                 this.lstResultados = request.subcategorias;
                 this.dataSource = new MatTableDataSource<Subcategoria>(this.lstResultados);
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


  open(row:Subcategoria){
    const dialogRef = this.dialog.open(FormBudgetSubCodificationCatalogComponent, {
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

    const row: Subcategoria = {
      actions: "new"
    };

    const dialogRef = this.dialog.open(FormBudgetSubCodificationCatalogComponent, {
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
      "Código Subcategoría": x.codigoSubcategoria,
      'Código Categoría': x.categoriaId,
      'Descripción': x.descripcion,
      'Estado': (x.statusId == 1 ? 'Activo' : 'Inactivo'),
      'Creado por': x.createBy,
      'Fecha de Creación':  this.datePipe.transform(x.createdDate,'dd/MM/yyyy')!,
    }));
  TableExportUtil.exportToExcel(exportData, 'excel');
  }



sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<Subcategoria>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'codigoSubcategoria':
        return this.compare(a.codigoSubcategoria!, b.codigoSubcategoria!, isAsc);
      case 'categoriaId':
        return this.compare(a.categoriaId!, b.categoriaId!, isAsc);
      case 'descripcion':
        return this.compare(a.descripcion!, b.descripcion!, isAsc);
      case 'statusId':
        return this.compare(a.statusId!, b.statusId!, isAsc);
      case 'createBy':
        return this.compare(a.createBy!, b.createBy!, isAsc);
      case 'createdDate':
          return this.compare(a.createdDate!, b.createdDate!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<Subcategoria>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

 compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}
