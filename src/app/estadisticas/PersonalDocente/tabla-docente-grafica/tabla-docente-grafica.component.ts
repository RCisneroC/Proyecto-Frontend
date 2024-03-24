import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Filtros } from '../model/Filtros';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersonalDocenteServiceService } from 'app/estadisticas/services/personal-docente-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GraficaDocente } from '../model/grafica';
import * as shape from 'd3-shape';
import { GraficaBarrasModel } from 'app/estadisticas/Models/GraficaBarrasModel';
import { TableExportUtil } from '@shared';

@Component({
  selector: 'app-tabla-docente-grafica',
  templateUrl: './tabla-docente-grafica.component.html',
  styleUrls: ['./tabla-docente-grafica.component.scss']
})
export class TablaDocenteGraficaComponent implements OnDestroy {
  public filtros = new FormControl();
  public resultado: GraficaDocente | undefined;
  public subscriptions: Subscription[] = [];
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  public lstFiltros: Filtros[] = [
    {
      codigo: "EducationLevel",
      texto: "Nivel Educativo"
    },
    {
      codigo: "Sexo",
      texto: "Sexo"
    },
    {
      codigo: "Subjects",
      texto: "Materias Impartidas"
    },
    {
      codigo: "Activity",
      texto: "Actividades"
    },
    {
      codigo: "Process",
      texto: "Tipo de Educación"
    }
  ];

  lstTeacherEducatonLevel: GraficaBarrasModel[] = [];
  lstteacherGroupedBySexo: GraficaBarrasModel[] = [];
  lstteacherGroupedBySubject: GraficaBarrasModel[] = [];
  lstteacherGroupedByActivity: GraficaBarrasModel[] = [];
  lstteacherGroupedByProcess: GraficaBarrasModel[] = [];

  constructor(private cb: ChangeDetectorRef,
    private servicioPersonalDocente: PersonalDocenteServiceService,
    private fb: UntypedFormBuilder, private datePipe: DatePipe,
  ) {
    this.form = this.createForm();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      filters: ['', Validators.required]
    });
  }

  consultar(): void {
    this.IsLoading = true;
    this.subscriptions.push(
      this.servicioPersonalDocente.GetGraphByFilters(this.form.getRawValue()).subscribe(
        {
          next: (request: GraficaDocente) => {
            this.resultado = request;
            this.lstTeacherEducatonLevel = [];
            this.lstteacherGroupedBySexo = [];
            this.lstteacherGroupedByActivity = [];
            this.lstteacherGroupedByProcess = [];
            this.lstteacherGroupedBySubject = [];

            if (this.resultado.teacherGroupedByEducationLevel != null) {
              this.resultado.teacherGroupedByEducationLevel.forEach(
                (t) => {
                  this.lstTeacherEducatonLevel.push(
                    {
                      name: t.educationLevelName,
                      value: t.educationLevelCount
                    }
                  );
                }
              );
            }
            if (this.resultado.teacherGroupedBySexo != null) {
              this.resultado.teacherGroupedBySexo.forEach(
                (t) => {
                  this.lstteacherGroupedBySexo.push(
                    {
                      name: t.sexoName,
                      value: t.sexoCount
                    }
                  );
                }
              );
            }
            if (this.resultado.teacherGroupedByActivity != null) {
              this.resultado.teacherGroupedByActivity.forEach(
                (t) => {
                  this.lstteacherGroupedByActivity.push(
                    {
                      name: t.activityName,
                      value: t.activityCount
                    }
                  );
                }
              );
            }
            if (this.resultado.teacherGroupedByProcess != null) {
              this.resultado.teacherGroupedByProcess.forEach(
                (t) => {
                  this.lstteacherGroupedByProcess.push(
                    {
                      name: t.processName,
                      value: t.processCount
                    }
                  );
                }
              );
            }
            if (this.resultado.teacherGroupedBySubject != null) {
              this.resultado.teacherGroupedBySubject.forEach(
                (t) => {
                  this.lstteacherGroupedBySubject.push(
                    {
                      name: t.subjectName,
                      value: t.subjectCount
                    }
                  );
                }
              );
            }
            this.IsLoading = false;
            this.cb.detectChanges();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.IsLoading = false;
          }
        }
      )

    );

  }

  public verificarExistenciaFiltro(valor: string): boolean {
    return this.form.controls["filters"].getRawValue().indexOf(valor) >= 0;
  }


}
