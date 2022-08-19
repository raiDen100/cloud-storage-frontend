import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from 'src/app/common/file';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-grid-file',
  templateUrl: './grid-file.component.html',
  styleUrls: ['./grid-file.component.css']
})
export class GridFileComponent implements OnInit {




  constructor(private downloadService: DownloadService) { }

  @Input("file")
  file: File;

  @Output() 
  contextMenu = new EventEmitter();

  @Output("onDoubleClick") 
  onDoubleClick = new EventEmitter();

  @Output("onThumbnailLoaded") 
  onThumbnailLoaded = new EventEmitter();

  isSingleClick: boolean = false;
  isSelected: boolean = false;
  isThumbnailLoaded: boolean = false;
  imageBlockDisplay: string = "none";

  ngOnInit(): void {
  }

  onClick($event: MouseEvent){
    //$event.stopPropagation()

    if(this.isSingleClick){
      this.onDoubleClick.emit(this.file);
      this.downloadFile()
      this.isSingleClick = false;
    }
    this.isSingleClick = true;
    setTimeout(()=>{
      this.isSingleClick = false
    },250)
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

}
