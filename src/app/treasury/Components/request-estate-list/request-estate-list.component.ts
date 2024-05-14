import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {ResponseGenerica, ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import Swal from "sweetalert2";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {RequestEstateListService} from "../../Services/request-estate-list.service";
import {RequestEstateList} from "../../Models/RequestEstate";
import {FormRequestEstateListComponent} from "../form-request-estate-list/form-request-estate-list.component";
import {ScheduleActivityDetail} from "../../../admission/models/scheduleActivity";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-estate-list',
  templateUrl: './request-estate-list.component.html',
  styleUrls: ['./request-estate-list.component.scss']
})
export class RequestEstateListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  displayedColumns = [
    'requestId',
    'unitId',
    'telephone',
    'createdDate',
    'createdBy',
    'actions',
  ];

  exampleDatabase?: RequestEstateListService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<RequestEstateList>(true, []);
  id?: number;
  status?: RequestEstateList = this._Service._Model;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _Service : RequestEstateListService,
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

  ViewDetail(row: RequestEstateList) {
    this.router.navigate(['/treasury/request-estate-detail/' + row.requestId]);
  }
  addNew() {
    this._Service.init_Model();
    const dialogRef = this.dialog.open(FormRequestEstateListComponent, {
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
  editCall(row: RequestEstateList) {
    this.id = row.requestId;

    const dialogRef = this.dialog.open(FormRequestEstateListComponent, {
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

  delete(row:RequestEstateList) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.requestId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._Service.DeleteRooms(row.requestId).subscribe({
          next:(res:ResponseGenerica)=>{
            Swal.fire({
              title: "Eliminado!",
              text: row.requestId+" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.requestId+" no se pudo eliminar.",
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
    this.exampleDatabase = new RequestEstateListService(this.httpClient);
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
        'ID': x.requestId,
        'Creado por': x.createdBy,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}


export class ExampleDataSource extends DataSource<RequestEstateList> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RequestEstateList[] = [];
  renderedData: RequestEstateList[] = [];
  constructor(
    public exampleDatabase: RequestEstateListService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RequestEstateList[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getRequestEstateList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((_Model: RequestEstateList) => {
            const searchStr = (_Model.requestId).toString().toLowerCase();
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
  sortData(data: RequestEstateList[]): RequestEstateList[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.requestId, b.requestId];
          break;
        case 'name':
          [propertyA, propertyB] = [a.numeroRevision, b.numeroRevision];
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


