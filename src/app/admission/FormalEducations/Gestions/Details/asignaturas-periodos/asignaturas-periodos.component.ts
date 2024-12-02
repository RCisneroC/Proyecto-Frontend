import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreateAsignedComponent } from '../../Forms/create-asigned/create-asigned.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CreatePeriodComponent } from '../../Forms/create-period/create-period.component';
import { PlanEstudioList } from 'app/admission/FormalEducations/Models/PlanEstudio';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';

@Component({
  selector: 'app-asignaturas-periodos',
  templateUrl: './asignaturas-periodos.component.html',
  styleUrls: ['./asignaturas-periodos.component.scss']
})
export class AsignaturasPeriodosComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {


  public id: string = '';
  public degree: string = '';
  public _Listado: PlanEstudioList[] = [
    {
      year: 0,
      periods: [
        {
          statusId: 0,
          id: 0,
          name: '',
          description: '',
          startDate: new Date(),
          endDate: new Date(),
          maxNumOfParticipants: 0,
          subjects: [
            {
              statusId: 0,
              id: 0,
              name: '',
              description: '',
              number: 0,
              acronym: '',
              code: '',
              numOfCredits: 0,
              numOfHours: 0,
              numOfClasses: 0,
              hasLaboratory: false,
              evaluationCriteria: '',
              synchronousHours:0,
              asynchronousHours:0,
            }
          ]
        }
      ]
    }
  ];

  public period: Period[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      maxNumOfParticipants: 0,
    }
  ];
  DisplayNameSubject: string[] = [
    'posicion',
    'codigo',
    'name',
    'descripcion',
    'accion'
  ];
  DisplayNamePeriod: string[] = [
    'name',
    // 'descripcion',
    // 'maxCupos',
    'fechas',
    'Estado',
    'accion',
  ];
  dataSorceSubject: Subject[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      number: 0,
      acronym: '',
      code: '',
      numOfCredits: 0,
      numOfHours: 0,
      numOfClasses: 0,
      hasLaboratory: false,
      evaluationCriteria: '',
      synchronousHours:0,
      asynchronousHours:0,
    }
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
  dataPeriod = new MatTableDataSource<Period>(this.dataSourcePeriod);
  dataSubjectList = new MatTableDataSource<Subject>(this.dataSorceSubject);
  @ViewChild("listadoAsignaturas")
  set paginatorSubjectActive(value: MatPaginator) {
    this.dataSubjectList.paginator = value;
  }
  constructor(
    private _Router: Router,
    private activatedRoute: ActivatedRoute,
    public _AnnualPlanService: AnnualPlanService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _subjectService: SubjectServiceService,
    public _Degree: DegreeService
  ) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      _Degree.init_DetalleMalla();
      this.id = params['id'];
      this.degree = params['id_degree'];
      this.getOnePeriodSubject();
      this.getOnePeiod();
      this.getSubjectAll();
      this.getListadoPeriodo();
      this.getOneMalla();
    });
  }

  ngOnInit(): void {

  }
  getOneMalla() {
    this._Listado = [];
    this._Degree.getOneMallaCurricular(this.degree).subscribe({
      next: (res) => {
        this._Degree._DetalleMalla = res;
        console.log(this._Degree._DetalleMalla.name);

      }
    })
  }


  getOnePeriodSubject() {
    this._Listado = [];
    this._AnnualPlanService.getSubjectPeiod(this.degree).subscribe({
      next: (res) => {
        this._Listado = res;
      }
    })
  }

  getOnePeiod() {

    this._AnnualPlanService.getPeriodAgree(this.degree).subscribe({
      next: (res) => {
        this.period = res;

      }
    })
  }

  volverAtras() {
    this._Router.navigate(['/admission/AnnualPlan/' + this.id])
  }
  getPeriod() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubjectList.filter = filterValue.trim().toLowerCase();
  }
  getSubjectAll() {
    this._subjectService.getAllSubjectNotPendingDegreePeriodo(this.degree, this.id).subscribe({
      next: (res) => {
        this.dataSubjectList = new MatTableDataSource<Subject>(res);
        this.dataSubjectList.paginator = this.paginatorSubjectActive;
      },
      error: () => {

      }
    })
  }

  asignar(row: Subject) {
    this.getOnePeiod();
    const dialogRef = this._dialog.open(CreateAsignedComponent, {
      data: {
        accion: 'add',
        subject: row,
        period: this.period,
        id_malla: this.degree,
        id_plan: this.id,
        anios: this._Degree._DetalleMalla.degree.durationInYears
      },
      disableClose: true,
    });

    this.subs.sink = dialogRef
      .afterClosed()
      .subscribe((result: ResponseMessageMaestra) => {
        if (result == undefined) {
          return;
        }
        if (result.CodError === 200) {
          Swal.fire({
            title: 'Escuela Judicial',
            text: result.Message,
            icon: 'success',
          });
          this.getOnePeriodSubject()
          this.getSubjectAll();
        } else {
          Swal.fire({
            title: 'Escuela Judicial',
            text: result.Message,
            icon: 'warning',
          });
        }
      });
  }

  eliminar(subject: Subject, periodo: Period, anio: number) {
    console.log(periodo);

    let data = {
      periodId: periodo.id,
      degreeCurriculumDesignId: this.degree,
      subjectId: subject.id,
      year: anio
    };
    this._subjectService.DeleteRelacion(data).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: res.message,
          icon: 'success',
        });
        this.getOnePeriodSubject()
        this.getSubjectAll();
      },
      error: (err) => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente Nuevamente',
          icon: 'warning',
        });
      }
    })

  }

  AddPeriod() {
    this.getOnePeiod();
    this._AnnualPlanService.Init_Period();
    const dialogRef = this._dialog.open(CreatePeriodComponent, {
      data: {
        id_curriculum: this.degree,
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

  createRooms(row: Period) {
    localStorage.setItem('detailsPeriod', JSON.stringify(row));
    localStorage.removeItem('url_plan');
    localStorage.setItem('url_plan', '/admission/AnnualPlan/' + this.id + '/degree/' + this.degree)
    this._Router.navigate(['admission/period/' + row.id + '/degree/' + this.degree])
  }
  editarPeriodo(row: Period) {
    const dialogRef = this._dialog.open(CreatePeriodComponent, {
      data: {
        id_curriculum: this.degree,
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

  getListadoPeriodo() {
    this._AnnualPlanService.GetPeriodAnnualPlan(this.degree).subscribe({
      next: (res) => {
        this.dataPeriod = new MatTableDataSource<Period>(res);
      },
      error: (err) => {

      }
    })
  }


}
