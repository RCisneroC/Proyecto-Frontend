import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {InscriptionService} from "../../inscription/services/inscription.service";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {GetDataResultResponse, Participant} from "../../models/participant";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {VerificarBS64Pipe} from "../../../pipes/verificar-bs64.pipe";
import {EnrollmentService} from "../../../enrollment/services/enrollment.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {Direction} from "@angular/cdk/bidi";
import {ResponseMessageMaestra, ResponsePDFEF} from "../../models/ResponseMessage";
import {ViewPosterPDFComponent} from "../../activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import Swal from "sweetalert2";
import {
  ApproveParticipantComponent
} from "../../inscription/approval/activity-participants-list/detalle/approve-participant/approve-participant.component";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CreateCertificateResponseSimple } from 'app/admission/models/AddEFacademicResponse';

@Component({
  selector: 'app-certificate-list-partaker',
  templateUrl: './certificate-list-partaker.component.html',
  styleUrls: ['./certificate-list-partaker.component.scss']
})
export class CertificateListPartakerComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'id',
    'nombre',
    'cedula',
    'activdad',
    'estado',
    'estadofirma',
    'calificacion',
    'fecha_inscrito',
    'actions',
  ];
  CertificateList: UntypedFormGroup;
  exampleDatabase?: InscriptionService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Participant>(true, []);
  id?: any;
  schedule?: Participant;
  nameActivity: string = '';
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public scheduleActivitiesService: InscriptionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    private _enrollservice: EnrollmentService,
    public _InscriptionService: InscriptionService,
    private fb: UntypedFormBuilder
  ) {
    super();
     
    this.CertificateList = this.fb.group({
      LStudentFullName: this.fb.array([]),
      LStudentCedula: this.fb.array([]),
      ActivityId:[0,[Validators.required]]
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {

  

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.nameActivity = localStorage.getItem('name_actividad') || '';
      this.CertificateList.controls['ActivityId'].setValue(this.id);
    })
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  ViewDetail(row: Participant) {
    localStorage.setItem('id_activida', this.id);
    localStorage.setItem('url', '/admission/listado-participans/' + this.id)
    this.router.navigate(['/admission/detalle-participans', row.cedula]);
  }
  editCall(row: Participant) {

  }
  addNew() {
    let tempDirection: Direction;

  }
  regresar() {

    this.router.navigate([localStorage.getItem('ruta_local') || '/admission/certificate-activity-participants-list']);
  }
  viewPartakerListPDF() {
    const request = {
      id: this.id,
      value: 1
    }
    this._InscriptionService.BuildPDFPartaker(request).subscribe({
      next: (res: ResponsePDFEF) => {
        if (res.statusCode === 200) {
          console.log("docfile", res.getPdfResponse[0].docFile)
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: this._verificarBS64.transform(res.getPdfResponse[0].docFile),
              accion: 'view-poster',
              posterFile: res.getPdfResponse[0].docFile,
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
            text: res.message,
            icon: "warning"
          });
        }

      }
    })
  }
  get checkboxesNameStudensFormArray(): UntypedFormArray {
    return this.CertificateList.get('LStudentFullName') as UntypedFormArray;
  }

  get checkboxesCedulaStudensFormArray(): UntypedFormArray {
    return this.CertificateList.get('LStudentCedula') as UntypedFormArray;
  }
  checkboxChange(event: any, checkboxId:GetDataResultResponse): void {
    if (event.checked) {
      this.checkboxesNameStudensFormArray.push(this.fb.control(`${checkboxId.firstName} ${checkboxId.lastName}`));
      this.checkboxesCedulaStudensFormArray.push(this.fb.control(checkboxId.cedula));
    } else {
      const index = this.checkboxesNameStudensFormArray.controls.findIndex(x => x.value === `${checkboxId.firstName} ${checkboxId.lastName}`);
      const index01 = this.checkboxesCedulaStudensFormArray.controls.findIndex(x => x.value === checkboxId.cedula);
      if (index !== -1) {
        this.checkboxesNameStudensFormArray.removeAt(index);
      }
      if (index !== -1) {
        this.checkboxesCedulaStudensFormArray.removeAt(index01);
      }
    }
  }

  enviarCertificadosAFirmar(){
    console.log(this.CertificateList.getRawValue())

    this._enrollservice.CreateCertificateList(this.CertificateList.getRawValue()).subscribe({
      next: (res:CreateCertificateResponseSimple) => {
        Swal.fire({
          title: "Escuela Judicial",
          text: res.message,
          icon: "success"
        });
        this.loadData();
    }
  });
  }
  aprobar(row: GetDataResultResponse) {
    const dialogRef = this.dialog.open(ApproveParticipantComponent, {
      data: {
        participant: row,
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
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new InscriptionService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.activatedRoute
    );
    console.log(this.dataSource)
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
  generarcertificado(row: GetDataResultResponse) {


    Swal.fire({
      title: 'Generando certificado de'+' '+row.firstName + ' ' + row.lastName,
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const CreateCertificateData = {
      activityId: this.id,
      studentFullName: row.firstName + ' ' + row.lastName,
      studentCedula: row.cedula
    }
    this._enrollservice.CreateCertificate(CreateCertificateData).subscribe({
      next: (res) => {
        Swal.close();
        if (res.certificate) {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.certificate.fileContents,
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
            text: "La actividad tiene que estar finalizada para generar el certificado",
            icon: "warning"
          });
        }

      }
    })
  }

  vercertificadofirmado(row: GetDataResultResponse) {

    console.log(row);
    Swal.fire({
      title: 'Obteniendo Certificado de'+' '+row.firstName + ' ' + row.lastName,
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const CreateCertificateData = {
      name: `${row.activityId}-${row.cedula}.pdf`
    }
   
    console.log(CreateCertificateData)
    this._enrollservice.GetCertificateSignature(CreateCertificateData.name).subscribe({
      next: (res) => {
        Swal.close();
        if (!res.isError) {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.documentContent,
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
            text: res.message,
            icon: "warning"
          });
        }

      }
    })
  }
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Nombre': x.firstName.toString(),
        'Apellido': x.lastName.toString(),
        'Cedula': x.cedula.toString(),
        'Actividad': x.activityName.toString(),
        'Estado': x.statusName.toString(),
        'Fecha': x.fechaInscrito.toString()
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}
export class ExampleDataSource extends DataSource<GetDataResultResponse> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  id!: any;
  filteredData: GetDataResultResponse[] = [];
  renderedData: GetDataResultResponse[] = [];
  constructor(
    public exampleDatabase: InscriptionService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<GetDataResultResponse[]> {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChangeParticipant,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getParticipanteActividad(this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDatabase.dataParticipantActivity
          .slice()
          .filter((role: GetDataResultResponse) => {
            const searchStr = (role.firstName).toLowerCase();
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
  sortData(data: GetDataResultResponse[]): GetDataResultResponse[] {
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
          [propertyA, propertyB] = [a.firstName, b.firstName];
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

