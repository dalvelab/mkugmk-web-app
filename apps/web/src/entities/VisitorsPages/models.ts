import { StrapiInfoCard, StrapiMedia, StrapiWorkingTime } from "@/shared";

export type VisitorsPageType = 
  'tickets' | 
  'cafe-and-souvenirs' | 
  'interactive-playground'| 
  'navigation' | 
  'rules' | 
  'working-hours'
  ;

export type VisitorsPages = {
  tickets_page: {
    id: number;
    type_for_meilisearch: VisitorsPageType;
    title: string;
    secondary_title: string;
    description: string;
    secondary_description: string;
    other_services: {
      id: number;
      name: string;
      value: string;
      additional_text?: string;
      caption?: string;
    }[];
    tickets: {
      id: number;
      type_for_meilisearch: VisitorsPageType;
      name: string;
      available_on_website: boolean;
      display_preferential_sign: boolean;
      categories: {
        id: number;
        name?: string;
        caption?: string;
        price?: number;
      }[]
      additional_text?: string;
    }[]
    documents: StrapiMedia[] | null;
  };
  interactive_playground_page: {
    id: number;
    type_for_meilisearch: VisitorsPageType;
    title: string;
    description: string;
    interactive_playgrounds: StrapiInfoCard[];
  };
  cafe_and_souvenirs_page: {
    id: number;
    type_for_meilisearch: VisitorsPageType;
    title: string;
    description: string;
    cafes_and_souvenirs: StrapiInfoCard[];
  };
  working_hours_page: {
    id: number;
    type_for_meilisearch: VisitorsPageType;
    title: string;
    public_areas: {
      id: number;
      name: string;
      working_time: StrapiWorkingTime[];
    }[]
  }
  navigation_page: {
    id: number;
    type_for_meilisearch: VisitorsPageType;
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

export type RulesPage = {
  id: number;
  type_for_meilisearch: VisitorsPageType;
  title: string;
  description: string;
}

export type BenefitTicketsPage = {
  id: number;
  type_for_meilisearch: VisitorsPageType;
  title: string;
  description: string;
}