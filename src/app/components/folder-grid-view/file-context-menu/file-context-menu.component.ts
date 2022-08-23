import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from 'src/app/common/file';
import { Folder } from 'src/app/common/folder';
import { DownloadService } from 'src/app/services/download.service';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';
import { ResourceService } from 'src/app/services/resource.service';
import { SelectionService } from 'src/app/services/selection.service';
import {UploadService} from "../../../services/upload.service";

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.css']
})
export class FileContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;
  @Input() file : File;


  @Output("onCreateNewFolder")
  onCreateNewFolder = new EventEmitter();

  @Output("onFileDelete")
  onFileDelete = new EventEmitter();

  @Output("onFileDownload")
  onFileDownload = new EventEmitter();

  @Output("onChangeName")
  onChangeName = new EventEmitter();

  constructor(
    private downloadService: DownloadService,
    private fileService: FileService,
    private selectionService: SelectionService,
    private resourceService: ResourceService,
    private folderService: FolderService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  private download(){

    if(this.selectionService.selectedResources.length > 1)
      this.downloadService.downloadResources(this.selectionService.selectedResources)
    else
      this.downloadService.downloadFile(this.file);
  }

  downloadFile($event: MouseEvent){
    //$event.stopPropagation();
    this.download()
    this.onFileDownload.emit(this.file);

  }

  openFilePicker($event: MouseEvent) {
    this.uploadService.onOpenFilePicker.next(this.file.parentFolder);
  }

  createNewFolder($event: MouseEvent){
    $event.stopPropagation();
    this.onCreateNewFolder.emit(this.file.parentFolder);
  }

  deleteFile($event: MouseEvent){
    $event.stopPropagation();
    const selection = this.selectionService.selectedResources
    if(selection.length > 1){
      this.resourceService.deleteResources(selection)
      .subscribe((event: any) => {

        if(event.status == 200)
          this.removeResources(selection);
        //this.onFolderDelete.emit(this.folder)

      })
      return;
    }

    this.fileService.deleteFile(this.file)
    .subscribe((event: any) => {
      if(event.status == 200)
        this.fileService.onFileDelete.emit(this.file);
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
    this.onChangeName.emit(this.file);
  }


}
