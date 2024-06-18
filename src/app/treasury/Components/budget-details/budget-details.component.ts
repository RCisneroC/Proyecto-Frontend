import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetBudgetDetail } from 'app/treasury/Models/BudgetDetails';
import { Subscription } from 'rxjs';
import { BudgetDetailsServicesService } from '../../Services/budget-details-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BudgetDetailsFormsComponent } from '../FormsBudget/budget-details-forms/budget-details-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import { Sort } from '@angular/material/sort';
import { BudgetDetailsMonthFormsComponent } from '../FormsBudget/budget-details-month-forms/budget-details-month-forms.component';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit,
OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: GetBudgetDetail[] = [];

  displayedColumns = [
    'id',
    'descripción',
    'code',
    'montototal',
    'actions'
  ];
  public id:string='';
  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<GetBudgetDetail>(this.lstResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private  _BudgetDetailsServicesService:BudgetDetailsServicesService,private _nav:Router,private _router: ActivatedRoute){

      if (_router.snapshot.params["id"] != undefined) {
        this.id = _router.snapshot.params["id"];
      }
    }

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
        this._BudgetDetailsServicesService.GetBudgetDetailBudgetId(this.id).subscribe({
          next : (request)=>{
                   this.lstResultados = request.getBudgetDetails;
                   this.dataSource = new MatTableDataSource<GetBudgetDetail>(this.lstResultados);
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


open(row:GetBudgetDetail){
  row.actions = "edit";
  const dialogRef = this.dialog.open(BudgetDetailsFormsComponent, {
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

  const row: GetBudgetDetail = {
    actions: "new",
    budgetId:parseInt(this.id)
  };

  const dialogRef = this.dialog.open(BudgetDetailsFormsComponent, {
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
    'Descripción': x.description,
    'Còdigo': x.code,
    'Monto': x.annualTotalAmount
  }));
TableExportUtil.exportToExcel(exportData, 'excel');
}

sortData(sort: Sort) {
  const data = this.lstResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<GetBudgetDetail>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }
  this.lstResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        return this.compare(a.id!, b.id!, isAsc);
      case 'descripción':
        return this.compare(a.description!, b.description!, isAsc);
      case 'code':
        return this.compare(a.code!, b.code!, isAsc);
      case 'montototal':
        return this.compare(a.annualTotalAmount!, b.annualTotalAmount!, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<GetBudgetDetail>(this.lstResultados);
  this.dataSource.paginator = this.paginator;
}

compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

delete(row:GetBudgetDetail){
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Eliminará " + row.description!,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.subscriptions.push(
      this._BudgetDetailsServicesService.delete(row.id!).subscribe({
      next:()=>{
           Swal.fire({
            title: "Eliminado!",
            text: row.description! +" fue eliminado.",
            icon: "success"
          });
          this.loadData();
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
           Swal.fire({
            title: "Intente nuevamente!",
            text: row.description!+" no se pudo eliminar.",
            icon: "warning"
          });
        }
    })
    );

    }
  });
}

view(row:GetBudgetDetail){

  row.actions = "edit";
  const dialogRef = this.dialog.open(BudgetDetailsMonthFormsComponent, {
    data: {
      detail: row
    },
    disableClose: false,
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

}
