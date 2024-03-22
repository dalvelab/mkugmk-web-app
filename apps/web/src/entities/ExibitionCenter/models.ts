import { StrapiMedia, StrapiWorkingTime, StrapiYoutubeVideo } from "@/shared";

export type ExibitionCenter = {
    id: number;
    name: string;
    description: string;
    excursion_phone?: string;
    type: 'exhibition_center' | 'other';
    card_description?: string;
    gallery: StrapiMedia[];
    banner: StrapiMedia;
    youtube_gallery: StrapiYoutubeVideo[];
    working_time: StrapiWorkingTime[];
}