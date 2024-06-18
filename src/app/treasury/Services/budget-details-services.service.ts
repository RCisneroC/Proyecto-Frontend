import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { BudgetDetailsRequest } from '../Models/BudgetDetails';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BudgetDetailsServicesService {

  constructor(private httpClient: HttpClient) { }

  AddBudgetDetail(formdata: any) { 
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'BudgetDetail/AddBudgetDetail', formdata);
  }

  AddBudgetDetailAmount(formdata: any) { 
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'BudgetDetail/AddBudgetDetailAmount', formdata);
  }

  UpdateBudgetDetail(formdata: any) {
    
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'BudgetDetail/UpdateBudgetDetail', formdata);
  }

  getAll() {
    return this.httpClient
      .get<BudgetDetailsRequest>(environment.apiUrlTreasury + 'BudgetDetail/GetBudgetTermMonth');
  }

  GetBudgetDetailId(id: number) {
    return this.httpClient
      .get<BudgetDetailsRequest>(environment.apiUrlTreasury + 'BudgetDetail/GetBudgetDetail?Id?Id=' + id);
  }

  GetBudgetDetailBudgetId(id: string) {
    return this.httpClient
      .get<BudgetDetailsRequest>(environment.apiUrlTreasury + 'BudgetDetail/GetBudgetDetail?BudgetId=' + id);
  }


  delete(id:number){
    const data = {id : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'BudgetDetail/DeleteBudgetDetail',options);
  }
}
