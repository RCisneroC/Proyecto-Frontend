import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
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
      .get<Reason[]>(this.API_URL)
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
      .get<Reason[]>(this.API_URL);
     
  }
  addReason(reason: Reason): void {
    this.dialogData = reason;

    this.httpClient.post(environment.apiUrl+'Register', reason)
      .subscribe({
        next: () => {
          this.dialogData = reason;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateReason(reason: Reason): void {
    this.dialogData = reason;

    this.httpClient.put(environment.apiUrl+'UpdateUser', reason)
        .subscribe({
          next: () => {
            this.dialogData = reason;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
  
}