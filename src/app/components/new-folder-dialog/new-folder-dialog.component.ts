import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Folder } from 'src/app/common/folder';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.css']
})
export class NewFolderDialogComponent implements OnInit {

  newFolderName: string;

  @Output("onFolderAdded")
  onFolderAdded = new EventEmitter();

  @Input("parentFolder")
  parentFolder: Folder;

  @ViewChild('folderName') input:any;

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.input.nativeElement.focus();
  }

  mainClick($event: MouseEvent){
    $event.stopPropagation();
  }

  addFolder(){

    this.folderService.createNewFolder(this.parentFolder, this.newFolderName)
    .subscribe((data) => {
      this.folderService.onFolderChange.emit(data);
      this.onFolderAdded.emit(this.newFolderName);
      this.folderService.isNewFolderDialogOpen.emit(false);
    });
  }

  closeCard() {
    this.folderService.isNewFolderDialogOpen.emit(false);
  }
}
