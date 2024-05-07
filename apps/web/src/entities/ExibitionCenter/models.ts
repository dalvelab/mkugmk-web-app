import { StrapiMedia, StrapiWorkingTime, StrapiYoutubeVideo } from "@/shared";

export type ExhibitionCenter = {
  id: number;
  name: string;
  ticket_sale_enabled: boolean;
  description: string;
  excursion_phone?: string;
  type: "exhibition_center" | "other";
  card_description?: string;
  gallery: StrapiMedia[];
  banner: StrapiMedia;
  youtube_gallery: StrapiYoutubeVideo[];
  working_time: StrapiWorkingTime[];
};

export type ExhibitionCentersPage = {
  title: string;
  description: string;
  exhibition_centers: ExhibitionCenter[];
};
