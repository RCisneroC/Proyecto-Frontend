import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ProvinceJobs } from '../Interfaces/Province-jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaJobServiceService extends UnsubscribeOnDestroyAdapter {

  public _ProvinceJobs: ProvinceJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  }
  dialogData!: ProvinceJobs;
  isTblLoading = true;
  dataChange: BehaviorSubject<ProvinceJobs[]> = new BehaviorSubject<
    ProvinceJobs[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): ProvinceJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllProvinceJobs(): void {
    this.subs.sink = this.httpClient
      .get<ProvinceJobs[]>(environment.apiJobs + 'Province/GetAll')
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
      .get<ProvinceJobs[]>(environment.apiJobs + 'Province/GetAll');
  }

  getAllProvinciaActivity(id: any) {
    return this.httpClient
      .get<ProvinceJobs[]>(environment.apiJobs + 'Province/GetAll?StatusId=' + id);
  }

  addProvinciaJobs(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'Province/Create', cooperating);
  }

  updateProvinciaJobs(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'Province/Update', cooperating);
  }


  DeleteProvinciaJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'Province/Delete', options);
  }

  init_ProvinciaJobs() {
    this._ProvinceJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
  }
}
