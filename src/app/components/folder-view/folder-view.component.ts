import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {Router} from "@angular/router";
import {JWTTokenService} from "../../services/jwttoken.service";

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private jwtTokenService: JWTTokenService
  ) { }

  ngOnInit(): void {

    if (this.loginService.getToken() === "" || this.jwtTokenService.isTokenExpired())
      this.router.navigate(["/"])
  }


}
