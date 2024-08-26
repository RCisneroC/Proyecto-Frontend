import { Direction } from '@angular/cdk/bidi';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { TypeRequest } from 'app/admission/FormalEducations/Models/TypeRequest';
import { TypeRequestService } from 'app/admission/FormalEducations/Services/type-request.service';
import { TypeRequestFormComponent } from '../type-request-form/type-request-form.component';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { TableElement, TableExportUtil } from '@shared';

@Component({
  selector: 'app-type-request-list',
  templateUrl: './type-request-list.component.html',
  styleUrls: ['./type-request-list.component.scss']
})
export class TypeRequestListComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

  displayedColumns = [
    //'requestType',
    'requestTypeName',
    //'approvalRole',
    'approvalRoleName',
    'statusId',
    'actions',
  ];
  

  exampleDatabase?: TypeRequestService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<TypeRequest>(true, []);
  id?: number;
  typeRequest?: TypeRequest;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public typeRequestService: TypeRequestService,
    private snackBar: MatSnackBar
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
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TypeRequestFormComponent, {
      data: {
        typeRequest: this.typeRequest,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
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
  editCall(row: TypeRequest) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TypeRequestFormComponent, {
      data: {
        typeRequest: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
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

  delete(row:TypeRequest) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.approvalRole,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.typeRequestService.DeleteTypeRequest(row.id).subscribe({
        next:(res:ResponseGenerica)=>{
             Swal.fire({
              title: "Eliminado!",
              text: row.approvalRole+" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
             Swal.fire({
              title: "Intente nuevamente!",
              text: row.approvalRole+" no se pudo eliminar.",
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
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new TypeRequestService(this.httpClient);
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
        'First Name': x.approvalRole,
       
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<TypeRequest> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TypeRequest[] = [];
  renderedData: TypeRequest[] = [];
  constructor(
    public exampleDatabase: TypeRequestService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TypeRequest[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllTypeRequest();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((typeRequest: TypeRequest) => {
            const searchStr = (typeRequest.approvalRole).toLowerCase();
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
  sortData(data: TypeRequest[]): TypeRequest[] {
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
          [propertyA, propertyB] = [a.approvalRole, b.approvalRole];
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


