import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { SubjectPeriod } from 'app/admission/FormalEducations/Models/PlanSubject';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';

@Component({
  selector: 'app-asignaturas-periodos',
  templateUrl: './asignaturas-periodos.component.html',
  styleUrls: ['./asignaturas-periodos.component.scss']
})
export class AsignaturasPeriodosComponent {

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
  ]
  constructor(
    private _Router: Router,
    private activatedRoute: ActivatedRoute,
    public _AnnualPlanService: AnnualPlanService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      this.degree = params['id_degree'];
      this.getOnePeriodSubject();
      this.getOnePeiod();
    });
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
      }
    })
  }

  volverAtras() {
    this._Router.navigate(['/admission/AnnualPlan/' + this.id])
  }
  getPeriod() {

  }
}
