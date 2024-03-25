import { StrapiContact, StrapiWorkingTime } from "@/shared";

export type Footer = {
  id: number;
  city: string;
  address: string;
  locale: string;
  yandex_map_link: string;
  contacts: StrapiContact[];
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