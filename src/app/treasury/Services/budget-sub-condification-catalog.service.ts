import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ListBudgetSubCodificationCatalog } from '../Models/ListBudgetSubCodificationCatalog';
import { Categories } from '../Models/Categories';
import { SaveSubCodificacion, UpdteSubCodificacion } from '../Models/SubCodificacionCatalogRequest';
import { Result } from '../Models/BudgetSubCodificationCatalogResponse';
import { GetCategoriesAndSubResponse } from '../Models/GetCategoriesAndSubResponse';

@Injectable({
  providedIn: 'root'
})
export class BudgetSubCondificationCatalogService {

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get<ListBudgetSubCodificationCatalog>(environment.apiUrlTreasury + 'Subcategoria/GetSubCategories');
  }

  save(data:SaveSubCodificacion){
    return this.httpClient.post<Result>(environment.apiUrlTreasury + 'Subcategoria/AddSubCategories',data);
  }

  update(data:UpdteSubCodificacion){
    return this.httpClient.put<Result>(environment.apiUrlTreasury + 'Subcategoria/UpdateSubCategories',data);
  }

  delete(id:number){
    const data = {subCategoria : id};

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<Result>(environment.apiUrlTreasury + 'Subcategoria/DeleteSubCategories',options);
  }


  getCategory(){
    return this.httpClient.get<Categories>(environment.apiUrlTreasury + 'Categoria/GetCategories');
  }

  getCategoryAndSubCategoryById(id:number){
    return this.httpClient.get<GetCategoriesAndSubResponse>(environment.apiUrlTreasury + 'Categoria/GetCategoriesAndSub?CategoriesId=' + id);
  }

}
