import { HttpEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import {Component, EventEmitter, HostListener, NgZone, OnInit, Output} from '@angular/core';
import { BasicFolder } from 'src/app/common/basic-folder';
import { File } from 'src/app/common/file';
import { Folder } from 'src/app/common/folder';
import { SelectionService } from 'src/app/services/selection.service';
import { UploadService } from 'src/app/services/upload.service';
import {FolderService} from "../../services/folder.service";
import {Subscription} from "rxjs";

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

  promiseSubscription: Subscription;
  fileSubscription: Subscription;
  errorFiles: any[] = [];


  constructor(
    private selectionService: SelectionService,
    private uploadService: UploadService,
    private folderService: FolderService,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.fileSubscription = this.uploadService.filesSubject.subscribe(f => {
      if(f !== undefined && f.file !== null){
        this.addFile(f);
      }

    })

    this.promiseSubscription = this.onPromise.subscribe(x => {
      this.errorFiles = []
      this.uploadFiles.push({file: x.f, percentage: 0, folder: x.r.folder, status: "pending"});
      if(!this.shouldDownload){
        this.upload();
      }
      this.shouldDownload = true
    })
  }

  ngOnDestroy(){
    this.fileSubscription.unsubscribe();
    this.promiseSubscription.unsubscribe();
  }

  addFile(r: any){
    if (r.file.isDirectory === undefined){
      this.onPromise.next({f: r.file, r: r});
      return;
    }
    else if (r.file.isDirectory){
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

    r.status = "uploading"
    this.uploadService.upload(r.file, r.folder).subscribe((event: any) =>{
      this.reportStatus(r.file, event)
      if(event.type === 4 && event.status === 200){
        this.uploadFiles.shift();
        this.onFileUploaded.emit(r);
        this.uploadService.onFileUpload.emit(event.body);
        this.upload();
      }
    },(error) => {
      this.errorFiles.push(this.uploadFiles.shift());
      this.upload();
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

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("File upload progesss will be lost");

    if (this.uploadFiles.length > 0)
      event.returnValue = false;
  }

  onClick(){

  }

  removeErrorFile(file: any) {
    const index = this.errorFiles.findIndex((f) => f === file)
    if (index > -1)
      this.errorFiles.splice(index, 1);

  }

  removeFromUpload(r: any) {
    const index = this.uploadFiles.findIndex((rr) => r === rr);
    this.uploadFiles.splice(index, 1);
  }
}
