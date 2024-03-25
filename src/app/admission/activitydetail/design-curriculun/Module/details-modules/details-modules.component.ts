import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CooperationgOrganizationService } from 'app/admission/maestros/services/cooperationg-organization.service';
import { ActivityDetailModules, ActivityStudyPlanModuleLearningActivity } from 'app/admission/models/ActivityDetailModules';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ActivityLearningFormsComponent } from '../Foms/activity-learning-forms/activity-learning-forms.component';
import Swal from 'sweetalert2';
import { EvaluationsCriteriaFormsComponent } from '../Foms/evaluations-criteria-forms/evaluations-criteria-forms.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-details-modules',
  templateUrl: './details-modules.component.html',
  styleUrls: ['./details-modules.component.scss']
})
export class DetailsModulesComponent {
  public ParamsId: string = '';
  public IdModules: string = '';
  public _ActivityDetailModules: ActivityDetailModules = this._ActivityService._ActivityDetailModules;
  panelOpenState = false;
  DisplayNameCompetence: string[] = ['name', 'descripcion', 'accion'];
  public _ActivityStudyPlanModuleLearningActivity: ActivityStudyPlanModuleLearningActivity[] = [
    {
      activityStudyPlanModuleId: 0,
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ]
  dataCriterio = new MatTableDataSource<ActivityStudyPlanModuleLearningActivity>(this._ActivityStudyPlanModuleLearningActivity);
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataCriterio.paginator = value;
  }
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _CooperatingOrganizationService: CooperationgOrganizationService,
    private sanitizer: DomSanitizer
  ) {
    this._ActivityService.init_modules_study();
    this._ActivityService.init_PlanStudy();
    this.Path.params.subscribe((params) => {
      this.ParamsId = params['id'];
      this.IdModules = params['module'];
      console.log(this.ParamsId, this.IdModules);
      this.GetModulesByIdModules();
    });
  }

  GetModulesByIdModules() {
    this._ActivityService.GetModulesByIdModules(this.IdModules).subscribe({
      next: (res) => {
        this._ActivityDetailModules = res;
        console.log('====================================');
        console.log(this._ActivityDetailModules);
        console.log('====================================');
        this.dataCriterio = new MatTableDataSource<ActivityStudyPlanModuleLearningActivity>(this._ActivityDetailModules.activityStudyPlanModuleLearningActivities);
        this.dataCriterio.paginator = this.paginator;
      },
      complete: () => {
        this.getOnePlanStudy()
      }
    })
  }

  getOnePlanStudy() {
    this._ActivityService.GetOnePlanStudyActivity(this._ActivityDetailModules.activityStudyPlanId).subscribe({
      next: (res) => {
        this._ActivityService._PlanStudyActivity = res;
      }
    })
  }
  safeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '..';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }
  volverAtras() {
    this._router.navigate(['/admission/activity-detail/' + this.ParamsId + '/details-modules'])
  }
  EditarModulo() {
    const dialogRef = this._dialog.open(ActivityLearningFormsComponent, {
      data: {
        id_actividad: this.ParamsId,
        accion: 'edit-modulos',
        module: this._ActivityDetailModules,
        id_plan: this._ActivityService._PlanStudyActivity.id
      },
      width: '1200px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.GetModulesByIdModules();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  AddCriterios() {
    this._ActivityService.init_ActivityStudyPlanModuleLearningActivity();
    const dialogRef = this._dialog.open(EvaluationsCriteriaFormsComponent, {
      data: {
        id_actividad: this.ParamsId,
        accion: 'add-criterio',
        ActivityLearning: this._ActivityService._ActivityStudyPlanModuleLearningActivity,
        id_modulo: this.IdModules
      },
      width: '1200px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.GetModulesByIdModules();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  editarCriterio(row: ActivityStudyPlanModuleLearningActivity) {
    const dialogRef = this._dialog.open(EvaluationsCriteriaFormsComponent, {
      data: {
        id_actividad: this.ParamsId,
        accion: 'edit-criterio',
        ActivityLearning: row,
        id_modulo: this.IdModules
      },
      width: '1200px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.GetModulesByIdModules();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  deleteCriterio(row: ActivityStudyPlanModuleLearningActivity) {


    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._ActivityService.DeleleCriterio(row.id).subscribe({
          next: (res) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.name + " fue eliminado.",
              icon: "success"
            });
            this.GetModulesByIdModules();
          }, error: () => {
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.name + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      }
    });

  }
}
