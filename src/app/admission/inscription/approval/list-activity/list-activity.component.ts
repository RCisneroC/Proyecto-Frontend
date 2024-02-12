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
import { ScheduleActivity, ScheduleActivityDetail } from 'app/admission/models/scheduleActivity';
import { ScheduleActivitiesService } from 'app/admission/services/schedule-activities.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.scss']
})
export class ListActivityComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'planningDate',
    'activityModeName',
    'activityTypeName',
    'activityName',
    'activityLocationName',
    'startDate',
    'status',
    'actions',
  ];

  exampleDatabase?: ScheduleActivitiesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<ScheduleActivityDetail>(true, []);
  id?: number;
  activityDetail?: ScheduleActivityDetail;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public activityDetailService: ScheduleActivitiesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  ViewDetail(row: ScheduleActivityDetail) {
    localStorage.setItem('ruta_local', '/admission/activity-inscription/' + this.id);
    localStorage.setItem('name_actividad', row.name);
    this.router.navigate(['/admission/listado-participans/' + row.id]);
    console.log('====================================');
    console.log(row);
    console.log('====================================');
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addNew() {

  }
  editCall(row: ScheduleActivityDetail) {

  }

  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new ScheduleActivitiesService(this.httpClient);
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
        'First Name': x.curriculumDesignId,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}

export class ExampleDataSource extends DataSource<ScheduleActivityDetail> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ScheduleActivityDetail[] = [];
  renderedData: ScheduleActivityDetail[] = [];
  constructor(
    public exampleDatabase: ScheduleActivitiesService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ScheduleActivityDetail[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange2,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.exampleDatabase.getAllActivityDetail(this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data2
          .slice()
          .filter((activity: ScheduleActivityDetail) => {
            const observations = activity.name || '';
            const searchStr = observations.toLowerCase();
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
  sortData(data: ScheduleActivityDetail[]): ScheduleActivityDetail[] {
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


