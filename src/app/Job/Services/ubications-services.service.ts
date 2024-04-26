import { Injectable } from '@angular/core';
import { UbicationsJobs } from '../Interfaces/Company-jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class UbicationsServicesService extends UnsubscribeOnDestroyAdapter {

  public _UbicationsJobs: UbicationsJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    provinceId: 0,
    companyId: 0,
  }
  dialogData!: UbicationsJobs;
  isTblLoading = true;
  dataChange: BehaviorSubject<UbicationsJobs[]> = new BehaviorSubject<
    UbicationsJobs[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): UbicationsJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllUbicationsJobs(id: string): void {

    this.subs.sink = this.httpClient
      .get<UbicationsJobs[]>(environment.apiJobs + 'CompanyAddress/GetBy?CompanyId=' + id)
      .subscribe({
        next: (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
        },
      });
  }
  getAllUbicationsJobs2() {
    return this.httpClient
      .get<UbicationsJobs[]>(environment.apiJobs + 'CompanyAddress/GetAll');
  }
  getUbications(id: any) {
    return this.httpClient
      .get<UbicationsJobs[]>(environment.apiJobs + 'CompanyAddress/GetBy?CompanyId=' + id);
  }

  getAllJobs(id: any) {
    return this.httpClient
      .get<UbicationsJobs[]>(environment.apiJobs + 'CompanyAddress/GetAll?StatusId=' + id);
  }

  addUbicationsJobs(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'CompanyAddress/Create', cooperating);
  }

  updateUbicationsJobs(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'CompanyAddress/Update', cooperating);
  }


  DeleteUbicationsJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'CompanyAddress/Delete', options);
  }

  init_UbicationsJobs() {
    this._UbicationsJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      provinceId: 0,
      companyId: 0,
    }
  }
}
