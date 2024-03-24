import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { Filtros } from 'app/estadisticas/PersonalDocente/model/Filtros';

@Component({
  selector: 'app-efgraficas',
  templateUrl: './efgraficas.component.html',
  styleUrls: ['./efgraficas.component.scss']
})
export class EfgraficasComponent {
  public filtros = new FormControl();
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  public lstFiltros: Filtros[] = [
    {
      codigo: "DurationInYears",
      texto: "Duración de Carrera"
    },
    {
      codigo: "NumOfCredits",
      texto: "Cantidad de créditos"
    },
    {
      codigo: "AssignedCoordinatorId",
      texto: "Por Coordinador Asignado"
    },
    {
      codigo: "StudyModeId",
      texto: "Modo de la Carrera"
    }
  ];

  constructor(
    private fb: UntypedFormBuilder, private datePipe: DatePipe, public _degreeService: DegreeService
  ) {
    this.form = this.createForm();
  }




  createForm(): UntypedFormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      filters: ['', Validators.required]
    });
  }


  consultar(): void {
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');

  }
}
