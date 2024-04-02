import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Calls } from '../models/CallsModel';

@Injectable({
  providedIn: 'root'
})
export class CallsTeachersService {

  constructor(private httpClient: HttpClient) { }

  getCallsAll() {
    return this.httpClient.get<Calls[]>(environment.ConsultaDocentes + 'Announcement/GetAllAnnouncement');
  }

  saveOrUpdate(data : any){
    return this.httpClient.post<any>(environment.ConsultaDocentes + 'Announcement/Save',data);
  }

  UpdateStatus(data: any) {
    return this.httpClient.post<any>(environment.ConsultaDocentes + 'Announcement/Aproved', data);
  }

  getCallsAvailable() {
    return this.httpClient.get<Calls[]>(environment.ConsultaDocentes + 'Announcement/GetAvailableAnnouncement');
  }


}
