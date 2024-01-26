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