import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { StatusPrimary } from 'app/admission/models/StatusPrimary';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<StatusPrimary[]> = new BehaviorSubject<StatusPrimary[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: StatusPrimary;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): StatusPrimary[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStatusPrimary(): void {
    this.subs.sink = this.httpClient
      .get<StatusPrimary[]>(environment.apiUrlSchedule+'Status/GetAll')
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
  getAllSuppli2() {
   return this.httpClient
      .get<StatusPrimary[]>(environment.apiUrlSchedule+'Status/GetAll');
  }

  addStatusPrimary(StatusPrimary: StatusPrimary) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'Status/Create', StatusPrimary);
  }

  updateStatusPrimary(StatusPrimary: StatusPrimary) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'Status/Update', StatusPrimary);
  }

  DeleteStatusPrimary(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
  return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule+'Status/Delete',options);
  }

}
