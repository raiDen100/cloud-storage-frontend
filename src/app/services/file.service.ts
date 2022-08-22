import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { File } from '../common/file';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = "http://192.168.1.75:8080/api/file";

  onFileChange = new EventEmitter();
  onFileDelete = new EventEmitter();

  shouldHaveThumbnail = [
    "image",
    "video",
    "x-matroska"
  ]


  constructor(private loginService: LoginServiceService, private httpClient: HttpClient) { }

  deleteFile(file: File){
    const url = `${this.baseUrl}/delete/${file.id}`;

    return this.httpClient.delete(url,{observe: "events"});
  }

  renameFile(file: File, fileName: string){
    const url = `${this.baseUrl}/rename/${file.id}`;

    return this.httpClient.put<string>(url, {displayName: fileName});
  }
}
