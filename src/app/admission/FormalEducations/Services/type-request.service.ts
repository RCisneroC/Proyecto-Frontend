import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { TypeRequest } from '../Models/TypeRequest';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class TypeRequestService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public typeRequest!: TypeRequest;
  dataChange: BehaviorSubject<TypeRequest[]> = new BehaviorSubject<TypeRequest[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TypeRequest;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): TypeRequest[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTypeRequest(): void {
    this.subs.sink = this.httpClient
      .get<TypeRequest[]>(environment.apiEF + 'RequestTypeApprovalRole/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }


  addTypeRequest(typeRequest: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'RequestTypeApprovalRole/Create', typeRequest);
  }

  updateTypeRequest(typeRequest: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'RequestTypeApprovalRole/Update', typeRequest);
  }

  DeleteTypeRequest(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'RequestTypeApprovalRole/Delete', options);
  }

}
