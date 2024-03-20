import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { Filtros } from '../PersonalDocente/model/Filtros';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { ModalityService } from 'app/admission/maestros/services/modality.service';
import { UserService } from 'app/security/user/service/user.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { Degree } from 'app/intranet-academic-registration/Models/InfoDegreeByIdentificationCard';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { Modality } from 'app/admission/models/modality';
import { DegreesByAll, EstadisticasEFormal } from '../Models/EstadisticasEFormal';
import { User } from '@core';

@Component({
  selector: 'app-eespecializada',
  templateUrl: './eespecializada.component.html',
  styleUrls: ['./eespecializada.component.scss']
})
export class EEspecializadaComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public Name: boolean = false;
  public DurationInYears: boolean = false;
  public NumOfCredits: boolean = false;
  public AssignedCoordinatorId: boolean = false;
  public StudyModeId: boolean = false;

  public lstFiltrosSelected: string[] = [];
  public CantidadResultados: number = 0;
  displayedColumns = [
    'name',
    'description',
    'graduationProfile',
    'admissionProfile',
    'studyModeName',
    'status'
  ];

  public ShowTables: boolean = false;

  public lstFiltros: Filtros[] = [
    {
      codigo: "Name",
      texto: "Nombre de Carrera"
    },
    {
      codigo: "DurationInYears",
      texto: "Duración de Carrera"
    },
    {
      codigo: "NumOfCredits",
      texto: "Cantidad de crecidos"
    },
    {
      codigo: "AssignedCoordinatorId",
      texto: "Por Coordinador Asignado"
    },
    {
      codigo: "StudyModeId",
      texto: "Modo de la Actividad"
    }
  ];
  modalityList!: Modality[];
  userList!: User[];
  exampleDatabase?: DegreeService;
  scheduleForm!: UntypedFormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  dataSource!: ExampleDataSource;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(
    private fb: UntypedFormBuilder,
    private _modalityService: ModalityService,
    private _userService: UserService,
    private _DegreeService: DegreeService,
    private datePipe: DatePipe,
    public httpClient: HttpClient
  ) {
    super();
    this.loadModality();
    this.loadUser();
    this.scheduleForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {

    return this.fb.group({
      Name: [''],
      DurationInYears: [''],
      NumOfCredits: [''],
      AssignedCoordinatorId: [''],
      StudyModeId: ['']
    });
  }

  public limpiarTodosFiltros() {
    this.lstFiltrosSelected = [];
    this.ocultar();
    this.loadData();
  }
  public seleccionarTodos() {
    this.lstFiltrosSelected = [];
    this.lstFiltros.forEach((f) => {
      this.lstFiltrosSelected.push(f.codigo);
    });
    this.Mostrar();
  }

  ocultar() {
    this.Name = false;
    this.DurationInYears = false;
    this.NumOfCredits = false;
    this.AssignedCoordinatorId = false;
    this.StudyModeId = false;
  }
  Mostrar() {
    this.Name = true;
    this.DurationInYears = true;
    this.NumOfCredits = true;
    this.AssignedCoordinatorId = true;
    this.StudyModeId = true;
  }
  ngOnInit(): void {
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrosEstadisticas(event: MatSelectChange) {

    if (event.value.indexOf("Name") !== -1) {
      this.Name = true;
    } else {
      this.Name = false;
      this.scheduleForm.controls["Name"].setValue('');
    }
    if (event.value.indexOf("DurationInYears") !== -1) {
      this.DurationInYears = true;
    } else {
      this.DurationInYears = false;
      this.scheduleForm.controls["DurationInYears"].setValue('');
    }
    if (event.value.indexOf("NumOfCredits") !== -1) {
      this.NumOfCredits = true;
    } else {
      this.NumOfCredits = false;
      this.scheduleForm.controls["NumOfCredits"].setValue('');
    }
    if (event.value.indexOf("AssignedCoordinatorId") !== -1) {
      this.AssignedCoordinatorId = true;
    } else {
      this.AssignedCoordinatorId = false;
      this.scheduleForm.controls["AssignedCoordinatorId"].setValue('');
    }
    if (event.value.indexOf("StudyModeId") !== -1) {
      this.StudyModeId = true;
    } else {
      this.StudyModeId = false;
      this.scheduleForm.controls["StudyModeId"].setValue('');
    }
  }

  convertirAFechaISO(fechaCadena: string): string {
    // Convertir la cadena a un objeto de fecha
    let fecha = new Date(fechaCadena);

    // Formatear la fecha usando DatePipe
    return this.datePipe.transform(fecha, 'yyyy-MM-ddTHH:mm:ss.SSS') || '';
  }

  submit() {

    let params = '';
    if (this.scheduleForm.controls["Name"].value != '') {
      params += `Name=${this.scheduleForm.controls['Name'].value}&`;
    }
    if (this.scheduleForm.controls["DurationInYears"].value != '') {
      params += `DurationInYears=${this.scheduleForm.controls['DurationInYears'].value}&`;
    }
    if (this.scheduleForm.controls["NumOfCredits"].value != '') {
      params += `NumOfCredits=${this.scheduleForm.controls['NumOfCredits'].value}&`;
    }
    if (this.scheduleForm.controls["AssignedCoordinatorId"].value != '') {
      params += `AssignedCoordinatorId=${this.scheduleForm.controls['AssignedCoordinatorId'].value}&`;
    }
    if (this.scheduleForm.controls["StudyModeId"].value != '') {
      params += `StudyModeId=${this.scheduleForm.controls['StudyModeId'].value}&`;
    }
    if (params != '') {

      this._DegreeService.GetDegreesStatisticsByFilter(this.removerUltimoCaracterSiEsAmpersand(params)).subscribe({
        next: (res: EstadisticasEFormal) => {
          this.CantidadResultados = res.degreesByAll.length;
        }
      })
    }
    this.loadData(this.removerUltimoCaracterSiEsAmpersand(params))
  }

  removerUltimoCaracterSiEsAmpersand(cadena: string): string {
    if (cadena.charAt(cadena.length - 1) === '&') {
      return cadena.slice(0, -1);
    }
    return cadena;
  }

  loadModality() {
    this._modalityService.getAllModality2Filter(1).subscribe({
      next: (data) => {
        this.modalityList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }

  loadUser() {
    let rol = 'b23d3a5d-571a-45b8-8d8b-22f2a0812cf1';
    this._userService.getUserRoles(rol).subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }



  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Nombre_Actividad': x.name,

      }));
    console.log(exportData);

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  public loadData(params: any = '') {
    this.exampleDatabase = new DegreeService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
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

}


export class ExampleDataSource extends DataSource<DegreesByAll> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DegreesByAll[] = [];
  renderedData: DegreesByAll[] = [];
  constructor(
    public exampleDatabase: DegreeService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public _params: any
  ) {
    console.log(_params);

    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DegreesByAll[]> {
    // alert();
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataDegreesByAll,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.GetDegreesStatisticsBy(this._params);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataDegreesByAll
          .slice()
          .filter((activity: DegreesByAll) => {
            const searchStr = (activity.name).toLowerCase();
            // const observations = activity.observations || '';
            // const searchStr = observations.toLowerCase();
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
  sortData(data: DegreesByAll[]): DegreesByAll[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'Name':
          [propertyA, propertyB] = [a.name, b.id];
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
