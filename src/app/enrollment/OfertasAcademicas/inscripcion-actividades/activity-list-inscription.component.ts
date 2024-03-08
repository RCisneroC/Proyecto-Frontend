import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ScheduleActivityDetail } from 'app/admission/models/scheduleActivity';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { ScheduleActivitiesService } from 'app/admission/services/schedule-activities.service';
import { ActivatedRoute } from '@angular/router';
import { ScheduleActivity } from 'app/admission/models/scheduleActivity';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list-inscription.component.html',
  styleUrls: ['./activity-list-inscription.component.scss']
})
export class ActivityListInscriptionComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

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
  }
  refresh() {
    this.loadData();
  }

  ViewDetail(row: ScheduleActivity) {
    localStorage.setItem('ruta_local','enrollment/ofertasacademicas/inscripcion-actividades')
    this.router.navigate(['/enrollment/ofertasacademicas/inscripcion-actividades/backoffice',row.id]);
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addNew(){

  }


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
    console.log(this.dataSource)
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


    this.exampleDatabase.getAllActivityDetailByStatus(5);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter datazzzzz
        this.filteredData = this.exampleDatabase.data2
          .slice()
          .filter((activity: ScheduleActivityDetail) => {
            const observations = activity.observations || '';
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


