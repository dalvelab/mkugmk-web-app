import { StrapiInfoCard, StrapiMedia, StrapiWorkingTime } from "@/shared";

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
    public_areas: {
      id: number;
      name: string;
      working_time: StrapiWorkingTime[];
    }[]
  }
  navigation_page: {
    title: string;
    complex_map: StrapiMedia;
    yandex_map_embed: string;
    addresses: {
      id: number;
      name: string;
      address: string;
    }[];
    how_to_get_to_museum: {
      id: number;
      name: string;
      caption?: string;
      value: string;
      type: 'public_transport' | 'other';
    }[]
  }
}