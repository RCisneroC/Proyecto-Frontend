import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {Filtros} from "../PersonalDocente/model/Filtros";
import {UbicationsActivity} from "../../admission/models/activity";
import {Modality} from "../../admission/models/modality";
import {Status} from "../../admission/FormalEducations/Models/Status";
import {TypeActivity} from "../../admission/models/type-activity";
import {User} from "@core";
import {Reason} from "../../admission/models/reason";
import {SourceFunds} from "../../admission/models/source -funds";
import {ScheduleActivity} from "../../admission/models/scheduleActivity";
import {ActivityService} from "../../admission/maestros/services/activity.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {ActivityDetailService} from "../../admission/services/activity-detail.service";
import {ActivityLocationService} from "../../admission/maestros/services/activity-location.service";
import {ModalityService} from "../../admission/maestros/services/modality.service";
import {StatusService} from "../../admission/maestros/services/status.service";
import {TypeActivityService} from "../../admission/maestros/services/type-activity.service";
import {UserService} from "../../security/user/service/user.service";
import {ReasonService} from "../../admission/maestros/services/reason.service";
import {SourceFundsService} from "../../admission/maestros/services/source-funds.service";
import {ScheduleActivitiesService} from "../../admission/services/schedule-activities.service";
import {DatePipe} from "@angular/common";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {GetOneActivity} from "../../admission/models/GetOneActivity";
import {MatriculaStatisticService} from "../services/matricula-statistic.service";
import {EstadisticasModelMatriculaResponse} from "../Models/EstadisticasModelMatricula";

