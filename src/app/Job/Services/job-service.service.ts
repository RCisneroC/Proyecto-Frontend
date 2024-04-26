import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Jobs } from '../Interfaces/Jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService extends UnsubscribeOnDestroyAdapter {


  public _Jobs: Jobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    categoryName: '',
    companyId: 0,
    companyName: '',
    companyProvinceId: 0,
    companyProvinceName: '',
    companyAddressId: 0,
    companyAddress: '',
    contractTypeId: 0,
    contractTypeName: '',
    companyContactPersonFullName: '',
    companyEmail: '',
    numOfYearsOfExperienceRequired: ''
  }

  isTblLoading = true;
  dataChange: BehaviorSubject<Jobs[]> = new BehaviorSubject<Jobs[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Jobs;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Jobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllJobs(): void {
    this.subs.sink = this.httpClient
      .get<Jobs[]>(environment.apiJobs + 'Job/GetAll')
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
  getAllJobs2() {
    return this.httpClient
      .get<Jobs[]>(environment.apiJobs + 'Job/GetAll');
  }

  getAllJobsFiltro(id: any) {
    return this.httpClient
      .get<Jobs[]>(environment.apiJobs + 'Job/GetAll?StatusId=' + id);
  }

  addJobs(Jobs: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'Job/Create', Jobs);
  }

  updateJobs(Jobs: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'Job/Update', Jobs);
  }
  Filtros(params: string) {
    return this.httpClient
      .get<Jobs[]>(environment.apiJobs + 'Job/GetBy?' + params);
  }

  DeleteJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'Job/Delete', options);
  }

  I_Jobs() {
    this._Jobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      categoryId: 0,
      categoryName: '',
      companyId: 0,
      companyName: '',
      companyProvinceId: 0,
      companyProvinceName: '',
      companyAddressId: 0,
      companyAddress: '',
      contractTypeId: 0,
      contractTypeName: '',
      companyContactPersonFullName: '',
      companyEmail: '',
      numOfYearsOfExperienceRequired: ''
    }
  }
}
