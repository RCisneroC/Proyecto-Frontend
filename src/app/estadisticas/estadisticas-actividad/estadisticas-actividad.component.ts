import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Filtros } from '../PersonalDocente/model/Filtros';
import { MatSelectChange } from '@angular/material/select';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivityService } from 'app/admission/maestros/services/activity.service';
import { ActivityLocationService } from 'app/admission/maestros/services/activity-location.service';
import { ModalityService } from 'app/admission/maestros/services/modality.service';
import { TypeActivityService } from 'app/admission/maestros/services/type-activity.service';
import { UserService } from 'app/security/user/service/user.service';
import { ReasonService } from 'app/admission/maestros/services/reason.service';
import { SourceFundsService } from 'app/admission/maestros/services/source-funds.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UbicationsActivity } from 'app/admission/models/activity';
import { Modality } from 'app/admission/models/modality';
import { TypeActivity } from 'app/admission/models/type-activity';
import { User } from '@core';
import { Reason } from 'app/admission/models/reason';
import { SourceFunds } from 'app/admission/models/source -funds';
import { DatePipe } from '@angular/common';
import { StatusService } from 'app/admission/maestros/services/status.service';
import { Status } from 'app/admission/FormalEducations/Models/Status';
import { ScheduleActivitiesService } from 'app/admission/services/schedule-activities.service';
import { ScheduleActivity, ScheduleActivityDetail } from 'app/admission/models/scheduleActivity';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-estadisticas-actividad',
  templateUrl: './estadisticas-actividad.component.html',
  styleUrls: ['./estadisticas-actividad.component.scss']
})
export class EstadisticasActividadComponent extends UnsubscribeOnDestroyAdapter
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
  public Name: boolean = false;
  public ActivityTypeId: boolean = false;
  public MaxNumOfHours: boolean = false;
  public ActivityClass: boolean = false;

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
      codigo: "Name",
      texto: "Nombre de Actividad"
    },
    {
      codigo: "PlanningDate",
      texto: "Fecha de planificación"
    },
    {
      codigo: "ActivityModeId",
      texto: "Modo de Actividad"
    },
    {
      codigo: "ActivityTypeId",
      texto: "Tipo de Actividad"
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
    },
    {
      codigo: "MaxNumOfHours",
      texto: "Por Horas"
    },
    {
      codigo: "ActivityClass",
      texto: "Clase de Actividad"
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
  exampleDatabase?: ActivityService;
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
    public _activityService: ActivityService,
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
      planningDate: [''],
      activityModeId: [''],
      activityLocationId: [''],
      assignedCoordinatorId: [''],
      activityReasonId: [''],
      activityFundsSourceId: [''],
      inscriptionStartDate: [''],
      inscriptionEndDate: [''],
      startDate: [''],
      plannedEndDate: [''],
      effectiveEndDate: [''],
      dataSheetDeliveryDate: [''],
      digitalReportDeliveryDate: [''],
      physicalReportDeliveryDate: [''],
      statusId: [''],
      CurriculumDesignId: [''],
      Name: [''],
      ActivityTypeId: [''],
      MaxNumOfHours: [''],
      ActivityClass: [''],
    });
  }


  ngOnInit(): void {
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

    if (event.value.indexOf("Name") !== -1) {
      this.Name = true;
    } else {
      this.Name = false;
      this.scheduleForm.controls["Name"].setValue('');
    }

    if (event.value.indexOf("ActivityTypeId") !== -1) {
      this.ActivityTypeId = true;
    } else {
      this.ActivityTypeId = false;
      this.scheduleForm.controls["ActivityTypeId"].setValue('');
    }

    if (event.value.indexOf("MaxNumOfHours") !== -1) {
      this.MaxNumOfHours = true;
    } else {
      this.MaxNumOfHours = false;
      this.scheduleForm.controls["MaxNumOfHours"].setValue('');
    }

    if (event.value.indexOf("ActivityClass") !== -1) {
      this.ActivityClass = true;
    } else {
      this.ActivityClass = false;
      this.scheduleForm.controls["ActivityClass"].setValue('');
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
    if (this.scheduleForm.controls["Name"].value != '') {
      params += `Name=${this.scheduleForm.controls['Name'].value}&`;
    }
    if (this.scheduleForm.controls["ActivityTypeId"].value != '') {
      params += `ActivityTypeId=${this.scheduleForm.controls['ActivityTypeId'].value}&`;
    }
    if (this.scheduleForm.controls["MaxNumOfHours"].value != '') {
      params += `MaxNumOfHours=${this.scheduleForm.controls['MaxNumOfHours'].value}&`;
    }
    if (this.scheduleForm.controls["ActivityClass"].value != '') {
      params += `ActivityClass=${this.scheduleForm.controls['ActivityClass'].value}&`;
    }
    this._activityService.getEstadisticasFiltro(this.removerUltimoCaracterSiEsAmpersand(params)).subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res.activitiesByAll);
        this.CantidadResultados = res.activitiesByAll.length;
        console.log('====================================');
      }
    })
    this.loadData(this.removerUltimoCaracterSiEsAmpersand(params))
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
        'Nombre_Actividad': x.name,
        'Descripcion': x.description,
        'Modo_de_Actividad': x.activityModeName,
        'Tipo_de_actividad': x.activityTypeName,
        'Ubicacion': x.activityLocationName,
        'Motivo': x.activityFundsSourceName,
        'Coordinador': x.assignedCoordinatorName,
        'Fecha_de_Planeacion': x.planningDate.toString(),
        'Inicio_de_Inscripcion': x.inscriptionStartDate.toString(),
        'Fin_de_Inscripcion': x.inscriptionEndDate.toString(),
        'Fecha_Final_planeada': x.plannedEndDate.toString(),
        'Total_Horas': x.totalHours
      }));
    console.log(exportData);

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  public loadData(params: any = '') {
    this.exampleDatabase = new ActivityService(this.httpClient);
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


export class ExampleDataSource extends DataSource<GetOneActivity> {
  filterChange = new BehaviorSubject('');
  id!: number;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: GetOneActivity[] = [];
  renderedData: GetOneActivity[] = [];
  constructor(
    public exampleDatabase: ActivityService,
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
  connect(): Observable<GetOneActivity[]> {
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
          .filter((activity: GetOneActivity) => {
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
  sortData(data: GetOneActivity[]): GetOneActivity[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'curriculumDesignId':
          [propertyA, propertyB] = [a.curriculumDesignId, b.curriculumDesignId];
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
