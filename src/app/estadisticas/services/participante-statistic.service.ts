import { Injectable } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject} from "rxjs";
import {Activity} from "../../admission/models/activity";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {
  EstadisticasModelParticipante,
  EstadisticasModelParticipanteResponse
} from "../Models/EstadisticasModelParticipante";

@Injectable({
  providedIn: 'root'
})
export class ParticipanteStatisticService extends UnsubscribeOnDestroyAdapter {

private readonly API_URL = 'assets/data/data-master.json';
private readonly API_URL1 = 'assets/data/activityDetail.json';
private readonly API_URL2 = 'assets/data/activities.json';

  isTblLoading = true;
  dataChange: BehaviorSubject<Activity[]> = new BehaviorSubject<
    Activity[]
  >([]);

  data_filtro: BehaviorSubject<EstadisticasModelParticipanteResponse[]> = new BehaviorSubject<
    EstadisticasModelParticipanteResponse[]
  >([]);


  // Temporarily stores data from dialogs
  dialogData!: Activity;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Activity[] {
    return this.dataChange.value;
  }

  get dataF(): EstadisticasModelParticipanteResponse[] {
    return this.data_filtro.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllActivity(): void {
    this.subs.sink = this.httpClient
      .get<Activity[]>(environment.apiUrlSchedule + 'Activity/GetAll')
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

  getAllActivity2() {
    return this.httpClient
      .get<Activity[]>(environment.apiUrlSchedule + 'Activity/GetAll');

  }

  addActivity(activity: Activity): void {
    this.dialogData = activity;

    this.httpClient.post(environment.apiUrlSchedule + 'Activity/Create', activity)
      .subscribe({
        next: () => {
          this.dialogData = activity;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateActivity(activity: Activity): void {
    this.dialogData = activity;

    this.httpClient.put(environment.apiUrlSchedule + 'Activity/Update', activity)
      .subscribe({
        next: () => {
          this.dialogData = activity;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getEstadisticas(data: any): void {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.subs.sink = this.httpClient
      .post<EstadisticasModelParticipante>(environment.apiEC + 'EstadisticaMatricula/GetEstadisticaEC', data)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.data_filtro.next(data.dataResponseEC);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });

  }

  getEstadisticasFiltro(data: any) {
    return this.httpClient
      .post<EstadisticasModelParticipante>(environment.apiEC + 'EstadisticaMatricula/GetEstadisticaEC' , data);

  }


}
