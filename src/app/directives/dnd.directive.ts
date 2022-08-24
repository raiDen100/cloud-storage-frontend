import { Directive, ElementRef, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { BasicFolder } from '../common/basic-folder';
import { CurrentFolder } from '../common/current-folder';
import { File } from '../common/file';
import { Folder } from '../common/folder';
import { FolderService } from '../services/folder.service';
import { ResourceService } from '../services/resource.service';
import { SelectionService } from '../services/selection.service';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Input("appDnd")
  folder: BasicFolder;

  @Output()
  filesDropped = new EventEmitter();

  @Output("resourcesMoved")
  resourcesMoved = new EventEmitter();


  constructor(private el: ElementRef, private selectionService: SelectionService, private resourceService: ResourceService) { }

  @HostListener("dragover", ["$event"]) onDragOver(evt: Event){
    evt.preventDefault();
    evt.stopPropagation();
    this.highlight('rgba(70, 196, 27, 0.9)');
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(evt: Event){
    evt.preventDefault();
    evt.stopPropagation();
    this.highlight('');
  }

  @HostListener("drop", ["$event"]) onDrop(evt: any){
    evt.preventDefault();
    evt.stopPropagation();

    this.highlight('');
    const files = evt.dataTransfer.items;

    if(files.length > 0)
      this.filesDropped.emit(files);
    else if(this.selectionService.selectedResources.length > 0 && this.folder.id !== this.selectionService.selectedResources[0].parentFolder.id){
      this.resourceService.moveResources(this.folder, this.selectionService.selectedResources)
      .subscribe((data) => {
        this.resourcesMoved.emit(true);

      });
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
