import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {RequestEstateDetail} from "../../Models/RequestEstate";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {FormRequestEstateListComponent} from "../form-request-estate-list/form-request-estate-list.component";
import {ResponseGenerica, ResponseMessageMaestra} from "../../../admission/models/ResponseMessage";
import Swal from "sweetalert2";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {RequestEstateDetailsService} from "../../Services/request-estate-details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details-request-estate',
  templateUrl: './details-request-estate.component.html',
  styleUrls: ['./details-request-estate.component.scss']
})
export class DetailsRequestEstateComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  displayedColumns = [
    'detailId',
    'quantity',
    'unit',
    'price',
    'goodsOrServiceDetail',
    'actions',
  ];

  exampleDatabase?: RequestEstateDetailsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<RequestEstateDetail>(true, []);
  id?: number;
  status?: RequestEstateDetail = this._Service._Model;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _Service : RequestEstateDetailsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })
  }
  refresh() {
    this.loadData();
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
  editCall(row: RequestEstateDetail) {
    this.id = row.detailId;

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

  delete(row:RequestEstateDetail) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.detailId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._Service.DeleteRooms(row.detailId).subscribe({
          next:(res:ResponseGenerica)=>{
            Swal.fire({
              title: "Eliminado!",
              text: row.detailId+" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.detailId+" no se pudo eliminar.",
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
    this.exampleDatabase = new RequestEstateDetailsService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.activatedRoute
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
        'ID': x.detailId,
        'Creado por': x.code,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}


export class ExampleDataSource extends DataSource<RequestEstateDetail> {
  filterChange = new BehaviorSubject('');
  id!: string;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RequestEstateDetail[] = [];
  renderedData: RequestEstateDetail[] = [];
  constructor(
    public exampleDatabase: RequestEstateDetailsService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RequestEstateDetail[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.exampleDatabase.getRequestEstateDetails(this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((_Model: RequestEstateDetail) => {
            const searchStr = (_Model.detailId).toString().toLowerCase();
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
  sortData(data: RequestEstateDetail[]): RequestEstateDetail[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.detailId, b.detailId];
          break;
        case 'name':
          [propertyA, propertyB] = [a.code, b.code];
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



