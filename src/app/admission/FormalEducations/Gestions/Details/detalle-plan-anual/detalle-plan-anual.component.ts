import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreatePeriodComponent } from '../../Forms/create-period/create-period.component';
import { AsignacionMallaComponent } from '../../Forms/asignacion-malla/asignacion-malla.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { AnnualPlan, Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { DegreeCurriculumDesign } from 'app/admission/FormalEducations/Models/Degree';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-detalle-plan-anual',
  templateUrl: './detalle-plan-anual.component.html',
  styleUrls: ['./detalle-plan-anual.component.scss']
})
export class DetallePlanAnualComponent {
  public id: string = '';


  DisplayNamePeriod: string[] = [
    'name',
    // 'descripcion',
    'maxCupos',
    'fechas',
    'Estado',
    'accion',
  ];

  DisplayNameCurriculares: string[] = [
    'name',
    'descripcion',
    'fechas',
    'Estado',
    'accion',
  ];
  dataSourcePeriod: Period[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      maxNumOfParticipants: 0,
    },
  ];

  dataSourceDegreeCurriculumDesign: DegreeCurriculumDesign[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: 0,
    },
  ];

  dataPeriod = new MatTableDataSource<Period>(this.dataSourcePeriod);
  dataDegreeCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(this.dataSourceDegreeCurriculumDesign);

  @ViewChild('listadoPeriodo')
  set paginatorPeriod(value: MatPaginator) {
    this.dataPeriod.paginator = value;
  }

  @ViewChild('ListadoMallaCurriculares')
  set paginatorMallaCurriculares(value: MatPaginator) {
    this.dataDegreeCurriculum.paginator = value;
  }

  constructor(
    private _Router: Router,
    private activatedRoute: ActivatedRoute,
    public _AnnualPlanService: AnnualPlanService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getOnePlan();
      this.getListadoPeriodo();
      this.getMallaCurriculo();
    });
  }

  getOnePlan() {
    this._AnnualPlanService.GetAnualPlan(this.id).subscribe({
      next: (res) => {
        console.log('GetOnePlanes');
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  volverAtras() {
    this._Router.navigate(['/admission/AnnualPlan']);
  }

  getListadoPeriodo() {
    this._AnnualPlanService.GetPeriodAnnualPlan(this.id).subscribe({
      next: (res) => {
        this.dataPeriod = new MatTableDataSource<Period>(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getMallaCurriculo() {
    this._AnnualPlanService.GetMallaAnnualPlan(this.id).subscribe({
      next: (res) => {
        this.dataDegreeCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  AddPeriod() {
    this._AnnualPlanService.Init_Period();
    const dialogRef = this._dialog.open(CreatePeriodComponent, {
      data: {
        id_plan: this.id,
        accion: 'add',
        Period: this._AnnualPlanService._Period
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getListadoPeriodo();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }
  AddMallas() {
    const dialogRef = this._dialog.open(AsignacionMallaComponent, {
      data: {
        id_plan: this.id,
        accion: 'add',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getMallaCurriculo();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  deletePeriodo(row: Period) {
    this._AnnualPlanService.DeleteAnnualPlanPeriodo(row.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getListadoPeriodo();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }
  editarPeriodo(row: Period) {
    const dialogRef = this._dialog.open(CreatePeriodComponent, {
      data: {
        id_plan: this.id,
        accion: 'edit',
        Period: row
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getListadoPeriodo();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  deleteMallaCurricular(row: DegreeCurriculumDesign) {
    this._AnnualPlanService.DesvincularMalla(this.id, row.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getMallaCurriculo();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }
  detalleGeneral(row: DegreeCurriculumDesign) {

  }
}
