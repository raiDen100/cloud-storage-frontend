import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from 'src/app/common/file';
import { DownloadService } from 'src/app/services/download.service';
import {PlayerService} from "../../../services/player.service";
import {faBorderAll, faCirclePlay, faFile, faFilm, faFolder, faPlay} from "@fortawesome/free-solid-svg-icons";
import {FileService} from "../../../services/file.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-grid-file',
  templateUrl: './grid-file.component.html',
  styleUrls: ['./grid-file.component.css']
})
export class GridFileComponent implements OnInit {




  constructor(
    private downloadService: DownloadService,
    private playerService: PlayerService,
    private fileService: FileService
    ) { }

  @Input("file")
  file: File;

  @Output()
  contextMenu = new EventEmitter();

  // @Output("onDoubleClick")
  // onDoubleClick = new EventEmitter();

  @Output("onThumbnailLoaded")
  onThumbnailLoaded = new EventEmitter();

  isThumbnailLoaded: boolean = false;
  imageBlockDisplay: string = "none";
  faFile = faFile;
  faPlay = faCirclePlay
  faFilm = faFilm


  thumbnailUrl: string;
  baseUrl: string = environment.baseUrl;

  loadedAt: number;

  ngOnInit(): void {
    console.log(this.file);
    this.thumbnailUrl = this.baseUrl + '/thumbnail/' + this.file.id;
    this.loadedAt = new Date().getTime();
  }

  onDoubleClick($event: MouseEvent){
    //$event.stopPropagation()

    this.downloadFile()
  }

  thumbnailLoaded(){

    this.imageBlockDisplay = "";
    this.isThumbnailLoaded = true;
    this.onThumbnailLoaded.emit(true);
  }

  downloadFile(){
    this.downloadService.downloadFile(this.file);
  }

  onRightClick($event: MouseEvent){
    $event.preventDefault();
    $event.stopPropagation()

    this.contextMenu.emit({x: $event.clientX, y: $event.clientY, file: this.file});
}

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    if (this.isPlayable())
      this.playerService.playVideo(this.file.id)
    else{
      this.playerService.videoId = this.file.id
      this.playerService.playerError.next(true);
    }
  }

  loadError($event: ErrorEvent) {

    const currentTime = new Date().getTime();
    if (currentTime - this.loadedAt > 15000)
      return;

    setTimeout(() => {
      this.thumbnailUrl += "?1";
    }, 1500);
  }

  isPlayable(){
    return this.playerService.supportedTypes.includes(this.file.fileType);
  }

  shouldHaveThumbnail(){
    for(let type of this.fileService.shouldHaveThumbnail){
      if (this.file.fileType.includes(type))
        return true
    }
    return false;
  }

  isVideoType() {
    return this.file.fileType.includes("video") || this.file.fileType.includes("x-matroska")
  }
}
