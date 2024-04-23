import { Injectable } from '@angular/core';
import { TypeContractJobs } from '../Interfaces/Type-contract-jobs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class TypeContractJobServiceService extends UnsubscribeOnDestroyAdapter {

  public _TypeContractJobs: TypeContractJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  }
  dialogData!: TypeContractJobs;
  isTblLoading = true;
  dataChange: BehaviorSubject<TypeContractJobs[]> = new BehaviorSubject<
    TypeContractJobs[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): TypeContractJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllTypeContractJobs(): void {
    this.subs.sink = this.httpClient
      .get<TypeContractJobs[]>(environment.apiJobs + 'ContractType/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
        },
      });
  }
  getAllTypeContractJobs2() {
    return this.httpClient
      .get<TypeContractJobs[]>(environment.apiJobs + 'ContractType/GetAll');
  }

  getAllProvinciaActivity(id: any) {
    return this.httpClient
      .get<TypeContractJobs[]>(environment.apiJobs + 'ContractType/GetAll?StatusId=' + id);
  }

  addTypeContractJobs(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'ContractType/Create', cooperating);
  }

  updateTypeContractJobs(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'ContractType/Update', cooperating);
  }


  DeleteTypeContractJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'ContractType/Delete', options);
  }

  init_TypeContractJobs() {
    this._TypeContractJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
  }
}
