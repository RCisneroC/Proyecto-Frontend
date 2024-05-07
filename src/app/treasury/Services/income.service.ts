import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { Income } from '../Models/income';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class IncomeService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<Income[]> = new BehaviorSubject<
  Income[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Income;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Income[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllIncome(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'CatalogoIngreso/GetCatalogoIngreso?CatalogoId=0')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getCatalogoIngresos']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  // getAllBudgetCoding2() {
  //   return this.httpClient
  //     .get<BudgetCoding[]>(environment.apiUrlTreasury + 'CatalogoIngreso/GetCatalogoIngreso?CatalogoId=0');

  // }

  // getAllModality2Filter(id: any) {
  //   return this.httpClient
  //     .get<Modality[]>(environment.apiUrlSchedule + 'ActivityMode/GetAll?StatusId=' + id);

  // }
  addIncomeMode(income: Income) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'CatalogoIngreso/AddCatalogo', income);
  }

  updateIncomeMode(income: Income) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'Catalogo/UpdateCatalogoIngreso', income);
  }

  DeleteIncomeMode(Id: number) {
    const data = {
      catalogoIngresoId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'CatalogoIngreso/DeleteCatalogoIngreso', options);
  }

}

