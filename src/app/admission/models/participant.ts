export class Participant {
    id!:string;
    cedula!:string;
    name!: string;
    lastName!:string;
    gender!:string;
    userStatusId!:string;

  }

  export interface ApiResponse {
    participants: Participant[];
    message: string;
    isError: boolean;
    statusCode: number;
}


 export interface ApiResponseOne {
    participants: Participant;
    message: string;
    isError: boolean;
    statusCode: number;
}


export interface ParticipantActivity {
    getDataResultResponse: GetDataResultResponse[];
    message:               string;
    isError:               boolean;
    statusCode:            number;
}

export interface GetDataResultResponse {
    inscriptionId: number;
    activityName: string;
    firstName:     string;
    lastName:      string;
    cedula:        string;
    statusName:    string;
    fechaInscrito: Date;
}

 export interface DetailsParticipante {
    detailsResponse: DetailsResponse[];
    message:         string;
    isError:         boolean;
    statusCode:      number;
}

export interface DetailsResponse {
    inscriptionId:     number;
    firstName:         string;
    lastName:          string;
    secondsurname:     string;
    gender:            string;
    cedula:            string;
    email:             string;
    institution:       string;
    university:        string;
    dependency:        string;
    cooperatingEntity: string;
    position:          string;
    province:          string;
    judicialDistrict:  string;
    activityName:      string;
    startDate:         Date;
    inviationDate:     Date;
    duration:          number;
    totalHours:        number;
    activityMode:      string;
    activityType:      string;
    activityLocation:  string;
    observation:       string;
    createDate:        Date;
    name:              string;
}

export interface DetailsParticipanteEF {
  getDetailsResponse: DetailsResponseEF[];
  message:         string;
  isError:         boolean;
  statusCode:      number;
}

export interface DetailsResponseEF {
  inscriptionId: string,
  firstName: string,
  lastName: string,
  secondsurname: string,
  cedula: string,
  email: string,
  telephoneNumber: string,
  gender: string,
  bloodtype: string,
  maritalStatus: string,
  nameOfspouse: string,
  numberofchildren: number,
  caseOfemergency: string,
  telephoneNumberEmergency: string,
  specialCapacity: string,
  degreeName: string,
  durationInYears: number,
  studyModeName: string,
  numOfCredits: number,
  statusName: string,
  visual: boolean,
  auditory: boolean,
  cognitive: boolean,
  physical: boolean,
  usesAwheelchair:boolean,
  others: string,
  specific:string,
  observation:string
}


export interface AcadInfoResponseEF {
  inscriptionResponse: AcadInfoEF[];
  message:         string;
  isError:         boolean;
  statusCode:      number;
}


export interface  AcadInfoEF {
  institutionOfeducation: string,
  program: string,
  obtainedTitle: string,
  year: number
}

export interface ExperienceInfoResponseEF {
  experienceInfoResponse: ExperienceInfoEF[];
  message:         string;
  isError:         boolean;
  statusCode:      number;
}


export interface  ExperienceInfoEF {
  id?: number,
  entidad: string,
  position: string,
  period: string,
  months: string
}


export interface OrganoResponse{
  cedula: string,
  nombre_completo: string,
  correo_electronico: string,
  institucion: string,
  dependencia: string,
  codigo_dependencia: string,
  estado: string,
  cargo: string,
  codigo_cargo: string,
  posicion: string
}
