import { StrapiMedia } from "@/shared";

export type EventWithPagination = {
  id: number;
  attributes: {
    title: string;
    type: 'news' | 'event';
    description: string;
    createdAt: string;
    image: {
      data: {
        id: number;
        attributes: Omit<StrapiMedia, 'id'>;
      }
    }
  }
}

export type Event = {
  id: number;
  title: string;
  type: 'news' | 'event';
  description: string;
  createdAt: string;
  image: StrapiMedia;
}