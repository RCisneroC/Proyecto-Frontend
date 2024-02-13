import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityListService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/data-master.json';
  private readonly API_URL1 = 'assets/data/activityDetail.json';
  private readonly API_URL2 = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<GetOneActivity[]> = new BehaviorSubject<
    GetOneActivity[]
  >([]);


  // Temporarily stores data from dialogs
  dialogData!: GetOneActivity;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): GetOneActivity[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllActivity(status: number): void {
    this.subs.sink = this.httpClient
      .get<GetOneActivity[]>(environment.apiUrlSchedule + 'Activity/GetAll?StatusId=' + status)
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
  addActivity(activity: GetOneActivity): void {
    this.dialogData = activity;

    this.httpClient.post(environment.apiUrlSchedule + 'Activity/Create', activity)
      .subscribe({
        next: () => {
          this.dialogData = activity;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateActivity(activity: GetOneActivity): void {
    this.dialogData = activity;

    this.httpClient.put(environment.apiUrlSchedule + 'Activity/Update', activity)
      .subscribe({
        next: () => {
          this.dialogData = activity;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
}

