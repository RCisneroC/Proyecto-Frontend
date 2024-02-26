import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
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
      .get<TypeActivity[]>(environment.apiUrlSchedule + 'ActivityType/GetAll')
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
  getAllTypeActivity2(id: number) {
    return this.httpClient
      .get<TypeActivity[]>(environment.apiUrlSchedule + 'ActivityType/GetAll?StatusId=' + id);

  }

  addTypeActivity(typeActivity: TypeActivity) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityType/Create', typeActivity);
  }

  updateTypeActivity(typeActivity: TypeActivity) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityType/Update', typeActivity);
  }

  DeleteTypeActivity(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityType/Delete', options);
  }

}
