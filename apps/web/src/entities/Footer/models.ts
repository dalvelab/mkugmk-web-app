export type FooterResponse = {
  id: number;
  city: string;
  address: string;
  locale: string;
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
  working_time: {
    id: number;
    day: string;
    value: string;
    opened: boolean;
  }[]
}