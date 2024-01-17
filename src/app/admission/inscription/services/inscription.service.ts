import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable , of} from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Participant, ApiResponse } from '../../models/participant';
import { BehaviorSubject } from 'rxjs';
import { ResponseInscripcion } from 'app/admission/models/InscripcionResponse';
import { ResponseEF } from 'app/admission/models/ResponseMessage';
import { VerificarDocumentacion } from 'app/admission/models/VerificacionDocumentacion';
@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends UnsubscribeOnDestroyAdapter {
  //private myAppUrl: string = 'assets/data/data-person.json';
  //private apiUrl: string = '/api/index.php?wsdl=1&ui=X8JBJ6SD30A219910S81A03U12OL6CA22657B70658A787&wsn=getTEciudadana&param=';
  //private apiUrl: string = '/api/index.php?wsdl=1&ui=X8JBJ6SD30A219910S81A03U12OL6CA22657B70658A787&wsn=getTEciudadana&param=';
  baseApiUrl = "https://file.io"
  isTblLoading = true;
  public _ResponseInscripcion!: ResponseInscripcion;
  public _VerificarDocumentacion!: VerificarDocumentacion;
  dataChange: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  get data(): Participant[] {
    return this.dataChange.value || [];
  }
  constructor( private httpClient: HttpClient) {super(); }

  getDataPerson(cedula:string){
    console.log(cedula)
    return this.httpClient
    .get<any>(environment.consultaEstudiante+cedula);
  }

  getActivities(id:string){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"CurriculumDesign/GetActivitiesBy?CurriculumDesignId="+id)
  }

  getActivity(id:string){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"Activity/GetBy?Id="+id)

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
  return this.httpClient.post<ResponseInscripcion>(url+"ContinuingEducation/Addparticipant", participantData);
  }

  CargaDocumentoRequirement(data: any): Observable<any> {
  const url = `${environment.apiEC}`;
  return this.httpClient.post<ResponseEF>(url+"EFInscription/AddDoc", data);
}

  ValidationDocumentRequirement(id:any){
    const url = `${environment.apiEC}`;
    return this.httpClient.get<VerificarDocumentacion>(url+"GetData/GetValidateFile?EJInscriptionId="+id)
  }


// getParticipants(): Observable<any>{
//   return this.httpClient.get<any>(environment.apiEC+"ContinuingEducation/GetParticipants")
// }

getParticipants(): void {
  this.subs.sink = this.httpClient
    .get<ApiResponse>(environment.apiEC + "GetData/GetParticipants")
    .subscribe({
      next: (data) => {
        this.isTblLoading = false;

        // Verifica si 'participants' existe en 'data'
        if ('participants' in data) {
          const participantsArray = data.participants || [];
          this.dataChange.next(participantsArray);
        } else {
          console.error("'participants' property not found in the response data.");
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
}

  init_ResponseInscripcion() {
    this._ResponseInscripcion = {
      backOffice:0,
      firstName:'',
      lastName:'',
      secondsurname:'',
      gender:'',
      id:'',
      cedula:'',
      institution:'',
      email:'',
      university:'',
      dependency:'',
      cooperatingEntity:'',
      position:'',
      province:'',
      judicialDistrict:'',
      invitationDate:new Date(),
      observation:'',
      activityId:0,
      inscriptionId:0,
      createdBy:'',
      message:'',
      isError:false,
      statusCode:0,
    }
  }
  init_VerificarDocumentacion() {
    this._VerificarDocumentacion = {
      message:'',
      validateFileResponse: [
        {
          id: 0,
          mss: '',
          name:''
        }
      ],
      isError:false,
      statusCode:0
    }
  }
}
