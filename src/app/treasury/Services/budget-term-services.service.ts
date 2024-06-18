import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { BudgetTermRequest } from '../Models/BudgetTerm';

@Injectable({
  providedIn: 'root'
})
export class BudgetTermServicesService {

  constructor(private httpClient: HttpClient) { }

  save(formdata: any) { 
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'BudgetTerm/AddBudgetTerm', formdata);
  }

  update(formdata: any) {
    
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'BudgetTerm/UpdateBudgetTerm', formdata);
  }

  getAll() {
    return this.httpClient
      .get<BudgetTermRequest>(environment.apiUrlTreasury + 'BudgetTerm/GetBudgetTerm');
  }

  get(id: number) {
    return this.httpClient
      .get<BudgetTermRequest>(environment.apiUrlTreasury + 'BudgetTerm/GetBudgetTerm?Id=' + id);
  }


  delete(id:number){
    const data = {id : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'BudgetTerm/DeleteBudgetTerm',options);
  }
}
