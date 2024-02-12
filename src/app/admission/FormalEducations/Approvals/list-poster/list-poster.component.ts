import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import Swal from 'sweetalert2';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { AnnualPlan } from '../../Models/AnnualPlan';
import { PosterRequest } from '../../Models/Degree';
import { ApprovedPosterTwoComponent } from '../Forms/approved-poster-two/approved-poster-two.component';

@Component({
  selector: 'app-list-poster',
  templateUrl: './list-poster.component.html',
  styleUrls: ['./list-poster.component.scss']
})
export class ListPosterComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'id',
    'actividad',
    'estado',
    'documento',
    'actions',
  ];

  exampleDatabase?: AnnualPlanService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<PosterRequest>(true, []);
  id?: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _AnnualPlanService: AnnualPlanService,
    private snackBar: MatSnackBar,
    private router: Router,
    public _nav: Router,
    public _verificarBS64: VerificarBS64Pipe
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

  ViewDetail(row: PosterRequest) {
    localStorage.setItem('url', '/admission/approved-poster');
    this._nav.navigate(['/admission/carreras/' + row.degreeId + '/detalle']);
  }
  aprobar(row: PosterRequest) {

    const dialogRef = this.dialog.open(ApprovedPosterTwoComponent, {
      data: {
        poster: row,
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

  verDocumento(row: PosterRequest) {

    this._AnnualPlanService.getPosterRequest(row.id).subscribe({
      next: (res) => {
        if (this._verificarBS64.transform(res.poster.fileContents) != "pdf") {
          const dialogRef = this.dialog.open(ViewPosterComponent, {
            data: {
              type: this._verificarBS64.transform(res.poster.fileContents),
              accion: 'view-poster',
              posterFile: res.poster.fileContents,
              comment: res.posterComments,
              poster: res,
            },
            disableClose: true,
          });
        } else {
          const dialogRef = this.dialog.open(ViewPosterPDFComponent, {
            data: {
              type: this._verificarBS64.transform(res.poster.fileContents),
              accion: 'view-poster',
              posterFile: res.poster.fileContents,
              comment: res.posterComments,
              poster: res,
            },
            width: '1000px',
            disableClose: true,
          });
        }
      },
      error: (err) => {

      }
    })

  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {

    this.exampleDatabase = new AnnualPlanService(this.httpClient);
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
        'Nombre': x.degreeName

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<PosterRequest> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PosterRequest[] = [];
  renderedData: PosterRequest[] = [];
  constructor(
    public exampleDatabase: AnnualPlanService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PosterRequest[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange_poster,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getRequestPoster('3');
    return merge(...displayDataChanges).pipe(
      map(() => {

        // Filter data
        this.filteredData = this.exampleDatabase.dataPoster
          .slice()
          .filter((poster: PosterRequest) => {
            const searchStr = (poster.degreeName).toLowerCase();
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
  sortData(data: PosterRequest[]): PosterRequest[] {
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
          [propertyA, propertyB] = [a.degreeName, b.degreeName];
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

