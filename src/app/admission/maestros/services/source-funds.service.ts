import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { SourceFunds } from 'app/admission/models/source -funds';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceFundsService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<SourceFunds[]> = new BehaviorSubject<
    SourceFunds[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: SourceFunds;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): SourceFunds[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSourceFunds(): void {
    this.subs.sink = this.httpClient
      .get<SourceFunds[]>(environment.apiUrlSchedule + 'ActivityFundsSource/GetAll')
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
  getAllSourceFunds2() {
    return this.httpClient
      .get<SourceFunds[]>(environment.apiUrlSchedule + 'ActivityFundsSource/GetAll');
  }

  getAllSourceFunds2Filter(id: any) {
    return this.httpClient
      .get<SourceFunds[]>(environment.apiUrlSchedule + 'ActivityFundsSource/GetAll?StatusId=' + id);
  }


  addSourceFunds(sourceFunds: SourceFunds) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityFundsSource/Create', sourceFunds);
  }

  updateSourceFunds(sourceFunds: SourceFunds) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityFundsSource/Update', sourceFunds);
  }

  DeleteSourceFunds(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityFundsSource/Delete', options);
  }

}