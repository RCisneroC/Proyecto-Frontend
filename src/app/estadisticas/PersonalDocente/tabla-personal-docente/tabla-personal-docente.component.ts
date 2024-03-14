import { Component, ChangeDetectorRef } from '@angular/core';
import { Filtros } from '../model/Filtros';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tabla-personal-docente',
  templateUrl: './tabla-personal-docente.component.html',
  styleUrls: ['./tabla-personal-docente.component.scss']
})
export class TablaPersonalDocenteComponent {

  public filtros  = new FormControl();
  public lstFiltrosSelected: string[] = [];

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
      codigo: "Masculino",
      texto: "Masculino"
    },
    {
      codigo: "Femenino",
      texto: "Femenino"
    }
  ];

  constructor(private cb:ChangeDetectorRef){}

  displayLugarNacimiento(): string {
    return "";
  }

  displayLugarResidencia(): string {
    return "";
  }

  displayTituloObtenido(): string {
    return "";
  }

  public verificarExistenciaFiltro(valor:string):boolean{
    return this.lstFiltrosSelected.indexOf( valor)>=0;
  }

  public limpiarTodosFiltros(){
    this.lstFiltrosSelected = [];
  }


  public eventSelection(){
    this.cb.detectChanges();
   }

}
