import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";
import {Router} from "@angular/router";
import {JWTTokenService} from "../../services/jwttoken.service";
import {PlayerService} from "../../services/player.service";
import {UploadService} from "../../services/upload.service";
import {Folder} from "../../common/folder";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private jwtTokenService: JWTTokenService,
    private playerService: PlayerService,
    private uploadService: UploadService
  ) { }

  showVideoPlayer: boolean = false;
  showVideoInfo: boolean = false;

  uploadFolder: Folder;

  @ViewChild("fileinput")
  fileinput: ElementRef;

  filePickerSubscription: Subscription;
  isPlayingSubscription: Subscription;
  playerErrorSubscription: Subscription;

  ngOnInit(): void {

    if (this.loginService.getToken() === "" || this.jwtTokenService.isTokenExpired())
      this.router.navigate(["/"])

    this.isPlayingSubscription = this.playerService.isPlaying.subscribe(playing => {
      this.showVideoPlayer = playing;
    })

    this.playerErrorSubscription = this.playerService.playerError.subscribe(error => {
      this.showVideoInfo = error;
    })

    this.filePickerSubscription = this.uploadService.onOpenFilePicker.subscribe(event => {
      this.uploadFolder = event
      this.fileinput.nativeElement.click();
    })
  }

  ngOnDestroy(){
    this.filePickerSubscription.unsubscribe();
    this.isPlayingSubscription.unsubscribe();
    this.playerErrorSubscription.unsubscribe();
  }


  onClick($event: MouseEvent) {
    this.hideDialogWindows();
  }

  hideDialogWindows() {
    this.playerService.isPlaying.next(false);
  }

  onFileInputChange($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log($event)

    const files = $event.target.files;

    if(files.length > 0){

      this.uploadService.addFilesToUpload(files, this.uploadFolder);
      $event.target.value = "";
    }
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate([''])
  }
}
