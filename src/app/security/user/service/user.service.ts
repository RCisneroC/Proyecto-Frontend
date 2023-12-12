import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/dataUser.json';
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
  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<User[]>(this.API_URL)
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
  addAdvanceTable(user: User): void {
    this.dialogData = user;

    // this.httpClient.post(this.API_URL, advanceTable)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = advanceTable;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateAdvanceTable(user: User): void {
    this.dialogData = user;

    // this.httpClient.put(this.API_URL + advanceTable.id, advanceTable)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = advanceTable;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAdvanceTable(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
