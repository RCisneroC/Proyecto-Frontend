import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../models/Category';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceForoService extends UnsubscribeOnDestroyAdapter {

  public _Category: Category = {
    categorieId: 0,
    name: '',
    descripion: '',
    createdDate: new Date(),
    createdBy: ''

  };

  public _Response: CategoryResponse = {
    getCategoriesResponse: [
      this._Category
    ],
    message: '',
    isError: false,
    statusCode: 0
  }
  dialogData!: Category;
  isTblLoading = true;
  dataChange: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Category[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCategoria(): void {
    this.subs.sink = this.httpClient
      .get<CategoryResponse>(environment.apiForo + 'Categories/GetCategories?categoryId=0')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.getCategoriesResponse);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllCategoryForo(id: any) {
    return this.httpClient
      .get<CategoryResponse>(environment.apiForo + 'Categories/GetCategories?categoryId=' + id);
  }

  addCategory(cooperating: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiForo + 'Categories/AddCategories', cooperating);
  }

  updateCategory(cooperating: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiForo + 'Categories/UpdateCategories', cooperating);
  }
  DeleteCategory(Id: number) {
    let data = {
      categoryId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiForo + 'Categories/DeleteCategories', options);
  }

  init_Category() {
    this._Category = {
      categorieId: 0,
      name: '',
      descripion: '',
      createdDate: new Date(),
      createdBy: ''
    }
  }
}
