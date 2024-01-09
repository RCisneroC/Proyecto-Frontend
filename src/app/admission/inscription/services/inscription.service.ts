import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  //private myAppUrl: string = 'assets/data/data-person.json';
  //private apiUrl: string = '/api/index.php?wsdl=1&ui=X8JBJ6SD30A219910S81A03U12OL6CA22657B70658A787&wsn=getTEciudadana&param=';
  //private apiUrl: string = '/api/index.php?wsdl=1&ui=X8JBJ6SD30A219910S81A03U12OL6CA22657B70658A787&wsn=getTEciudadana&param=';
  baseApiUrl = "https://file.io"

 
  constructor( private httpClient: HttpClient) { }

  getDataPerson(cedula:string){
    console.log(cedula)
    return this.httpClient
    .get<any>(environment.consultaEstudiante+cedula);
  }

  getActivities(id:string){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"CurriculumDesign/GetActivitiesBy?CurriculumDesignId="+id)
  }

  getShedule(){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"CurriculumDesign/GetAll")
  }

  upload(file:any):Observable<any> { 
  
    const formData = new FormData();  
      
    formData.append("file", file, file.name); 
      
  
    return this.httpClient.post(this.baseApiUrl, formData) 
} 

updateParticipant(participantData: any): Observable<any> {
 
  const url = `${environment.apiEC}`;
  return this.httpClient.post(url, participantData);
}

 
}
