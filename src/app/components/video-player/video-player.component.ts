import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  videoUrl: string = "";

  @ViewChild('player')
  videoPlayer: ElementRef;

  shouldPlay = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.onPlayVideo.subscribe((url: string) =>{
      this.videoUrl = url;
    });

    this.playerService.isPlaying.subscribe(isPlaying => {
      this.managePlayer(isPlaying)
    })
  }

  playerError($event: ErrorEvent) {
    console.log($event);
  }

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    this.playerService.isPlaying.next(false);
  }

  onLoad($event: any){
    console.log($event)
  }

  private managePlayer(isPlaying: boolean) {
    console.log(isPlaying)
    if(isPlaying)
      this.videoPlayer.nativeElement.play();
    else
      this.videoPlayer.nativeElement.pause();
  }

  onPlayerClick($event: MouseEvent) {
    $event.stopPropagation();
  }
}
