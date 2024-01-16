import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Teacher } from '../models/Teacher';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Teacher[]> = new BehaviorSubject<
  Teacher[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Teacher;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teacher[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTeachers(): void {
    this.subs.sink = this.httpClient
      .get<Teacher[]>(environment.apiUrlTeacher+'GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
          console.log("exito")
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  

  addTeacher(teacher: Teacher) {
    this.dialogData = teacher;

    return this.httpClient.post(environment.apiUrlTeacher + 'Register', teacher);
  }
  updateTeacher(teacher: Teacher) {
    this.dialogData = teacher;

    return this.httpClient.put(environment.apiUrlTeacher + 'UpdateUser', teacher);
  }
}
