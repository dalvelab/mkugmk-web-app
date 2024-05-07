import { StrapiMedia, StrapiYoutubeVideo } from "@/shared";

export type WelcomePage = {
  id: number;
  title: string;
  description: string;
  locale: string;
  gallery: StrapiMedia[];
  banner: StrapiMedia;
  video_preview: StrapiMedia;
  youtube_gallery: StrapiYoutubeVideo[];
};
