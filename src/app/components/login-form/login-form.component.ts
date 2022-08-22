import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private loginService: LoginServiceService, private router: Router, private route: ActivatedRoute) { }

  submit(){
    localStorage.removeItem("token");
    this.loginService.login(this.username, this.password)
      .subscribe({
      next: response => {

        localStorage.setItem("token", response.token);
        this.router.navigate(['drive'], { relativeTo: this.route})
      },
      error: err => {
        alert(err.message);
      }
    });;

  }

  ngOnInit(): void {
  }

}
