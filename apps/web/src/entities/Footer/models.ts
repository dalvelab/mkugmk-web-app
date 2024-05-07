import {
  StrapiContact,
  StrapiSocialNetwork,
  StrapiWorkingTime,
} from "@/shared";

export type Footer = {
  id: number;
  city: string;
  address: string;
  locale: string;
  map_link?: string;
  contacts: StrapiContact[];
  pages: {
    id: number;
    name: string;
    link: string;
  }[];
  socials: StrapiSocialNetwork[];
  working_time: StrapiWorkingTime[];
};
