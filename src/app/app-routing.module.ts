import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {HomeComponent} from "./home/home.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {CallbackComponent} from "./callback/callback.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {HistoryComponent} from "./history/history.component";
import {LikeVideosComponent} from "./like-videos/like-videos.component";

const routes: Routes = [
    {
        path: '', component: HomeComponent,
      },
      {
        path: 'video/:videoId', component: VideoDetailComponent,
      },
      {
        path: 'callback', component: CallbackComponent,
      },
    {
        path: 'upload-video', component : UploadVideoComponent,
    },
    {
        path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent,
      },
    {
        path: 'subscriptions', component: SubscriptionsComponent,
      },
      {
        path: 'history', component: HistoryComponent,
      },
      {
        path: 'like-videos', component: LikeVideosComponent,
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
