import { StrapiInfoCard, StrapiMedia, StrapiWorkingTime } from "@/shared";

export type VisitorsPageType =
  | "tickets"
  | "cafe-and-souvenirs"
  | "interactive-playground"
  | "navigation"
  | "rules"
  | "working-hours";

export type VisitorsPages = {
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
    }[];
  };
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
      type: "public_transport" | "other";
    }[];
  };
};

export type RulesPage = {
  id: number;
  type_for_meilisearch: VisitorsPageType;
  title: string;
  description: string;
};

export type BenefitTicketsPage = {
  id: number;
  type_for_meilisearch: VisitorsPageType;
  title: string;
  description: string;
};

export type TicketsAndServicesPage = {
  id: number;
  type_for_meilisearch: VisitorsPageType;
  title: string;
  secondary_title: string;
  description: string;
  secondary_description: string;
  main_services: {
    id: number;
    name: string;
    link?: string | null;
    value?: string | null;
    additional_text?: string | null;
    tickets: {
      id: number;
      name: string;
      available_on_website?: boolean;
      is_excursion?: boolean;
      additional_text?: string;
      categories: {
        id: number;
        name: string;
        price: string;
      }[];
    }[];
  }[];
  other_services: {
    id: number;
    name: string;
    value: string;
    additional_text?: string;
  }[];
  documents: StrapiMedia[] | null;
};
