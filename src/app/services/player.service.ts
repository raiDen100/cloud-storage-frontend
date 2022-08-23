import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  onPlayVideo = new EventEmitter();
  isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  playerError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  videoId: string = ""

  supportedTypes = [
    "video/quicktime",
    "video/mp4"
  ]

  constructor() { }

  playVideo(fileId: string){
    this.isPlaying.next(true);
    this.onPlayVideo.emit(`http://192.168.1.75:8080/api/download/${fileId}`);
  }

  getVideoUrl(){
    return `http://192.168.1.75:8080/api/download/${this.videoId}`
  }
}
