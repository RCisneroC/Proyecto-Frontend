import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
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

    getRoomsFilter(id:any) {
   return this.httpClient
      .get<Lounge[]>(environment.apiUrlSchedule+'Room/GetAll?StatusId='+id);
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
  
  addRoomsRequestRooms(data:any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Room/CreateRoomRequestRoom',data);
  }

    DeleteLounge(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlSchedule + 'Room/Delete', options);
  }


     DeleteRoomsRequirement(id_rooms:any,id_request:any) {
    let data = {
      roomRequestId: id_request,
      roomId: id_rooms
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(environment.apiUrlSchedule + 'Room/DeleteRoomRequestRoom',options);
  }
  


}

