import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { RequiredDocument } from '../models/RequiredDocument';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';
import { RequiredDocumentFormComponent } from '../required-document-form/required-document-form.component';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-required-document-list',
  templateUrl: './required-document-list.component.html',
  styleUrls: ['./required-document-list.component.scss']
})
export class RequiredDocumentListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'typeEducationId',
    'point',
    'isRecord',
    'statusId',
    'actions',
  ];

  exampleDatabase?: TeacherService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<RequiredDocument>(true, []);
  id?: number;
  requiredDocument?: RequiredDocument;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teacherService: TeacherService,
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
    const dialogRef = this.dialog.open(RequiredDocumentFormComponent, {
      data: {
        requiredDocument: this.requiredDocument,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange2.value.unshift(
          this.teacherService.getDialogData2()
        );
        this.refreshTable();
        Swal.fire({
          title: "Escuela Judicial",
          text: "Guardado exitosamente",
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: "Intente de nuevo",
          icon: "warning"
        });
      }
    });
  }
  editCall(row: RequiredDocument) {
    this.id = row.documentId;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(RequiredDocumentFormComponent, {
      data: {
        requiredDocument: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange2.value.unshift(
          this.teacherService.getDialogData2()
        );
        this.refreshTable();
        Swal.fire({
          title: "Escuela Judicial",
          text: "Guardado exitosamente",
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: "Intente de nuevo",
          icon: "warning"
        });
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
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
        'First Name': x.name,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<RequiredDocument> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RequiredDocument[] = [];
  renderedData: RequiredDocument[] = [];
  constructor(
    public exampleDatabase: TeacherService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RequiredDocument[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange2,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllRequiredDocument();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data2
          .slice()
          .filter((requiredDocument: RequiredDocument) => {
            const searchStr = (requiredDocument.name).toLowerCase();
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
  sortData(data: RequiredDocument[]): RequiredDocument[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.documentId, b.documentId];
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
