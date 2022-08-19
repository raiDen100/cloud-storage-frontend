import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {Router} from "@angular/router";
import {JWTTokenService} from "../../services/jwttoken.service";
import {PlayerService} from "../../services/player.service";


@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private jwtTokenService: JWTTokenService,
    private playerService: PlayerService
  ) { }

  showVideoPlayer: boolean = false;

  ngOnInit(): void {

    if (this.loginService.getToken() === "" || this.jwtTokenService.isTokenExpired())
      this.router.navigate(["/"])

    this.playerService.isPlaying.subscribe(playing => {
      this.showVideoPlayer = playing;
    })
  }


  onClick($event: MouseEvent) {
    this.hideDialogWindows();
  }

  hideDialogWindows() {
    this.showVideoPlayer = false;
  }
}
