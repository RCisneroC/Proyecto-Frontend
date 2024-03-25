import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject, fromEvent, map, merge, Observable} from "rxjs";
import {Activity, UbicationsActivity} from "../../admission/models/activity";
import {EstadisticasModelMatricula, EstadisticasModelMatriculaResponse} from "../Models/EstadisticasModelMatricula";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {FiltrosMatricula} from "../PersonalDocente/model/Filtros";
import {Modality} from "../../admission/models/modality";
import {Status} from "../../admission/FormalEducations/Models/Status";
import {TypeActivity} from "../../admission/models/type-activity";
import {User} from "@core";
import {Reason} from "../../admission/models/reason";
import {SourceFunds} from "../../admission/models/source -funds";
import {ScheduleActivity} from "../../admission/models/scheduleActivity";
import {MatriculaStatisticService} from "../services/matricula-statistic.service";
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
import {MatSelectChange} from "@angular/material/select";
import {DataSource} from "@angular/cdk/collections";
import {ParticipanteStatisticService} from "../services/participante-statistic.service";
import {EstadisticasModelParticipanteResponse} from "../Models/EstadisticasModelParticipante";

@Component({
  selector: 'app-estadisticas-participante',
  templateUrl: './estadisticas-participante.component.html',
  styleUrls: ['./estadisticas-participante.component.scss']
})
export class EstadisticasParticipanteComponent extends UnsubscribeOnDestroyAdapter
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
  public DiscapacidadId: boolean = false;
  public extranjId: boolean = false;
  public CountryId: boolean = false;
  public yearstId: boolean = false;
  public labcondId: boolean = false;
  public cedId: boolean = false;
  public CantidadResultados: number = 0;
  displayedColumns = [
    'activityName',
    'description',
    'activityModeName',
    'activityTypeName',
    'activityLocationName',
    'planningDate',
    'startTime',
    'endTime',
    'status'
  ];

  public ShowTables: boolean = false;

  public lstFiltros: FiltrosMatricula[] = [
    {
      indicador:2,
      codigo: "ActivityModeId",
      texto: "Por Sexo"
    },
    {
      indicador:3,
      codigo: "ActivityLocationId",
      texto: "Por Provincia"
    },
    {
      indicador:4,
      codigo: "AssignedCoordinatorId",
      texto: "Por Distrito"
    },
    {
      indicador:5,
      codigo: "ActivityReasonId",
      texto: "Por Universidad"
    },
    {
      indicador:6,
      codigo: "ActivityFundsSourceId",
      texto: "Por Institución"
    },
    {
      indicador:7,
      codigo: "InscriptionStartDate",
      texto: "Por Dependencia"
    },
    {
      indicador:8,
      codigo: "InscriptionEndDate",
      texto: "Por Entidad Cooperante"
    },
    {
      indicador:9,
      codigo: "StartDate",
      texto: "Por Posición"
    },
    {
      indicador:10,
      codigo: "PlannedEndDate",
      texto: "Por Edad"
    },
    {
      indicador:11,
      codigo: "EffectiveEndDate",
      texto: "Por Grupo Étnico"
    },
    {
      indicador:12,
      codigo: "DataSheetDeliveryDate",
      texto: "Por Curso"
    },
    {
      indicador:13,
      codigo: "DigitalReportDeliveryDate",
      texto: "Por Periodo"
    },
    {
      indicador:14,
      codigo: "PhysicalReportDeliveryDate",
      texto: "Por Fecha de Matrícula"
    },
    {
      indicador:15,
      codigo: "StatusId",
      texto: "Por Clase de Ingreso"
    },
    {
      indicador:16,
      codigo: "CurriculumDesignId",
      texto: "Por Programa"
    },
    {
      indicador:17,
      codigo: "DiscapacidadId",
      texto: "Estudiantes con Discapacidad"
    },
    {
      indicador:18,
      codigo: "extranjId",
      texto: "Estudiantes Extranjeros y Nacionales"
    },
    {
      indicador:19,
      codigo: "CountryId",
      texto: "Estudiantes Extranjeros según País de Origen"
    },
    {
      indicador:20,
      codigo: "yearstId",
      texto: "Por Año de Estudio"
    },
    {
      indicador:21,
      codigo: "labcondId",
      texto: "Por Condición Laboral"
    },
    {
      indicador:22,
      codigo: "cedId",
      texto: "Por Cédula (Informe Único)"
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
  exampleDatabase?: ParticipanteStatisticService;
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
    private _matriculaService: ParticipanteStatisticService,
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
      DiscapacidadId: ['', [Validators.required]],
      extranjId: ['', [Validators.required]],
      CountryId: ['', [Validators.required]],
      yearstId: ['', [Validators.required]],
      labcondId: ['', [Validators.required]],
      cedId: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loadData({ ecFiltros: [{indicadorId : 0, searchBy: "string" }]});
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
    if (event.value.indexOf("DiscapacidadId") !== -1) {
      this.DiscapacidadId = true;
    } else {
      this.DiscapacidadId = false;
      this.scheduleForm.controls["DiscapacidadId"].setValue('');
    }
    if (event.value.indexOf("extranjId") !== -1) {
      this.extranjId = true;
    } else {
      this.extranjId = false;
      this.scheduleForm.controls["extranjId"].setValue('');
    }
    if (event.value.indexOf("CountryId") !== -1) {
      this.CountryId = true;
    } else {
      this.CountryId = false;
      this.scheduleForm.controls["CountryId"].setValue('');
    }
    if (event.value.indexOf("yearstId") !== -1) {
      this.yearstId = true;
    } else {
      this.yearstId = false;
      this.scheduleForm.controls["yearstId"].setValue('');
    }
    if (event.value.indexOf("labcondId") !== -1) {
      this.labcondId = true;
    } else {
      this.labcondId = false;
      this.scheduleForm.controls["labcondId"].setValue('');
    }
    if (event.value.indexOf("cedId") !== -1) {
      this.cedId = true;
    } else {
      this.cedId = false;
      this.scheduleForm.controls["cedId"].setValue('');
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
    const request = { ecFiltros: [{}]}
    console.log(this.scheduleForm.controls['planningDate'].value);

    if (this.scheduleForm.controls["planningDate"].value != '') {
      const item = { indicadorId : 1, searchBy: this.scheduleForm.controls["planningDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["activityModeId"].value != '') {
      const item = { indicadorId : 2, searchBy: this.scheduleForm.controls["activityModeId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["activityLocationId"].value != '') {
      const item = { indicadorId : 3, searchBy: this.scheduleForm.controls["activityLocationId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["assignedCoordinatorId"].value != '') {
      const item = { indicadorId : 4, searchBy: this.scheduleForm.controls["assignedCoordinatorId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["activityReasonId"].value != '') {
      const item = { indicadorId : 5, searchBy: this.scheduleForm.controls["activityReasonId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["activityFundsSourceId"].value != '') {
      const item = { indicadorId : 6, searchBy: this.scheduleForm.controls["activityFundsSourceId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["inscriptionStartDate"].value != '') {
      const item = { indicadorId : 7, searchBy: this.scheduleForm.controls["inscriptionStartDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["inscriptionEndDate"].value != '') {
      const item = { indicadorId : 8, searchBy: this.scheduleForm.controls["inscriptionStartDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["startDate"].value != '') {
      const item = { indicadorId : 9, searchBy: this.scheduleForm.controls["startDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["plannedEndDate"].value != '') {
      const item = { indicadorId : 10, searchBy: this.scheduleForm.controls["plannedEndDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["effectiveEndDate"].value != '') {
      const item = { indicadorId : 11, searchBy: this.scheduleForm.controls["effectiveEndDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["dataSheetDeliveryDate"].value != '') {
      const item = { indicadorId : 12, searchBy: this.scheduleForm.controls["dataSheetDeliveryDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["digitalReportDeliveryDate"].value != '') {
      const item = { indicadorId : 13, searchBy: this.scheduleForm.controls["digitalReportDeliveryDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["physicalReportDeliveryDate"].value != '') {
      const item = { indicadorId : 14, searchBy: this.scheduleForm.controls["physicalReportDeliveryDate"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["statusId"].value != '') {
      const item = { indicadorId : 15, searchBy: this.scheduleForm.controls["statusId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (this.scheduleForm.controls["CurriculumDesignId"].value != '') {
      const item = { indicadorId : 16, searchBy: this.scheduleForm.controls["CurriculumDesignId"].value  }
      request.ecFiltros.slice(0);
      request.ecFiltros.push(item);
    }
    if (request.ecFiltros.length == 1){
      const item = { indicadorId : 0, searchBy: "string"  }
      request.ecFiltros = [item];
    }
    this.loadData(request);

    this._matriculaService.getEstadisticasFiltro(request).subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res.dataResponseEC);
        this.CantidadResultados = res.dataResponseEC.length;
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
        'Año': x.year,
        'Curso': x.curso,
        'Institución': x.institución,
        'Género': x.gender,
        'Provincia': x.provincia
      }));
    console.log(exportData);

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  public loadData(params: any = '') {
    this.exampleDatabase = new ParticipanteStatisticService(this.httpClient);
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


export class ExampleDataSource extends DataSource<EstadisticasModelParticipanteResponse> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: EstadisticasModelParticipanteResponse[] = [];
  renderedData: EstadisticasModelParticipanteResponse[] = [];
  constructor(
    public exampleDatabase: ParticipanteStatisticService,
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
  connect(): Observable<EstadisticasModelParticipanteResponse[]> {
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
          .filter((activity: EstadisticasModelParticipanteResponse) => {
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
  sortData(data: EstadisticasModelParticipanteResponse[]): EstadisticasModelParticipanteResponse[] {
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
