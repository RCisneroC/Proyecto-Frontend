import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Lounge } from 'app/admission/models/lounge';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/data-master.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Lounge[]> = new BehaviorSubject<
  Lounge[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Lounge;
  IsError: boolean = false;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Lounge[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllLounge(): void {
    this.subs.sink = this.httpClient
      .get<Lounge[]>(environment.apiUrlSchedule+'Room/GetAll')
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
  addLounge(lounge: Lounge){
    this.dialogData = lounge;
    return this.httpClient.post(environment.apiUrlSchedule + 'Room/Create', lounge);
  }
  updateLounge(lounge: Lounge) {
    this.dialogData = lounge;
    return this.httpClient.put(environment.apiUrlSchedule + 'Room/Update', lounge);
  }
  


}

