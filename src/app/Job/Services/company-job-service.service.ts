import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { CompanyJobs, LogoCompany } from '../Interfaces/Company-jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyJobServiceService extends UnsubscribeOnDestroyAdapter {


  public _CompanyJobs: CompanyJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    contactPersonFullName: '',
    email: '',
    logo: '',
    phone: ''
  }

  isTblLoading = true;
  dataChange: BehaviorSubject<CompanyJobs[]> = new BehaviorSubject<CompanyJobs[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: CompanyJobs;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): CompanyJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCompanyJobs(): void {
    this.subs.sink = this.httpClient
      .get<CompanyJobs[]>(environment.apiJobs + 'Company/GetAll')
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
  getAllCompanyJobs2() {
    return this.httpClient
      .get<CompanyJobs[]>(environment.apiJobs + 'Company/GetAll');
  }

  getAllCompanyJobsFiltro(id: any) {
    return this.httpClient
      .get<CompanyJobs[]>(environment.apiJobs + 'Company/GetAll?StatusId=' + id);
  }

  addCompanyJobs(CompanyJobs: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'Company/Create', CompanyJobs);
  }

  updateCompanyJobs(CompanyJobs: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'Company/Update', CompanyJobs);
  }

  getByIdLogo(id: any) {
    return this.httpClient
      .get<LogoCompany>(environment.apiJobs + 'Company/GetBy?Id=' + id);
  }


  DeleteCompanyJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'Company/Delete', options);
  }

  init_CompanyJobs() {
    this._CompanyJobs = {
      statusId: 0,
      id: 0,
      name: '',
      logo: '',
      description: '',
      email: '',
      phone: '',
      contactPersonFullName: '',
    }
  }
}
