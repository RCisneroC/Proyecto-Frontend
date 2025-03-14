import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError((err: any) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        if (err.status === 401) {
         
          location.reload();
        }
        //fix no capturaban errores
        return next.handle(request);
      })
    );
  }







}
