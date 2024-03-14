import { Component } from '@angular/core';
import { Filtros } from '../model/Filtros';

@Component({
  selector: 'app-tabla-personal-docente',
  templateUrl: './tabla-personal-docente.component.html',
  styleUrls: ['./tabla-personal-docente.component.scss']
})
export class TablaPersonalDocenteComponent {
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
      codigo: "PEC",
      texto: "Por Educación Continua"
    },
    {
      codigo: "PEE",
      texto: "Por Educación Especializada"
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

  displayLugarNacimiento(): string {
    return "";
  }

  displayLugarResidencia(): string {
    return "";
  }

  displayTituloObtenido(): string {
    return "";
  }

}
