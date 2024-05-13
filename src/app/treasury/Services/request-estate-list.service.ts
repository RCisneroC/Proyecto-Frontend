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
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
  }

  update(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
  }

  loadEdulevel() {
    return this.httpClient.get<ResponseGenerica>(environment.apiUrlTeacher + 'GetEducationLvel');
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
      requestId: 0,
      unitId: "",
      telephone: "",
      requesterNumber: 0,
      daA_Number: "",
      revisionDate: new Date,
      revisionNumber: 0,
      goodsOrService: true,
      service: true,
      works: true,
      requesterSignature: true,
      approvalSignature: true,
      createdDate: new Date,
      createdBy: "",
      statusId: 0,
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


