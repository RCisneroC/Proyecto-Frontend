import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Modality } from 'app/admission/models/modality';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalityService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Modality[]> = new BehaviorSubject<
  Modality[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Modality;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Modality[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllModality(): void {
    this.subs.sink = this.httpClient
      .get<Modality[]>(this.API_URL)
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
  getAllModality2() {
   return this.httpClient
      .get<Modality[]>(this.API_URL);
     
  }
  addModality(modality: Modality): void {
    this.dialogData = modality;

    this.httpClient.post(environment.apiUrl+'Register', modality)
      .subscribe({
        next: () => {
          this.dialogData = modality;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateModality(modality: Modality): void {
    this.dialogData = modality;

    this.httpClient.put(environment.apiUrl+'UpdateUser', modality)
        .subscribe({
          next: () => {
            this.dialogData = modality;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
  


}
