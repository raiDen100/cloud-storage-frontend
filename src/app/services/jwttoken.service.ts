import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {LoginServiceService} from "./login-service.service";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  decodedToken :any;

  constructor(private loginService: LoginServiceService) { }

  decodeToken(){
    if (localStorage.getItem("token")){
      this.decodedToken = jwtDecode(this.loginService.getToken())
    }
  }

  getDecodeToken() {
    return jwtDecode(this.loginService.getToken());
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
