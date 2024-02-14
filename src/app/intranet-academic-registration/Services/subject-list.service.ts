import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { TaskSubject } from '../Models/TaskSubject';
import { ApiResponseInternal, TypeTaskInternal } from '../Models/TypeTask';
import { ApiResponseInternalData } from '../Models/ResponseListTaskSubject';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class SubjectListService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Subject: Subject = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    number: 0,
    acronym: '',
    code: '',
    numOfCredits: 0,
    numOfHours: 0,
    numOfClasses: 0,
    hasLaboratory: false,
    evaluationCriteria: '',
  }
  public _TypeTaskInternal: TypeTaskInternal = {
    id: 0,
    createdDate: '',
    createdBy: '',
    lastModifiedDate: '',
    lastModifiedBy: '',
    name: '',
  }
  public _ApiResponseInternal: ApiResponseInternal = {
    statusCode: 0,
    success: false,
    message: null,
    data: [
      this._TypeTaskInternal
    ]
  }
  public _ApiResponseInternalData: ApiResponseInternalData = {
    statusCode: 0,
    success: false,
    message: '',
    data: [
      {
        id: 0,
        createdDate: new Date(),
        createdBy: '',
        lastModifiedDate: '',
        lastModifiedBy: '',
        totalRecords: 0,
        taskFiles: [
          {
            name: '',
            fileType: '',
            content: '',
            subjectTaskId: 0,
            activityTaskId: 0,
          }
        ],
        taskType: {
          name: '',
          id: 0,
        },
        subject: {
          id: 0,
          name: '',
        },
        title: '',
        description: '',
        finalDate: new Date(),
        taskTypeId: 0,
        subjectId: 0,
        observation: '',
      }
    ]
  }
  dataChange: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Subject;
  public _TaskSubject: TaskSubject = {
    title: '',
    finalDate: new Date(),
    taskTypeId: 0,
    description: '',
    subjectId: 0,
    observation: '',
  }
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Subject[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSubject(): void {
    this.subs.sink = this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          console.log(data);

          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllSubject2(id: any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll?StatusId=' + id);
  }

  getTypeTask() {
    return this.httpClient
      .get<ApiResponseInternal>(environment.apiIntranet + 'GetAllTaskTypes');
  }

  SaveTask(formdata: any) {
    return this.httpClient
      .post<ApiResponseInternal>(environment.apiIntranet + 'CreateSubjectTask', formdata);
  }


  GetTaskSubject(data: any) {
    return this.httpClient
      .post<ApiResponseInternalData>(environment.apiIntranet + 'SearchSubjectTask', data);
  }

  UpdateTask(data: any) {
    return this.httpClient
      .put<ApiResponseInternalData>(environment.apiIntranet + 'UpdateSubjectTask', data);
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
    return this.httpClient.delete<ResponseGenerica>(environment.apiIntranet + 'DeleteSubjectTask', options);
  }




  init_Subject() {
    this._Subject = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      number: 0,
      acronym: '',
      code: '',
      numOfCredits: 0,
      numOfHours: 0,
      numOfClasses: 0,
      hasLaboratory: false,
      evaluationCriteria: '',
    }
  }

  init_TaskSubject() {
    this._TaskSubject = {
      title: '',
      finalDate: new Date(),
      taskTypeId: 0,
      description: '',
      subjectId: 0,
      observation: '',
    }
  }
  init_typeTask() {
    this._TypeTaskInternal = {
      id: 0,
      createdDate: '',
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      name: '',
    }
    this._ApiResponseInternal = {
      statusCode: 0,
      success: false,
      message: null,
      data: [
        this._TypeTaskInternal
      ]
    }
  }

  init_ApiResponseInternalData() {
    this._ApiResponseInternalData = {
      statusCode: 0,
      success: false,
      message: '',
      data: [
        {
          id: 0,
          createdDate: new Date(),
          createdBy: '',
          lastModifiedDate: '',
          lastModifiedBy: '',
          totalRecords: 0,
          taskFiles: [
            {
              name: '',
              fileType: '',
              content: '',
              subjectTaskId: 0,
              activityTaskId: 0,
            }
          ],
          taskType: {
            name: '',
            id: 0,
          },
          subject: {
            id: 0,
            name: '',
          },
          title: '',
          description: '',
          finalDate: new Date(),
          taskTypeId: 0,
          subjectId: 0,
          observation: '',
        }
      ]
    }
  }
}
