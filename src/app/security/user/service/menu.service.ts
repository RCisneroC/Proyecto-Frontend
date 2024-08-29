import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { MenuResponse } from 'app/security/models/role';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends UnsubscribeOnDestroyAdapter {

  //private readonly API_URL = 'assets/data/dataUser.json';
  isTblLoading = true;
  _MenuJson: MenuResponse = {
    hasAccessPermission:false,
    statusId: 0,
    id: 0,
    path: '',
    title: '',
    iconType: 'feather',
    icon: '',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    parentApplicationMenuId: 0,
    subMenus: [{
      hasAccessPermission:false,
      statusId: 0,
      id: 0,
      path: '',
      title: '',
      iconType: 'feather',
      icon: '',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      parentApplicationMenuId: 0,
      subMenus: [],
      message: '',
      isError: false,
      statusCode: '',
    }],
    message: '',
    isError: false,
    statusCode: '',
  }
  dataChange: BehaviorSubject<MenuResponse[]> = new BehaviorSubject<
    MenuResponse[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: MenuResponse;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): MenuResponse[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  GetAllMenu(): void {
    this.subs.sink = this.httpClient
      .get<MenuResponse[]>(environment.apiUrlRol + 'Menu/GetAll')
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  addMenu(data: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlRol + 'Menu/Create', data);
  }

  UpdateMenu(data: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlRol + 'Menu/Update', data);
  }

  DeleteMenu(id: any) {
    let data = {
      id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlRol + 'Menu/Delete', options);
  }

}
