import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { Product } from '../Models/Product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends  UnsubscribeOnDestroyAdapter {

 
  isTblLoading = true;
  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Product;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Product[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllProduct(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'Product/GetProduct')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getProducts']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
    
      SaveProduct(product: Product) {
        return this.httpClient.post(environment.apiUrlTreasury + 'Product/AddProduct', product);
    
      }
      
        updateProduct(product: Product) {
          return this.httpClient.put(environment.apiUrlTreasury + 'Product/UpdateProduct', product);
        }
      
        DeleteProduct(id: number) {
          const data = {
            Id: id
          };
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: data,
          };
      
          return this.httpClient.delete(environment.apiUrlTreasury + 'Product/DeleteProduct', options);
        }
  
}
