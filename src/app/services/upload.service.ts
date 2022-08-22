import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasicFolder } from '../common/basic-folder';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private loginService:LoginServiceService, private httpClient: HttpClient) { }

  filesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  onFileUpload = new EventEmitter();

  url: string = "http://192.168.1.75:8080/api/file/upload";

  addFilesToUpload(files: any[], folder: BasicFolder){

    for(const item of files)
      this.filesSubject.next({file: item, folder: folder});

  }

  upload(file:any, folder: BasicFolder){
    var formData = new FormData();
    formData.append("files", file);
    console.log(file)

    return this.httpClient.post(`${this.url}/${folder.id}`, formData, { reportProgress: true, observe: 'events'})
  }
}
