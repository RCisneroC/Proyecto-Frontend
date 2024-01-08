import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Modality } from 'app/admission/models/modality';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalityService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Modality[]> = new BehaviorSubject<
  Modality[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Modality;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Modality[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllModality(): void {
    this.subs.sink = this.httpClient
      .get<Modality[]>(environment.apiUrlSchedule+'ActivityMode/GetAll')
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
  getAllModality2() {
   return this.httpClient
      .get<Modality[]>(environment.apiUrlSchedule+'ActivityMode/GetAll');
     
  }
  addActivityMode(modality: Modality){
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'ActivityMode/Create', modality);
  }

  updateActivityMode(modality: Modality){
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityMode/Update', modality);
  }

  DeleteActivityMode(Id: number){
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
  return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule+'ActivityMode/Delete',options);
  }
  


}
