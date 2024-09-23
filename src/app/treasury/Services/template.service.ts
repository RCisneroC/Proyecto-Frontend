import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { Template } from '../Models/Template';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class TemplateService  extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<Template[]> = new BehaviorSubject<
  Template[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Template;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Template[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTemplate(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'Template/GetTemplate?id=0')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getTemplates']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
 
 getAllTemplate2( id:number) {
  return this.httpClient
      .get<any>(environment.apiUrlTreasury + 'Template/GetTemplate?Id='+id);

}

  addTemplateMode(data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'Template/AddTemplate', data);
  }



  updateTemplateMode(data: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'Template/UpdateTemplate', data);
   }
  


  DeleteTemplateMode(Id: number) {
    const data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'Template/DeleteTemplate', options);
  }
  
 
  

}


