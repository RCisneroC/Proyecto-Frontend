
import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Filtros } from 'app/estadisticas/PersonalDocente/model/Filtros';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { TableElement, TableExportUtil } from '@shared';
import { AuditLog, AuditLogModel } from '../models/auditLogModel';
import { Sort } from '@angular/material/sort';
import { AuditLogSearchService } from '../services/audit-log-search.service';
import { EntityTypePipe } from 'app/pipes/entity-type.pipe';

@Component({
  selector: 'app-audit-log-search',
  templateUrl: './audit-log-search.component.html',
  styleUrls: ['./audit-log-search.component.scss']
})
export class AuditLogSearchComponent implements AfterViewInit, OnDestroy, OnInit {

  public filtros = new FormControl();
  public lstFiltrosSelected: string[] = [];
  public auditLogModel: AuditLog[] = [];
  public subscriptions: Subscription[] = [];
  public IsLoading: boolean = true;
  form!: UntypedFormGroup;
  public totalR:number =  0;
  dataSource = new MatTableDataSource<AuditLog>(this.auditLogModel);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
  displayedColumns = [
    'id',
    'userId',
    'message',
    'oldData',
    'newData',
    'eventType',
    'entityName',
    'timestamp'
  ];
  public lstFiltros: Filtros[] = [
    {
      codigo: "Id",
      texto: "Por Id"
    },
    {
      codigo: "Year",
      texto: "Por Año"
    },
    {
      codigo: "Month",
      texto: "Por mes"
    },
    {
      codigo: "Day",
      texto: "Por día"
    },
    {
      codigo: "EventType",
      texto: "Por tipo de evento"
    },
    {
      codigo: "UserId",
      texto: "Por usuario"
    },
    {
      codigo: "EntityName",
      texto: "Por nombre de entidad"
    },
    {
      codigo: "Message",
      texto: "Por mensaje"
    }
  ];

  constructor(private cb: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private auditLogSearchService : AuditLogSearchService,
    private entityTypePipe: EntityTypePipe) {
    this.form = this.createForm();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      Id: ['', Validators.required],
      Year: ['', Validators.required],
      Month: ['', Validators.required],
      Day: ['', Validators.required, Validators.min(1), Validators.max(31)],
      EventType: ['', Validators.required],
      UserId: ['', Validators.required],
      EntityName: ['', Validators.required],
      Message: ['', Validators.required]
    });
  }

  public seleccionarTodos() {
    this.lstFiltrosSelected = [];
    this.lstFiltros.forEach((f) => {
      this.lstFiltrosSelected.push(f.codigo);
    });
  }

  public limpiarTodosFiltros() {
    this.lstFiltrosSelected.forEach(
      (f) => {
        this.form.controls[f].reset();
      }
    );
    this.lstFiltrosSelected = [];
    this.auditLogModel = [];
    this.dataSource = new MatTableDataSource<AuditLog>(this.auditLogModel);
    this.totalR = 0;
    this.dataSource.paginator = this.paginator;
  }

  public verificarExistenciaFiltro(valor: string): boolean {
    return this.lstFiltrosSelected.indexOf(valor) >= 0;
  }

  ngOnInit(): void {
   console.log("iniciar")
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.IsLoading = false;
    }, 2000
    );
  }

  public consultar(page:number = 1, pageSize:number = 10):void{

    let valid: boolean = true;
    let filtros: string = "Page=" + page  + "&PageSize="+pageSize;

    if(this.lstFiltrosSelected.length == 0)
     return;

    this.lstFiltrosSelected.forEach(
      (f) => {
        if (this.form.controls[f].value == null ||
          this.form.controls[f].value == undefined ||
          this.form.controls[f].value == "") {
          this.form.controls[f].markAsDirty();
          this.form.controls[f].markAsPristine();
          this.form.controls[f].markAllAsTouched();
          valid = false;
        }
      }
    );
    this.IsLoading = true;
    if (!valid) {
      this.IsLoading = false;
      return;
    }

    this.lstFiltrosSelected.forEach(
      (f) => {
        if (f == "Id") {
          filtros = filtros + "&Id=" + this.form.controls[f].value;
        }
        else if (f == "Year") {
          filtros = filtros + "&Year=" + this.form.controls[f].value;
        }
        else if (f == "Month") {
          filtros = filtros + "&Month=" + this.form.controls[f].value;
        }
        else if (f == "Day") {
          filtros = filtros + "&Day=" + this.form.controls[f].value;
        }
        else if (f == "EventType") {
          filtros = filtros + "&EventType=" + this.form.controls[f].value;
        }
        else if (f == "UserId") {
          filtros = filtros + "&UserId=" + this.form.controls[f].value;
        }
        else if (f == "EntityName") {
          filtros = filtros + "&EntityName=" + this.form.controls[f].value;
        }
        else if (f == "Message") {
          filtros = filtros + "&Message=" + this.form.controls[f].value;
        }
    });
    this.IsLoading = true;
    this.auditLogSearchService.GetByFilters(filtros).subscribe(
      {
        next : (request: AuditLogModel)=>{
          this.auditLogModel = request.auditLogs;
          this.dataSource = new MatTableDataSource<AuditLog>(this.auditLogModel);
          this.totalR = request.totalCount;
          this.IsLoading = false;
        },
        error : (err: HttpErrorResponse)=>{
          console.log(err);
          this.IsLoading = false;
        }
      }
    )

  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Id': x.id,
        'Usuario': x.userId,
        'Tipo Evento': this.entityTypePipe.transform(x.eventType),
        'Mensaje': x.message,
        'Dato Anterior': x.oldData,
        'Data Actual': x.newData,
        'Fecha': x.timestamp,
        'Nombre Entidad': x.entityName
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  sortData(sort: Sort) {
    const data = this.auditLogModel.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<AuditLog>(data);
      return;
    }

    this.auditLogModel = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'userId':
          return this.compare(a.userId, b.userId, isAsc);
        case 'eventType':
          return this.compare(a.eventType, b.eventType, isAsc);
        case 'message':
          return this.compare(a.message, b.message, isAsc);
        case 'newData':
          return this.compare(a.newData, b.newData, isAsc);
        case 'timestamp':
            return this.compare(a.timestamp, b.timestamp, isAsc);
        case 'entityName':
              return this.compare(a.entityName, b.entityName, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<AuditLog>(this.auditLogModel);
  }

  compare(a: number | string, b: number | string, isAsc: boolean):number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public eventSelection() {
    this.cb.detectChanges();
  }

  onPaginateChange(event:any){
   this.consultar(event.pageIndex + 1, event.pageSize)
  }
}
