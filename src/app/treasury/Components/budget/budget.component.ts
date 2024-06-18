import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetBudget } from 'app/treasury/Models/budgetRequest';
import { BudgetServicesService } from 'app/treasury/Services/budget-services.service';
import { Subscription } from 'rxjs';
import { BudgetFormsComponent } from '../FormsBudget/budget-forms/budget-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit,
OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: GetBudget[] = [];

  displayedColumns = [
    'tipopresupuesto',
    'departamento',
    'anio',
    'programa',
    'status',
    'actions'
  ];

  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<GetBudget>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  _BudgetServicesService:BudgetServicesService,private _nav:Router){}

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
        this._BudgetServicesService.getAll().subscribe({
          next : (request)=>{
                   this.lstResultados = request.getBudgets;
                   this.dataSource = new MatTableDataSource<GetBudget>(this.lstResultados);
                   console.log('====================================');
                   console.log(this.dataSource);
                   console.log('====================================');
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


open(row:GetBudget){
  row.actions = "edit";
  const dialogRef = this.dialog.open(BudgetFormsComponent, {
    data: {
      detail: row
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


addNew(){

  const row: GetBudget = {
    actions: "new"
  };

  const dialogRef = this.dialog.open(BudgetFormsComponent, {
    data: {
      detail: row
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


exportExcel(): void {
  const exportData: Partial<TableElement>[] =
  this.dataSource.filteredData.map((x) => ({
    "Id": x.id,
    'Tipo Presupuesto': x.typeOfBudget,
    'Año': x.year,
    'Departamento': x.administrativeUnitOrDependency,
    'Programa': x.subProgramOrProject,
    'Estado': (x.statusId == 1 ? 'Activo' : 'Inactivo'),
  }));
TableExportUtil.exportToExcel(exportData, 'excel');
}

sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<GetBudget>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'tipopresupuesto':
        return this.compare(a.typeOfBudget!, b.typeOfBudget!, isAsc);
      case 'departamento':
        return this.compare(a.administrativeUnitOrDependency!, b.administrativeUnitOrDependency!, isAsc);
      case 'anio':
        return this.compare(a.year!, b.year!, isAsc);
      case 'programa':
        return this.compare(a.subProgramOrProject!, b.subProgramOrProject!, isAsc);
      case 'status':
        return this.compare(a.statusId!, b.statusId!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<GetBudget>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

delete(row:GetBudget){
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Eliminará " + row.typeOfBudget!,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.subscriptions.push(
      this._BudgetServicesService.delete(row.id!).subscribe({
      next:()=>{
           Swal.fire({
            title: "Eliminado!",
            text: row.typeOfBudget! +" fue eliminado.",
            icon: "success"
          });
          this.loadData();
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
           Swal.fire({
            title: "Intente nuevamente!",
            text: row.typeOfBudget!+" no se pudo eliminar.",
            icon: "warning"
          });
        }
    })
    );

    }
  });
}

view(row:GetBudget){
  this._nav.navigate(['/treasury/budget-details/'+row.id])
}

}
