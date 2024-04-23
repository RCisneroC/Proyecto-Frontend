import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Cooperating } from 'app/admission/models/Cooperating';
import { LogoCooperting } from 'app/admission/models/LogoCooperating';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CooperationgOrganizationService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Cooperating[]> = new BehaviorSubject<
    Cooperating[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Cooperating;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Cooperating[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCooperating(): void {
    this.subs.sink = this.httpClient
      .get<Cooperating[]>(environment.apiUrlSchedule + 'CooperatingOrganization/GetAll')
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
      .get<Cooperating[]>(environment.apiUrlSchedule + 'CooperatingOrganization/GetAll');
  }

  getAllCooperatingFiltro(id: any) {
    return this.httpClient
      .get<Cooperating[]>(environment.apiUrlSchedule + 'CooperatingOrganization/GetAll?StatusId=' + id);
  }

  addCooperating(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule + 'CooperatingOrganization/Create', cooperating);
  }

  updateCooperating(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'CooperatingOrganization/Update', cooperating);
  }

  getByIdLogo(id: any) {
    return this.httpClient
      .get<LogoCooperting>(environment.apiUrlSchedule + 'CooperatingOrganization/GetBy?Id=' + id);
  }


  DeleteCooperating(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'CooperatingOrganization/Delete', options);
  }
}