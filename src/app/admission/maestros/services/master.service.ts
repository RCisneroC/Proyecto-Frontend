import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Lounge } from 'app/admission/models/lounge';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { TimeSlot } from 'app/admission/models/TimeSlot';
import { RoomRequestRoomDateTimeSlots } from 'app/admission/models/RoomRequestRoomDateTimeSlots';
import { RoomDependencies } from 'app/admission/models/RoomDependencies';

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

  getRoomsFilter(id: any) {
    return this.httpClient
      .get<Lounge[]>(environment.apiUrlSchedule + 'Room/GetAll?StatusId=' + id);
  }

  getRoomsFilterRangeDate(startDate: Date, endDate: Date) {
    return this.httpClient
      .get<Lounge[]>(environment.apiUrlSchedule + 'Room/GetAvailableRoomsBy?StartDate=' + startDate + "&EndDate=" + endDate);
  }

  /** CRUD METHODS */
  getAllLounge(): void {
    this.subs.sink = this.httpClient
      .get<Lounge[]>(environment.apiUrlSchedule + 'Room/GetAll')
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
  addLounge(lounge: Lounge) {
    this.dialogData = lounge;
    return this.httpClient.post(environment.apiUrlSchedule + 'Room/Create', lounge);
  }
  updateLounge(lounge: Lounge) {
    this.dialogData = lounge;
    return this.httpClient.put(environment.apiUrlSchedule + 'Room/Update', lounge);
  }

  addRoomsRequestRooms(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Room/CreateRoomRequestRoom', data);
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


  DeleteRoomsRequirement(id_rooms: any, id_request: any) {
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
    return this.httpClient.delete(environment.apiUrlSchedule + 'Room/DeleteRoomRequestRoom', options);
  }


  createTimeSlot(id_rooms: number, startDate: string, endDate: string) {

    let data = {
      roomId: id_rooms,
      startTime: startDate,
      endTime: endDate
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    try{
      return this.httpClient.post(environment.apiUrlSchedule
        + 'Room/CreateTimeSlot', data, options);
    }
    catch(ex){
     console.log("Excepcion " + ex)
     throw(ex)
    }

  }

  getTimeSlotByRoom(id_rooms: number) {
    return this.httpClient
      .get<TimeSlot[]>(environment.apiUrlSchedule + 'Room/GetTimeSlotsBy?RoomId=' + id_rooms);
  }

  getTimeSlotByRoomAndDate(id_rooms: number, date: string | null) {
    return this.httpClient
      .get<TimeSlot[]>(environment.apiUrlSchedule + 'Room/GetAvailableRoomTimeSlotsBy?RoomId=' + id_rooms + "&Date=" + date);
  }

  deleteTimeSlot(id_rooms: number) {

    let data = {
      id: id_rooms,
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };

    return this.httpClient.delete(environment.apiUrlSchedule
      + 'Room/DeleteTimeSlot', options);
  }

  updateTimeSlot(timeSlot: TimeSlot) {
    return this.httpClient.put(environment.apiUrlSchedule + 'Room/UpdatetimeSlot', timeSlot);
  }

  updateRequest(data: any) {
    return this.httpClient.put(environment.apiUrlSchedule + 'Room/UpdateRequest', data);
  }


  getAvalableDateByRoom(id_rooms: number) {
    return this.httpClient
      .get<any[]>(environment.apiUrlSchedule + 'Room/GetDaysWithoutAvailableTimeSlotsBy?RoomId=' + id_rooms);
  }

  addRequestRoomDate(data: any) {
    return this.httpClient.post(environment.apiUrlSchedule + 'Room/CreateRoomRequestRoomDate', data);
  }


  getRoomRequestRoomDateTimeSlots(id:number){
    return this.httpClient.get<RoomRequestRoomDateTimeSlots[]>(environment.apiUrlSchedule + 'Room/GetRoomRequestRoomDateTimeSlotsBy?RoomRequestId=' + id);
  }

  deleteRoomRequestRoomDateTimeSlots(Id: number, timeSloteId:number) {
    let data = {
      roomRequestRoomDateId: Id,
      roomTimeSlotId : timeSloteId
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<any>(environment.apiUrlSchedule + 'Room/DeleteRoomRequestRoomDateTimeSlot', options);
  }

  getDependencies() {
    return this.httpClient
      .get<RoomDependencies[]>(environment.apiExtUrlDependencies);
  }

}

