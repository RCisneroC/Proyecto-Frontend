import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetBudgetTermMonth } from 'app/treasury/Models/BudgetTermMonth';
import { BudgetTermMonthServicesService } from 'app/treasury/Services/budget-term-month-services.service';
import { BudgetTermMonthFormsComponent } from '../FormsBudget/budget-term-month-forms/budget-term-month-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-term-month',
  templateUrl: './budget-term-month.component.html',
  styleUrls: ['./budget-term-month.component.scss']
})
export class BudgetTermMonthComponent implements OnInit{
 
  public lstResultados: GetBudgetTermMonth[] = [];

  displayedColumns = [
    'name',
    'descipcion',
    'status',
    'actions'
  ];

  public IsLoading: boolean = false;
  public id:string='0';
  dataSource = new MatTableDataSource<GetBudgetTermMonth>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  _BudgetTermMonthServicesService:BudgetTermMonthServicesService, private _Nav:Router,private _router: ActivatedRoute){

      if (_router.snapshot.params["id"] != undefined) {
        this.id = _router.snapshot.params["id"];
      }
    }

    ngOnInit(): void {
      this.loadData();
    } 

    loadData():void{
      this.IsLoading = true;
      this.lstResultados = [];
        this._BudgetTermMonthServicesService.getBudgetTermId(this.id).subscribe({
          next : (request)=>{
                   this.lstResultados = request.getBudgetTermMonths;
                   this.dataSource = new MatTableDataSource<GetBudgetTermMonth>(this.lstResultados);
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
}

volverAtras(){
this._Nav.navigate(['/treasury/budget-term']);
}
open(row:GetBudgetTermMonth){
  row.actions = "edit";
  const dialogRef = this.dialog.open(BudgetTermMonthFormsComponent, {
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

  const row: GetBudgetTermMonth = {
    actions: "new"
  };

  const dialogRef = this.dialog.open(BudgetTermMonthFormsComponent, {
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
    'Nombre': x.name,
    'Descripción': x.description,
    'Periodo': x.budgetTermId,
    'Estado': (x.statusId == 1 ? 'Activo' : 'Inactivo'),
  }));
TableExportUtil.exportToExcel(exportData, 'excel');
}

sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<GetBudgetTermMonth>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name':
        return this.compare(a.name!, b.name!, isAsc);
      case 'descipcion':
        return this.compare(a.description!, b.description!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<GetBudgetTermMonth>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

delete(row:GetBudgetTermMonth){
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Eliminará " + row.name!,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this._BudgetTermMonthServicesService.delete(row.id!).subscribe({
      next:()=>{
           Swal.fire({
            title: "Eliminado!",
            text: row.name! +" fue eliminado.",
            icon: "success"
          });
          this.loadData();
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
           Swal.fire({
            title: "Intente nuevamente!",
            text: row.name!+" no se pudo eliminar.",
            icon: "warning"
          });
        }
    })

    }
  });
}

view(row:GetBudgetTermMonth){
  this._Nav.navigate(['/treasury/budget-term-details/'+row.id]);
}

}
