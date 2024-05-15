import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";
import {Expenses, ExpensesResponse} from "../Models/Expenses";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: Expenses;
  dataChange: BehaviorSubject<Expenses[]> = new BehaviorSubject<Expenses[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Expenses;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Expenses[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getExpenses(): void {
    this.subs.sink = this.httpClient
      .get<ExpensesResponse>(environment.apiUrlTreasury + 'Gastos/GetGastos')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.gastos);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  add(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'SolicitudAprobacion/AddAprobacion', Data);
  }

  update(Data: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'SolicitudAprobacion/UpdateAprobacion', Data);
  }

  solicitudPDF(id: string) {
    return this.httpClient.get<any>(environment.apiUrlTreasury + "GetPDF/PDFRequest?ResquesId=" + id)
  }

  loadEdulevel() {
    return this.httpClient.get<ResponseGenerica>(environment.apiUrlTeacher + 'GetEducationLvel');
  }

  loadSolicitudes() {
    return this.httpClient.get<any>(environment.apiUrlTreasury + 'ServiceRequest/GetRequest');
  }

  loadPeriodContable() {
    return this.httpClient.get<any>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');
  }

  Delete(Id: number) {
    let data = {
      aprobacionId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'SolicitudAprobacion/DeleteAprobacion', options);
  }
  init_Model() {
    this._Model = {
      gastoId: 0,
      codigoGasto: 0,
      descripcion: "",
      categoriaId: 0,
      statusId: 0,
      statusDescripcion: "",
      createdDate: new Date,
      createBy: "",
      tipoGasto: "",
      monto: 0
    }
  }
}



