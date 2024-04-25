import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { UbicationsJobs } from 'app/Job/Interfaces/Company-jobs';
import { CompanyJobServiceService } from 'app/Job/Services/company-job-service.service';
import { UbicationsServicesService } from 'app/Job/Services/ubications-services.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { UbicationsFormsComponent } from '../Forms/ubications-forms/ubications-forms.component';
import Swal from 'sweetalert2';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { ProvinciaJobServiceService } from 'app/Job/Services/provincia-job-service.service';
import { ProvinceJobs } from 'app/Job/Interfaces/Province-jobs';

@Component({
  selector: 'app-ubications',
  templateUrl: './ubications.component.html',
  styleUrls: ['./ubications.component.scss']
})
export class UbicationsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'statusId',
    'actions',
  ];

  exampleDatabase?: UbicationsServicesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<UbicationsJobs>(true, []);
  id?: any;
  cooperating?: UbicationsJobs;
  _ProvinceJobs: ProvinceJobs[] = [{
    description: '',
    id: 0,
    name: '',
    statusId: 0
  }];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _UbicationsServicesService: UbicationsServicesService,
    public _ProvinciaJobServiceService: ProvinciaJobServiceService,
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

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['IdCompany'];
      console.log(this.id);
      this.loadData();
      this.getprovincia();
    })
  }
  refresh() {
    this.loadData();
  }

  getprovincia() {
    this._ProvinciaJobServiceService.getAllProvinciaActivity(1).subscribe({
      next: (res) => {
        this._ProvinceJobs = res;
      }
    })
  }

  addNew() {
    this._UbicationsServicesService.init_UbicationsJobs();
    const dialogRef = this.dialog.open(UbicationsFormsComponent, {
      data: {
        ubications: this._UbicationsServicesService._UbicationsJobs,
        accion: 'add-ubications',
        companyId: this.id,
        province: this._ProvinceJobs
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

  editCall(row: UbicationsJobs) {
    this._UbicationsServicesService.init_UbicationsJobs();
    const dialogRef = this.dialog.open(UbicationsFormsComponent, {
      data: {
        ubications: row,
        accion: 'edit-ubications',
        companyId: this.id,
        province: this._ProvinceJobs
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
  delete(row: UbicationsJobs) {
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
        this._UbicationsServicesService.DeleteUbicationsJobs(row.id).subscribe({
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
        'Ubicación': x.name,
        'Descripción': x.description,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


  public loadData() {
    this.exampleDatabase = new UbicationsServicesService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.id
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

export class ExampleDataSource extends DataSource<UbicationsJobs> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UbicationsJobs[] = [];
  renderedData: UbicationsJobs[] = [];
  constructor(
    public exampleDatabase: UbicationsServicesService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public id: string
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UbicationsJobs[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllUbicationsJobs(this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((cooperating: UbicationsJobs) => {
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
  sortData(data: UbicationsJobs[]): UbicationsJobs[] {
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
