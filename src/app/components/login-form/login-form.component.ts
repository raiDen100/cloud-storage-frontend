import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import {JWTTokenService} from "../../services/jwttoken.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: string = "";
  password: string = "";

  loginErrorCode: number = -1;

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtTokenService: JWTTokenService) { }

  submit(){
    if (this.username.length < 3 || this.password.length < 3){
      this.loginErrorCode = -2;
      return;
    }

    localStorage.removeItem("token");
    this.loginService.login(this.username, this.password)
      .subscribe({
      next: response => {

        localStorage.setItem("token", response.token);
        this.router.navigate(['drive'], { relativeTo: this.route})
      },
      error: err => {
        this.loginErrorCode = err.status
      }
    });

  }

  ngOnInit(): void {
    if (this.loginService.getToken() !== "" && !this.jwtTokenService.isTokenExpired())
      this.router.navigate(["/drive"])
  }

}
