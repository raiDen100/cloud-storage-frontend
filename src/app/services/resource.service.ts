import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicFolder } from '../common/basic-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { LoginServiceService } from './login-service.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl: string = environment.baseUrl + "/resources";

  constructor(
    private loginService: LoginServiceService,
    private httpClient: HttpClient) { }

  moveResources(folder: BasicFolder, resources: (Folder | File)[]){
    const url = `${this.baseUrl}/moveto/${folder.id}`;

    let folders: Folder[] = [];
    let files: File[] = [];

    resources.forEach((r: any) => {

      if(r.folderType !== undefined)
        folders.push(r as Folder);
      else
        files.push(r as File);
    })

    return this.httpClient.put(url, {folders: folders, files: files});
  }

  zipResources(resources: (Folder | File)[]){
    const url = `${this.baseUrl}/zip`;

    let folders: Folder[] = [];
    let files: File[] = [];

    resources.forEach((r: any) => {

      if(r.folderType !== undefined)
        folders.push(r as Folder);
      else
        files.push(r as File);
    })

    return this.httpClient.post(url, {folders: folders, files: files});
  }

  deleteResources(resources: (Folder | File)[]){
    const url = `${this.baseUrl}/delete`;

    let folders: Folder[] = [];
    let files: File[] = [];

    resources.forEach((r: any) => {

      if(r.folderType !== undefined)
        folders.push(r as Folder);
      else
        files.push(r as File);
    })

    return this.httpClient.delete(url, {body: {folders: folders, files: files}, observe: "events"});
  }
}
