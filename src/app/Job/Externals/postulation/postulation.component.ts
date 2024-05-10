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
import { ViewLogoComponent } from 'app/admission/activitydetail/forms/view-logo/view-logo.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { CV, JobApplication } from 'app/Job/Interfaces/JobApplication';
import { JobServiceService } from 'app/Job/Services/job-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.scss']
})
export class PostulationComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'cv',
    'statusId',
  ];

  exampleDatabase?: JobServiceService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<JobApplication>(true, []);
  id?: number;
  cooperating?: JobApplication;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _JobServiceService: JobServiceService,
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


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  ver(row: JobApplication) {

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
  vercv(row: JobApplication) {
    this._JobServiceService.getcv(row.id).subscribe({
      next: (cv) => {
        let documentos: JobApplication = cv[0];
        if (documentos.cv == null) {
          Swal.fire({
            title: "Escuela Judicial!",
            text: "No mantiene CV cargado.",
            icon: "warning"
          });
          return;
        }

        if (this._verificarBS64.transform(documentos.cv.fileContents) != "pdf") {
          const dialogRef = this.dialog.open(ViewLogoComponent, {
            data: {
              type: this._verificarBS64.transform(documentos.cv.fileContents),
              accion: 'view-logo',
              logofile: documentos.cv.fileContents,
              logo: documentos.cv,
            },
            disableClose: true,
          });
        } else {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: this._verificarBS64.transform(documentos.cv.fileContents),
              accion: 'view-poster',
              posterFile: documentos.cv.fileContents,
              comment: "",
              poster: row,
            },
            width: '1000px',
            disableClose: true,
          });
        }
      }, error: () => {

      }
    })
  }
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Correo': x.applicantEmail,
        'usuario': x.applicantFullName,
        'JobName': x.jobName,
        'comentario': x.commentary,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


  public loadData() {
    this.exampleDatabase = new JobServiceService(this.httpClient);
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

}

export class ExampleDataSource extends DataSource<JobApplication> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: JobApplication[] = [];
  renderedData: JobApplication[] = [];
  constructor(
    public exampleDatabase: JobServiceService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<JobApplication[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeJobs,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllJobApplication();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataJobs
          .slice()
          .filter((cooperating: JobApplication) => {
            const searchStr = (cooperating.applicantFullName).toLowerCase();
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
  sortData(data: JobApplication[]): JobApplication[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.jobName, b.applicantFullName];
          break;
        case 'name':
          [propertyA, propertyB] = [a.jobName, b.applicantFullName];
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
