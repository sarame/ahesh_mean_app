import { Component, ViewChild, Type, OnInit } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ProfileService } from '../../services/profileServices/profile.service';


//import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {

  userId: any = "59175dff871f492068d93127";
  displayType: string = "none";
  oldImg: any;
  //Cropper 2 data
  data2: any;
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  ngOnInit() {
    this.profileService.GetbyId(this.userId).subscribe(e => {
      // console.log(e);
      this.oldImg = e.img;
    })

  }


  constructor(private profileService: ProfileService) {

    //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 100;
    this.cropperSettings2.croppedHeight = 100;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = true;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    this.data2 = {};


  }

  mouseEvent(event) {
    if (event.type == "mouseover")
      this.displayType = "inline-block";
    else
      this.displayType = "none";
  }

  cropped(bounds: Bounds) {
    //  console.log(bounds);
  }


  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      debugger;
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  fileOpenListener() {
    debugger;
    var image: any = new Image();
    image.src = this.oldImg;
    this.cropper.setImage(image);

  }

  save(image) {
    this.oldImg = image;
    this.profileService.UpdateById(this.userId, { img: image });
    // console.log(image);


    if (!localStorage.justOnce) {
      localStorage.setItem("justOnce", "true");
      localStorage.removeItem("justOnce");
      window.location.reload();
    } else {
      localStorage.removeItem("justOnce");
    }
  }
  delete(image) {
    this.oldImg = "/image/canstock.jpg";
    this.profileService.UpdateById(this.userId, { img: "/images/canstock.jpg" });

    if (!localStorage.justOnce) {
      localStorage.setItem("justOnce", "true");
      localStorage.removeItem("justOnce");
      window.location.reload();
    } else {
      localStorage.removeItem("justOnce");
    }

    // console.log(image);
  }


}
