import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { AccountPeriodResponse1 } from '../Models/AccountPeriodResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountPeriodService {

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<AccountPeriodResponse1>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');
  }

  getById(id:number){
    return this.httpClient.get<AccountPeriodResponse1>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo?PeriodContableId=' + id);
  }

  save(data:any){
    return this.httpClient.post<Result>(environment.apiUrlTreasury + 'PeriodoContable/AddPeriodo',data);
  }

  update(data:any){
    return this.httpClient.put<Result>(environment.apiUrlTreasury + 'PeriodoContable/UpdatePeriodo',data);
  }

  delete(id:number){
    const data = {periodoContableId : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'PeriodoContable/DeletePeriodo',options);
  }

}
