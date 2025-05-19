import { StrapiMedia } from "@/shared";

export type Event = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  publish_date: string;
  image: StrapiMedia;
};
