import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from 'src/app/common/folder';
import { DownloadService } from 'src/app/services/download.service';
import {UploadService} from "../../../services/upload.service";

@Component({
  selector: 'app-current-folder-context-menu',
  templateUrl: './current-folder-context-menu.component.html',
  styleUrls: ['./current-folder-context-menu.component.css']
})
export class CurrentFolderContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;
  @Input() folder : Folder;

  @Output("onCreateNewFolder")
  onCreateNewFolder = new EventEmitter();

  constructor(private downloadService: DownloadService, private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  createNewFolder($event: MouseEvent){
    $event.stopPropagation();

    this.onCreateNewFolder.emit(this.folder);
  }

  download(){
    this.downloadService.downloadResources([this.folder]);
  }

  openFilePicker($event: MouseEvent) {
    this.uploadService.onOpenFilePicker.next(this.folder);
  }
}
