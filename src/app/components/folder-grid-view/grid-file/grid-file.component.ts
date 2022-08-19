import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from 'src/app/common/file';
import { DownloadService } from 'src/app/services/download.service';
import {PlayerService} from "../../../services/player.service";
import {faFile, faFolder} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-grid-file',
  templateUrl: './grid-file.component.html',
  styleUrls: ['./grid-file.component.css']
})
export class GridFileComponent implements OnInit {




  constructor(
    private downloadService: DownloadService,
    private playerService: PlayerService
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

  ngOnInit(): void {
  }

  onDoubleClick($event: MouseEvent){
    //$event.stopPropagation()

    this.downloadFile()
    // if(this.isSingleClick){
    //
    //   this.isSingleClick = false;
    // }
    // this.isSingleClick = true;
    // setTimeout(()=>{
    //   this.isSingleClick = false
    // },250)
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
    this.playerService.playVideo(this.file.id)
  }
}
