import { Component,OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent implements OnDestroy {

  videoId!: string;
  videoUrl!: string;
  subscribeToUserObservable: Subscription = new Subscription;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;
  videoUrlAvailable = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService){
     this.videoId = this.activatedRoute.snapshot.params['videoId'];
     this.videoService.getVideo(this.videoId).subscribe(data => {
       this.videoUrl = data.videoUrl;
       this.videoUrlAvailable = true;
       this.likeCount = data.likeCount;
       this.dislikeCount = data.dislikeCount;
     })
  }

  subscribeToUser() {
//       this.subscribeToUserObservable = this.userService.subscribeToUser()
//         .subscribe(() => {
//           this.showSubscribeButton = false;
//           this.showUnSubscribeButton = true;
//         })
    }

  likeVideo() {
      this.videoService.likeVideo(this.videoId).subscribe(data => {
        this.likeCount = data.likeCount;
        this.dislikeCount = data.dislikeCount;
      })
    }

    dislikeVideo() {
      this.videoService.dislikeVideo(this.videoId).subscribe(data => {
        this.likeCount = data.likeCount;
        this.dislikeCount = data.dislikeCount;
      })
    }

  ngOnDestroy(): void {
      this.subscribeToUserObservable.unsubscribe();
    }
}
