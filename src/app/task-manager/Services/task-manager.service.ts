import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { TaskManager } from '../Models/taskModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
 
  getTasks(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrlTaskManager + 'Task/GetTasks');
   
  }
    
      saveTask(task: TaskManager) {
        return this.httpClient.post(environment.apiUrlTaskManager + 'Task/CreateTask', task);
        
      }
      
    
        updateTask(task: TaskManager) {
        
          return this.httpClient.put(environment.apiUrlTaskManager + 'Task/UpdateTask', task);
        }
      
        DeleteTask(id: number) {
          
          return this.httpClient.delete(environment.apiUrlTaskManager + 'Task/DeleteTask?Id='+id );
        }
  
}

