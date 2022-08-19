import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, single } from 'rxjs';
import { Folder } from 'src/app/common/folder';
import { SelectionService } from 'src/app/services/selection.service';
import { UploadService } from 'src/app/services/upload.service';
import {LoginServiceService} from "../../../services/login-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {fa6, faFolder} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-grid-folder',
  templateUrl: './grid-folder.component.html',
  styleUrls: ['./grid-folder.component.css']
})
export class GridFolderComponent implements OnInit {


  @Input("folder")
  folder: Folder;

  @Output()
  contextMenu = new EventEmitter();

  @Output("onDoubleClick")
  onDoubleClick = new EventEmitter();

  isSingleClick: boolean = false;
  isSelected:boolean = false;

  faFolder = faFolder;


  constructor(
    private uploadService: UploadService,
    private selectionService: SelectionService,
    private loginService: LoginServiceService,
    private router: Router) { }

  ngOnInit(): void {
    // this.selectionService.selectedFolders.forEach((f) =>{
    //     if(f.id === this.folder.id)
    //       this.isSelected = true;
    // })

  }




  onClick($event: MouseEvent){
    //$event.stopPropagation()

    //this.select()

    if(this.isSingleClick){
      this.onDoubleClick.emit(this.folder);
      this.isSingleClick = false;
    }
    this.isSingleClick = true;
    setTimeout(()=>{
      this.isSingleClick = false
    },250)
  }

  onRightClick($event: MouseEvent){
      $event.preventDefault();
      $event.stopPropagation()

      this.contextMenu.emit({x: $event.clientX, y: $event.clientY, folder: this.folder});
  }
}
