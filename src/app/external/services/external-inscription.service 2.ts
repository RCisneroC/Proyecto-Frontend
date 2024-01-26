import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Observable , of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExternalInscriptionService {
  baseApiUrl = "https://file.io"
  constructor( private httpClient: HttpClient) { }

  getDataPerson(cedula:string){
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
  
    // Create form data 
    const formData = new FormData();  
      
    // Store form name as "file" with file data 
    formData.append("file", file, file.name); 
      
    // Make http post request over api 
    // with formData as req 
    return this.httpClient.post(this.baseApiUrl, formData) 
} 
getActivity(id:string){
  return this.httpClient.get<any>(environment.apiUrlSchedule+"Activity/GetBy?Id="+id)

}

updateParticipant(participantData: any): Observable<any> {
 
  const url = `${environment.apiEC}`;
  return this.httpClient.post(url+"EJcontinuingEducation/Addparticipant", participantData);
}
}
