import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { BudgetCoding } from '../Models/BudgetCoding';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class BudgetCodingService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<BudgetCoding[]> = new BehaviorSubject<
  BudgetCoding[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: BudgetCoding;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): BudgetCoding[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllBudgetCoding(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'Categoria/GetCategories?CategoriesId=0')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['categorias']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  // getAllBudgetCoding2() {
  //   return this.httpClient
  //     .get<BudgetCoding[]>(environment.apiUrlTreasury + 'CatalogoIngreso/GetCatalogoIngreso?CatalogoId=0');

  // }

  // getAllModality2Filter(id: any) {
  //   return this.httpClient
  //     .get<Modality[]>(environment.apiUrlSchedule + 'ActivityMode/GetAll?StatusId=' + id);

  // }
  addBudgetCodingMode(budgetCoding: BudgetCoding) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'Categoria/AddCategories', budgetCoding);
  }

  updateBudgetCodingMode(budgetCoding: BudgetCoding) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'Categoria/UpdateCategories', budgetCoding);
  }

  DeleteBudgetCodingMode(Id: number) {
    const data = {
      categoriesId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'Categoria/DeleteCategories', options);
  }

}

