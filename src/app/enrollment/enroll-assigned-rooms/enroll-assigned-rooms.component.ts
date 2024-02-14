import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {EnrollmentService} from "../services/enrollment.service";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Degree, Mesh} from "../../admission/FormalEducations/Models/Degree";
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
import {Room} from "../models/Room";
import {Subject} from "../models/Subject";
import {EnrollDummy} from "../models/EnrollDummy";
import {Career} from "../models/Career";

@Component({
  selector: 'app-enroll-assigned-rooms',
  templateUrl: './enroll-assigned-rooms.component.html',
  styleUrls: ['./enroll-assigned-rooms.component.scss']
})
export class EnrollAssignedRoomsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'statusId',
    'actions',
  ];

  exampleDatabase?: EnrollmentService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Room>(true, []);
  id?: number;
  requirement?: Room = this._RoomService._Room;
  SubjectItem!: Subject;
  CareerIten!:Career;
  enrollDummyList: EnrollDummy[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _RoomService: EnrollmentService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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
    })


  }
  refresh() {
    this.loadData();
  }

  volverAtras(){
    const uri = localStorage.getItem('enroll-subject-url');
    this._router.navigate([uri]);
  }

  seleccionar(row: Room) {

    const itemList = localStorage.getItem('enroll-dummy');
    if (itemList != null){
      this.enrollDummyList = JSON.parse(itemList);
    }
    const itemSubject = localStorage.getItem('enroll-subject');
    const itemCareer = localStorage.getItem('enroll-career');
    if (itemSubject != null){
      this.SubjectItem = JSON.parse(itemSubject);
    }
    if(itemCareer != null){
      this.CareerIten = JSON.parse(itemCareer);
    }
    console.log("ver objeto", this.CareerIten);
    this.enrollDummyList.push({
      DegreeName: this.CareerIten.mCurriculumName,
      RoomName: row.name,
      SubjectId: this.SubjectItem.id,
      SubjectName: this.SubjectItem.name,
      createDate: new Date(),
      ClassShift : "1"
    })
    const enrollDummyListItem = JSON.stringify(this.enrollDummyList);
    localStorage.setItem('enroll-dummy', enrollDummyListItem);
    const uri = localStorage.getItem('enroll-subject-url');
    this._router.navigate([uri]);
    Swal.fire({
      title: "Escuela Judicial",
      text: "Matricula completada con éxito",
      icon: "success"
    });

  }

  aprobar(row: Degree) {
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

export class ExampleDataSource extends DataSource<Room> {
  filterChange = new BehaviorSubject('');
  id!: number;
  SubjectItem!: Subject;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Room[] = [];
  renderedData: Room[] = [];
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
  connect(): Observable<Room[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeRoom,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    const item = localStorage.getItem('enroll-subject');
    if (item != null){
      this.SubjectItem = JSON.parse(item);
    }
    console.log("Subjectobj",this.SubjectItem);
    this.exampleDatabase.GetAssignedRoomsBy(1,this.SubjectItem.periodId,1,this.SubjectItem.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataRoom
          .slice()
          .filter((_Room:Room) => {
            const searchStr = (_Room.name).toLowerCase();
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
  sortData(data: Room[]): Room[] {
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
