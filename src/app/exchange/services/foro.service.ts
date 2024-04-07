import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {HttpClient} from "@angular/common/http";
import {GetStudentsActivityResponse} from "../../admission/models/AddEFacademicResponse";
import {environment} from "../../../environments/environment.development";
import {ForoResponse} from "../models/Foro";
import {CategoryResponse} from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class ForoService extends UnsubscribeOnDestroyAdapter {

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
}
