import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { GraficaBarrasModel } from 'app/estadisticas/Models/GraficaBarrasModel';
import { GraficasEC } from 'app/estadisticas/Models/GraficasEC';
import { Filtros } from 'app/estadisticas/PersonalDocente/model/Filtros';

@Component({
  selector: 'app-mecgraficas',
  templateUrl: './mecgraficas.component.html',
  styleUrls: ['./mecgraficas.component.scss']
})
export class MECgraficasComponent {
  public filtros = new FormControl();
  public resultado: GraficasEC | undefined;
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;

  public lstFiltros: Filtros[] = [
    {
      texto: "Por Sexo",
      codigo: "2"
    },
    {
      texto: "Estudiantes con Discapacidad",
      codigo: "17"
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
    private fb: UntypedFormBuilder, private datePipe: DatePipe, public _ActivityDetailService: EnrollmentService, private cb: ChangeDetectorRef
  ) {
    this.form = this.createForm();
  }




  createForm(): UntypedFormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      filtros: ['', Validators.required]
    });
  }

  estudiantePorSexo: GraficaBarrasModel[] = [];
  estudianteConDiscapacidad: GraficaBarrasModel[] = [];
  estudiantePorProvincia: GraficaBarrasModel[] = [];
  porPrograma: GraficaBarrasModel[] = [];
  estudiantePorEdad: GraficaBarrasModel[] = [];

  consultar(): void {
    //   this.IsLoading = true;
    //   console.log('====================================');
    //   console.log(this.form.getRawValue());
    //   console.log('====================================');
    //   this._ActivityDetailService.PostFilterGraficas(this.form.getRawValue()).subscribe({
    //     next: (res) => {
    //       this.resultado = res;
    //       if (res.activityStatisticsGroupedByModeId != null) {
    //         res.activityStatisticsGroupedByModeId.forEach(element => {
    //           this.activityStatisticsGroupedByModeId.push(
    //             {
    //               name: element.ActivityModeName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByTypeId != null) {
    //         res.activityStatisticsGroupedByTypeId.forEach(element => {
    //           this.activityStatisticsGroupedByTypeId.push(
    //             {
    //               name: element.ActivityTypeName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByLocationId != null) {
    //         res.activityStatisticsGroupedByLocationId.forEach(element => {
    //           this.activityStatisticsGroupedByLocationId.push(
    //             {
    //               name: element.ActivityLocationName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByReasonId != null) {
    //         res.activityStatisticsGroupedByReasonId.forEach(element => {
    //           this.activityStatisticsGroupedByReasonId.push(
    //             {
    //               name: element.ActivityReasonName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByFundsSourceId != null) {
    //         res.activityStatisticsGroupedByFundsSourceId.forEach(element => {
    //           this.activityStatisticsGroupedByFundsSourceId.push(
    //             {
    //               name: element.ActivityFundsSourceName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByStatusId != null) {
    //         res.activityStatisticsGroupedByStatusId.forEach(element => {
    //           this.activityStatisticsGroupedByStatusId.push(
    //             {
    //               name: element.StatusName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }

    //       if (res.activityStatisticsGroupedByCurriculumDesignId != null) {
    //         res.activityStatisticsGroupedByCurriculumDesignId.forEach(element => {
    //           this.activityStatisticsGroupedByCurriculumDesignId.push(
    //             {
    //               name: element.CurriculumDesignName,
    //               value: element.ActivityCount
    //             }
    //           )
    //         });
    //       }
    //       this.IsLoading = false;
    //       this.cb.detectChanges();
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       this.IsLoading = false;
    //     },
    //     complete: () => {
    //     }
    //   })
  }

  public verificarExistenciaFiltro(valor: string): boolean {
    return this.form.controls["filters"].getRawValue().indexOf(valor) >= 0;
  }
}
