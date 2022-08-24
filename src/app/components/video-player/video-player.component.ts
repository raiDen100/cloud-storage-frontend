import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  videoUrl: string;

  @ViewChild('player')
  videoPlayer: ElementRef;

  shouldPlay = false;

  onPlayVideoSubscription: Subscription;
  isPlayingSubscription: Subscription;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.onPlayVideoSubscription = this.playerService.onPlayVideo.subscribe((url: string) =>{
      this.videoUrl = url;
    });

    this.isPlayingSubscription = this.playerService.isPlaying.subscribe(isPlaying => {
      if (this.videoPlayer !== undefined)
        this.managePlayer(isPlaying)
    })
  }

  ngOnDestroy(){
    this.onPlayVideoSubscription.unsubscribe();
    this.isPlayingSubscription.unsubscribe();
  }

  playerError($event: ErrorEvent) {
    this.playerService.isPlaying.next(false);
    if (this.videoUrl != "" && this.videoUrl !== undefined)
    this.playerService.playerError.next(true);
  }

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    this.playerService.isPlaying.next(false);
  }

  onLoad($event: any){

  }

  private managePlayer(isPlaying: boolean) {
    if(isPlaying)
      this.videoPlayer.nativeElement.play();
    else
      this.videoPlayer.nativeElement.pause();
  }

  onPlayerClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  onKeyDown($event: KeyboardEvent) {


    if ($event.code === "ArrowRight") {
      const seconds = this.videoPlayer.nativeElement.currentTime;
      this.videoPlayer.nativeElement.currentTime = seconds + 10;
      $event.preventDefault();
    }
    else if ($event.code === "ArrowLeft"){
      const seconds = this.videoPlayer.nativeElement.currentTime;
      this.videoPlayer.nativeElement.currentTime = seconds - 10;
      $event.preventDefault();
    }
    else if($event.code === "ArrowUp"){
      const volume = this.videoPlayer.nativeElement.volume;
      this.videoPlayer.nativeElement.volume = volume + 0.1 > 1 ? 1 : volume + 0.1;
      $event.preventDefault();
    }
    else if($event.code === "ArrowDown"){
      const volume = this.videoPlayer.nativeElement.volume;
      this.videoPlayer.nativeElement.volume = volume - 0.1 < 0 ? 0 : volume - 0.1;
      $event.preventDefault();
    }
  }
}
