import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasicFolder } from '../common/basic-folder';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private loginService:LoginServiceService, private httpClient: HttpClient) { }

  filesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  onFileUpload = new EventEmitter();

  url: string = environment.baseUrl + "/file/upload";

  addFilesToUpload(files: any[], folder: BasicFolder){

    for(const item of files)
      this.filesSubject.next({file: item.webkitGetAsEntry(), folder: folder});

  }

  upload(file:any, folder: BasicFolder){
    var formData = new FormData();
    formData.append("files", file);

    return this.httpClient.post(`${this.url}/${folder.id}`, formData, { reportProgress: true, observe: 'events'})
  }
}
