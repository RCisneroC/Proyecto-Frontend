import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { PersonalDocenteModel } from '../PersonalDocente/model/PersonalDocenteModel';
import { ParametrosConsulta } from '../PersonalDocente/model/ParametrosConsulta';

@Injectable({
  providedIn: 'root'
})
export class PersonalDocenteServiceService {

  constructor(private httpClient: HttpClient) { }

  GetByFilters(filters: ParametrosConsulta) {
    const url = `${environment.apiUrlTeacher}`;
    return this.httpClient.post<PersonalDocenteModel[]>(url + "GetTeacherByFilters", filters);
  }

}
