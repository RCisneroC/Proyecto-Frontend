import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private myAppUrl: string = 'assets/data/data-person.json';
  constructor( private httpClient: HttpClient) { }

  getDataPerson(): Observable<any>{
    return this.httpClient.get<any>(this.myAppUrl);
  }
}
