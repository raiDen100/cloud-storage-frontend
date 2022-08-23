import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  onPlayVideo = new EventEmitter();
  isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  playerError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  videoId: string = ""

  baseUrl: string = environment.baseUrl;

  supportedTypes = [
    "video/quicktime",
    "video/mp4"
  ]

  constructor() { }

  playVideo(fileId: string){
    this.isPlaying.next(true);
    this.onPlayVideo.emit(`${this.baseUrl}/download/${fileId}`);
  }

  getVideoUrl(){
    return `${this.baseUrl}/download/${this.videoId}`
  }
}
