import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {RequestEstateDetail, RequestEstateListResponse} from "../Models/RequestEstate";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";

@Injectable({
  providedIn: 'root'
})
export class RequestEstateDetailsService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: RequestEstateDetail;
  dataChange: BehaviorSubject<RequestEstateDetail[]> = new BehaviorSubject<RequestEstateDetail[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: RequestEstateDetail;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): RequestEstateDetail[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getRequestEstateDetails(requestID: string): void {
    this.subs.sink = this.httpClient
      .get<RequestEstateListResponse>(environment.apiUrlTreasury + 'ServiceRequest/GetRequest?RequestId='+ requestID)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.dataResult[0].detailRequests);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  add(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
  }

  update(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
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

  DeleteRooms(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Room/Delete', options);
  }
  init_Model() {
    this._Model = {
      detailId: 0,
      requestForGoodsAndServicesId: 0,
      lineNumber: 0,
      quantity: 0,
      unit: "",
      code: 0,
      price: 0,
      quantityToSupply: 0,
      goodsOrServiceDetail: ""
    }
  }
}



