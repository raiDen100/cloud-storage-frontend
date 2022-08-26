import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BasicFolder } from '../common/basic-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';
import { ResourceService } from './resource.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private loginService:LoginServiceService,
              private httpClient: HttpClient,
              private resourceService: ResourceService) { }

  url: string = environment.baseUrl + "/download"

  downloadFile(file: File){
    let a = document.createElement('a');
    a.download = file.displayName;
    a.href = `${this.url}/${file.id}`;
    a.click();
  }

  downloadZipFile(fileId: string) {
    let a = document.createElement('a');
    a.href = `${this.url}/zip/${fileId}`;
    a.click();
  }

  downloadResources(resources: (Folder | File)[]){

      this.resourceService.zipResources(resources).subscribe((data: any) => {

        this.downloadZipFile(data.id);
      })
  }

}
