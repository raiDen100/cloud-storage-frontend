import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BasicFolder } from '../common/basic-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private loginService:LoginServiceService, private httpClient: HttpClient, private resourceService: ResourceService) { }
  

  url: string = "http://192.168.1.75:8080/api/download"

  downloadFile(file: File){
    let a = document.createElement('a');
    a.download = file.displayName;
    a.href = `http://192.168.1.75:8080/api/download/${file.id}`;
    a.click();
  }

  downloadZipFile(fileId: string) {
    let a = document.createElement('a');
    a.href = `http://192.168.1.75:8080/api/download/zip/${fileId}`;
    a.click();
  }

  downloadResources(resources: (Folder | File)[]){
    console.log(resources);
    
      this.resourceService.zipResources(resources).subscribe((data: any) => {      
        console.log(data);
          
        this.downloadZipFile(data.id);
        //this.downloadZipFile(data);
      })
  }
  // downloadFile(file: File){
  //   const token = this.loginService.getToken();
  //   const headers = {
  //       "Authorization": `Bearer ${token}`
  //   }
  //   return this.httpClient.get(`${this.url}/${file.id}`, {headers: headers, observe: 'response', responseType: 'blob'})
  // }
}
