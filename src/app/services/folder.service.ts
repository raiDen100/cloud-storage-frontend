import { HttpClient } from '@angular/common/http';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicFolder } from '../common/basic-folder';
import { CurrentFolder } from '../common/current-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private loginService: LoginServiceService, private httpClient: HttpClient) { }


  private baseUrl: string = "http://192.168.1.75:8080/api/folder";

  onFolderChange = new EventEmitter();
  onFolderDelete = new EventEmitter();

  getFolderContent(folderId: string) {
    const url = this.baseUrl + `/${folderId}`;

    return this.httpClient.get<CurrentFolder>(url);
  }



  getMainFolderContent(): Observable<CurrentFolder>{
    const url = this.baseUrl;


    return this.httpClient.get<CurrentFolder>(url);
  }

  createNewFolder(folder: Folder, name: string){
    const url = `${this.baseUrl}/${folder.id}`;
    return this.httpClient.post<string>(url, {displayName: name});
  }

  deleteFolder(folder: Folder){
    const url = `${this.baseUrl}/${folder.id}`;

    return this.httpClient.delete(url,{observe: "events"});
  }

  renameFolder(folder: Folder, folderName: string){
    const url = `${this.baseUrl}/rename/${folder.id}`;

    return this.httpClient.put<string>(url, {displayName: folderName});
  }


}
