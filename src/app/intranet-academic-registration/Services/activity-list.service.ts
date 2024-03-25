import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { TaskActivity } from '../Models/TaskSubject';
import { ApiResponseGenerico } from '../Models/TypeTask';
import { ResponseListActivity } from '../Models/ResponseListTaskActivity';

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
  public _ResponseListActivity: ResponseListActivity = {
    statusCode: 0,
    success: false,
    message: '',
    data: [{
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      taskFiles: [{
        name: '',
        fileType: '',
        content: '',
        subjectTaskId: 0,
        activityTaskId: 0,
      }],
      taskType: {
        id: 0,
        name: ''
      },
      activity: {
        id: 0,
        name: ''
      },
      title: '',
      finalDate: new Date(),
      taskTypeId: 0,
      description: '',
      observation: '',
      activityId: 0,
    }],
    errors: '',
  }
  public _TaskActivity: TaskActivity = {
    title: '',
    finalDate: new Date(),
    taskTypeId: 0,
    description: '',
    subjectId: 0,
    observation: '',
    id: 0,
    MoodleSectionId: 0
  }
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
  SaveTask(formdata: any) {
    return this.httpClient
      .post<ApiResponseGenerico>(environment.apiIntranet + 'CreateActivityTask', formdata);
  }


  GetTaskActivity(data: any) {
    return this.httpClient
      .post<ResponseListActivity>(environment.apiIntranet + 'SearchActivityTask', data);
  }

  UpdateTask(data: any) {
    return this.httpClient
      .put<ApiResponseGenerico>(environment.apiIntranet + 'UpdateActivityTask', data);
  }

  DeleteTask(id: any) {
    let data = {
      id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(environment.apiIntranet + 'DeleteActivityTask', options);
  }

  init_TaskActivity() {
    this._TaskActivity = {
      title: '',
      finalDate: new Date(),
      taskTypeId: 0,
      description: '',
      subjectId: 0,
      observation: '',
      id: 0,
      MoodleSectionId: 0
    }
  }
  init_ResponseListActivity() {
    this._ResponseListActivity = {
      statusCode: 0,
      success: false,
      message: '',
      data: [{
        id: 0,
        createdDate: new Date(),
        createdBy: '',
        lastModifiedDate: '',
        lastModifiedBy: '',
        totalRecords: 0,
        taskFiles: [{
          name: '',
          fileType: '',
          content: '',
          subjectTaskId: 0,
          activityTaskId: 0,
        }],
        taskType: {
          id: 0,
          name: ''
        },
        activity: {
          id: 0,
          name: ''
        },
        title: '',
        finalDate: new Date(),
        taskTypeId: 0,
        description: '',
        observation: '',
        activityId: 0,
      }],
      errors: '',
    }
  }
}

