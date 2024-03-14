import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Reason } from 'app/admission/models/reason';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Reason[]> = new BehaviorSubject<
    Reason[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Reason;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Reason[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllReason(): void {
    this.subs.sink = this.httpClient
      .get<Reason[]>(environment.apiUrlSchedule + 'ActivityReason/GetAll')
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
  getAllReason2() {
    return this.httpClient
      .get<Reason[]>(environment.apiUrlSchedule + 'ActivityReason/GetAll');
  }

  getAllReason2Filtro(id: any) {
    return this.httpClient
      .get<Reason[]>(environment.apiUrlSchedule + 'ActivityReason/GetAll?StatusId=' + id);
  }

  addReason(reason: Reason) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityReason/Create', reason);
  }

  updateReason(reason: Reason) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityReason/Update', reason);
  }

  DeleteReason(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityReason/Delete', options);
  }
}