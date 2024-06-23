import { StrapiMedia, StrapiYoutubeVideo } from "@/shared";
import { ExhibitionCenter } from "../ExibitionCenter";

export type WelcomePage = {
  id: number;
  title: string;
  description: string;
  locale: string;
  banner: StrapiMedia;
  video_preview: StrapiMedia;
  youtube_gallery: StrapiYoutubeVideo[];
  exhibition_centers: ExhibitionCenter[];
};
