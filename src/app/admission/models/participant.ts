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