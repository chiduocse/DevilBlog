import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  selectedImage: any;
  imageToUpload: any;

  @Output() avatar: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit() {
  }
  public onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      if (fileUpload.files && fileUpload.files[0]) {
        this.imageToUpload = fileUpload.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = {
            mimetype: e.target.result.split(',')[0].split(':')[1].split(';')[0],
            url: e.target.result
          };
          console.log(this.selectedImage);
        };
        reader.readAsDataURL(this.imageToUpload);
        this.avatar.emit(this.imageToUpload);
      }
    };
    fileUpload.click();
  }
}
