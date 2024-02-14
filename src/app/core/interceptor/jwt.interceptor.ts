import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMThiZTljMC1hYTY1LTRhZjgtYmQxNy0wMGJkOTM0NGU1NzUiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm5hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE3Njc5MzA2NDgsImlzcyI6IkF1dGhlbnRpY2F0aW9uU2VydmljZSIsImF1ZCI6IkF1dGhlbnRpY2F0aW9uU2VydmljZSJ9.0DCi5INmS-6-G0QAcdrg8TGoF0VlDutHu7A7I4VbagM`,
        },
      });
    }

    return next.handle(request);
  }
}
