import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Directory } from 'app/admission/models/directory';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/activities.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Directory[]> = new BehaviorSubject<
  Directory[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Directory;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Directory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDirectory(): void {
    this.subs.sink = this.httpClient
      .get<Directory[]>(environment.apiUrlSchedule+'ActivityMode/GetAll')
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
  getAllDirectory2() {
   return this.httpClient
      .get<Directory[]>(environment.apiUrlSchedule+'ActivityMode/GetAll');
     
  }
  addDirectory(directory: Directory){
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlSchedule+'ActivityMode/Create', directory);
  }

  updateDirectory(directory: Directory){
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlSchedule + 'ActivityMode/Update', directory);
  }

  DeleteActivityMode(Id: number){
    const data = {
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
