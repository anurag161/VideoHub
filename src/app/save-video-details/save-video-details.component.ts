import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import { VideoDto } from "../video-dto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})
export class SaveVideoDetailsComponent {
    savedVideoDetailsForm: FormGroup;
    title: FormControl = new FormControl('');
    description: FormControl = new FormControl('');
    videoStatus: FormControl = new FormControl('');
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: string[] = [];
    showVideoUrl = false;
    videoUrlAvailable = false;
    videoUrl!: string;
    thumbnailUrl!: string;
    videoId!: string;
    selectedFile!: File;
    selectedFileName = '';
    fileUploaded!: boolean;


    constructor(private activatedRoute: ActivatedRoute,private matSnackBar: MatSnackBar, private videoService: VideoService){
      this.videoId = this.activatedRoute.snapshot.params['videoId'];
      this.videoService.getVideo(this.videoId).subscribe(data => {
          this.videoUrl = data.videoUrl;
          this.thumbnailUrl = data.thumbnailUrl;
      })
      this.savedVideoDetailsForm = new FormGroup({
          title: this.title,
          description: this.description,
          videoStatus: this.videoStatus,
      })
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
          this.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
          input.value = '';
        }
      }

    remove(fruit: string): void {
        const index = this.tags.indexOf(fruit);

        if (index >= 0) {
          this.tags.splice(index, 1);
        }
      }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile.name;
      }

    onUpload(){
      this.videoService.uploadThumbnail(this.selectedFile,this.videoId)
        .subscribe(data => {
          console.log(data);
          // show an upload success notification
          this.matSnackBar.open("Thumbnail Upload Successfull","OK");
        })
    }

    saveVideo(){
        const videoMetaData: VideoDto = {
          "videoId" : this.videoId,
          "userId": "",
          "title": this.savedVideoDetailsForm.get('title')?.value,
          "description" : this.savedVideoDetailsForm.get('description')?.value,
          "tags": this.tags,
          "videoStatus": this.savedVideoDetailsForm.get('videoStatus')?.value,
          "videoUrl": this.videoUrl,
          "thumbnailUrl": this.thumbnailUrl,
          "likeCount": 0,
          "dislikeCount": 0
        }

        this.videoService.saveVideo(videoMetaData).subscribe(data => {
          this.matSnackBar.open("Video Metadata Updated Successfully", "OK");
        })
    }
}
