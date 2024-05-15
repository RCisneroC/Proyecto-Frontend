import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";
import {AcceptanceRequest, AcceptanceRequestResponse} from "../Models/AcceptanceRequest";

@Injectable({
  providedIn: 'root'
})
export class AcceptanceRequestService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: AcceptanceRequest;
  dataChange: BehaviorSubject<AcceptanceRequest[]> = new BehaviorSubject<AcceptanceRequest[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: AcceptanceRequest;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AcceptanceRequest[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAcceptanceRequest(): void {
    this.subs.sink = this.httpClient
      .get<AcceptanceRequestResponse>(environment.apiUrlTreasury + 'SolicitudAprobacion/GetAprobacion')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.getsolicitudAprobacions);
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
      detalleId: 0,
      solicitudId: 0,
      firmaSolicitante: true,
      firmaAprobacion: true,
      createdDate: new Date,
      createdBy: "",
      statusId: 0
    }
  }
}


