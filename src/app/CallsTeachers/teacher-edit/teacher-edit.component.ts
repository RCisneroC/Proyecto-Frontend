import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { User } from '@core/models/user';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { CallsTeachersService } from '../services/calls-teachers.service';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent extends UnsubscribeOnDestroyAdapter
implements OnInit  {
  displayedColumns = [
    'cedula',
    'name',
    'lastName',
    'type',
    'statusId',
    'process',
    'contractType',
    'evaluation',
    'createdDate',
    'dischargeDate',
    'actions'
  ];

  exampleDatabase?: TeacherService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Teacher>(true, []);
  teacherId?: number;
  teacher?: Teacher;
  user!: User;
  typeUser!: string;
  idProcess!: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private _nav: Router,
    private _RequestService: RequestServicesService,
    private authenticationService: AuthService,
    private activatedRoute: ActivatedRoute,
    private servCallsTeachersService: CallsTeachersService
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
    this.user = this.authenticationService.currentUserValue;
    this.typeUser = this._RequestService.getRoleFromToken(this.user.token);

    this.loadData();
  }
  refresh() {
    this.loadData();
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  Detail(row: Teacher) {
    this._nav.navigate(['/teaching-management/info-teacher/', row.cedula]);
  }


  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this._RequestService,
      this.authenticationService
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
        'Username': x.name,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  ViewExpediente(row: Teacher) {
    this.servCallsTeachersService.getCV(row.cedula).subscribe(
      {
        next : (request: string)=>{
             this.dialog.open(ViewPosterPDFComponent, {
              data: {
                type: 'pdf',
                accion: 'view-poster',
                posterFile: request,
                comment: [],
                poster: request,
              },
              width: '1200px',
              disableClose: true,
            });
        }
      }
     )
  }

}
export class ExampleDataSource extends DataSource<Teacher> {
  filterChange = new BehaviorSubject('');
  user = this.authenticationService.currentUserValue;
  typeUser = this._RequestService.getRoleFromToken(this.user.token);
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Teacher[] = [];
  renderedData: Teacher[] = [];
  constructor(
    public teacherService: TeacherService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    private _RequestService: RequestServicesService,
    private authenticationService: AuthService,
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Teacher[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.teacherService.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.teacherService.getAllTeachersCalls();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.typeUser == "Tutor" ? this.teacherService.data.filter(x => x.statusId == 1) : this.teacherService.data.slice()
          .filter((teacher: Teacher) => {
            const searchStr = (
              teacher.name

            ).toLowerCase();
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
  sortData(data: Teacher[]): Teacher[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'teacherId':
          [propertyA, propertyB] = [a.teacherId, b.teacherId];
          break;
        case 'Name':
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
