import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { StudyMode } from '../Models/StudyMode';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class StudyModeService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _StudyMode!: StudyMode;
  dataChange: BehaviorSubject<StudyMode[]> = new BehaviorSubject<StudyMode[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: StudyMode;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): StudyMode[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStudyMode(): void {
    this.subs.sink = this.httpClient
      .get<StudyMode[]>(environment.apiEF + 'StudyMode/GetAll')
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
  getAllStudyMode2(id:any) {
    return this.httpClient
      .get<StudyMode[]>(environment.apiEF + 'StudyMode/GetAll?StatusId=' + id);
  }

  getAllStudyModeFiltro(id: any) {
    return this.httpClient
      .get<StudyMode[]>(environment.apiEF + 'StudyMode/GetAll?StatusId=' + id);
  }

  addStudyMode(StudyMode: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'StudyMode/Create', StudyMode);
  }

  updateStudyMode(StudyMode: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'StudyMode/Update', StudyMode);
  }

  DeleteStudyMode(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    
    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'StudyMode/Delete', options);
  }

  init_StudyMode() {
    this._StudyMode = {
      description: '',
      id: 0,
      name: '',
      statusId:0
    }
  }
}