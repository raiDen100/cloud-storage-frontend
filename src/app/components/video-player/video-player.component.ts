import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  videoUrl: string = "";

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.onPlayVideo.subscribe((url: string) =>{
      this.videoUrl = url;
    });
  }

  playerError($event: ErrorEvent) {
    console.log($event);
  }

  onClick($event: MouseEvent) {
    $event.stopPropagation();
  }
}
