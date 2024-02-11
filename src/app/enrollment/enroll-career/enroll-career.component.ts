import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {
  ApprovedDegreeComponent
} from "../../admission/FormalEducations/Approvals/Forms/approved-degree/approved-degree.component";
import {ResponseMessageMaestra} from "../../admission/models/ResponseMessage";
import Swal from "sweetalert2";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {EnrollmentService} from "../services/enrollment.service";
import {Career} from "../models/Career";
import {AuthService} from "@core";
@Component({
  selector: 'app-enroll-career',
  templateUrl: './enroll-career.component.html',
  styleUrls: ['./enroll-career.component.scss']
})
export class EnrollCareerComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'FechaInicio',
    'FechaFin',
    'statusId',
    'actions',
  ];

  exampleDatabase?: EnrollmentService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Career>(true, []);
  id?: number;
  requirement?: Career = this._EnrollmentService._Career;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _EnrollmentService: EnrollmentService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private authService: AuthService,
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

  seleccionar(row: Career) {

    const CareerItem = JSON.stringify(row);
    localStorage.setItem('enroll-career', CareerItem);
    this._router.navigate(['/enrollment/enroll-subject/'+ row.degreeId]);

  }

  aprobar(row: Career) {
    const dialogRef = this.dialog.open(ApprovedDegreeComponent, {
      data: {
        malla: row,
        accion: 'approved',
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

  public loadData() {
    this.exampleDatabase = new EnrollmentService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.activatedRoute,
      this.sort,
      this.authService
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
        'Nombre Salón': x.mCurriculumName,
        'Descripción': x.descriptionName,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}

export class ExampleDataSource extends DataSource<Career> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Career[] = [];
  renderedData: Career[] = [];
  constructor(
    public exampleDatabase: EnrollmentService,
    public paginator: MatPaginator,
    public activatedRoute: ActivatedRoute,
    public _sort: MatSort,
    private authService: AuthService,

  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Career[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeCareer,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.GetSubjectDegree(this.authService.currentUserValue.cedula);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataCareer
          .slice()
          .filter((_Career:Career) => {
            const searchStr = (_Career.mCurriculumName).toLowerCase();
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
  sortData(data: Career[]): Career[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'degreeId':
          [propertyA, propertyB] = [a.degreeId, b.degreeId];
          break;
        case 'mCurriculumName':
          [propertyA, propertyB] = [a.mCurriculumName, b.mCurriculumName];
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

