import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityRequirement } from 'app/admission/models/GetOneActivity';
import { Requirement } from 'app/admission/models/Requeriminet';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Requirement[]> = new BehaviorSubject<Requirement[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Requirement;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Requirement[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRequirement(): void {
    this.subs.sink = this.httpClient
      .get<Requirement[]>(environment.apiUrlSchedule+'ActivityRequirement/GetAll')
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
  getAllSuppli2() {
   return this.httpClient
      .get<Requirement[]>(environment.apiUrlSchedule+'ActivityRequirement/GetAll');
  }

   getAllDocumentFiltro(id:number) {
   return this.httpClient
      .get<ActivityRequirement[]>(environment.apiUrlSchedule+'ActivityRequirement/GetAll?StatusId='+id);
  }

  addRequirement(requirement: Requirement) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'ActivityRequirement/Create', requirement);
  }

  updateRequirement(requirement: Requirement) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityRequirement/Update', requirement);
  }

  DeleteRequirement(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

  return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule+'ActivityRequirement/Delete',options);
  }

}