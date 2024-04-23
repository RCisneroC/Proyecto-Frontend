import { Injectable } from '@angular/core';
import { StatusJobs } from '../Interfaces/Status-jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class StatusJobServiceService extends UnsubscribeOnDestroyAdapter {

  public _StatusJobs: StatusJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  }
  dialogData!: StatusJobs;
  isTblLoading = true;
  dataChange: BehaviorSubject<StatusJobs[]> = new BehaviorSubject<
    StatusJobs[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): StatusJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllStatusJobs(): void {
    this.subs.sink = this.httpClient
      .get<StatusJobs[]>(environment.apiJobs + 'Status/GetAll')
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
  getAllCooperating2() {
    return this.httpClient
      .get<StatusJobs[]>(environment.apiJobs + 'Status/GetAll');
  }

  getAllProvinciaActivity(id: any) {
    return this.httpClient
      .get<StatusJobs[]>(environment.apiJobs + 'Status/GetAll?StatusId=' + id);
  }

  addStatusJobs(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'Status/Create', cooperating);
  }

  updateStatusJobs(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'Status/Update', cooperating);
  }


  DeleteStatusJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'Status/Delete', options);
  }

  init_StatusJobs() {
    this._StatusJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
  }
}
