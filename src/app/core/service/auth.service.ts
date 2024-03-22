import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {ResetPetitionResponse, User} from '../models/user';
import { environment } from 'environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login2(email: string, password: string): Observable<User> {
    //return this.http.post(`${environment.apiUrl+'Login'}`, data);
    return this.http.post<User>(`${environment.apiUrl + 'Login'}`, {
      email,
      password,
    })
  }

  login(email: string, password: string) {

    return this.http
      .post<User>(`${environment.apiUrl + 'Login'}`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;

        })
      );
  }

  logout() {

    // remove user from local storage to log user out
    // localStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('menu');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  resetPetition(email:string){
    return this.http.put<ResetPetitionResponse>(environment.apiUrl + "ResetPassword",{email: email})
  }

  SetDefaultPassword(UserId:string){
    return this.http.put<any>(environment.apiUrl + "SetDefaultPassword",{userId: UserId})
  }

  ConfirmResetPassword(email:string, token:string, password:string, confirmPassword:string){
    return this.http.put<any>(environment.apiUrl + "ConfirmResetPassword",{email: email, token: token, password:password, confirmPassword:confirmPassword})
  }
}
