import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Status } from '../Models/Status';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Status!: Status;
  dataChange: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Status;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Status[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStatus(): void {
    this.subs.sink = this.httpClient
      .get<Status[]>(environment.apiEF + 'Status/GetAll')
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
  getAllStatus2() {
    return this.httpClient
      .get<Status[]>(environment.apiEF + 'Status/GetAll');
  }

  getAllStatusFiltro(id: any) {
    return this.httpClient
      .get<Status[]>(environment.apiEF + 'Status/GetAll?StatusId=' + id);
  }

  addStatus(Status: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Status/Create', Status);
  }

  updateStatus(Status: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'Status/Update', Status);
  }

  DeleteStatus(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Status/Delete', options);
  }
  init_Status() {
    this._Status = {
      description: '',
      id: 0,
      name: '',
      statusId:0
    }
  }
}
