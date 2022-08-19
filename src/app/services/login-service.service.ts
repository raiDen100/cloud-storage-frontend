import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginRequest } from '../common/login-request';
import { Token } from '../common/token';
import {JWTTokenService} from "./jwttoken.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private authUrl = "http://192.168.1.75:8080/api/authenticate";

  login(username: string, password: string){
    const payload = new LoginRequest(username, password);
    return this.sendLoginRequest(payload);
  }

  getToken(): string{
    const token: string | null= localStorage.getItem("token");
    if (token === null)
      return "";
    return token;
  }

  sendLoginRequest(loginRequest: LoginRequest){
    return this.httpClient.post<Token>(this.authUrl, loginRequest)
  }
}
