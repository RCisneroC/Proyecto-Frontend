import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { Data, DataD, Directory, FileData } from 'app/admission/models/directory';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { FoodNode } from '../directory-list/directory-list.component';

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
   return this.httpClient.get(environment.apiDocument+'FolderV2/GetFolder?FolderId=0')
  }
  
  getfilebyId(fileId:number) {
    return this.httpClient.get<Data>(environment.apiDocument+'Files/GetFile?FileId='+fileId)
   }
   
   getFolderbyId(folderId:number) {
    return this.httpClient.get<Data>(environment.apiDocument+'Folder/GetFolder?FolferId='+folderId)
   }
   
   addFile(data:any) {
    return this.httpClient.post(environment.apiDocument+'Files/AddFile',data)
   }
   
   addFolder(data:any) {
    return this.httpClient.post(environment.apiDocument+'Folder/AddFolder',data)
   }
   
   UpdateFolder(data:any) {
   
    //UpdateFolder?FolderId=6&NewFolderName=newfoldername
    return this.httpClient.put(environment.apiDocument+'Folder/UpdateFolder',data);
   }
   
   UpdateFile(data:any) {
   
    //UpdateFolder?FolderId=6&NewFolderName=newfoldername
    return this.httpClient.put(environment.apiDocument+'Files/UpdateFile',data);
   }
   
   GetHistoryFile(id:number) {
   
    //UpdateFolder?FolderId=6&NewFolderName=newfoldername
    return this.httpClient.get<DataD>(environment.apiDocument+'Files/GetAuditFile?FileId='+id)
  }
   
   
   GetHistoryFolder(id:number) {
   
    return this.httpClient.get<DataD>(environment.apiDocument+'Folder/GetAuditFolder?FolderId='+id)
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
