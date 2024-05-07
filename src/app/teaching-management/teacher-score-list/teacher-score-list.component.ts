import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {TeacherService} from "../services/teacher.service";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Teacher} from "../models/Teacher";
import {AuthService, User} from "@core";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestServicesService} from "../../intranet-academic-registration/Services/request-services.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {Direction} from "@angular/cdk/bidi";
import {TeacherDetailComponent} from "../teacher-detail/teacher-detail.component";
import {ResponseMessageMaestra} from "../../admission/models/ResponseMessage";
import Swal from "sweetalert2";
import {AprovedTeacherComponent} from "../aproved-teacher/aproved-teacher.component";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {Filtros, FiltrosMatricula} from "../../estadisticas/PersonalDocente/model/Filtros";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {ScoreListService} from "../services/score-list.service";

@Component({
  selector: 'app-teacher-score-list',
  templateUrl: './teacher-score-list.component.html',
  styleUrls: ['./teacher-score-list.component.scss']
})
export class TeacherScoreListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'cedula',
    'name',
    'lastName',
    'statusId',
    'process',
    'createdDate',
    'dischargeDate',
    'points',
    'actions'
  ];
  public Educationlevel: boolean = false;
  public points: boolean = false;
  public year: boolean = false;
  public activ: boolean = false;
  public subjects: boolean = false;

  public listFiltros: Filtros[] =[
    {
      codigo: "Educationlevel",
      texto: "Por Nivel Educativo"
    },
    {
      codigo: "points",
      texto: "Por Puntos"
    },
    {
      codigo: "year",
      texto: "Por Años de Experiencia"
    },
    {
      codigo: "activ",
      texto: "Por Actividad"
    },
    {
      codigo: "subjects",
      texto: "Por Asignatura"
    },

  ];
  FilterForm!: UntypedFormGroup;
  exampleDatabase?: TeacherService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Teacher>(true, []);
  teacherId?: number;
  teacher?: Teacher;
  user!: User;
  typeUser!: string;
  idProcess!: number;
  edulevels: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private _nav: Router,
    private _RequestService: RequestServicesService,
    private authenticationService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private _Service: ScoreListService

  ) {
    super();
    this.FilterForm = this.createFilterForm();
    this._Service.loadEdulevel().subscribe({
      next:(res)=>{
        this.edulevels = res
      }
    });
  }

  createFilterForm(): UntypedFormGroup {

    return this.fb.group({
      Educationlevel: ['', [Validators.required]],
      points: ['', [Validators.required]],
      year: ['', [Validators.required]],
      activ: ['', [Validators.required]],
      subjects: ['', [Validators.required]]
    });
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

    this.loadData({});
  }

  filtrosChanges(event: MatSelectChange){
    if (event.value.indexOf("Educationlevel") !== -1) {
      this.Educationlevel = true;
    } else {
      this.Educationlevel = false;
      this.FilterForm.controls["Educationlevel"].setValue('');
    }
    if (event.value.indexOf("points") !== -1) {
      this.points = true;
    } else {
      this.points = false;
      this.FilterForm.controls["points"].setValue('');
    }
    if (event.value.indexOf("year") !== -1) {
      this.year = true;
    } else {
      this.year = false;
      this.FilterForm.controls["year"].setValue('');
    }
    if (event.value.indexOf("activ") !== -1) {
      this.activ = true;
    } else {
      this.activ = false;
      this.FilterForm.controls["activ"].setValue('');
    }
    if (event.value.indexOf("subjects") !== -1) {
      this.subjects = true;
    } else {
      this.subjects = false;
      this.FilterForm.controls["subjects"].setValue('');
    }
  }

  submit(){
    let params = '';
    if (this.FilterForm.controls["Educationlevel"].value != '') {
      params += `"idEducationLevel":${this.FilterForm.controls['Educationlevel'].value},`;
    }
    if (this.FilterForm.controls["points"].value != '') {
      params += `"puntos":${this.FilterForm.controls['points'].value},`;
    }
    if (this.FilterForm.controls["year"].value != '') {
      params += `"year":${this.FilterForm.controls['year'].value},`;
    }
    if (this.FilterForm.controls["activ"].value != '') {
      params += `"actIds":[${this.FilterForm.controls['activ'].value}],`;
    }
    if (this.FilterForm.controls["subjects"].value != '') {
      params += `"subjecIds":[${this.FilterForm.controls['subjects'].value}],`;
    }
    const paramFix = this.removerUltimoCaracter(params);
    const requestStr = `{${paramFix}}`;
    const Request = JSON.parse(requestStr);
    this.loadData(Request);
  }

  removerUltimoCaracter(cadena: string): string {
    if (cadena.charAt(cadena.length - 1) === ',') {
      return cadena.slice(0, -1);
    }
    return cadena;
  }
  refresh() {
    this.loadData({});
  }
  addNew() {
    this._nav.navigate(['/teacher/teacher-admission-external/']);

  }
  editCall(row: Teacher) {
    this.teacherId = row.teacherId;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TeacherDetailComponent, {
      data: {
        user: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }

      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData({});
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

  Detail(row: Teacher) {

    this._nav.navigate(['/teaching-management/teacher-score-details/', row.cedula]);
  }

  Aproved(row: Teacher) {

    const dialogRef = this.dialog.open(AprovedTeacherComponent, {

      data: {
        teacher: row,
        accion: 'add-course'
      },
      disableClose: true,
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
        this.loadData({});
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });

  }
  public loadData(params: any = '') {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this._RequestService,
      this.authenticationService,
      params
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
        'Nombre': x.name,
        'Apellido': x.lastName,
        'Cédula': x.cedula,
        'Puntos': x.points
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
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
    public _params: any
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
    this.teacherService.getAllTeachersFilters(this._params);
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData =  this.teacherService.data.filter(x => x.statusId == 1)
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
          [propertyA, propertyB] = [a.points, b.points];
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
