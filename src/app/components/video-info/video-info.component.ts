import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {

  @ViewChild("resourceUrl")
  resourceUrlInput: any;

  constructor(private playerService: PlayerService) { }

  vlcHelpUrl = "https://www.vlchelp.com/stream-online-videos-pc-vlc-media-player/#:~:text=In%20VLC%20Media%20Player%2C%20on,click%20on%20the%20Play%20button."
  url: string = "";

  ngOnInit(): void {
    this.url = this.getVideoUrl();
  }

  ngAfterViewInit(){
    this.resourceUrlInput.nativeElement.focus();
  }

  onButtonClick($event: MouseEvent){
    $event.stopPropagation();

    this.resourceUrlInput.nativeElement.select();
  }

  onCardClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  closeCard(){
    this.playerService.playerError.next(false);
  }
  getVideoUrl(){
    return this.playerService.getVideoUrl();
  }
}
