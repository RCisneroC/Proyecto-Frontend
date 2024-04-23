import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ResponseGenerica} from "../../admission/models/ResponseMessage";
import {TeacherPointsCat} from "../models/TeacherPoints";

@Injectable({
  providedIn: 'root'
})
export class ScoreListService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Model!: TeacherPointsCat;
  dataChange: BehaviorSubject<TeacherPointsCat[]> = new BehaviorSubject<TeacherPointsCat[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TeacherPointsCat;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): TeacherPointsCat[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRoom(): void {
    this.subs.sink = this.httpClient
      .get<TeacherPointsCat[]>(environment.apiUrlTeacher + 'GetTeacherPoint')
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
  getAllRoom2() {
    return this.httpClient
      .get<TeacherPointsCat[]>(environment.apiEF + 'Room/GetAll');
  }

  getAllRoom2Filter(id: any) {
    return this.httpClient
      .get<TeacherPointsCat[]>(environment.apiEF + 'v1/Room/GetAll?StatusId=' + id);
  }


  getAllRoomsFiltro(id: any) {
    return this.httpClient
      .get<TeacherPointsCat>(environment.apiEF + 'Room/GetAll?StatusId=' + id);
  }

  addRooms(TeacherPointsCat: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Room/Create', TeacherPointsCat);
  }

  updateRooms(TeacherPointsCat: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'Room/Update', TeacherPointsCat);
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
      description: "",
      category: "",
      points: 0,
      createdDate: new Date,
      createdBy: "",
      lastModifiedDate: new Date,
      lastModifiedBy: "",
    }
  }
}
