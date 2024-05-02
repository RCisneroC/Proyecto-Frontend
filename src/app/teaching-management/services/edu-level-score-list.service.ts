import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import { TeacherPointsEduLevel} from "../models/TeacherPoints";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";

@Injectable({
  providedIn: 'root'
})
export class EduLevelScoreListService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: TeacherPointsEduLevel;
  dataChange: BehaviorSubject<TeacherPointsEduLevel[]> = new BehaviorSubject<TeacherPointsEduLevel[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TeacherPointsEduLevel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): TeacherPointsEduLevel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPointsCat(): void {
    this.subs.sink = this.httpClient
      .get<TeacherPointsEduLevel[]>(environment.apiUrlTeacher + 'GetEducationLvel')
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

  add(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
  }

  update(Data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTeacher + 'SaveUpdatePointTeacher', Data);
  }

  loadEdulevel() {
    return this.httpClient.get<ResponseGenerica>(environment.apiUrlTeacher + 'GetEducationLvel');
  }

  DeleteRooms(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Room/Delete', options);
  }
  init_Model() {
    this._Model = {
      id:0,
      name: '',
      points: 0,
      estatus: true,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: new Date,
      lastModifiedBy: ''
    }
  }
}

