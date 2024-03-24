import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from "@shared";
import { EnrollmentService } from "../services/enrollment.service";
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, map, merge, Observable } from "rxjs";
import { Subject } from "../models/Subject";
import { EnrollDummy } from "../models/EnrollDummy";
import Swal from "sweetalert2";
import { AuthService } from "@core";
import { subjectEnrollmentResult } from "../../admission/models/AddEFacademicResponse";

@Component({
  selector: 'app-enroll-subjects',
  templateUrl: './enroll-subjects.component.html',
  styleUrls: ['./enroll-subjects.component.scss']
})
export class EnrollSubjectsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'clases',
    'créditos',
    'horas',
    'periodo',
    'actions',
  ];

  exampleDatabase?: EnrollmentService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Subject>(true, []);
  id?: number;
  requirement?: Subject = this._SubjectService._Subject;
  enrollDummyList: EnrollDummy[] = [];
  subjectEnrollment: subjectEnrollmentResult[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _SubjectService: EnrollmentService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private _router: Router
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
      if (this.id) {
        this.loadMatriculadas(this.id.toString())
      }

    })
  }
  refresh() {
    this.loadData();
  }

  loadMatriculadas(id: string) {
    const cedula = this.authService.currentUserValue.cedula;
    this._SubjectService.GetStudentsSubjects(id, cedula).subscribe({
      next: (res) => {
        this.subjectEnrollment = res.subjectEnrollmentResult;
      }
    })
  }

  volverAtras() {
    this._router.navigate(['/enrollment/enroll-career']);
  }

  detalle(row: Subject) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      const cedula = this.authService.currentUserValue.cedula;
      if (this.id) {
        this._SubjectService.GetStudentsSubjects(this.id.toString(), cedula).subscribe({
          next: (res) => {
            this.subjectEnrollment = res.subjectEnrollmentResult;
            let exist = false
            console.log(this.subjectEnrollment);
            if (this.subjectEnrollment) {
              this.subjectEnrollment.forEach(function (value) {
                if (value.asignaturaId === row.id) {
                  exist = true
                  Swal.fire({
                    title: "Escuela Judicial",
                    text: "La asignatura ya fue matriculada",
                    icon: "warning"
                  });
                }

              });
            }
            if (!exist) {
              const SubjectItem = JSON.stringify(row);
              localStorage.setItem('enroll-subject', SubjectItem);
              localStorage.setItem('enroll-subject-url', 'enrollment/enroll-subject/' + this.id);
              this._router.navigate(['enrollment/enroll-room/']);
            }
          }
        })
      }

    })
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
        'Nombre Salón': x.name,
        'Descripción': x.description,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}

export class ExampleDataSource extends DataSource<Subject> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Subject[] = [];
  renderedData: Subject[] = [];
  constructor(
    public exampleDatabase: EnrollmentService,
    public paginator: MatPaginator,
    public activatedRoute: ActivatedRoute,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subject[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeSubject,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.exampleDatabase.GetSubjectsBy(1, this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataSubject
          .slice()
          .filter((_Subject: Subject) => {
            const searchStr = (_Subject.name).toLowerCase();
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
  sortData(data: Subject[]): Subject[] {
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

