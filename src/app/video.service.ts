import { Injectable, inject } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from "./video-dto";
import { map } from 'rxjs/operators';
import 'localstorage-polyfill'

global['localStorage'] = localStorage;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private http = inject(HttpClient);

  public uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const fd = new FormData();
    fd.append('file', fileEntry, fileEntry.name);
    return this.http.post<UploadVideoResponse>('http://localhost:8089/api/video/upload', fd);
  }

  uploadThumbnail(selectedFile: File, videoId: string): Observable<UploadVideoResponse> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    fd.append('videoId', videoId);
    return this.http.post('http://localhost:8089/api/video/thumbnail/upload', fd, {
        responseType: 'text'
    }).pipe(
        map(responseText => {
            // Assuming the responseText can be parsed into an UploadVideoResponse
            return JSON.parse(responseText) as UploadVideoResponse;
        })
    );
  }

  getVideo(videoId :string): Observable<VideoDto>{
    return this.http.get<VideoDto>('http://localhost:8089/api/video/' + videoId)
  };

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.http.put<VideoDto>('http://localhost:8089/api/video/'+videoMetaData.videoId, videoMetaData);
  }

  likeVideo(videoId: string | "") : Observable<VideoDto> {
    return this.http.post<VideoDto>("http://localhost:8089/api/video/" + videoId + "/like", null , {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

   dislikeVideo(videoId: string | "") {
      return this.http.post<VideoDto>("http://localhost:8089/api/video/" + videoId + "/dislike",null, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      })
    }

    getSuggestedVideos(userId: string | ""): Observable<Array<VideoDto>> {
      return this.http.get<Array<VideoDto>>("http://localhost:8089/api/video/suggested/"+userId, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
    }

    getAllVideos(): Observable<Array<VideoDto>> {
        return this.http.get<Array<VideoDto>>("http://localhost:8089/api/video/");
      }
}
