import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { GetTicketResponse } from '../Models/GetTicketResponse';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  save(formdata: any) {
    const options = {
      headers: new HttpHeaders({
        'accept': 'text/plain',
        'Content-Type': 'multipart/form-data',
      }),
      body: formdata,
    };
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'RegistroBoleta/AddBoleta', formdata);
  }

  update(formdata: any) {
    const options = {
      headers: new HttpHeaders({
        'accept': 'text/plain',
        'Content-Type': 'multipart/form-data',
      }),
      body: formdata,
    };
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'RegistroBoleta/UpdateBoleta', formdata);
  }

  getAll() {
    return this.httpClient
      .get<GetTicketResponse>(environment.apiUrlTreasury + 'RegistroBoleta/GetBoleta');
  }

  get(id: number) {
    return this.httpClient
      .get<GetTicketResponse>(environment.apiUrlTreasury + 'RegistroBoleta/GetBoleta?BoletaId=' + id);
  }


  delete(id:number){
    const data = {boletaId : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'RegistroBoleta/DeleteBoleta',options);
  }


}
