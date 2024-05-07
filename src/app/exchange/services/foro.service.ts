import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "@shared";
import { HttpClient } from "@angular/common/http";
import { GetStudentsActivityResponse } from "../../admission/models/AddEFacademicResponse";
import { environment } from "../../../environments/environment.development";
import { ForoResponse, Foro } from '../models/Foro';
import { CategoryResponse } from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class ForoService extends UnsubscribeOnDestroyAdapter {

  public _Foro: Foro = {
    foroId: 0,
    title: '',
    description: '',
    createdDate: new Date(),
    createdBy: '',
    statusId: 0,
    categoriesId: 0,
    categoriesName: ''

  }
  public _ForoResponse: ForoResponse = {
    getForos: [
      this._Foro
    ],
    message: '',
    isError: false,
    statusCode: 0
  }
  constructor(private httpClient: HttpClient) { super(); }

  GetCategory(id: string) {
    return this.httpClient.get<CategoryResponse>(
      environment.apiForo + 'Categories/GetCategories?categoryId=' + id
    );
  }

  GetForos(id: number) {
    return this.httpClient.get<ForoResponse>(
      environment.apiForo + 'Foro/GetForo?categoriesId=' + id
    );
  }
  AddForo(data: any) {
    return this.httpClient.post<ForoResponse>(
      environment.apiForo + 'Foro/AddForo', data
    );
  }

  UpdateForo(data: any) {
    return this.httpClient.post<ForoResponse>(
      environment.apiForo + 'Foro/UpdateForo', data
    );
  }
  GetForosParams(id: string) {
    return this.httpClient.get<ForoResponse>(
      environment.apiForo + 'Foro/GetForo?ForoId=' + id
    );
  }


}
