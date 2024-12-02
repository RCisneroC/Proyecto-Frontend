import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnnualPlanService} from "../../../../FormalEducations/Services/annual-plan.service";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {AnnualPlan} from "../../../../FormalEducations/Models/AnnualPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {VerificarBS64Pipe} from "../../../../../pipes/verificar-bs64.pipe";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {
  ApprovedAnnualPlanComponent
} from "../../../../FormalEducations/Approvals/Forms/approved-annual-plan/approved-annual-plan.component";
import {ResponseMessageMaestra} from "../../../../models/ResponseMessage";
import Swal from "sweetalert2";
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";


@Component({
  selector: 'app-plan-list-inscription',
  templateUrl: './plan-list-inscription.component.html',
  styleUrls: ['./plan-list-inscription.component.scss']
})
export class PlanListInscriptionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'name',
    'description',
    'dateStart',
    'dateEnd',
    'status',
    'actions',
  ];

  exampleDatabase?: AnnualPlanService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<AnnualPlan>(true, []);
  id?: number;
  annualPlan?: AnnualPlan;
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _AnnualPlanService: AnnualPlanService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
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

  ViewDegree(row: AnnualPlan) {
    this._router.navigate(['/admission/list-inscriptions-mesh/' + row.id]);
    localStorage.setItem('url', '/admission/approved-annualplan');
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
  aprobar(row: AnnualPlan) {
    const dialogRef = this.dialog.open(ApprovedAnnualPlanComponent, {
      data: {
        plan: row,
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

export class ExampleDataSource extends DataSource<AnnualPlan> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AnnualPlan[] = [];
  renderedData: AnnualPlan[] = [];
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
  connect(): Observable<AnnualPlan[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.GetanualPlanParticipants();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((subject: AnnualPlan) => {
            const searchStr = subject.name.toLowerCase();
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
  sortData(data: AnnualPlan[]): AnnualPlan[] {
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
