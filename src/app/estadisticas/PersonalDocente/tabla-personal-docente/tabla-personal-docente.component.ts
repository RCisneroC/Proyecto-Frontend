import { Component, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { Filtros } from '../model/Filtros';
import { FormControl } from '@angular/forms';
import { PersonalDocenteModel } from '../model/PersonalDocenteModel';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-tabla-personal-docente',
  templateUrl: './tabla-personal-docente.component.html',
  styleUrls: ['./tabla-personal-docente.component.scss']
})
export class TablaPersonalDocenteComponent implements AfterViewInit {

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

  constructor(private cb: ChangeDetectorRef) {

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
    this.lstFiltrosSelected = [];
  }

  public consultar() {
    this.dataSource.paginator = this.paginator;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


  public eventSelection() {
    this.cb.detectChanges();
  }

}
