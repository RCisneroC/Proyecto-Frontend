import { Direction } from '@angular/cdk/bidi';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '@core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import {  ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ApprovedSolicitudComponent } from 'app/intranet-academic-registration/Forms/approved-solicitud/approved-solicitud.component';
import { CreateSolicitudComponent } from 'app/intranet-academic-registration/Forms/create-solicitud/create-solicitud.component';
import { RequestVariousItem} from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import Swal from 'sweetalert2';
import { DetalleSolicitudComponent } from '../detalle-solicitud/detalle-solicitud.component';
import {
  ViewPosterPDFComponent
} from "../../../admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import {HistorySolicitudComponent} from "../history-solicitud/history-solicitud.component";
import { EditSolicitudComponent } from 'app/intranet-academic-registration/Forms/edit-solicitud/edit-solicitud.component';
import { TypeRequestService } from 'app/admission/FormalEducations/Services/type-request.service';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { Poster } from 'app/teaching-management/models/Teacher';


@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.scss']
})
export class ListadoSolicitudesComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'tiposolicitud',
    'tipousuario',
    'Actividad_Asignatura',
    'email',
    'estado',
    'fechacreacion',
    'document',
    'accion',
  ];
  public _DataLocal: RequestVariousItem[] = [];
  exampleDatabase?: RequestServicesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<RequestVariousItem>(true, []);
  id?: number;
  requestVarious?: RequestVariousItem = {
    id: 0,
    comments: [],
    createdDate:new Date,
    createdBy: '',
    lastModifiedDate: new Date,
    lastModifiedBy: '',
    totalRecords: 0,
    userRequest: '',
    description: '',
    assignedUser: '',
    requestVariousTypeId: 0,
    requestVariousApplicantUserTypeId: 0,
    requestVariousStatusTypeId: 0,
    requestDate:new Date,
    subjectId: 0,
    activityId: 0,
    efAcademicRecordId: 0,
    ecAcademicRecordId: 0,
    reentryAll: false,
    response: '',
    responseDate: new Date,
    infoUserRquest:{ firstName:'', lastName:'', email: ''},
    activity:{name:''},
    subject:{name:''}
  };
  public _typeUser: string = '';
  typeRequest:number[]=[];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _RequestServicesService: RequestServicesService,
    public _typeRequestService: TypeRequestService,
    public _verificarBS64: VerificarBS64Pipe,
    private snackBar: MatSnackBar,
    public _dialog: MatDialog,
    public authService: AuthService
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
    this._typeUser = this._RequestServicesService.getRoleFromToken(this.authService.currentUserValue.token);
    console.log("Tipo de usuario", this._typeUser);
    this.getMatch();
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  
  getMatch() {
    this._typeRequestService.getAllTypeRequest2().subscribe({
      next: (res:any) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        const matchingTypeRequest = res.find((x: { approvalRole: string; }) => x.approvalRole === this.authService.currentUserValue.roleId);
        this.typeRequest = res.filter((x: { approvalRole: string; }) => x.approvalRole === this.authService.currentUserValue.roleId).map((x: { requestType: any; }) => x.requestType);
        console.log('====================================');
        console.log(this.typeRequest);
        console.log('====================================');
    }
  });
  }

  isConditionMet(row: RequestVariousItem): boolean {
    return (
      (this._typeUser === 'Administrador' && row.requestVariousStatusTypeId == 1) ||
      (this.typeRequest.includes(row.requestVariousTypeId )&& row.requestVariousStatusTypeId == 1)
    );
  }
  viewDocument(doc:Poster){
  console.log(doc.fileContents+"aadadadadada")
  if (this._verificarBS64.transform(doc.fileContents) != "pdf") {
    const dialogRef = this._dialog.open(ViewPosterComponent, {
      data: {
        type: this._verificarBS64.transform(doc.fileContents),
        accion: 'view-poster',
        posterFile: doc.fileContents,
        comment: "",
        poster: doc.fileContents,
      },
      disableClose: true,
    });
  } else {
    const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
      data: {
        type: this._verificarBS64.transform(doc.fileContents),
        accion: 'view-poster',
        posterFile: doc.fileContents,
        comment: "",
        poster: doc.fileContents,
      },
      width: '1000px',
      disableClose: true,
    });
  }}
  
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(CreateSolicitudComponent, {
      data: {
        request: this.requestVarious,
        action: 'add',
      },
      width: '900px',
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
  editCall(row: RequestVariousItem, id: number) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditSolicitudComponent, {
      data: {
        request: row,
        action: 'edit',
        id: id
      },
      direction: tempDirection,
      width:"500px",
      height:"500px"
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

  delete(row: RequestVariousItem ) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._RequestServicesService.DeleteRequestVariousMethod({id: row.id}).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.statusCode == 200){
              Swal.fire({
                title: "Escuela Judicial",
                text: "Eliminado Correctamente",
                icon: "success"
              });
              this.loadData();
            }


          }
        })
      }
    });
  }

 generateRequestVariousResolution(row: RequestVariousItem, id: number){
  const DownloadRequestVariousResolutionData = {
    requestVariousId: row.id
  }
    this._RequestServicesService.DownloadRequestVariousResolution(DownloadRequestVariousResolutionData).subscribe({
      next:(res)=>{
        console.log('Resolucion',res.data.pdfContentInBase64);
        if (res.data.pdfContentInBase64) {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.data.pdfContentInBase64,
              comment: [],
              poster: res,
            },
            width: '1200px',
            disableClose: true,
          });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "Ocurrio un error al generar la Resolución",
            icon: "warning"
          });
        }
      }
    })
 }

  generateTeachingCertification(row: RequestVariousItem, id: number){
    const DownloadTeachingCertificationData = {
      requestVariousId: row.id
    }
    this._RequestServicesService.DownloadTeachingCertification(DownloadTeachingCertificationData).subscribe({
      next:(res)=>{
        console.log('Certificación',res.data.pdfContentInBase64);
        if (res.data.pdfContentInBase64) {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.data.pdfContentInBase64,
              comment: [],
              poster: res,
            },
            width: '1200px',
            disableClose: true,
          });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "Ocurrio un error al generar la Certificación",
            icon: "warning"
          });
        }
      }
    })
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new RequestServicesService(this.httpClient);
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

  aprobar(row: RequestVariousItem, id: number) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ApprovedSolicitudComponent, {
      data: {
        request: row,
        action: 'edit',
        id: id
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

  detalleSolicitud(row: RequestVariousItem, id: number) {
    console.log(row.id);
    //const completed = JSON.parse(row.history);
    //console.log("History Parse", completed);
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DetalleSolicitudComponent, {
      data: {
        request: row,
        action: 'detalle',
        id: id
      },
      width: '900px',
      direction: tempDirection,
    });
  }

  historySolicitud(row: RequestVariousItem, id: number) {

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(HistorySolicitudComponent, {
      data: {
        request: row,
        action: 'detalle',
        id: id
      },
      width: '900px',
      direction: tempDirection,
    });
  }

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Nombre': x.description,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<RequestVariousItem> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RequestVariousItem[] = [];
  renderedData: RequestVariousItem[] = [];
  constructor(
    public exampleDatabase: RequestServicesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RequestVariousItem[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeRequestVarious,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllRequestVariousEIRA();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataRequestVarious
          .slice()
          .filter((_RequestVariousItem: RequestVariousItem) => {
            const searchStr = (_RequestVariousItem.description).toLowerCase();
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
  sortData(data: RequestVariousItem[]): RequestVariousItem[] {
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
          [propertyA, propertyB] = [a.description, b.description];
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
