import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { File } from '../common/file';
import { Folder } from '../common/folder';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedResources : (Folder | File)[] = [];


  constructor() { }

  updateSelection(resource: (Folder | File)[]){

    this.selectedResources = resource;
  }
}
