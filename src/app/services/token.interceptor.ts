import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";
import {LoginServiceService} from "./login-service.service";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginServiceService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
