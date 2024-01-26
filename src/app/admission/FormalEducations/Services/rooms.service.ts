import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Rooms } from '../Models/Rooms';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Rooms!: Rooms;
  dataChange: BehaviorSubject<Rooms[]> = new BehaviorSubject<Rooms[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Rooms;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Rooms[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRoom(): void {
    this.subs.sink = this.httpClient
      .get<Rooms[]>(environment.apiEF + 'Room/GetAll')
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
  getAllRoom2() {
    return this.httpClient
      .get<Rooms[]>(environment.apiEF + 'Room/GetAll');
  }

  getAllRoomsFiltro(id: any) {
    return this.httpClient
      .get<Rooms[]>(environment.apiEF + 'Room/GetAll?StatusId=' + id);
  }

  addRooms(Rooms: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Room/Create', Rooms);
  }

  updateRooms(Rooms: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'Room/Update', Rooms);
  }

  DeleteRooms(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'Room/Delete', options);
  }
}