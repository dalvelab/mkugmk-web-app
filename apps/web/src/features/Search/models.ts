import { ExhibitionCenter, VisitorsPages, Event, FaqPage, PartnerPage, ContactsPage } from "@/entities";

export type MeilisearchRequest = {
	queries: {
    indexUid: keyof KeyValueMap,
    attributesToHighlight: string[],
    highlightPostTag: string;
    highlightPreTag: string;
    q: string;
    facets: string[];
    limit: number;
    offset: number;
    attributesToSearchOn: string[];
    attributesToRetrieve?: string[];
	}[]
}

export interface KeyValueMap {
  'event': Omit<Event, 'image'>;
  'visitors': Pick<VisitorsPages["tickets_page"], 'title' | 'description' | 'id' | 'type_for_meilisearch'>;
  'exhibition-center': Omit<ExhibitionCenter, 'gallery' | 'youtube_gallery' | 'banner' | 'working_time'>;
  'faq-page': FaqPage;
  'partners-page': PartnerPage;
  'contacts-page': ContactsPage;
}

export type SpecificTypeForKey<K extends keyof KeyValueMap> = KeyValueMap[K];

export type MeilisearchResponse<T extends keyof KeyValueMap> = {
  results: {
    indexUid: T,
    hits: SpecificTypeForKey<T>[],
    query: string,
    processingTimeMs: number,
    limit: number,
    offset: number,
    estimatedTotalHits: number,
    facetDistribution: {},
    facetStats: {}
  }[] | null;
  message: string;
	code: string;
	type: string;
	link: string;
};

export const query: MeilisearchRequest = {
  queries: [
    {
      indexUid: 'event',
      attributesToHighlight: [],
      highlightPostTag: 'string',
      highlightPreTag: 'string',
      q: 'string',
      facets: [],
      limit: 10,
      offset: 0,
      attributesToSearchOn: [],
    }
  ]
}