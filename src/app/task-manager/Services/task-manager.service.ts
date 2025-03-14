import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { TaskManager } from '../Models/taskModel';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService extends  UnsubscribeOnDestroyAdapter {

 
  isTblLoading = true;
  dataChange: BehaviorSubject<TaskManager[]> = new BehaviorSubject<
  TaskManager[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: TaskManager;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): TaskManager[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTask(): void {
    this.subs.sink = this.httpClient
      //.get<TaskManager[]>(environment.apiUrlTaskManager + 'TaskManager/GetAllTask')
      .get<TaskManager[]>(environment.apiUrlTaskManager + 'TaskManager')
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
  
  getTasks() {
    return this.httpClient.get<TaskManager[]>(environment.apiUrlTaskManager + 'TaskManager');
    //return this.httpClient.post(environment.apiUrlTaskManager + 'TaskManager/AddTask', task);
  }
    
      saveTask(task: TaskManager) {
        return this.httpClient.post(environment.apiUrlTaskManager + 'TaskManager', task);
        //return this.httpClient.post(environment.apiUrlTaskManager + 'TaskManager/AddTask', task);
      }
      
    
        updateTask(task: TaskManager) {
          return this.httpClient.put<TaskManager>(environment.apiUrlTaskManager + `TaskManager/${task.id}`, task);
         // return this.httpClient.put(environment.apiUrlTaskManager + 'TaskManager/UpdateTask', task);
        }
      
        DeleteTask(id: number) {
          // const data = {
          //   Id: id
          // };
          // const options = {
          //   headers: new HttpHeaders({
          //     'Content-Type': 'application/json',
          //   }),
          //   body: data,
          // };
          
           return this.httpClient.delete(environment.apiUrlTaskManager + `TaskManager/${id}`);
          //return this.httpClient.delete(environment.apiUrlTaskManager + 'TaskManager/DeleteTask', options);
        }
  
}

