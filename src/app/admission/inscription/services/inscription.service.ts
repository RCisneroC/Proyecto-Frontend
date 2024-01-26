import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable , of} from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Participant, ApiResponse, ParticipantActivity, GetDataResultResponse } from '../../models/participant';
import { BehaviorSubject } from 'rxjs';
import { ResponseInscripcion } from 'app/admission/models/InscripcionResponse';
import { ResponseEF } from 'app/admission/models/ResponseMessage';
import { VerificarDocumentacion } from 'app/admission/models/VerificacionDocumentacion';
import { Persona } from 'app/admission/models/persona';
import { documentosIncripcion } from 'app/admission/models/documentosIncripcion';
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
  public _Persona!: Persona[];
  public _VerificarDocumentacion!: VerificarDocumentacion;
  dataChange: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  dataChangeParticipant: BehaviorSubject<GetDataResultResponse[]> = new BehaviorSubject<GetDataResultResponse[]>([]);
  public _documentosIncripcion!: documentosIncripcion;
  get data(): Participant[] {
    return this.dataChange.value || [];
  }
   get dataParticipantActivity(): GetDataResultResponse[] {
    return this.dataChangeParticipant.value || [];
  }

  constructor( private httpClient: HttpClient) {super(); }

  getDataPerson(cedula:string){
    console.log(cedula)
    return this.httpClient
    .get<any>(environment.consultaEstudiante+cedula);
  }

  getPlanesAprobados(){
    return this.httpClient
      .get<any>(environment.consultaPlanesAprobados);
  }

  getActivities(id:string){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"CurriculumDesign/GetActivitiesBy?CurriculumDesignId="+id)
  }

  getActivity(id:string){
    return this.httpClient.get<any>(environment.apiUrlSchedule+"Activity/GetBy?Id="+id)

  }

   getDocumentos(InscriptionId:string,FileType:string){
    return this.httpClient.get<documentosIncripcion>(environment.apiEC+"EFInscription/EFGetDoc?InscriptionId="+InscriptionId+"&FileType="+FileType)
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

    getParticipanteActividad(id:any): void {
    this.subs.sink = this.httpClient
      .get<ParticipantActivity>(environment.apiEC+'GetData/Getinscritos?ActivityId='+id)
      .subscribe({
        next: (data) => {
          console.log(data.getDataResultResponse);

          this.isTblLoading = false;
          this.dataChangeParticipant.next(data.getDataResultResponse);
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
    init_Persona() {
      this._Persona = [
      {
      datasetPersona:
        {
          imagenes: {
          urlFirma: '',
          urlFoto:''
        },
        personaConfidencial: {
          primer_nombre_madre:'',
          apellido_paterno_madre:'',
          apellido_materno_madre:'',
          primer_nombre_padre:'',
          apellido_paterno_padre:'',
          apellido_materno_padre:'',
          nombre_centro:'',
          provincia_nombre:'',
          distrito_nombre:'',
          corregimiento_nombre:'',
          cedula_madre:'',
          cedula_padre:'',
        },
        personaPublica: {
          provincia:                '',
          tomo:                     '',
          asiento:                  '',
          cedula:                   '',
          primer_nombre:            '',
          segundo_nombre:           '',
          apellido_paterno:         '',
          apellido_materno:         '',
          fecha_nacimiento:         new Date(),
          sexo:                     '',
          estado_civil:             '',
          pais:                     '',
          prov:                     '',
          distrito:                 '',
          corregimiento:            '',
          fecha_vencimiento_cedula: new Date(),
          lugarnacimientope:        '',
          lugarDeNacimiento:        '',
          barrio_residencia:        '',
          calle_residencia:         '',
          edificio_casa:            '',
          nombreCedula:             '',
        }
      }
    }
    ]
  }
  init_documentosIncripcion() {
    this._documentosIncripcion = {
      getDocResp: [
        {
          docFile: '',
          fileType:''
        }
      ],
      isError: false,
      message: '',
      statusCode:'0'
    }
  }
}
