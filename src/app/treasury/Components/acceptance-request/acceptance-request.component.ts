import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {RequestEstateList} from "../../Models/RequestEstate";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {FormRequestEstateListComponent} from "../form-request-estate-list/form-request-estate-list.component";
import {ResponseGenerica, ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import Swal from "sweetalert2";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {AcceptanceRequestService} from "../../Services/acceptance-request.service";
import {AcceptanceRequest} from "../../Models/AcceptanceRequest";
import {FormAcceptanceRequestComponent} from "../form-acceptance-request/form-acceptance-request.component";

@Component({
  selector: 'app-acceptance-request',
  templateUrl: './acceptance-request.component.html',
  styleUrls: ['./acceptance-request.component.scss']
})
export class AcceptanceRequestComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  displayedColumns = [
    'detalleId',
    'solicitudId',
    'firmaSolicitante',
    'firmaAprobacion',
    'createdDate',
    'createdBy',
    'statusId',
    'actions',
  ];

  exampleDatabase?: AcceptanceRequestService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<AcceptanceRequest>(true, []);
  id?: number;
  status?: AcceptanceRequest = this._Service._Model;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _Service : AcceptanceRequestService,
    private snackBar: MatSnackBar,
    private router: Router
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
    this.loadData();
  }
  refresh() {
    this.loadData();
  }


  addNew() {
    this._Service.init_Model();
    const dialogRef = this.dialog.open(FormAcceptanceRequestComponent, {
      data: {
        GenericModel: this._Service._Model,
        action: 'add',
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
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
  editCall(row: AcceptanceRequest) {
    this.id = row.detalleId;

    const dialogRef = this.dialog.open(FormAcceptanceRequestComponent, {
      data: {
        GenericModel: row,
        action: 'edit',
      }
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError === 200) {
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

  delete(row:AcceptanceRequest) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.detalleId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._Service.Delete(row.detalleId).subscribe({
          next:(res:ResponseGenerica)=>{
            Swal.fire({
              title: "Eliminado!",
              text: row.detalleId+" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.detalleId+" no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new AcceptanceRequestService(this.httpClient);
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
        'ID': x.detalleId,
        'Creado por': x.createdBy,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}


export class ExampleDataSource extends DataSource<AcceptanceRequest> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AcceptanceRequest[] = [];
  renderedData: AcceptanceRequest[] = [];
  constructor(
    public exampleDatabase: AcceptanceRequestService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AcceptanceRequest[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAcceptanceRequest();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((_Model: AcceptanceRequest) => {
            const searchStr = (_Model.detalleId).toString().toLowerCase();
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
  sortData(data: AcceptanceRequest[]): AcceptanceRequest[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.detalleId, b.detalleId];
          break;
        case 'name':
          [propertyA, propertyB] = [a.createdBy, b.createdBy];
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


