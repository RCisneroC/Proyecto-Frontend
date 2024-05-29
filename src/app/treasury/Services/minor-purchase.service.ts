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
import { ResponseGetConfirmaCustodioCaja } from '../Models/getConfirmaCustodioCaja';

@Injectable({
  providedIn: 'root'
})
export class MinorPurchaseService {

  constructor(private httpClient: HttpClient) { }

  getMinorPurchaseAll() {
    return this.httpClient
      .get<GetAprobacionResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/GetCompraMenor?CompraMenorId=0');
  }

  getMinorPurchaseById(id: number) {
    return this.httpClient
      .get<GetAprobacionResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/GetCompraMenor?CompraMenorId=' + id);
  }

  addMinorPurchase(data: AddCompraMenorRequest) {
    return this.httpClient
      .post<AddCompraMenorResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/AddCompraMenor', data);
  }

  updateMinorPurchase(data: UpdateMinorPurchaseRequest) {
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'SolicitudCompraMenor/UpdateCompraMenor', data);
  }


  deleteMinorPurchase(id: number) {
    const data = { solicitudCompraMenorId: id };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'SolicitudCompraMenor/DeleteCompraMenor', options);
  }


  getPdfSmallCashReceipt(id: number) {
    return this.httpClient
      .post<PDFComprobandeCajaMenudaResponse>(environment.apiUrlTreasury + 'GetPDF/PDFComprobanteCajaMenuda',
        {
          solicitudCompraMenorId: id
        }
      );
  }


  addPurchase(data: AddPurchaseRequest) {
    // const url = "http://localhost:5032/api/v1/";
    //environment.apiUrlTreasury
    return this.httpClient
      .post<AddPurchaseResponse>(environment.apiUrlTreasury + 'ConfirmaCompra/AddConfirmaCompra', data);
  }


  getConfirmPurchaseAll() {
    return this.httpClient
      .get<GetPurchaseResponse>(environment.apiUrlTreasury + 'ConfirmaCompra/GetConfirmaCompra');
  }

  getConfirmPurchaseById(id: number) {
    // const url = "http://localhost:5032/api/v1/";
    //environment.apiUrlTreasury
    return this.httpClient
      .get<GetPurchaseResponse>(environment.apiUrlTreasury + 'ConfirmaCompra/GetConfirmaCompra?SolicituCompraMenorId=' + id);
  }


  GetConfirmCustodioCaja(id: number) {
    // const url = "http://localhost:5032/api/v1/";
    //environment.apiUrlTreasury
    return this.httpClient
      .get<ResponseGetConfirmaCustodioCaja>(environment.apiUrlTreasury + 'ConfirmaCompra/GetConfirmacionCustodioCaja?SolicituCompraMenorId=' + id);
  }


 


  deleteConfirmPurchase(
    _solicitudCompraId: number,
    _confirmaId: number,
    _deletePurchaseConfirm: number) {

    const data = {
      confirmId: _confirmaId,
      deletePurchaseConfirm: _deletePurchaseConfirm,
      solicitudCompraMenorId: _solicitudCompraId
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    //environment.apiUrlTreasury
    //const url = "http://localhost:5032/api/v1/";
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'SolicitudCompraMenor/DeleteCompraMenor', options);
  }

  deleteConfirmPurchaseCustodio(
    _confirmaCompraId: number) {

    const data = {
      confirmaCompraId: _confirmaCompraId
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    console.log(options);
    
    //environment.apiUrlTreasury
    //const url = "http://localhost:5032/api/v1/";
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'ConfirmaCompra/DeleteConfirmaCompra', options);
  }



  updateConfirmPurchase(data: any) {
    return this.httpClient
      .put<Result>(environment.apiUrlTreasury + 'ConfirmaCompra/UpdateConfirmaCompra', data);
  }

  ConfirmCompraValid(nbr: any, IsConfirmacion=0) {
    var data = {
      SolicituCompraMenorId:nbr,
      ConfirmacionIs:IsConfirmacion
    }
    console.log(data);
    
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'ConfirmaCompra/ConfirmCompraValid', data);
  }

  RembolsarSaldo(nbr: any) {
    var data = {
      SolicitudCompraId:nbr,
      rembolsar:2
    }
    console.log(data);
    
    return this.httpClient
      .post<Result>(environment.apiUrlTreasury + 'GetPDF/PDFReembolso', data);
  }


  addHeadCustodiaCajaRequest(data: AddHeadCustodiaCajaRequest) {
    return this.httpClient
      .post<AddHeadCustodiaCajaResponse>(environment.apiUrlTreasury + 'SolicitudCompraMenor/AddHeadCustodioCaja', data);
  }




}
