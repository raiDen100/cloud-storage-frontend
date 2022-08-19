import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentFolder } from 'src/app/common/current-folder';
import { FolderService } from 'src/app/services/folder.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Folder } from 'src/app/common/folder';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from 'src/app/common/file';
import { DownloadService } from 'src/app/services/download.service';
import { UploadService } from 'src/app/services/upload.service';
import { BasicFolder } from 'src/app/common/basic-folder';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { SelectionService } from 'src/app/services/selection.service';
import { FileService } from 'src/app/services/file.service';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {PlayerService} from "../../services/player.service";


interface FolderView{
  name: string;
  children: Folder[]
}


@Component({
  selector: 'app-folder-grid-view',
  templateUrl: './folder-grid-view.component.html',
  styleUrls: ['./folder-grid-view.component.css']
})
export class FolderGridViewComponent implements OnInit {

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;

  currentFolder: CurrentFolder = new CurrentFolder();
  contextFolder: Folder;
  contextFile: File;
  token = "";

  contextMenuPos = {x: 0, y: 0};

  folderContextMenu = false;
  currentFolderContextMenu = false;
  fileContextMenu = false;

  newFolderDialog = false;
  renameDialog = false;

  isSingleClick: boolean = false;

  newFolderParent: Folder;
  renameResource: (Folder | File);

  selected: (Folder | File)[] = [];
  allowDragSelection: boolean = true;
  allowClickSelection: boolean = true;
  faArrowLeft = faArrowLeft;

  constructor(
    private folderService: FolderService,
    private fileService: FileService,
    private loginService: LoginServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    private selectionService: SelectionService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {

    const hasFolderId = this.route.firstChild?.snapshot.paramMap.has("id");
    var folderId: string = String(this.route.firstChild?.snapshot.paramMap.get("id"));

    this.token = this.loginService.getToken();
    if (hasFolderId)
      this.getFolderContent(folderId);
    else
      this.getMainFolderContent();

      this.uploadService.onFileUpload.subscribe((file: File) => {
        if(this.currentFolder.id === file.parentFolder.id)
          this.addFileToCurrentFolder(file);
      })

      this.folderService.onFolderChange.subscribe((folder: Folder) => {
        this.updateFolder(folder);
      });

      this.folderService.onFolderDelete.subscribe((folder: Folder) => {
        this.deleteFolder(folder);
      });

      this.fileService.onFileDelete.subscribe((file: File) => {
        this.deleteFile(file);
      });
  }

  addFileToCurrentFolder(file: File) {
    this.currentFolder.files.push(file);
  }

  updateFolder(folder: Folder){
    const index = this.currentFolder.folders.findIndex(f => f.id === folder.id)
    if(index != -1){
      this.currentFolder.folders[index] = folder;
    }
    else{
      this.currentFolder.folders.push(folder);
    }
    this.newFolderDialog = false;
    this.hideContextMenus();
  }

  deleteFolder(folder: Folder){
    const index = this.currentFolder.folders.findIndex(f => f.id === folder.id)
    if(index != -1)
      this.currentFolder.folders.splice(index, 1);

      this.hideContextMenus();
  }

  deleteFile(file: File){
    const index = this.currentFolder.files.findIndex(f => f.id === file.id)
    if(index != -1)
      this.currentFolder.files.splice(index, 1);

      this.hideContextMenus();
  }

  openFolder(folder: Folder){
    this.hideContextMenus();

    this.router.navigate(["drive", folder.id]);
    this.getFolderContent(folder.id);
  }

  openParentFolder(){
    if(this.currentFolder.parentFolder == null)
      return;
    this.router.navigate(["drive", this.currentFolder.parentFolder.id]);
    this.getFolderContent(this.currentFolder.parentFolder.id);
  }

  onDoubleClick(){

    if(this.isSingleClick){
      this.openParentFolder()
      this.isSingleClick = false;
    }
    this.isSingleClick = true;
    setTimeout(()=>{
      this.isSingleClick = false
    },250)

  }


  getFolderContent(folderId: string) {
    this.folderService.getFolderContent(folderId).subscribe((response: CurrentFolder) => {

      this.currentFolder = response;
    });
  }

  handleFileUpload($event: any, folder: BasicFolder){

    this.uploadService.addFilesToUpload($event, folder);
  }

  getMainFolderContent(){
    this.folderService.getMainFolderContent().subscribe((response: CurrentFolder) => {

      this.currentFolder = response
    });
  }

  showFolderContextMenu($event: any){

    this.selectOneIfOutOfSelection($event.folder)

    this.contextMenuPos.x = $event.x;
    this.contextMenuPos.y = $event.y;
    this.contextFolder = $event.folder;
    this.folderContextMenu = true;
    this.currentFolderContextMenu = false;
    this.fileContextMenu = false;
  }

  private selectOneIfOutOfSelection(resource: any){
    if(!this.selected.includes(resource)){
      this.selectContainer.clearSelection();
      this.selectContainer.selectItems((r:any) => {
        return r.id === resource.id
      })
    }
  }

  showCurrentFolderContextMenu($event: any){
    $event.preventDefault();

    this.contextMenuPos.x = $event.x;
    this.contextMenuPos.y = $event.y;
    this.contextFolder = $event.folder;
    this.currentFolderContextMenu = true;
    this.folderContextMenu = false;
    this.fileContextMenu = false;
  }

  showFileContextMenu($event: any){
    this.selectOneIfOutOfSelection($event.file)

    this.contextMenuPos.x = $event.x;
    this.contextMenuPos.y = $event.y;
    this.contextFile = $event.file;
    this.currentFolderContextMenu = false;
    this.folderContextMenu = false;
    this.fileContextMenu = true;
  }

  showRenameDialog($event: any){
    this.hideContextMenus();

    this.renameResource = $event;
    this.renameDialog = true;
  }

  onClick($event: MouseEvent){
    $event.stopPropagation()

    this.hideContextMenus()
  }

  onRightClick(event: MouseEvent){
    event.preventDefault();

    this.showCurrentFolderContextMenu({x: event.clientX, y: event.clientY, folder: this.currentFolder});
  }

  createNewFolder($event: Folder){
    this.hideContextMenus();

    this.newFolderDialog = true;
    this.newFolderParent = $event;
  }

  reloadCurrentFolder(){
    this.newFolderDialog = false;
    this.hideContextMenus();
    this.getFolderContent(this.currentFolder.id)
  }


  hideContextMenus(){
    this.folderContextMenu = false;
    this.currentFolderContextMenu = false;
    this.fileContextMenu = false;
    this.newFolderDialog = false;
    this.renameDialog = false;
    this.playerService.isPlaying.next(false);
  }

  onResourceMouseDown($event: any, resource: any){
    this.allowDragSelection = false;

    if(this.selected.includes(resource))
      this.allowClickSelection = false;
  }

  onResourceDragEnd($event: any){
    this.allowDragSelection = true;
    this.allowClickSelection = true;

  }

  updateSelection($event: (Folder | File)[]){
    this.selectionService.updateSelection($event);
  }

  handleSubfolderFileUpload($event: any, folder: Folder){

    this.uploadService.addFilesToUpload($event, folder);
  }

  calculateSelectionArea(){
    this.selectContainer.update();
  }

}
