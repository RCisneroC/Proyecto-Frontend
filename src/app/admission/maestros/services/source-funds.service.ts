import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
      .get<SourceFunds[]>(environment.apiUrlSchedule+'ActivityFundsSource/GetAll')
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
      .get<SourceFunds[]>(this.API_URL);
  }

  addSourceFunds(sourceFunds: SourceFunds): void {
    this.httpClient.post<ResponseGenerica>(environment.apiUrl+'ActivityFundsSource/Create', sourceFunds)
      .subscribe({
        next: (res:ResponseGenerica) => {
        },
        error: (error: HttpErrorResponse) => {
        },
      });
  }

  updateSourceFunds(sourceFunds: SourceFunds): void {
    this.httpClient.put<ResponseGenerica>(environment.apiUrl+'ActivityFundsSource/Update', sourceFunds)
        .subscribe({
          next: (res:ResponseGenerica) => {
          },
          error: (error: HttpErrorResponse) => {
          },
        });
  }

  // DeleteSourceFunds(sourceFunds: SourceFunds): void {
  // this.httpClient.delete<ResponseGenerica>(environment.apiUrl+'ActivityFundsSource/Delete', sourceFunds)
  //     .subscribe({
  //       next: (res:ResponseGenerica) => {
  //       },
  //       error: (error: HttpErrorResponse) => {
  //       },
  //     });
  // }

}