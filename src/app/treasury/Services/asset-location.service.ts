import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AssetLocation, AssetLocationDetail } from '../Models/AssetLocation';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class AssetLocationService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<AssetLocation[]> = new BehaviorSubject<
  AssetLocation[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: AssetLocation;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AssetLocation[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAssetLocation(): void {
    this.subs.sink = this.httpClient
      .get<any>(environment.apiUrlTreasury + 'AsignacionBien/GetAsignacion')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data['getAsignacionBiens']);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
  getAllAssetLocation2() {
    return this.httpClient
      .get<any>(environment.apiUrlTreasury + 'AsignacionBien/GetDetailAsignacion')
    
  }
  
  getAllAssetLocation3() {
    return this.httpClient
      .get<any>(environment.apiUrlTreasury + 'AsignacionBien/GetAsignacion')
    
  }


  getPeriodo() {
   return this.httpClient
       .get<any>(environment.apiUrlTreasury + 'PeriodoContable/GetPeriodo');

 }
 
 getDetailAsignacion(id:number) {
  return this.httpClient
      .get<any>(environment.apiUrlTreasury + 'AsignacionBien/GetDetailAsignacion?DetailAsignacionBienId='+id);

}

  addAssetLocationMode(assetLocation: AssetLocation) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/AddAsignacionBien', assetLocation);
  }


  addAssetLocationDetailMode(assetLocation: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/AddAsignacionDetail', assetLocation);
  }
  updateAssetLocationMode(assetLocation: AssetLocation) {
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/UpdateAsignacion', assetLocation);
  }
  
  updateAssetLocationDetailMode(assetLocation: any) {
  
 
    return this.httpClient.put<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/UpdateAsignacionDetail', assetLocation);
  }

  DeleteAssetLocationMode(Id: number) {
    const data = {
      asignacionId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/DeleteAsignacion', options);
  }
  
  DeleteAssetLocationDetailMode(Id: number) {
    const data = {
      detailAsignacionId: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiUrlTreasury + 'AsignacionBien/DeleteAsignacionDetail', options);
  }
  

}



