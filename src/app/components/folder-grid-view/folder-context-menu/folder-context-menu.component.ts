import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Folder } from 'src/app/common/folder';
import { DownloadService } from 'src/app/services/download.service';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';
import { ResourceService } from 'src/app/services/resource.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.css']
})
export class FolderContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;
  @Input() folder : Folder;

  @Output("onOpenFolder")
  onOpenFolder = new EventEmitter();

  @Output("onCreateNewFolder")
  onCreateNewFolder = new EventEmitter();

  @Output("onFolderDelete")
  onFolderDelete = new EventEmitter();

  @Output("onChangeName")
  onChangeName = new EventEmitter();

  constructor(
    private folderService: FolderService,
    private selectionService: SelectionService,
    private resourceService: ResourceService,
    private downloadService: DownloadService,
    private fileService: FileService
    ) { }

  ngOnInit(): void {
  }

  openFolder($event: MouseEvent){
    $event.stopPropagation();
    this.onOpenFolder.emit(this.folder);
  }

  createNewFolder($event: MouseEvent){
    $event.stopPropagation();

    this.onCreateNewFolder.emit(this.folder);
  }

  downloadSelection(){

      this.downloadService.downloadResources(this.selectionService.selectedResources)
  }

  deleteFolder($event: MouseEvent){
    $event.stopPropagation();

    const selection = this.selectionService.selectedResources;
    if(selection.length > 1){
      this.resourceService.deleteResources(selection)
      .subscribe((event: any) => {

        if(event.status == 200)
          this.removeResources(selection);
        //this.onFolderDelete.emit(this.folder)

      })
      return;
    }

    this.folderService.deleteFolder(this.folder)
    .subscribe((event: any) => {
      if(event.status == 200)
        this.folderService.onFolderDelete.emit(this.folder);
      //this.onFolderDelete.emit(this.folder)
    })
  }

  removeResources(selection: any){
    let folders: Folder[] = [];
    let files: File[] = [];

    selection.forEach((r: any) => {

      if(r.folderType !== undefined)
        folders.push(r as Folder);
      else
        files.push(r as File);
    })

    for(let f of folders){
      this.folderService.onFolderDelete.emit(f);
    }
    for(let f of files){
      this.fileService.onFileDelete.emit(f);
    }
  }

  rename($event: MouseEvent){
    $event.stopPropagation();
    this.onChangeName.emit(this.folder);
  }

}
