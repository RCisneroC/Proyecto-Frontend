import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {
  RequestVarious,
  RequestVariousItem,
  RequestVariousType,
  SearchRequestVariousResponse
} from '../Models/RequestVarious';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Modality } from 'app/admission/models/modality';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';
import { User } from '@core';
import {CareerResponse} from "../../enrollment/models/Career";
import {environment} from "../../../environments/environment.development";
import {el} from "@fullcalendar/core/internal-common";

@Injectable({
  providedIn: 'root'
})
export class RequestServicesService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/requestJson.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<RequestVarious[]> = new BehaviorSubject<
    RequestVarious[]
  >([]);
  dataChangeRequestVarious: BehaviorSubject<RequestVariousItem[]> = new BehaviorSubject<
    RequestVariousItem[]
  >([]);
  public dataLStoragerequestVarious: RequestVariousItem[] = [];
  public dataLStorage: RequestVarious[] = [];
  public UserData!: User;
  public userType: string = '';
  // Temporarily stores data from dialogs
  dialogData!: RequestVarious;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): RequestVarious[] {
    return this.dataChange.value;
  }

  get dataRequestVarious(): RequestVariousItem[] {
    return this.dataChangeRequestVarious.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRequestVarious(): void {
    this.subs.sink = this.httpClient
      .get<RequestVarious[]>(this.API_URL)
      .subscribe({
        next: (data) => {
          let user = localStorage.getItem('currentUser') || '';

          if (user != '') {
            this.UserData = JSON.parse(user);
            this.userType = this.getRoleFromToken(this.UserData.token);
            console.log(this.userType);

          }

          let dataL = localStorage.getItem('solicitudes') || '';
          if (dataL != '') {
            if (this.userType == 'Administrador') {
              this.isTblLoading = false;
              this.dataChange.next(JSON.parse(dataL));
            } else {
              this.dataLStorage = JSON.parse(dataL);
              this.dataLStorage = this.dataLStorage.filter((sidebarItem) => sidebarItem.idSolicitante == this.UserData.id);
              this.isTblLoading = false;
              this.dataChange.next(this.dataLStorage);
            }
          } else {
            this.isTblLoading = false;
            this.dataChange.next([]);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getAllRequestVariousEIRA(): void {
    this.subs.sink = this.httpClient
      .post<SearchRequestVariousResponse>(environment.apiEira + 'SearchRequestVarious', {})
      .subscribe({
        next: (res) => {
          let user = localStorage.getItem('currentUser') || '';

          if (user != '') {
            this.UserData = JSON.parse(user);
            this.userType = this.getRoleFromToken(this.UserData.token);
            console.log(this.userType);
          }
          let dataL = res.data;
          if(dataL){
            if (this.userType == 'Administrador') {
              this.isTblLoading = false;
              this.dataChangeRequestVarious.next(dataL);
            }else {
              this.dataLStoragerequestVarious = dataL;
              this.dataLStoragerequestVarious = this.dataLStoragerequestVarious.filter((sidebarItem) => sidebarItem.userRequest == this.UserData.id);
              this.isTblLoading = false;
              this.dataChangeRequestVarious.next(this.dataLStoragerequestVarious);
            }
          } else {
            this.isTblLoading = false;
            this.dataChangeRequestVarious.next([]);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  CreateGeneralRequestVarious(CreateGeneralRequestVariousData: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "CreateGeneralRequestVarious", CreateGeneralRequestVariousData);
  }

  EFCreateWithdrawalAndReentryRequest(EFCreateWithdrawalAndReentryRequestData: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "EFCreateWithdrawalAndReentryRequest", EFCreateWithdrawalAndReentryRequestData);
  }

  ECCreateWithdrawalAndReentryRequest(ECCreateWithdrawalAndReentryRequestData: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "ECCreateWithdrawalAndReentryRequest", ECCreateWithdrawalAndReentryRequestData);
  }

  DownloadRequestVariousResolution(DownloadRequestVariousResolutionData: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.post<any>(url + "DownloadRequestVariousResolution", DownloadRequestVariousResolutionData);
  }

  UpdateRequestVarious(UpdateRequestVariousData: any) {

    const url = `${environment.apiEira}`;
    return this.httpClient.put<any>(url + "UpdateRequestVarious", UpdateRequestVariousData);
  }
  DeleteRequestVariousMethod(DeleteRequestVariousData: any) {
    let data = {
      id: DeleteRequestVariousData.id,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    const url = `${environment.apiEira}`;
    return this.httpClient.delete<any>(url + "DeleteRequestVarious", options);
  }

  GetAllRequestVariousType() {

    const url = `${environment.apiEira}`;
    return this.httpClient.get<any>(url + "GetAllRequestVariousType");
  }

  getAllRequestVarious2() {
    return this.httpClient
      .get<Modality[]>(this.API_URL);

  }
  addRequestVarious(modality: RequestVarious) {
    return this.httpClient.post<ResponseGenerica>(this.API_URL, modality);
  }

  updateRequestVarious(modality: RequestVarious) {
    return this.httpClient.put<ResponseGenerica>(this.API_URL, modality);
  }

  DeleteRequestVarious(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(this.API_URL, options);
  }

  public getRoleFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  public decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    return JSON.parse(decodedPayload);
  }


}
