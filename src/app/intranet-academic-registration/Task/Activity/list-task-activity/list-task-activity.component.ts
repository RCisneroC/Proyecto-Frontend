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
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-task-activity',
  templateUrl: './list-task-activity.component.html',
  styleUrls: ['./list-task-activity.component.scss']
})
export class ListTaskActivityComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'activityName',
    'activityLocationName',
    'activityModeName',
    'activityTypeName',
    'startDate',
    'plannedEndDate',
    'status',
    'actions',
  ];

  exampleDatabase?: ActivityListService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<GetOneActivity>(true, []);
  id?: number;
  activityDetail?: GetOneActivity;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _ActivityListService: ActivityListService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _nav: Router
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
  }

  editCall(row: GetOneActivity) {
  }

  Detail(row: GetOneActivity) {
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new ActivityListService(this.httpClient);
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
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  SendApproval() {
  }

}
export class ExampleDataSource extends DataSource<GetOneActivity> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: GetOneActivity[] = [];
  renderedData: GetOneActivity[] = [];
  constructor(
    public exampleDatabase: ActivityListService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<GetOneActivity[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllActivity(5);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((activity: GetOneActivity) => {
            const searchStr = (activity.name).toLowerCase();
            // const observations = activity.observations || '';
            // const searchStr = observations.toLowerCase();
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
  sortData(data: GetOneActivity[]): GetOneActivity[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'curriculumDesignId':
          [propertyA, propertyB] = [a.curriculumDesignId, b.curriculumDesignId];
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

