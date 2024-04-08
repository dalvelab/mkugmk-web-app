import { StrapiInfoCard, StrapiMedia } from "@/shared";

export type VisitorsPages = {
  tickets_page: {
    title: string;
    secondary_title: string;
    description: string;
    secondary_description: string;
    other_services: {
      name: string;
      prices: number;
      additional_text?: string;
      caption?: string;
    }[];
    tickets: {
      name: string;
      available_on_website: boolean;
      categories: {
        name?: string;
        caption?: string;
        price?: number;
      }[]
      additional_text?: string;
    }
    documents: StrapiMedia[];
  }[];
  interactive_playground_page: {
    title: string;
    description: string;
    interactive_playgrounds: StrapiInfoCard[];
  };
  cafe_and_souvenirs_page: {
    title: string;
    description: string;
    cafes_and_souvenirs: StrapiInfoCard[];
  };
  working_hours_page: {
    title: string;
  }
}