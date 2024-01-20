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

 

