import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivityStatisticsGroupedByCurriculumDesignID, ActivityStatisticsGroupedByFundsSourceID, ActivityStatisticsGroupedByLocationID, ActivityStatisticsGroupedByModeID, ActivityStatisticsGroupedByReasonID, ActivityStatisticsGroupedByStatusID, ActivityStatisticsGroupedByTypeID, GraficasEC } from 'app/estadisticas/Models/GraficasEC';
import { Filtros } from '../../PersonalDocente/model/Filtros';
import { DatePipe } from '@angular/common';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { GraficaBarrasModel } from 'app/estadisticas/Models/GraficaBarrasModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ecgraficas',
  templateUrl: './ecgraficas.component.html',
  styleUrls: ['./ecgraficas.component.scss']
})
export class EcgraficasComponent {
  public filtros = new FormControl();
  public resultado: GraficasEC | undefined;
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  public lstFiltros: Filtros[] = [
    {
      texto: "Modo de Actividad",
      codigo: "ActivityModeId"
    },
    {
      texto: "Tipo de Actividad",
      codigo: "ActivityTypeId"
    },
    {
      texto: "Ubicación de Actividad",
      codigo: "ActivityLocationId"
    },
    {
      texto: "Razón de la Actividad",
      codigo: "ActivityReasonId"
    },
    {
      texto: "Origen de Fondo",
      codigo: "ActivityFundsSourceId"
    },
    {
      texto: "Diseño Curricular",
      codigo: "CurriculumDesignId"
    },
    {
      texto: "Estados",
      codigo: "StatusId"
    }
  ];

  constructor(
    private fb: UntypedFormBuilder, private datePipe: DatePipe, public _ActivityDetailService: ActivityDetailService, private cb: ChangeDetectorRef
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

  activityStatisticsGroupedByModeId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByTypeId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByLocationId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByReasonId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByFundsSourceId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByStatusId: GraficaBarrasModel[] = [];
  activityStatisticsGroupedByCurriculumDesignId: GraficaBarrasModel[] = [];

  consultar(): void {
    this.IsLoading = true;
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');
    this._ActivityDetailService.PostFilterGraficas(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.resultado = res;
        if (res.activityStatisticsGroupedByModeId != null) {
          res.activityStatisticsGroupedByModeId.forEach(element => {
            this.activityStatisticsGroupedByModeId.push(
              {
                name: element.ActivityModeName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByTypeId != null) {
          res.activityStatisticsGroupedByTypeId.forEach(element => {
            this.activityStatisticsGroupedByTypeId.push(
              {
                name: element.ActivityTypeName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByLocationId != null) {
          res.activityStatisticsGroupedByLocationId.forEach(element => {
            this.activityStatisticsGroupedByLocationId.push(
              {
                name: element.ActivityLocationName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByReasonId != null) {
          res.activityStatisticsGroupedByReasonId.forEach(element => {
            this.activityStatisticsGroupedByReasonId.push(
              {
                name: element.ActivityReasonName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByFundsSourceId != null) {
          res.activityStatisticsGroupedByFundsSourceId.forEach(element => {
            this.activityStatisticsGroupedByFundsSourceId.push(
              {
                name: element.ActivityFundsSourceName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByStatusId != null) {
          res.activityStatisticsGroupedByStatusId.forEach(element => {
            this.activityStatisticsGroupedByStatusId.push(
              {
                name: element.StatusName,
                value: element.ActivityCount
              }
            )
          });
        }

        if (res.activityStatisticsGroupedByCurriculumDesignId != null) {
          res.activityStatisticsGroupedByCurriculumDesignId.forEach(element => {
            this.activityStatisticsGroupedByCurriculumDesignId.push(
              {
                name: element.CurriculumDesignName,
                value: element.ActivityCount
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
