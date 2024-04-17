import { ExhibitionCenter, VisitorsPages, Event } from "@/entities";

// export type IndexUids = 'event' | 'visitors' | 'exhibition-center';

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
  event: Omit<Event, 'image'>;
  visitors: Pick<VisitorsPages["tickets_page"], 'title' | 'description'>;
  'exhibition-center': Omit<ExhibitionCenter, 'gallery' | 'youtube_gallery' | 'banner' | 'working_time'>;
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