import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicFolder } from '../common/basic-folder';
import { CurrentFolder } from '../common/current-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private loginService: LoginServiceService,
              private httpClient: HttpClient) { }


  private baseUrl: string = environment.baseUrl + "/folder";

  onFolderChange = new EventEmitter();
  onFolderDelete = new EventEmitter();

  isNewFolderDialogOpen = new EventEmitter();
  isRenameDialogOpen = new EventEmitter();

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
