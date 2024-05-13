import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AssignmentPeriod } from '../Models/AssignmentPeriod';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class AssignmentPeriodService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<AssignmentPeriod[]> = new BehaviorSubject<
  AssignmentPeriod[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: AssignmentPeriod;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AssignmentPeriod[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAssignmentPeriod(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'PeriodoAsignacion/GetPeriodoAsignacion')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getPeriodoAsignacions']);
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

  addAssignmentPeriodMode(assignmentPeriod: AssignmentPeriod) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'PeriodoAsignacion/AddPeriodoAsignacion', assignmentPeriod);
  }

  updateAssignmentPeriodMode(assignmentPeriod: AssignmentPeriod) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'PeriodoAsignacion/UpdatePeriodoAsignacion', assignmentPeriod);
  }

  DeleteAssignmentPeriodMode(Id: number) {
    const data = {
      periodoAsignacionId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'PeriodoAsignacion/DeletePeriodoAsignacion', options);
  }

}




