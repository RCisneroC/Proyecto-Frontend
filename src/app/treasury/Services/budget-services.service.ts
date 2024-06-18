import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development'; 
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { BudgetRequest } from '../Models/budgetRequest';

@Injectable({
  providedIn: 'root'
})
export class BudgetServicesService {

  constructor(private httpClient: HttpClient) { }

  save(formdata: any) { 
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'Budget/AddBudget', formdata);
  }

  update(formdata: any) {
    
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'Budget/UpdateBudget', formdata);
  }

  getAll() {
    return this.httpClient
      .get<BudgetRequest>(environment.apiUrlTreasury + 'Budget/GetBudget');
  }

  get(id: number) {
    return this.httpClient
      .get<BudgetRequest>(environment.apiUrlTreasury + 'Budget/GetBudget?Id=' + id);
  }


  delete(id:number){
    const data = {id : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'Budget/DeleteBudget',options);
  }
}
