import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Role } from 'app/security/models/role';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends UnsubscribeOnDestroyAdapter {
  //private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Role[]> = new BehaviorSubject<
    Role[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Role;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Role[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRols() {
    this.subs.sink = this.httpClient
      .get<Role[]>(environment.apiUrl+'GetAllRoles')
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
  
  getAllRols2(): Observable<Role[]> {
    //return this.http.post(`${environment.apiUrl+'Login'}`, data);
    return this.httpClient.get<Role[]>(`${environment.apiUrl + 'GetAllRoles'}`);
  }
  
  addRole(role: Role): void {
    this.dialogData = role;

    this.httpClient.post(environment.apiUrl+'CreateRole', role)
      .subscribe({
        next: () => {
          this.dialogData = role;
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateRole(role: Role): void {
    this.dialogData = role;

    this.httpClient.put(environment.apiUrl+'UpdateRole', role)
        .subscribe({
          next: () => {
            this.dialogData = role;
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }

}
