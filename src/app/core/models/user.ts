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

   constructor() {
    this.id = '';
    this.img = '';
    this.cedula = '';
    this.userName = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.emailConfirm = false;
    this.email = '';
    this.statusId = 0;
    this.gender = '';
    this.phoneNumber = '';
    this.createdDate = new Date().toISOString(); // Fecha actual como predeterminada
    this.isRegistered = false;
    this.token = '';
    this.roles = [];
    this.role = '';
    this.roleId = '';
    this.menus = [];
 }
}


export interface ResetPetitionResponse {
  email: string,
  token: string,
  statusCode: number
}


