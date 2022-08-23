import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { File } from 'src/app/common/file';
import { Folder } from 'src/app/common/folder';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  newName: string = "";

  @ViewChild('resourceName') input:any;

  @Input("resource")
  resource: any;

  @Output("onNameChange")
  onNameChange = new EventEmitter();

  constructor(private fileService: FileService, private folderService: FolderService) { }

  ngOnInit(): void {
    this.newName = this.resource.displayName;
  }

  ngAfterViewInit(){
    this.input.nativeElement.focus();
  }


  mainClick($event: MouseEvent){
    $event.stopPropagation();
  }

  rename($event: MouseEvent){
    if(this.resource.folderType !== undefined){
      this.folderService.renameFolder(this.resource, this.newName).subscribe(data =>{
        this.onNameChange.emit(true);
      });

    }
    else{
      this.fileService.renameFile(this.resource, this.newName).subscribe(data =>{
        this.onNameChange.emit(true);
      });

    }
  }

  closeCard($event: MouseEvent) {
    $event.stopPropagation();

    this.folderService.isRenameDialogOpen.emit(false);
  }
}
