import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportsService  extends UnsubscribeOnDestroyAdapter {


  constructor(private httpClient: HttpClient) {
    super();
  }
  
  
  getPeriodo() {
    return this.httpClient
        .get<any>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');
 
  }
  getPDFReenbolso(data:any) {
   return this.httpClient
       .post<any>(environment.apiUrlTreasury + 'GetPDF/PDFReembolso', data);

 }
 
 getPDFRecapitulacionCaja(data:any) {
  return this.httpClient
      .post<any>(environment.apiUrlTreasury + 'GetPDF/PDFRecapitulacionCaja', data);

}

 
getPDFInformeGastos(data:any) {
  return this.httpClient
      .post<any>(environment.apiUrlTreasury + 'GetPDF/PDFInformeGastos', data);

}

getPDFInformeIngreso(data:any) {
  return this.httpClient
      .post<any>(environment.apiUrlTreasury + 'GetPDF/PDFInformeIngreso', data);

}


  
}
