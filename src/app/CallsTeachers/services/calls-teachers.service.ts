import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Calls } from '../models/CallsModel';
import { UntypedFormControl } from '@angular/forms';
import { TeacherDocumentsStatus } from '../models/TeacherDocumentsStatus';


@Injectable({
  providedIn: 'root',
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

  getCallsAvailable(titulo: string | null = null,
    fechaInicio : string | null = null,
    fechaFin: string | null = null
  ) {
    let url: string = "";
    if(titulo !== null && titulo !== "")
       url = "titulo=" + titulo!;

    if(fechaInicio != null && fechaInicio !== ""){
     url = url + (url == "" ? "fechaInicio=" + fechaInicio : "&fechaInicio=" + fechaInicio);
     }

     if(fechaFin != null && fechaFin !== ""){
      url = url + (url == "" ? "fechaFin=" + fechaFin : "&fechaFin=" + fechaFin);
      }

    return this.httpClient.get<Calls[]>(environment.ConsultaDocentes + 'Announcement/GetAvailableAnnouncement?' + url);
  }

  getCallsAvailableById(id:number) {
    return this.httpClient.get<Calls>(environment.ConsultaDocentes + 'Announcement/GetAnnouncementById?id=' + id);
  }

  updateDocuments(data: any): Observable<any> {
    const url = `${environment.ConsultaDocentes}`;
    return this.httpClient.post<any>(url + "Announcement/UpdateFileTeacher", data);
  }

  evalTeacher(data: UntypedFormControl): Observable<any> {
    const url = `${environment.ConsultaDocentes}`;
    return this.httpClient.post<any>(url + "Announcement/EvaluationTeacher", data);
  }


  getCV(cedula:string) {
    return this.httpClient.get<string>(environment.ConsultaDocentes + 'Announcement/GetDetailTeacherPDF?cedula=' + cedula);
  }


  GetByDocumentsStatesTeachers(filters: string[]) {
    const url = `${environment.ConsultaDocentes}`;
    const data =
    {
      filters: filters
    };

    return this.httpClient.post<TeacherDocumentsStatus[]>(url + "Announcement/GetTeacherStatusDocumentByFilters", data);
  }

}
