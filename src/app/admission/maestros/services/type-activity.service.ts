import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TypeActivity } from 'app/admission/models/type-activity';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeActivityService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<TypeActivity[]> = new BehaviorSubject<
  TypeActivity[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: TypeActivity;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): TypeActivity[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTypeActivity(): void {
    this.subs.sink = this.httpClient
      .get<TypeActivity[]>(this.API_URL)
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
  getAllTypeActivity2() {
   return this.httpClient
      .get<TypeActivity[]>(this.API_URL);
     
  }
  addModality(typeActivity: TypeActivity): void {
    this.dialogData = typeActivity;

    this.httpClient.post(environment.apiUrl+'Register', typeActivity)
      .subscribe({
        next: () => {
          this.dialogData = typeActivity;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateModality(typeActivity: TypeActivity): void {
    this.dialogData = typeActivity;

    this.httpClient.put(environment.apiUrl+'UpdateUser', typeActivity)
        .subscribe({
          next: () => {
            this.dialogData = typeActivity;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
}
