import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {
  AnnualPlan,
  AnnualPlanDegreeCurriculumDesign,
  Period,
} from '../Models/AnnualPlan';
import { BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { DegreeCurriculumDesign } from '../Models/Degree';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root',
})
export class AnnualPlanService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public _AnnualPlan!: AnnualPlan;
  public _AnnualPlanDegreeCurriculumDesign!: AnnualPlanDegreeCurriculumDesign;
  public _Period!: Period;

  dataChange: BehaviorSubject<AnnualPlan[]> = new BehaviorSubject<AnnualPlan[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: AnnualPlan;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AnnualPlan[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAnnualPlan(): void {
    this.subs.sink = this.httpClient
      .get<AnnualPlan[]>(environment.apiEF + 'AnnualPlan/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
          console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllAnnualPlan2() {
    return this.httpClient.get<AnnualPlan[]>(
      environment.apiEF + 'AnnualPlan/GetAll'
    );
  }

  getAllAnnualPlanFiltro(id: any) {
    return this.httpClient.get<AnnualPlan[]>(
      environment.apiEF + 'AnnualPlan/GetAll?StatusId=' + id
    );
  }

  addAnnualPlan(_AnnualPlan: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/Create',
      _AnnualPlan
    );
  }

  updateAnnualPlan(_AnnualPlan: any) {
    return this.httpClient.put<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/Update',
      _AnnualPlan
    );
  }


  addAnnualPlanPeriod(_AnnualPlan: any) {
    return this.httpClient.post<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/CreatePeriod',
      _AnnualPlan
    );
  }

  updateAnnualPlanPeriod(_AnnualPlan: any) {
    return this.httpClient.put<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/UpdatePeriod',
      _AnnualPlan
    );
  }


  DeleteAnnualPlan(Id: number) {
    let data = {
      id: Id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/Delete',
      options
    );
  }

  GetPeriodAnnualPlan(id: any) {
    return this.httpClient.get<Period[]>(
      environment.apiEF + 'AnnualPlan/GetPeriodsBy?AnnualPlanId=' + id
    );
  }

  GetMallaAnnualPlan(id: any) {
    return this.httpClient.get<DegreeCurriculumDesign[]>(
      environment.apiEF + 'AnnualPlan/GetDegreeCurriculumDesignsBy?AnnualPlanId=' + id
    );
  }

  GetAnualPlan(id: any) {
    return this.httpClient.get<AnnualPlan[]>(
      environment.apiEF + 'AnnualPlan/GetBy?Id=' + id
    );
  }

  DeleteAnnualPlanPeriodo(Id: number) {
    let data = {
      id: Id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/DeletePeriod',
      options
    );
  }

  DesvincularMalla(Id: any, degreeCurriculumDesignId: any) {
    let data = {
      annualPlanId: Id,
      degreeCurriculumDesignId: degreeCurriculumDesignId,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(
      environment.apiEF + 'AnnualPlan/DeleteDegreeCurriculumDesign',
      options
    );
  }




  Init_AnnualPlan() {
    this._AnnualPlan = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      approvedBy: '',
      approvalDate: new Date(),
      approvalMessage: '',
      annualPlanDegreeCurriculumDesigns: [
        {
          statusId: 0,
          id: 0,
          inscriptionStartDate: new Date(),
          inscriptionEndDate: new Date(),
          degreeCurriculumDesign: {
            statusId: 0,
            id: 0,
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            degreeCurriculumDesignTarget: 0,
          },
        },
      ],
      periods: [
        {
          statusId: 0,
          id: 0,
          name: '',
          description: '',
          startDate: new Date(),
          endDate: new Date(),
          maxNumOfParticipants: 0,
        },
      ],
    };
  }
  Init_AnnualPlanDegreeCurriculumDesign() {
    this._AnnualPlanDegreeCurriculumDesign = {
      statusId: 0,
      id: 0,
      inscriptionStartDate: new Date(),
      inscriptionEndDate: new Date(),
      degreeCurriculumDesign: {
        statusId: 0,
        id: 0,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        degreeCurriculumDesignTarget: 0,
      },
    };
  }
  Init_Period() {
    this._Period = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      maxNumOfParticipants: 0,
    };
  }
}
