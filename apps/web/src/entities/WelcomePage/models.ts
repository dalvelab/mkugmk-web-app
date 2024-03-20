import { StrapiMedia } from "@/shared";

export type WelcomePageResponse = {
  id: number;
  title: string;
  description: string;
  locale: string;
  gallery: StrapiMedia[];
  banner: StrapiMedia;
  youtube_gallery: {
    id: number;
    name: string;
    video_id: string;
  }[];
}