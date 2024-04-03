import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class EncryptDescryptService {
  public key: string ="DKJFKJD(F=)(SD)=F(=)DLJkljl";

  constructor() { }

  encrypt(msj: string): string{
    const value = btoa(AES.encrypt(msj, this.key).toString());
    return value;
  }

  decrypt(msj: string): string{
    const bytes  = AES.decrypt(atob(msj), this.key);
    const plaintext = bytes.toString(enc.Utf8);
    return plaintext;
  }
}
