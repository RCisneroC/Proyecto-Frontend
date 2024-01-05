import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { LocationActivity } from 'app/admission/models/LocationActivity';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityLocationService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<LocationActivity[]> = new BehaviorSubject<
  LocationActivity[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: LocationActivity;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): LocationActivity[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLocationActivity(): void {
    this.subs.sink = this.httpClient
      .get<LocationActivity[]>(environment.apiUrlSchedule+'ActivityLocation/GetAll')
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
  getAllLocationActivity2() {
   return this.httpClient
      .get<LocationActivity[]>(environment.apiUrlSchedule+'ActivityLocation/GetAll');
  }

  addLocationActivity(locationActivity: LocationActivity): void {
    this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'ActivityLocation/Create', locationActivity)
      .subscribe({
        next: (res:ResponseGenerica) => {
        },
        error: (error: HttpErrorResponse) => {
        },
      });
  }

  updateLocationActivity(locationActivity: LocationActivity): void {
    this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule+'ActivityLocation/Update', locationActivity)
        .subscribe({
          next: (res:ResponseGenerica) => {
          },
          error: (error: HttpErrorResponse) => {
          },
        });
  }

  DeleteLocationActivity(Id: number): void {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
  this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule+'ActivityLocation/Delete',options)
      .subscribe({
        next: (res:ResponseGenerica) => {
        },
        error: (error: HttpErrorResponse) => {
        },
      });
  }

}
