import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { Jobs } from 'app/Job/Interfaces/Jobs';
import { JobServiceService } from 'app/Job/Services/job-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { JobFormsComponent } from '../Forms/job-forms/job-forms.component';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { CategoryJobServiceService } from 'app/Job/Services/category-job-service.service';
import { CompanyJobServiceService } from 'app/Job/Services/company-job-service.service';
import { TypeContractJobServiceService } from 'app/Job/Services/type-contract-job-service.service';
import { CategoryJobs } from 'app/Job/Interfaces/CategoryJobs';
import { CompanyJobs } from 'app/Job/Interfaces/Company-jobs';
import { TypeContractJobs } from 'app/Job/Interfaces/Type-contract-jobs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'job',
    'company',
    'ubicacion',
    'status',
    'actions',
  ];

  exampleDatabase?: JobServiceService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Jobs>(true, []);
  id?: number;
  cooperating?: Jobs;
  ListCategoria?: CategoryJobs[] = [this._CategoryJobServiceService._CategoryJobs];
  ListCompany?: CompanyJobs[] = [this._CompanyJobServiceService._CompanyJobs];
  ListContractType?: TypeContractJobs[] = [this._TypeContractJobServiceService._TypeContractJobs];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _JobServiceService: JobServiceService,
    public _CategoryJobServiceService: CategoryJobServiceService,
    public _CompanyJobServiceService: CompanyJobServiceService,
    public _TypeContractJobServiceService: TypeContractJobServiceService,
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.GetCategory();
    this.GetCompany();
    this.GetContractType();
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  GetCategory() {
    this._CategoryJobServiceService.getAllCategoryActivity(1).subscribe({
      next: (res) => {
        this.ListCategoria = res;
      }
    })
  }

  GetCompany() {
    this._CompanyJobServiceService.getAllCompanyJobsFiltro(1).subscribe({
      next: (res) => {
        this.ListCompany = res;
      }
    })
  }

  GetContractType() {
    this._TypeContractJobServiceService.getAllProvinciaActivity(1).subscribe({
      next: (res) => {
        this.ListContractType = res;
      }
    })
  }
  addNew() {
    this._JobServiceService.I_Jobs();
    const dialogRef = this.dialog.open(JobFormsComponent, {
      data: {
        Jobs: this._JobServiceService._Jobs,
        Categoty: this.ListCategoria,
        Company: this.ListCompany,
        ContractType: this.ListContractType,
        accion: 'add-jobs',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  editCall(row: Jobs) {
    this._JobServiceService.I_Jobs();
    const dialogRef = this.dialog.open(JobFormsComponent, {
      data: {
        Jobs: row,
        Categoty: this.ListCategoria,
        Company: this.ListCompany,
        ContractType: this.ListContractType,
        accion: 'edit-jobs',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  delete(row: Jobs) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._JobServiceService.DeleteJobs(row.id).subscribe({
          next: (res: ResponseGenerica) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.name + " fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.name + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'titulo': x.name,
        'compañia': x.companyName,
        'ubicación': x.companyAddress,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


  public loadData() {
    this.exampleDatabase = new JobServiceService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

}

export class ExampleDataSource extends DataSource<Jobs> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Jobs[] = [];
  renderedData: Jobs[] = [];
  constructor(
    public exampleDatabase: JobServiceService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Jobs[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllJobs();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((cooperating: Jobs) => {
            const searchStr = (cooperating.name).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Jobs[]): Jobs[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
