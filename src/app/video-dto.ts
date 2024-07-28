export interface VideoDto {
  videoId: string;
  userId: string;
  title: string;
  description: string;
  tags: Array<string>;
  videoStatus: string;
  videoUrl: string;
  thumbnailUrl: string;
  likeCount: number;
  dislikeCount: number;
}
