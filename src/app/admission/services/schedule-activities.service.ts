import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ScheduleActivity, ScheduleActivityDetail } from '../models/scheduleActivity';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.development';
import { CurriculumClass } from '../models/CurriculumClass';

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
  DetailCurriculum!: CurriculumClass;
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
      .get<ScheduleActivity[]>(environment.apiUrlSchedule+'CurriculumDesign/GetAll')
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
  
  getAllActivityDetail(id:number): void {
    this.subs.sink = this.httpClient
      .get<ScheduleActivityDetail[]>(environment.apiUrlSchedule+'CurriculumDesign/GetActivitiesBy?CurriculumDesignId='+id)
      .subscribe({
        next: (data) => {
          console.log(data);
          
          this.isTblLoading = false;
          this.dataChange2.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
  
  getDetailCurriculum(id:any) {
   return this.httpClient
      .get<CurriculumClass>(environment.apiUrlSchedule+'CurriculumDesign/GetBy?Id='+id)
  }
  addActivityDetail(activityDetail: ScheduleActivityDetail) {
    this.dialogDataDetail = activityDetail;

    return this.httpClient.post(environment.apiUrlSchedule + 'CurriculumDesign/CreateActivity', activityDetail);
  }
  
  addScheduleActivity(scheduleActivity: ScheduleActivity) {
    this.dialogData = scheduleActivity;
    return this.httpClient.post(environment.apiUrlSchedule + 'CurriculumDesign/Create', scheduleActivity);
  }
  updateScheduleActivity(scheduleActivity: ScheduleActivity) {
    this.dialogData = scheduleActivity;
    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/Update', scheduleActivity);
  }
  
  updateActivityDetail(activityDetail: ScheduleActivityDetail) {
    this.dialogDataDetail = activityDetail;

    return this.httpClient.put(environment.apiUrlSchedule + 'CurriculumDesign/UpdateActivity', activityDetail);
  }
  init_DetailCurriculum(){
    this.DetailCurriculum = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      year: 0,
      approvedBy: '',
      approvalDate: new Date(),
      activities:[]
    }
  }


}