@Component({
  selector: 'app-estadisticas-matricula',
  templateUrl: './estadisticas-matricula.component.html',
  styleUrls: ['./estadisticas-matricula.component.scss']
})
export class EstadisticasMatriculaComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public PlanningDate: boolean = false;
  public ActivityModeId: boolean = false;
  public ActivityLocationId: boolean = false;
  public AssignedCoordinatorId: boolean = false;
  public ActivityReasonId: boolean = false;
  public ActivityFundsSourceId: boolean = false;
  public InscriptionStartDate: boolean = false;
  public InscriptionEndDate: boolean = false;
  public StartDate: boolean = false;
  public PlannedEndDate: boolean = false;
  public EffectiveEndDate: boolean = false;
  public DataSheetDeliveryDate: boolean = false;
  public DigitalReportDeliveryDate: boolean = false;
  public PhysicalReportDeliveryDate: boolean = false;
  public StatusId: boolean = false;
  public CurriculumDesignId: boolean = false;
  public CantidadResultados: number = 0;
  displayedColumns = [
    'activityName',
    'description',
    'activityModeName',
    'activityTypeName',
    'activityLocationName',
    'planningDate',
    // 'startDate',
    // 'plannedEndDate',
    // 'effectiveEndDate',
    // 'activityReasonName',
    // 'activityFundsSourceName',
    'startTime',
    'endTime',
    'status'
  ];

  public ShowTables: boolean = false;

  public lstFiltros: Filtros[] = [
    {
      codigo: "PlanningDate",
      texto: "Fecha de planificación"
    },
    {
      codigo: "ActivityModeId",
      texto: "Modo de Actividad"
    },
    {
      codigo: "ActivityLocationId",
      texto: "Ubicación de la Actividad"
    },
    {
      codigo: "AssignedCoordinatorId",
      texto: "Por Coordinador Asignado"
    },
    {
      codigo: "ActivityReasonId",
      texto: "Por Motivo"
    },
    {
      codigo: "ActivityFundsSourceId",
      texto: "Por Origen de los Fondos"
    },
    {
      codigo: "InscriptionStartDate",
      texto: "Por Mes de inicio de Inscripción"
    },
    {
      codigo: "InscriptionEndDate",
      texto: "Por Mes de Final de Inscripción"
    },
    {
      codigo: "StartDate",
      texto: "Por Fecha de Inicio"
    },
    {
      codigo: "PlannedEndDate",
      texto: "Por Fecha de Finalización Programada"
    },
    {
      codigo: "EffectiveEndDate",
      texto: "Por Fecha Final Efectiva"
    },
    {
      codigo: "DataSheetDeliveryDate",
      texto: "Por Fecha de Entrega de Ficha Técnica"
    },
    {
      codigo: "DigitalReportDeliveryDate",
      texto: "Por Fecha de Entrega de Informe Digital"
    },
    {
      codigo: "PhysicalReportDeliveryDate",
      texto: "Por Fecha de Entrega de Informe Físico"
    },
    {
      codigo: "StatusId",
      texto: "Por Estado"
    },
    {
      codigo: "CurriculumDesignId",
      texto: "Por Cronograma Anual"
    }
  ];
  ubicationsList!: UbicationsActivity[];
  modalityList!: Modality[];
  statusList!: Status[];
  typeActivityList!: TypeActivity[];
  userList!: User[];
  reasonList!: Reason[];
  sourceFundsList!: SourceFunds[];
  _ScheduleActivity!: ScheduleActivity[];
  exampleDatabase?: MatriculaStatisticService;
  scheduleForm!: UntypedFormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  dataSource!: ExampleDataSource;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(
    public _ActivityDetailService: ActivityDetailService,
    private fb: UntypedFormBuilder,
    private _matriculaService: MatriculaStatisticService,
    private _activityLocationService: ActivityLocationService,
    private _modalityService: ModalityService,
    private _StatusService: StatusService,
    private _typeActivityService: TypeActivityService,
    private _userService: UserService,
    private _reasonService: ReasonService,
    private _sourceFundsService: SourceFundsService,
    private _ScheduleActivitiesService: ScheduleActivitiesService,
    private datePipe: DatePipe,
    public httpClient: HttpClient
  ) {
    super();
    this.loadModality();
    this.loadTypeActivity();
    this.loadUser();
    this.loadStatus();
    this.loadReason();
    this.loadSourceFunds();
    this.LoadCronogramas();
    this.loadLocationActividad();
    // this.loadData('activityReasonId=2');
    this.scheduleForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {

    return this.fb.group({
      planningDate: ['', [Validators.required]],
      activityModeId: ['', [Validators.required]],
      activityLocationId: ['', [Validators.required]],
      assignedCoordinatorId: ['', [Validators.required]],
      activityReasonId: ['', [Validators.required]],
      activityFundsSourceId: ['', [Validators.required]],
      inscriptionStartDate: ['', [Validators.required]],
      inscriptionEndDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      plannedEndDate: ['', [Validators.required]],
      effectiveEndDate: ['', [Validators.required]],
      dataSheetDeliveryDate: ['', [Validators.required]],
      digitalReportDeliveryDate: ['', [Validators.required]],
      physicalReportDeliveryDate: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      CurriculumDesignId: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loadData();
  }

  filtrosEstadisticas(event: MatSelectChange) {

    if (event.value.indexOf("PlanningDate") !== -1) {
      this.PlanningDate = true;
    } else {
      this.PlanningDate = false;
      this.scheduleForm.controls["planningDate"].setValue('');
    }
    if (event.value.indexOf("ActivityModeId") !== -1) {
      this.ActivityModeId = true;
    } else {
      this.ActivityModeId = false;
      this.scheduleForm.controls["activityModeId"].setValue('');
    }
    if (event.value.indexOf("ActivityLocationId") !== -1) {
      this.ActivityLocationId = true;
    } else {
      this.ActivityLocationId = false;
      this.scheduleForm.controls["activityLocationId"].setValue('');
    }
    if (event.value.indexOf("AssignedCoordinatorId") !== -1) {
      this.AssignedCoordinatorId = true;
    } else {
      this.AssignedCoordinatorId = false;
      this.scheduleForm.controls["assignedCoordinatorId"].setValue('');
    }
    if (event.value.indexOf("ActivityReasonId") !== -1) {
      this.ActivityReasonId = true;
    } else {
      this.ActivityReasonId = false;
      this.scheduleForm.controls["activityReasonId"].setValue('');
    }
    if (event.value.indexOf("ActivityFundsSourceId") !== -1) {
      this.ActivityFundsSourceId = true;
    } else {
      this.ActivityFundsSourceId = false;
      this.scheduleForm.controls["activityFundsSourceId"].setValue('');
    }
    if (event.value.indexOf("InscriptionStartDate") !== -1) {
      this.InscriptionStartDate = true;
    } else {
      this.InscriptionStartDate = false;
      this.scheduleForm.controls["inscriptionStartDate"].setValue('');
    }
    if (event.value.indexOf("InscriptionEndDate") !== -1) {
      this.InscriptionEndDate = true;
    } else {
      this.InscriptionEndDate = false;
      this.scheduleForm.controls["inscriptionEndDate"].setValue('');
    }
    if (event.value.indexOf("StartDate") !== -1) {
      this.StartDate = true;
    } else {
      this.StartDate = false;
      this.scheduleForm.controls["startDate"].setValue('');
    }
    if (event.value.indexOf("PlannedEndDate") !== -1) {
      this.PlannedEndDate = true;
    } else {
      this.PlannedEndDate = false;
      this.scheduleForm.controls["plannedEndDate"].setValue('');
    }
    if (event.value.indexOf("EffectiveEndDate") !== -1) {
      this.EffectiveEndDate = true;
    } else {
      this.EffectiveEndDate = false;
      this.scheduleForm.controls["effectiveEndDate"].setValue('');
    }
    if (event.value.indexOf("DataSheetDeliveryDate") !== -1) {
      this.DataSheetDeliveryDate = true;
    } else {
      this.DataSheetDeliveryDate = false;
      this.scheduleForm.controls["dataSheetDeliveryDate"].setValue('');
    }
    if (event.value.indexOf("DigitalReportDeliveryDate") !== -1) {
      this.DigitalReportDeliveryDate = true;
    } else {
      this.DigitalReportDeliveryDate = false;
      this.scheduleForm.controls["digitalReportDeliveryDate"].setValue('');
    }
    if (event.value.indexOf("PhysicalReportDeliveryDate") !== -1) {
      this.PhysicalReportDeliveryDate = true;
    } else {
      this.PhysicalReportDeliveryDate = false;
      this.scheduleForm.controls["physicalReportDeliveryDate"].setValue('');
    }
    if (event.value.indexOf("StatusId") !== -1) {
      this.StatusId = true;
    } else {
      this.StatusId = false;
      this.scheduleForm.controls["statusId"].setValue('');
    }
    if (event.value.indexOf("CurriculumDesignId") !== -1) {
      this.CurriculumDesignId = true;
    } else {
      this.CurriculumDesignId = false;
      this.scheduleForm.controls["CurriculumDesignId"].setValue('');
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
    console.log(this.scheduleForm.controls['planningDate'].value);

    if (this.scheduleForm.controls["planningDate"].value != '') {
      params += `planningDate=${this.convertirAFechaISO(this.scheduleForm.controls['planningDate'].value)}&`;
    }
    if (this.scheduleForm.controls["activityModeId"].value != '') {
      params += `activityModeId=${this.scheduleForm.controls['activityModeId'].value}&`;
    }
    if (this.scheduleForm.controls["activityLocationId"].value != '') {
      params += `activityLocationId=${this.scheduleForm.controls['activityLocationId'].value}&`;
    }
    if (this.scheduleForm.controls["assignedCoordinatorId"].value != '') {
      params += `assignedCoordinatorId=${this.scheduleForm.controls['assignedCoordinatorId'].value}&`;
    }
    if (this.scheduleForm.controls["activityReasonId"].value != '') {
      params += `activityReasonId=${this.scheduleForm.controls['activityReasonId'].value}&`;
    }
    if (this.scheduleForm.controls["activityFundsSourceId"].value != '') {
      params += `activityFundsSourceId=${this.scheduleForm.controls['activityFundsSourceId'].value}&`;
    }
    if (this.scheduleForm.controls["inscriptionStartDate"].value != '') {
      params += `inscriptionStartDate=${this.convertirAFechaISO(this.scheduleForm.controls['inscriptionStartDate'].value)}&`;
    }
    if (this.scheduleForm.controls["inscriptionEndDate"].value != '') {
      params += `inscriptionEndDate=${this.convertirAFechaISO(this.scheduleForm.controls['inscriptionEndDate'].value)}&`;
    }
    if (this.scheduleForm.controls["startDate"].value != '') {
      params += `startDate=${this.convertirAFechaISO(this.scheduleForm.controls['startDate'].value)}&`;
    }
    if (this.scheduleForm.controls["plannedEndDate"].value != '') {
      params += `plannedEndDate=${this.convertirAFechaISO(this.scheduleForm.controls['plannedEndDate'].value)}&`;
    }
    if (this.scheduleForm.controls["effectiveEndDate"].value != '') {
      params += `effectiveEndDate=${this.convertirAFechaISO(this.scheduleForm.controls['effectiveEndDate'].value)}&`;
    }
    if (this.scheduleForm.controls["dataSheetDeliveryDate"].value != '') {
      params += `dataSheetDeliveryDate=${this.convertirAFechaISO(this.scheduleForm.controls['dataSheetDeliveryDate'].value)}&`;
    }
    if (this.scheduleForm.controls["digitalReportDeliveryDate"].value != '') {
      params += `digitalReportDeliveryDate=${this.convertirAFechaISO(this.scheduleForm.controls['digitalReportDeliveryDate'].value)}&`;
    }
    if (this.scheduleForm.controls["physicalReportDeliveryDate"].value != '') {
      params += `physicalReportDeliveryDate=${this.convertirAFechaISO(this.scheduleForm.controls['physicalReportDeliveryDate'].value)}&`;
    }
    if (this.scheduleForm.controls["statusId"].value != '') {
      params += `statusId=${this.scheduleForm.controls['statusId'].value}&`;
    }
    if (this.scheduleForm.controls["CurriculumDesignId"].value != '') {
      params += `CurriculumDesignId=${this.scheduleForm.controls['CurriculumDesignId'].value}&`;
    }
    this.loadData(this.removerUltimoCaracterSiEsAmpersand(params))
    this._matriculaService.getEstadisticasFiltro(this.removerUltimoCaracterSiEsAmpersand(params)).subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res.dataResponse);
        this.CantidadResultados = res.dataResponse.length;
        console.log('====================================');
      }
    })
  }

  removerUltimoCaracterSiEsAmpersand(cadena: string): string {
    if (cadena.charAt(cadena.length - 1) === '&') {
      return cadena.slice(0, -1);
    }
    return cadena;
  }
  loadLocationActividad() {
    this._activityLocationService.getAllLocationActivity2Filter(1).subscribe({
      next: (data) => {
        this.ubicationsList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
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

  loadStatus() {
    this._StatusService.getAllSuppli2Filter(1).subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }

  loadTypeActivity() {
    this._typeActivityService.getAllTypeActivity2(1).subscribe({
      next: (data) => {
        this.typeActivityList = data;
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

  loadReason() {
    this._reasonService.getAllReason2Filtro(1).subscribe({
      next: (data) => {
        this.reasonList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }


  loadSourceFunds() {
    this._sourceFundsService.getAllSourceFunds2Filter(1).subscribe({
      next: (data) => {
        this.sourceFundsList = data;
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }

  LoadCronogramas() {
    this._ScheduleActivitiesService.getAllScheduleIdEstadisticas('5').subscribe({
      next: (data) => {
        this._ScheduleActivity = data;
        console.log('====================================');
        console.log(this._ScheduleActivity);
        console.log('====================================');
      },
      error: (error: HttpErrorResponse) => {

      },
    });
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Primer Nombre': x.firstName,
        'Apellido': x.lastName,
        'cedula': x.cedula,
        'edad': x.edad,
        'Nombre de malla': x.degreeName,
        'Cumpleaños': x.dateOfBirth.toString(),
        'Género': x.gender,
        'Provincia': x.provincia
      }));
    console.log(exportData);

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  public loadData(params: any = '') {
    this.exampleDatabase = new MatriculaStatisticService(this.httpClient);
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


export class ExampleDataSource extends DataSource<EstadisticasModelMatriculaResponse> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: EstadisticasModelMatriculaResponse[] = [];
  renderedData: EstadisticasModelMatriculaResponse[] = [];
  constructor(
    public exampleDatabase: MatriculaStatisticService,
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
  connect(): Observable<EstadisticasModelMatriculaResponse[]> {
    // alert();
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.data_filtro,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    console.log(displayDataChanges);


    this.exampleDatabase.getEstadisticas(this._params);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.dataF
          .slice()
          .filter((activity: EstadisticasModelMatriculaResponse) => {
            const searchStr = (activity.firstName).toLowerCase();
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
  sortData(data: EstadisticasModelMatriculaResponse[]): EstadisticasModelMatriculaResponse[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'curriculumDesignId':
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

