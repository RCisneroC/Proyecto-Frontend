import { MenuResponse } from "app/security/models/role";

export class User {
   id!: string;
   img!: string;
   cedula!: string;
   userName!: string;
   password!: string;
   firstName!: string;
   lastName!: string;
   emailConfirm!: boolean;
   email!: string;
   statusId!: number;
   gender!: string;
   phoneNumber!: string;
   createdDate!: string;
   isRegistered!: boolean;
   token!: string;
   roles!: string[];
   role!: string;
   roleId!: string;
   menus!: MenuResponse[];


}


export interface ResetPetitionResponse {
  email: string,
  token: string,
  statusCode: number
}


