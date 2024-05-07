import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ListBudgetSubCodificationCatalog } from '../Models/ListBudgetSubCodificationCatalog';

@Injectable({
  providedIn: 'root'
})
export class BudgetSubCondificationCatalogService {

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get<ListBudgetSubCodificationCatalog>(environment.apiEducacionContinua + 'Subcategoria/GetSubCategories');
  }
}
