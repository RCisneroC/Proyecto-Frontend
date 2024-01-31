import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { InscriptionResponse } from 'app/admission/models/ParticipantesEF';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { ApprovalIncriptionComponent } from '../approval-incription/approval-incription.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-partaker-list-inscription-component',
  templateUrl: './partaker-list-inscription-component.component.html',
  styleUrls: ['./partaker-list-inscription-component.component.scss']
})
export class PartakerListInscriptionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'name',
    'lastName',
    'cedula',
    'estado',
    'fecha_inscrito',
    'actions',
  ];

  exampleDatabase?: InscriptionService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<InscriptionResponse>(true, []);
  id?: number;
  annualPlan?: InscriptionResponse;
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _InscriptionService: InscriptionService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })
  }
  refresh() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new InscriptionService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.activatedRoute,
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

  ViewDetail(user: InscriptionResponse) {

  }
  aprobar(user: InscriptionResponse) {
    const dialogRef = this._dialog.open(ApprovalIncriptionComponent, {
      data: {
        participant: user,
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
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'First Name': x.cedula,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}

export class ExampleDataSource extends DataSource<InscriptionResponse> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: InscriptionResponse[] = [];
  renderedData: InscriptionResponse[] = [];
  constructor(
    public exampleDatabase: InscriptionService,
    public paginator: MatPaginator,
    public activatedRoute: ActivatedRoute,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<InscriptionResponse[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeParticipantEF,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.exampleDatabase.getParticipantsEFomal();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataParticipantEF
          .slice()
          .filter((subject: InscriptionResponse) => {
            const searchStr = subject.cedula.toLowerCase();
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
  sortData(data: InscriptionResponse[]): InscriptionResponse[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.cedula, b.cedula];
          break;
        case 'name':
          [propertyA, propertyB] = [a.email, b.email];
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
