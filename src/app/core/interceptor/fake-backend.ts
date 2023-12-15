import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../models/user';

const users: User[] = [
  {

    id: "2",
    img: 'assets/images/user/admin.jpg',
    userName: 'admin@admin.com',
    password: 'Panama2023$',
    firstName: 'Sarah',
    lastName: 'Smith',
    emailConfirm:false,
    email:"rcisnero@gmail.com",
    status:true,
    phoneNumber:null,
    createdDate:"2023-12-13T14:52:26.6536691",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDI0OTY5MzMsImlzcyI6IkF1dGhlbnRpY2F0aW9uU2VydmljZSIsImF1ZCI6IkF1dGhlbnRpY2F0aW9uU2VydmljZSJ9.dE4avVEmXCL2AL3V0isQALnr2iQHt5GyuRxrX6okPJs',
    roles: []
  },
];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/account/Login') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { userName, password } = body;
      const user = users.find(
        (x) => x.userName === userName && x.password === password
      );
      if (!user) {
        return error('El nombre de usuario o la contraseña son incorrectos');
      }
      return ok({
        id: user.id,
        img: user.img,
        password: user.password,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?: {
      id: string;
      img: string;
      password: string,
      userName: string;
      firstName: string;
      lastName: string;
      token: string;
    }) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
