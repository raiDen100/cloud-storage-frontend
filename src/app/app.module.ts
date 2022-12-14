import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FolderGridViewComponent } from './components/folder-grid-view/folder-grid-view.component';
import { RouterModule, Routes } from '@angular/router';
import { Folder } from './common/folder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndDirective } from './directives/dnd.directive';
import { GridFolderComponent } from './components/folder-grid-view/grid-folder/grid-folder.component';
import { GridFileComponent } from './components/folder-grid-view/grid-file/grid-file.component';
import { FolderContextMenuComponent } from './components/folder-grid-view/folder-context-menu/folder-context-menu.component';
import { NewFolderDialogComponent } from './components/new-folder-dialog/new-folder-dialog.component';
import { CurrentFolderContextMenuComponent } from './components/folder-grid-view/current-folder-context-menu/current-folder-context-menu.component';
import { FileContextMenuComponent } from './components/folder-grid-view/file-context-menu/file-context-menu.component';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { UploadComponent } from './components/upload/upload.component';
import { FolderViewComponent } from './components/folder-view/folder-view.component';
import { RenameDialogComponent } from './components/rename-dialog/rename-dialog.component';
import {TokenInterceptor} from "./services/token.interceptor";
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoInfoComponent } from './components/video-info/video-info.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { RegisterFormComponent } from './components/register-form/register-form.component';


const routes: Routes = [
  {path: "", component: LoginFormComponent},
  {path: "register", component: RegisterFormComponent},
  {
    path: "drive",
    component: FolderViewComponent,
    children: [
      {
        path: ':id',
        component: FolderGridViewComponent
      }
  ]}
  //{path: 'drive, component: FolderGridViewComponent, outlet: 'folder-view'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    FolderGridViewComponent,
    DndDirective,
    GridFolderComponent,
    GridFileComponent,
    FolderContextMenuComponent,
    NewFolderDialogComponent,
    CurrentFolderContextMenuComponent,
    FileContextMenuComponent,
    UploadComponent,
    FolderViewComponent,
    RenameDialogComponent,
    VideoPlayerComponent,
    VideoInfoComponent,
    RegisterFormComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        DragToSelectModule.forRoot(),
        FontAwesomeModule,
        ClipboardModule
    ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
