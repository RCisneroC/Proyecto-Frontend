import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ListBudgetSubCodificationCatalog } from '../Models/ListBudgetSubCodificationCatalog';
import { Categories } from '../Models/Categories';
import { SaveSubCodificacion, UpdteSubCodificacion } from '../Models/SubCodificacionCatalogRequest';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';

@Injectable({
  providedIn: 'root'
})
export class BudgetSubCondificationCatalogService {

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get<ListBudgetSubCodificationCatalog>(environment.apiEducacionContinua + 'Subcategoria/GetSubCategories');
  }

  save(data:SaveSubCodificacion){
    return this.httpClient.post<Result>(environment.apiEducacionContinua + 'Subcategoria/AddSubCategories',data);
  }

  update(data:UpdteSubCodificacion){
    return this.httpClient.put<Result>(environment.apiEducacionContinua + 'Subcategoria/UpdateSubCategories',data);
  }

  delete(id:number){
    const data = {subCategoria : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiEducacionContinua + 'Subcategoria/DeleteSubCategories',options);
  }


  getCategory(){
    return this.httpClient.get<Categories>(environment.apiEducacionContinua + 'Categoria/GetCategories');


  }
}
