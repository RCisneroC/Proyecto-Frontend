import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { GraficaBarrasModel } from 'app/estadisticas/Models/GraficaBarrasModel';
import { GraficasEC } from 'app/estadisticas/Models/GraficasEC';
import { Filtros } from '../../PersonalDocente/model/Filtros';
import { HttpErrorResponse } from '@angular/common/http';
import { EstudiantePorEdad, EstudiantePorProvincia, EstudiantePorSexo, GraficasMatricula, PorPrograma } from 'app/estadisticas/Models/GraficasMatricula';

@Component({
  selector: 'app-mefgraficas',
  templateUrl: './mefgraficas.component.html',
  styleUrls: ['./mefgraficas.component.scss']
})
export class MEFgraficasComponent {
  public filtros = new FormControl();
  public resultado: GraficasMatricula | undefined;
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;

  public lstFiltros: Filtros[] = [
    {
      texto: "Por Sexo",
      codigo: "2"
    },
    {
      texto: "Por Provincia",
      codigo: "3"
    },
    {
      texto: "Por Programa",
      codigo: "16"
    },
    {
      texto: "Por Edad",
      codigo: "10"
    }
  ];

  constructor(
    private fb: UntypedFormBuilder, private datePipe: DatePipe, public _EnrollmentService: EnrollmentService, private cb: ChangeDetectorRef
  ) {
    this.form = this.createForm();
  }




  createForm(): UntypedFormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      filtros: [[], Validators.required]
    });
  }




  estudiantePorSexo: GraficaBarrasModel[] = [];
  estudianteConDiscapacidad: GraficaBarrasModel[] = [];
  estudiantePorProvincia: GraficaBarrasModel[] = [];
  porPrograma: GraficaBarrasModel[] = [];
  estudiantePorEdad: GraficaBarrasModel[] = [];

  consultar(): void {
    this.IsLoading = true;
    let valores: [] = this.form.controls['filtros'].value;
    let array: any[] = [];
    valores.forEach(element => {
      let datos = {
        indicadorId: element
      }
      array.push(datos)
    });
    let dataSendMe = {
      endDate: this.form.controls['endDate'].value,
      filtros: array,
      startDate: this.form.controls['startDate'].value,
    }
    this._EnrollmentService.searchGraficasMatriculados(dataSendMe).subscribe({
      next: (res) => {
        this.resultado = res;
        console.log(res);
        if (res.getIndicadoresEstadistico[0].estudiantePorSexo != null) {
          res.getIndicadoresEstadistico[0].estudiantePorSexo.forEach(element => {
            this.estudiantePorSexo.push(
              {
                name: element.sexo,
                value: element.cantidad
              }
            )
          });
        }

        if (res.getIndicadoresEstadistico[0].estudiantePorProvincia != null) {
          res.getIndicadoresEstadistico[0].estudiantePorProvincia.forEach(element => {
            this.estudiantePorProvincia.push(
              {
                name: element.provincia,
                value: element.cantidad
              }
            )
          });
        }

        if (res.getIndicadoresEstadistico[0].porPrograma != null) {
          res.getIndicadoresEstadistico[0].porPrograma.forEach(element => {
            this.porPrograma.push(
              {
                name: element.programa,
                value: element.cantidad
              }
            )
          });
        }

        if (res.getIndicadoresEstadistico[0].estudiantePorEdad != null) {
          res.getIndicadoresEstadistico[0].estudiantePorEdad.forEach(element => {
            this.estudiantePorEdad.push(
              {
                name: element.year.toString(),
                value: element.cantidad
              }
            )
          });
        }


        this.IsLoading = false;
        this.cb.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.IsLoading = false;
      },
      complete: () => {
      }
    })
  }

  public verificarExistenciaFiltro(valor: string): boolean {
    return this.form.controls["filters"].getRawValue().indexOf(valor) >= 0;
  }
}

