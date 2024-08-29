import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

import { BehaviorSubject } from 'rxjs';
import { an } from "@fullcalendar/core/internal-common";

@Injectable({
  providedIn: 'root'
})
export class UserService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<
    User[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: User;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUsers(): void {
    this.subs.sink = this.httpClient
      .get<User[]>(environment.apiUrl + 'GetAllUsers')
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

  isStudentFilter(element: User, index: any, array: any) {
    return (element.roles[0] === "Estudiante");
  }
  getAllEstudents(): void {
    this.subs.sink = this.httpClient
      .get<User[]>(environment.apiUrl + 'GetAllUsers')
      .subscribe({
        next: (data) => {
          const dataFiltered = data.filter(this.isStudentFilter);
          this.isTblLoading = false;
          this.dataChange.next(dataFiltered);
          console.log("exito")
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getAllUsers2() {
    return this.httpClient
      .get<User[]>(environment.apiUrl + 'GetAllUsers');
  }

  getUserRoles(role: any) {
    return this.httpClient
      .get<User[]>(environment.apiUrl + 'GetUsersBy?RoleId=' + role);
  }


  getAllUsersRol() {
    return this.httpClient
      .get<User[]>(environment.apiUrl + 'GetAllUsers');
  }

  addUser(user: User) {
    this.dialogData = user;

    return this.httpClient.post(environment.apiUrl + 'Register', user);
  }
  updateUser(user: User) {
    this.dialogData = user;

    return this.httpClient.put(environment.apiUrl + 'UpdateUser', user);
  }
  
  
  updateCategoriaEstudiante(user: any) {
  

    return this.httpClient.put(environment.apiUrl + 'UpdateUserCategories', user);
  }

  changePassword(user: User) {


    return this.httpClient.put(environment.apiUrl + 'ChangePassword', user);
  }

}
