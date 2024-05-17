import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { GetAprobacionResponse } from '../Models/GetAprobacionResponse';
import { AddCompraMenorRequest } from '../Models/AddCompraMenorRequest';
import { AddCompraMenorResponse } from '../Models/AddCompraMenorResponse';
import { UpdateMinorPurchaseRequest } from '../Models/UpdateMinorPurchaseRequest';
import { PDFComprobandeCajaMenudaResponse } from '../Models/PDFComprobandeCajaMenudaResponse';
import { AddPurchaseRequest } from '../Models/AddPurchaseRequest';
import { AddPurchaseResponse } from '../Models/AddPurchaseResponse';
import { GetPurchaseResponse } from '../Models/GetPurchaseResponse';
import { AddHeadCustodiaCajaRequest } from '../Models/AddHeadCustodiaCajaRequest';
import { AddHeadCustodiaCajaResponse } from '../Models/AddHeadCustodiaCajaResponse';

@Injectable({
  providedIn: 'root'
})
export class MinorPurchaseService {

  constructor(private httpClient: HttpClient) { }

  getMinorPurchaseAll() {
    return this.httpClient
      .get<GetAprobacionResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/GetCompraMenor?CompraMenorId=0');
  }

  getMinorPurchaseById(id:number) {
    return this.httpClient
      .get<GetAprobacionResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/GetCompraMenor?CompraMenorId=' + id);
  }

  addMinorPurchase(data:AddCompraMenorRequest) {
    return this.httpClient
      .post<AddCompraMenorResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/AddCompraMenor',data);
  }

  updateMinorPurchase(data:UpdateMinorPurchaseRequest) {
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'SolicitudCompraMenor/UpdateCompraMenor',data);
  }


  deleteMinorPurchase(id:number){
    const data = {solicitudCompraMenorId : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'SolicitudCompraMenor/DeleteCompraMenor',options);
  }


  getPdfSmallCashReceipt(id:number) {
    return this.httpClient
      .post<PDFComprobandeCajaMenudaResponse>(environment.apiUrlTreasury + 'GetPDF/PDFComprobanteCajaMenuda',
      {
        solicitudCompraMenorId: id
      }
    );
  }


  addPurchase(data:AddPurchaseRequest) {
    return this.httpClient
      .post<AddPurchaseResponse>(environment.apiUrlTreasury + 'ConfirmaCompra/AddCompra',data);
  }


  getConfirmPurchaseAll() {
    return this.httpClient
      .get<GetPurchaseResponse>(environment.apiUrlTreasury + 'ConfirmaCompra/GetConfirmaCompra');
  }

  getConfirmPurchaseById(id:number) {
    return this.httpClient
      .get<GetPurchaseResponse>(environment.apiUrlTreasury + 'GetConfirmaCompra?SolicituCompraMenorId=' + id);
  }


  deleteConfirmPurchase(id:number){
    const data = {confirmaCompraId : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'ConfirmaCompra/DeleteConfirma',options);
  }


  updateConfirmPurchase(data:any) {
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'ConfirmaCompra/UpdateConfirma',data);
  }


  addHeadCustodiaCajaRequest(data:AddHeadCustodiaCajaRequest) {
    return this.httpClient
      .post<AddHeadCustodiaCajaResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/AddHeadCustodioCaja',data);
  }




}
