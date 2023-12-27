import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

import { BehaviorSubject } from 'rxjs';

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
      .get<User[]>(environment.apiUrl+'GetAllUsers')
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
  addUser(user: User): void {
    this.dialogData = user;

    this.httpClient.post(environment.apiUrl+'Register', user)
      .subscribe({
        next: () => {
          this.dialogData = user;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateUser(user: User): void {
    this.dialogData = user;

    this.httpClient.put(environment.apiUrl+'UpdateUser', user)
        .subscribe({
          next: () => {
            this.dialogData = user;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
  
  changePassword(user: User): void {
    

    this.httpClient.put(environment.apiUrl+'ChangePassword', user)
        .subscribe({
          next: () => {
            this.dialogData = user;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }

}
