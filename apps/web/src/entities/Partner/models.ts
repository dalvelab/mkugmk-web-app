import { StrapiContact, StrapiMedia } from "@/shared";

export type Partner = {
  id: number;
  name: string;
  small_description: string;
  image: StrapiMedia;
  description: string;
  contacts: StrapiContact[];
}