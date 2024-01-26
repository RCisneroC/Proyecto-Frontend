import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Competence } from '../Models/Competence';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Competence!: Competence;
  dataChange: BehaviorSubject<Competence[]> = new BehaviorSubject<Competence[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Competence;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Competence[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCompetence(): void {
    this.subs.sink = this.httpClient
      .get<Competence[]>(environment.apiEF + 'DegreeCompetence/GetAll')
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
  getAllCompetence2() {
    return this.httpClient
      .get<Competence[]>(environment.apiEF + 'DegreeCompetence/GetAll');
  }

  getAllCompetenceFiltro(id: any) {
    return this.httpClient
      .get<Competence[]>(environment.apiEF + 'DegreeCompetence/GetAll?StatusId=' + id);
  }

  addCompetence(Competence: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'DegreeCompetence/Create', Competence);
  }

  updateCompetence(Competence: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'DegreeCompetence/Update', Competence);
  }

  DeleteCompetence(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'DegreeCompetence/Delete', options);
  }
}
