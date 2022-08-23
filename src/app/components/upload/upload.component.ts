import { HttpEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import { BasicFolder } from 'src/app/common/basic-folder';
import { File } from 'src/app/common/file';
import { Folder } from 'src/app/common/folder';
import { SelectionService } from 'src/app/services/selection.service';
import { UploadService } from 'src/app/services/upload.service';
import {FolderService} from "../../services/folder.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadFiles: any[] = [];
  shouldDownload: boolean = false;

  @Output("onFileUploaded")
  onFileUploaded = new EventEmitter()
  onPromise = new EventEmitter()


  constructor(
    private selectionService: SelectionService,
    private uploadService: UploadService,
    private folderService: FolderService,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.uploadService.filesSubject.subscribe(f => {
      if(f !== undefined){
        this.addFile(f);

      }

    })

    this.onPromise.subscribe(x => {
      this.uploadFiles.push({file: x.f, percentage: 0, folder: x.r.folder, status: "pending"});
      if(!this.shouldDownload){

        this.upload();
      }
      this.shouldDownload = true
    })
  }

  addFile(r: any){
    if (r.file.isDirectory){
      const entry = r.file
      const reader = entry.createReader();


      this.folderService.createNewFolder(r.folder, entry.name).subscribe(data => {
        this.folderService.onFolderChange.emit(data);

        reader.readEntries((entries: any) => {
          entries.forEach((dir: any, key: any) => {

            this.zone.run(() => {
              this.uploadService.filesSubject.next({file: dir, folder: data})
            })
          })
        });
      })
      return;
    }

    r.file.file((f: any) => {
      this.zone.run(() =>{
        this.onPromise.next({f: f, r: r});
      })
    })
  }

  upload(){
    if(this.uploadFiles.length === 0){
      this.shouldDownload = false;
      return;
    }
    const r = this.uploadFiles[0];

    this.uploadService.upload(r.file, r.folder).subscribe(event =>{
      this.reportStatus(r.file, event)
      if(event.type === 4 && event.status === 200){
        this.uploadFiles.shift();
        this.onFileUploaded.emit(r);
        this.uploadService.onFileUpload.emit(event.body);
        this.upload();
      }
    });


  }

  reportStatus(file: any, event: HttpEvent<Object>){

    for(const r of this.uploadFiles){
      const f = r.file;
      if(file === f && event.type === 1){
        r.percentage = event.loaded / event.total! * 100;
      }
    }
  }

  onClick(){

  }
}
