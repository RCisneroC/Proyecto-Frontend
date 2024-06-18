import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetTermMonthRequest } from '../Models/BudgetTermMonth';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BudgetTermMonthServicesService {

  constructor(private httpClient: HttpClient) { }

  save(formdata: any) { 
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'BudgetTermMonth/AddBudgetTermMonth', formdata);
  }

  update(formdata: any) {
    
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'BudgetTermMonth/UpdateBudgetTermMonth', formdata);
  }

  getAll() {
    return this.httpClient
      .get<BudgetTermMonthRequest>(environment.apiUrlTreasury + 'BudgetTermMonth/GetBudgetTermMonth');
  }

  getBudgetTermMonth(id: number) {
    return this.httpClient
      .get<BudgetTermMonthRequest>(environment.apiUrlTreasury + 'BudgetTermMonth/GetBudgetTermMonth?Id=' + id);
  }

  getBudgetTermId(id: string) {
    return this.httpClient
      .get<BudgetTermMonthRequest>(environment.apiUrlTreasury + 'BudgetTermMonth/GetBudgetTermMonth?BudgetTermId=' + id);
  }


  delete(id:number){
    const data = {id : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'BudgetTermMonth/DeleteBudgetTermMonth',options);
  }
}
