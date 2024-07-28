import { Component, Input } from '@angular/core';
import {VideoDto} from "../video-dto";

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrl: './video-description.component.css'
})
export class VideoDescriptionComponent {
  @Input()
  video!: VideoDto;
}
