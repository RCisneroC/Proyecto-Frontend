import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
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
      .get<SourceFunds[]>(this.API_URL)
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
    this.dialogData = sourceFunds;

    this.httpClient.post(environment.apiUrl+'Register', sourceFunds)
      .subscribe({
        next: () => {
          this.dialogData = sourceFunds;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateSourceFunds(sourceFunds: SourceFunds): void {
    this.dialogData = sourceFunds;

    this.httpClient.put(environment.apiUrl+'UpdateUser', sourceFunds)
        .subscribe({
          next: () => {
            this.dialogData = sourceFunds;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
  
}