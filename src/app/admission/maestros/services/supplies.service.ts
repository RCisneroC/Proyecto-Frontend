import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Supplies } from 'app/admission/models/supplies';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuppliesService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Supplies[]> = new BehaviorSubject<Supplies[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Supplies;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Supplies[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSupplies(): void {
    this.subs.sink = this.httpClient
      .get<Supplies[]>(environment.apiUrlSchedule+'RoomRequirement/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllSuppli2() {
   return this.httpClient
      .get<Supplies[]>(environment.apiUrlSchedule+'RoomRequirement/GetAll');
  }

  addSupplies(supplies: Supplies) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'RoomRequirement/Create', supplies);
  }

  updateSupplies(supplies: Supplies) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'RoomRequirement/Update', supplies);
  }

  DeleteSupplies(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
  return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule+'RoomRequirement/Delete',options);
  }

}

