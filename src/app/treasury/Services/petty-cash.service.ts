import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { PettyCash } from '../Models/PettyCash';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService  extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<PettyCash[]> = new BehaviorSubject<
  PettyCash[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: PettyCash;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): PettyCash[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPettyCash(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'CajaMenuda/GetCajaMenuda')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getcajaMenudas']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getPeriodo() {
   return this.httpClient
       .get<any>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');

 }

  addPettyCashMode(pettyCash: PettyCash) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'CajaMenuda/AddCajaMenuda', pettyCash);
  }

  updatePettyCashMode(pettyCash: PettyCash) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'CajaMenuda/UpdateCajaMenuda', pettyCash);
  }

  DeletePettyCashMode(Id: number) {
    const data = {
      cajaMenudaId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'CajaMenuda/DeleteCajaMenuda', options);
  }

}


