import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { SubjectPeriod } from 'app/admission/FormalEducations/Models/PlanSubject';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreateAsignedComponent } from '../../Forms/create-asigned/create-asigned.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-asignaturas-periodos',
  templateUrl: './asignaturas-periodos.component.html',
  styleUrls: ['./asignaturas-periodos.component.scss']
})
export class AsignaturasPeriodosComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {


  public id: string = '';
  public degree: string = '';
  public _Listado: SubjectPeriod[] = [
    {
      period: {
        statusId: 0,
        id: 0,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        maxNumOfParticipants: 0,
      },
      subjects: [
        {
          statusId: 0,
          id: 0,
          name: '',
          description: '',
          acronym: '',
          code: '',
          numOfCredits: 0,
          numOfHours: 0,
          numOfClasses: 0,
          hasLaboratory: false,
          evaluationCriteria: '',
          degreeCurriculumDesigns: [],
          periods: [],
          parentSubjects: [],
          dependentSubjects: [],
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
    }
  ];

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
    public _subjectService: SubjectServiceService
  ) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      this.degree = params['id_degree'];
      this.getOnePeriodSubject();
      this.getOnePeiod();
      this.getSubjectAll();
    });
  }

  ngOnInit(): void {

  }

  getOnePeriodSubject() {
    this._Listado = [];
    this._AnnualPlanService.getSubjectPeiod(this.degree).subscribe({
      next: (res) => {
        this._Listado = res;
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      }
    })
  }

  getOnePeiod() {

    this._AnnualPlanService.getPeriodAgree(this.id).subscribe({
      next: (res) => {
        this.period = res;
        console.log(this.period);

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
    const dialogRef = this._dialog.open(CreateAsignedComponent, {
      data: {
        accion: 'add',
        subject: row,
        period: this.period,
        id_malla: this.degree,
        id_plan: this.id
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

  eliminar(subject: number, periodo: Period) {
    console.log('====================================');
    console.log(subject, periodo);
    console.log('====================================');
    let data = {
      periodId: periodo.id,
      degreeCurriculumDesignId: this.degree,
      subjectId: subject
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
          text: err,
          icon: 'warning',
        });
      }
    })

  }

}
