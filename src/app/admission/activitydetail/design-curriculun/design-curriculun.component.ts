import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CooperationgOrganizationService } from 'app/admission/maestros/services/cooperationg-organization.service';
import { ActivityDetailModules } from 'app/admission/models/ActivityDetailModules';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreateModulesComponent } from './Forms/create-modules/create-modules.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { CreatePlanStudyFormsComponent } from './Forms/create-plan-study-forms/create-plan-study-forms.component';
import { PlanStudyActivity } from 'app/admission/models/PlanStudyActivity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewPosterPDFComponent } from '../forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from '../forms/view-poster/view-poster.component';

@Component({
  selector: 'app-design-curriculun',
  templateUrl: './design-curriculun.component.html',
  styleUrls: ['./design-curriculun.component.scss']
})
export class DesignCurriculunComponent {
  public LabelTable = [
    'name',
    'descripcion',
    // 'datecreate',
    'status',
    'accion',
  ];

  public paramsId: any;
  public paramsIdRevisado: any;
  public _ActivityDetailModules: ActivityDetailModules[] = [
    this._ActivityService._ActivityDetailModules
  ]
  public ExistPlan: boolean = false;
  dataDocuments = new MatTableDataSource<ActivityDetailModules>(this._ActivityDetailModules);
  @ViewChild('paginatorModule')
  set paginatorModule(value: MatPaginator) {
    setTimeout(() => {
      this.dataDocuments.paginator = value;
    }, 600);
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
    this.Path.params.subscribe((params) => {
      this.paramsId = params['id'];
      this._ActivityService.init_modules_study();
      this._ActivityService.init_PlanStudy();
      this.GetPlanByActivity();
      this.GetOneActividyMethod();

    });
  }
  volverAtras() {
    this._router.navigate(['/admission/activity-detail/' + this.paramsId]);
  }
  GetModulesByIdPlan(id: number) {
    this._ActivityService.GetModulesByPlanStudy(id).subscribe({
      next: (res) => {
        this._ActivityDetailModules = res;
        console.log(this._ActivityDetailModules);
        this.dataDocuments = new MatTableDataSource<ActivityDetailModules>(this._ActivityDetailModules);
        this.dataDocuments.paginator = this.paginatorModule;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDocuments.filter = filterValue.trim().toLowerCase();
  }
  GetPlanByActivity() {

    this._ActivityService.GetAllPlanStudyActivity(this.paramsId).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.ExistPlan = true;
          this._ActivityService._PlanStudyActivity = res[0];
          this.GetModulesByIdPlan(this._ActivityService._PlanStudyActivity.id);
        } else {
          this.ExistPlan = false;
        }
      },
      complete: () => {
        // this.getOnePlanStudy(this._ActivityService._PlanStudyActivity.id);
      }
    })
  }

  getOnePlanStudy(nbr: number) {
    this._ActivityService.GetOnePlanStudyActivity(nbr).subscribe({
      next: (res) => {
        console.log(res);
        if (this._verificarBS64.transform(res.courseOutline.fileContents) != "pdf") {
          const dialogRef = this._dialog.open(ViewPosterComponent, {
            data: {
              type: this._verificarBS64.transform(res.courseOutline.fileContents),
              accion: 'view-poster',
              posterFile: res.courseOutline.fileContents,
              comment: [],
              poster: res,
            },
            disableClose: true,
          });
        } else {
          const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: this._verificarBS64.transform(res.courseOutline.fileContents),
              accion: 'view-poster',
              posterFile: res.courseOutline.fileContents,
              comment: [],
              poster: res,
            },
            width: '1000px',
            disableClose: true,
          });
        }
      }
    })
  }

  GetOneActividyMethod() {
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityService._GetOneActivity = res;
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/activity-detail/' + this.paramsId]);
        },
        complete: () => {
          //  this._ActivityService.loading = false;
        }
      })
  }

  //crear Modulos
  CreateModules() {
    this._ActivityService.init_modules_study();
    const dialogRef = this._dialog.open(CreateModulesComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-modulos',
        module: this._ActivityService._ActivityDetailModules,
        id_plan: this._ActivityService._PlanStudyActivity.id
      },
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
        this.GetPlanByActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  //editar modulos
  editModule(row: ActivityDetailModules) {
    const dialogRef = this._dialog.open(CreateModulesComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'edit-modulos',
        module: row,
        id_plan: this._ActivityService._PlanStudyActivity.id
      },
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
        this.GetPlanByActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  deleteModule(row: ActivityDetailModules) {
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
        this._ActivityService.DeleteOneModule(row.id).subscribe({
          next: (res) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.name + " fue eliminado.",
              icon: "success"
            });
            this.GetModulesByIdPlan(row.activityStudyPlanId);
          }, error: () => {
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.name + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });

  }
  configModule(row: ActivityDetailModules) {
    this._router.navigate(['admission/activity-detail/' + this.paramsId + '/details-modules/' + row.id])
  }
  //Crear Study Plans
  CreateStudyPlans() {
    this._ActivityService.init_PlanStudy();
    const dialogRef = this._dialog.open(CreatePlanStudyFormsComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-plans',
        PlanStudy: this._ActivityService._PlanStudyActivity
      },
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
        this.GetPlanByActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  //EditPlanStudy
  EditStudyPlans(row: PlanStudyActivity) {
    this._ActivityService.init_PlanStudy();
    const dialogRef = this._dialog.open(CreatePlanStudyFormsComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'edit-plans',
        PlanStudy: row
      },
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
        this.GetPlanByActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  VerDocumento(row: PlanStudyActivity) {

  }

}
