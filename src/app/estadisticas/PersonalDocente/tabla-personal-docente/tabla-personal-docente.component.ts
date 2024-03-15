import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Filtros } from '../model/Filtros';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PersonalDocenteModel } from '../model/PersonalDocenteModel';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonalDocenteServiceService } from 'app/estadisticas/services/personal-docente-service.service';
import { ParametrosConsulta } from '../model/ParametrosConsulta';
import { HttpErrorResponse } from '@angular/common/http';
import { TableElement, TableExportUtil } from '@shared';
import {  DatePipe } from '@angular/common';
import { StatusPipePipe } from 'app/pipes/status-pipe.pipe';


@Component({
  selector: 'app-tabla-personal-docente',
  templateUrl: './tabla-personal-docente.component.html',
  styleUrls: ['./tabla-personal-docente.component.scss']
})
export class TablaPersonalDocenteComponent implements AfterViewInit, OnDestroy {

  public filtros = new FormControl();
  public lstFiltrosSelected: string[] = [];
  public personalDocenteModel: PersonalDocenteModel[] = [{
    teacherId: 0,
    cedula: '',
    name: '',
    lastName: '',
    email: '',
    applicationDate: '',
    selected: false,
    dischargeDate: '',
    placeResidence: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    phoneNumber: '',
    statusId: 0,
    comment: '',
    listCourse: '',
    listTraining: '',
    listSpecialty: '',
    listExperience: '',
    listDocument: '',
    listActivity: '',
    listSubject: '',
    process: 0,
    createdDate: '',
    createdBy: '',
    lastModifiedDate: '',
    lastModifiedBy: ''
  }];
  public subscriptions: Subscription[] = [];
  public IsLoading: boolean = true;
  form!: UntypedFormGroup;
  dataSource = new MatTableDataSource<PersonalDocenteModel>(this.personalDocenteModel);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
  displayedColumns = [
    'cedula',
    'name',
    'lastName',
    'gender',
    'dateOfBirth',
    'placeOfBirth',
    'email',
    'phoneNumber',
    'placeResidence',
    'statusId',
  ];

  public lstFiltros: Filtros[] = [
    {
      codigo: "PLN",
      texto: "Por Lugar de Nacimiento"
    },
    {
      codigo: "PCED",
      texto: "Por Cédula"
    },
    {
      codigo: "PFN",
      texto: "Por Fecha de Nacimiento"
    },
    {
      codigo: "PLR",
      texto: "Por Lugar de Residencia"
    },
    {
      codigo: "PC",
      texto: "Por Cargo"
    },
    {
      codigo: "PNE",
      texto: "Por Nivel Educativo"
    },
    {
      codigo: "PTO",
      texto: "Por Título Obtenido"
    },
    {
      codigo: "PMI",
      texto: "Por Materias Impartidas"
    },
    {
      codigo: "PTED",
      texto: "Tipo de Educación"
    },
    {
      codigo: "PS",
      texto: "Por Sexo"
    },
    {
      codigo: "PE",
      texto: "Por Edad"
    }
  ];

  public lstTipoEducacion: Filtros[] = [
    {
      codigo: "EC",
      texto: "Educación Contínua"
    },
    {
      codigo: "FE",
      texto: "Formación Especializada"
    }
  ];

  public lstSexo: Filtros[] = [
    {
      codigo: "M",
      texto: "Masculino"
    },
    {
      codigo: "F",
      texto: "Femenino"
    }
  ];

  constructor(private cb: ChangeDetectorRef,
    private servicioPersonalDocente: PersonalDocenteServiceService,
    private fb: UntypedFormBuilder, private datePipe:DatePipe,
    private statusPipe:StatusPipePipe) {
    this.form = this.createForm();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      PLN: ['', Validators.required],
      PCED: ['', Validators.required],
      PFN: ['', Validators.required],
      PLR: ['', Validators.required],
      PC: ['', Validators.required],
      PNE: ['', Validators.required],
      PTO: ['', Validators.required],
      PMI: ['', Validators.required],
      PTED: ['', Validators.required],
      PS: ['', Validators.required],
      PE: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.IsLoading = false;
    }, 2000
    );
  }

  displayLugarNacimiento(): string {
    return "";
  }

  displayLugarResidencia(): string {
    return "";
  }

  displayTituloObtenido(): string {
    return "";
  }

  public verificarExistenciaFiltro(valor: string): boolean {
    return this.lstFiltrosSelected.indexOf(valor) >= 0;
  }

  public limpiarTodosFiltros() {
    this.lstFiltrosSelected.forEach(
      (f) => {
        this.form.controls[f].reset();
      }
    );
    this.lstFiltrosSelected = [];
    this.personalDocenteModel = [];
    this.dataSource = new MatTableDataSource<PersonalDocenteModel>(this.personalDocenteModel);
  }

  public consultar() {
    this.IsLoading = true;
    const parametros = new ParametrosConsulta;
    let valid: boolean = true;
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

    if (!valid) {
      this.IsLoading = false;
      return;
    }

    this.lstFiltrosSelected.forEach(
      (f) => {
        if (f == "PS") {
          parametros!.sexo = this.form.controls[f].value;
        }
        if (f == "PCED") {
          parametros!.cedula = this.form.controls[f].value;
        }
        if (f == "PE") {
          parametros!.age = this.form.controls[f].value;
        }
        if (f == "PFN") {
          parametros!.dateOfBirth = this.form.controls[f].value;
        }

      }
    );

    this.subscriptions.push(
      this.servicioPersonalDocente.GetByFilters(parametros).subscribe(
        {
          next: (request: PersonalDocenteModel[]) => {
            this.personalDocenteModel = request;
            this.dataSource = new MatTableDataSource<PersonalDocenteModel>(this.personalDocenteModel);
            this.IsLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.IsLoading = false;
          }
        }
      )
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  public seleccionarTodos() {
    this.lstFiltrosSelected = [];
    this.lstFiltros.forEach((f) => {
      this.lstFiltrosSelected.push(f.codigo);
    });
  }

  public eventSelection() {
    this.cb.detectChanges();
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Cedula': x.cedula,
        'Nombre': x.name,
        'Apellido': x.lastName,
        'Sexo': x.gender==null?"":x.gender,
        'Fecha de Nacimiento': x.dateOfBirth == null? "" : x.dateOfBirth,
        'Lugar de Nacimiento': x.placeOfBirth == null ? "" :x.placeOfBirth,
        'Correo_Electronico': x.email,
        'No_Telefono': x.phoneNumber == null ? "" : x.phoneNumber,
        'Lugar_Residencia': x.placeResidence,
        'Estado': x.statusId == null ? "" : this.statusPipe.transform(x.statusId),
      }));
console.log(exportData)
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
