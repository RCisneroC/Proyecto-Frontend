import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { Activity } from 'app/admission/models/activity';
import { EstadisticasActivity } from 'app/estadisticas/Models/EstadisticasModelActivity';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/data-master.json';
  private readonly API_URL1 = 'assets/data/activityDetail.json';
  private readonly API_URL2 = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Activity[]> = new BehaviorSubject<
    Activity[]
  >([]);

  data_filtro: BehaviorSubject<GetOneActivity[]> = new BehaviorSubject<
    GetOneActivity[]
  >([]);


  // Temporarily stores data from dialogs
  dialogData!: Activity;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Activity[] {
    return this.dataChange.value;
  }

  get dataF(): GetOneActivity[] {
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
      .get<EstadisticasActivity>(environment.apiUrlSchedule + 'Activity/GetActivitiesStatisticsBy?' + data)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.data_filtro.next(data.activitiesByAll);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });

  }

  getEstadisticasFiltro(data: any) {
    return this.httpClient
      .get<EstadisticasActivity>(environment.apiUrlSchedule + 'Activity/GetActivitiesStatisticsBy?' + data);

  }


}
