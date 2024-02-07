import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { RequestVarious } from '../Models/RequestVarious';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Modality } from 'app/admission/models/modality';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';
import { User } from '@core';

@Injectable({
  providedIn: 'root'
})
export class RequestServicesService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/requestJson.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<RequestVarious[]> = new BehaviorSubject<
    RequestVarious[]
  >([]);
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
              console.log('====================================');
              console.log(this.dataLStorage);
              console.log('====================================');
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
