import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../Models/Degree';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class DegreeService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Degree!: Degree;
  dataChange: BehaviorSubject<Degree[]> = new BehaviorSubject<Degree[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Degree;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Degree[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDegree(): void {
    this.subs.sink = this.httpClient
      .get<Degree[]>(environment.apiEF + 'Degree/GetAll')
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
  getAllDegree2() {
    return this.httpClient
      .get<Degree[]>(environment.apiEF + 'Degree/GetAll');
  }

  getAllDegreesFiltro(id: any) {
    return this.httpClient
      .get<Degree[]>(environment.apiEF + 'Degree/GetAll?StatusId=' + id);
  }

  addDegree(Degree: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Degree/Create', Degree);
  }

  updateDegree(Degree: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'Degree/Update', Degree);
  }

  DeleteDegree(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Degree/Delete', options);
  }
}
