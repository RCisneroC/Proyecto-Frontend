import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";
import { RequestEstateList, RequestEstateListResponse} from "../Models/RequestEstate";

@Injectable({
  providedIn: 'root'
})
export class RequestEstateListService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: RequestEstateList;
  dataChange: BehaviorSubject<RequestEstateList[]> = new BehaviorSubject<RequestEstateList[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: RequestEstateList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): RequestEstateList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getRequestEstateList(): void {
    this.subs.sink = this.httpClient
      .get<RequestEstateListResponse>(environment.apiUrlTreasury + 'ServiceRequest/GetRequest')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.dataResult);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  add(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'ServiceRequest/AddRequest', Data);
  }

  update(Data: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'ServiceRequest/UpdateRequestService', Data);
  }

  loadEdulevel() {
    return this.httpClient.get<ResponseGenerica>(environment.apiUrlTeacher + 'GetEducationLvel');
  }

  loadcategory() {
    return this.httpClient.get<any>(environment.apiUrlTreasury + 'Categoria/GetCategories');
  }

  loadPeriodContable() {
    return this.httpClient.get<any>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');
  }

  Delete(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'ServiceRequest/DeleterRequestService', options);
  }
  init_Model() {
    this._Model = {
      requestId: 0,
      unitId: "",
      telephone: "",
      numeroUsoSolicitante: 0,
      daa_Number: "",
      revisionDate: new Date,
      numeroRevision: 0,
      bienes: true,
      service: true,
      obras: true,
      firmaSolicitante: true,
      firmaAprobacion: true,
      createdDate: new Date,
      createdBy: "",
      statusId: 0,
      codigoId: 0,
      descripcion: "",
      modifiedBy:"",
      nombreSolicitante: "",
      periodoContableId: 0,
      detailRequests:  [{
        detailId: 0,
        requestForGoodsAndServicesId: 0,
        lineNumber: 0,
        quantity: 0,
        unit: "",
        code: 0,
        price: 0,
        quantityToSupply: 0,
        goodsOrServiceDetail: ""
      }]
    }
  }
}


