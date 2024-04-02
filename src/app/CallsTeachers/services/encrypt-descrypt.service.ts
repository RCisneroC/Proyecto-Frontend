import { Injectable } from '@angular/core';
import { AES } from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class EncryptDescryptService {
  public key: string ="DKJFKJD(F=)(SD)=F(=)DLJkljl";

  constructor() { }

  encrypt(msj: string): string{
    return btoa(AES.encrypt(msj,this.key).toString());
  }

  decrypt(msj: string): string{
    return AES.decrypt(atob(msj),this.key).toString();
  }
}
