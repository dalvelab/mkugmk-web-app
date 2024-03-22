import { StrapiWorkingTime } from "@/shared";

export type Footer = {
  id: number;
  city: string;
  address: string;
  locale: string;
  yandex_map_link: string;
  contacts: {
    id: number;
    type: 'phone' | 'email' | 'address';
    text: string;
    caption: string | null;
  }[];
  pages: {
    id: number;
    name: string;
    link: string;
  }[];
  socials: {
    id: number;
    type: 'vk' | 'telegram' | 'youtube';
    link: string;
    name: string;
  }[]
  working_time: StrapiWorkingTime[]
}