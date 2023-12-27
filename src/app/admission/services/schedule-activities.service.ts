import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ScheduleActivity, ScheduleActivityDetail } from '../models/scheduleActivity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleActivitiesService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/cronograma.json';
  private readonly API_URL1 = 'assets/data/activityDetail.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ScheduleActivity[]> = new BehaviorSubject<
  ScheduleActivity[]
  >([]);
  
  dataChange2: BehaviorSubject<ScheduleActivityDetail[]> = new BehaviorSubject<
  ScheduleActivityDetail[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: ScheduleActivity;
  dialogDataDetail!: ScheduleActivityDetail;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ScheduleActivity[] {
    return this.dataChange.value;
  }
  get data2(): ScheduleActivityDetail[] {
    return this.dataChange2.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  
  getDialogDataDetail() {
    return this.dialogDataDetail;
  }
  /** CRUD METHODS */
  getAllSchedule(): void {
    this.subs.sink = this.httpClient
      .get<ScheduleActivity[]>(this.API_URL)
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
  
  getAllActivityDetail(): void {
    this.subs.sink = this.httpClient
      .get<ScheduleActivityDetail[]>(this.API_URL1)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange2.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
  
  addActivityDetail(activityDetail: ScheduleActivityDetail): void {
    this.dialogDataDetail = activityDetail;

    this.httpClient.post(this.API_URL1, activityDetail)
      .subscribe({
        next: () => {
          this.dialogDataDetail  = activityDetail;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateActivityDetail(activityDetail: ScheduleActivityDetail): void {
    this.dialogDataDetail = activityDetail;

    this.httpClient.put(this.API_URL1, activityDetail)
        .subscribe({
          next: () => {
            this.dialogDataDetail = activityDetail;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
  


}
