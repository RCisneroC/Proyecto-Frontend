import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
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
import { StatusTeacherPipe } from 'app/pipes/status-teacher.pipe';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { TeacherService } from 'app/teaching-management/services/teacher.service';
import {  Subject } from 'app/teaching-management/models/Teacher';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-tabla-personal-docente',
  templateUrl: './tabla-personal-docente.component.html',
  styleUrls: ['./tabla-personal-docente.component.scss']
})
export class TablaPersonalDocenteComponent implements AfterViewInit, OnDestroy, OnInit {

  public filtros = new FormControl();
  public lstFiltrosSelected: string[] = [];
  public personalDocenteModel: PersonalDocenteModel[] = [];
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
      codigo: "ACTFC",
      texto: "Por Actividades"
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
      codigo: "1",
      texto: "Educación Contínua"
    },
    {
      codigo: "2",
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


  public lstNivelEducativo: Filtros[] = [
    {
      codigo: "1",
      texto: "Bachiller"
    },
    {
      codigo: "2",
      texto: "Técnico"
    },
    {
      codigo: "3",
      texto: "Licenciatura"
    },
    {
      codigo: "4",
      texto: "Especialización"
    },
    {
      codigo: "5",
      texto: "Maestría"
    },
    {
      codigo: "6",
      texto: "Formación Especializada"
    },
    {
      codigo: "7",
      texto: "Otros"
    }
  ];
  public  lstMateriasImpartidas : Subject[] = [];
  public lstActividades: GetOneActivity[] = [];

  constructor(private cb: ChangeDetectorRef,
    private servicioPersonalDocente: PersonalDocenteServiceService,
    private fb: UntypedFormBuilder, private datePipe:DatePipe,
    private statusPipe:StatusTeacherPipe,
    private inscriptionService: InscriptionService,
    private teacherService:TeacherService,
    private activityService:ActivityDetailService) {
    this.form = this.createForm();
  }


  ngOnInit(): void {
    this.getMateriasImpartidas();
    this.getActividades();
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
      PE: ['', Validators.required],
      ACTFC: ['', Validators.required]
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
          parametros!.dateOfBirth = this.datePipe!.transform(this.form.controls[f].value,"yyy-MM-dd");
        }
        if (f == "PC") {
          parametros!.position = this.form.controls[f].value;
        }
        if (f == "PNE") {
          parametros!.educationLevel = this.form.controls[f].value;
        }
        if (f == "PTED") {
          parametros!.process = this.form.controls[f].value;
        }
        if (f == "PTO") {
          parametros!.degreeObtained = this.form.controls[f].value;
        }
        if (f == "PMI") {
          this.form.controls[f].value.forEach(
            (g:number) =>{
              parametros!.subjecIds?.push(g);
            }
          )
        }

        if (f == "ACTFC") {
          this.form.controls[f].value.forEach(
            (g:number) =>{
              parametros!.actIds?.push(g);
            }
          )
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
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

//Carga de listas
getMateriasImpartidas(){
  this.subscriptions.push(
    this.teacherService.getAllSubject3().subscribe(
      {
        next: (request:Subject[]) =>{
            this.lstMateriasImpartidas = request;
        },
        error : (err: HttpErrorResponse) =>{
            console.log(err);
        }
      }
    )
  );

}

getActividades(){
  this.subscriptions.push(
    this.activityService.getActivityStatus(5).subscribe(
      {
        next: (request:GetOneActivity[]) =>{
            this.lstActividades = request;
        },
        error : (err: HttpErrorResponse) =>{
            console.log(err);
        }
      }
    )
  );

}


sortData(sort: Sort) {
  const data = this.personalDocenteModel.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<PersonalDocenteModel>(data);
    return;
  }

  this.personalDocenteModel = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'cedula':
        return this.compare(a.cedula, b.cedula, isAsc);
      case 'name':
        return this.compare(a.name, b.name, isAsc);
      case 'lastName':
        return this.compare(a.lastName, b.lastName, isAsc);
      case 'dateOfBirth':
        return this.compare(a.dateOfBirth, b.dateOfBirth, isAsc);
      case 'placeOfBirth':
        return this.compare(a.placeOfBirth, b.placeOfBirth, isAsc);
      case 'email':
          return this.compare(a.email, b.email, isAsc);
      case 'phoneNumber':
            return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
      case 'placeResidence':
              return this.compare(a.placeResidence, b.placeResidence, isAsc);
      case 'statusId':
                return this.compare(a.statusId, b.statusId, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<PersonalDocenteModel>(this.personalDocenteModel);
}

 compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}
