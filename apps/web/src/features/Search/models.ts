export type indexUids = 'event' | 'faq-page' | 'visitors' | 'exhibition-center' | 'contacts-page';

export type MeilisearchRequest = {
	queries: {
    indexUid: indexUids,
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

export type MeilisearchResponse = {
  results: 		{
    indexUid: string,
    hits: [],
    query: string,
    processingTimeMs: number,
    limit: number,
    offset: number,
    estimatedTotalHits: number,
    facetDistribution: {},
    facetStats: {}
  }[]
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