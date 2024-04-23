import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CategoryJobs } from '../Interfaces/CategoryJobs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryJobServiceService extends UnsubscribeOnDestroyAdapter {

  public _CategoryJobs: CategoryJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  }
  dialogData!: CategoryJobs;
  isTblLoading = true;
  dataChange: BehaviorSubject<CategoryJobs[]> = new BehaviorSubject<
    CategoryJobs[]
  >([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): CategoryJobs[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCategoria(): void {
    this.subs.sink = this.httpClient
      .get<CategoryJobs[]>(environment.apiJobs + 'Category/GetAll')
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
      .get<any[]>(environment.apiJobs + 'Category/GetAll');
  }

  getAllCategoryActivity(id: any) {
    return this.httpClient
      .get<any[]>(environment.apiJobs + 'Category/GetAll?StatusId=' + id);
  }

  addCategoryJobs(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiJobs + 'Category/Create', cooperating);
  }

  updateCategoryJobs(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiJobs + 'Category/Update', cooperating);
  }


  DeleteCategoryJobs(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiJobs + 'Category/Delete', options);
  }

  init_CategoryJobs() {
    this._CategoryJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
  }
}
