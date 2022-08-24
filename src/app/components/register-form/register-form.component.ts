import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  password: string = "";
  username: string = "";
  displayName: string = "";

  loginErrorCode: number = -1;

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.username.length < 3 || this.password.length < 3 || this.displayName.length < 3){
      this.loginErrorCode = -2;
      return;
    }

    this.loginService.register(this.username, this.displayName, this.password)
      .subscribe({
        next: response => {
          this.router.navigate(['/'])
        },
        error: err => {
          this.loginErrorCode = err.status
        }
      });

  }
}
