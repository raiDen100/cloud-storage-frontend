import { HttpEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicFolder } from 'src/app/common/basic-folder';
import { File } from 'src/app/common/file';
import { Folder } from 'src/app/common/folder';
import { SelectionService } from 'src/app/services/selection.service';
import { UploadService } from 'src/app/services/upload.service';

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

  constructor(private selectionService: SelectionService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.uploadService.filesSubject.subscribe(f => {
      if(f !== undefined){
        this.addFile(f);
        this.shouldDownload = true
      }

    })
  }

  addFile(r: any){
    this.uploadFiles.push({file: r.file, percentage: 0, folder: r.folder, status: "pending"});

    if(!this.shouldDownload){
      this.upload();
    }
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
