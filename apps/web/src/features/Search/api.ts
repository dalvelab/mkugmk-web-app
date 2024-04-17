import { MeilisearchResponse } from "./models";

interface CreateMeilisearchRequest {
  query: string;
}

export async function createMeilisearchRequest(request: CreateMeilisearchRequest): 
  Promise<MeilisearchResponse<any>> {
  const res = await fetch('/api/meilisearch', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        queries: [
          {
            indexUid: "visitors",
            attributesToHighlight: ["*"],
            highlightPostTag: "</ais-highlight-0000000000>",
            highlightPreTag: "<ais-highlight-0000000000>",
            q: request.query,
            facets: [],
            limit: 6,
            offset: 0,
            attributesToSearchOn: [
              "title",
              "description",
            ]
          },
          {
            indexUid: "exhibition-center",
            attributesToHighlight: ["*"],
            highlightPostTag: "</ais-highlight-0000000000>",
            highlightPreTag: "<ais-highlight-0000000000>",
            q: request.query,
            facets: [],
            limit: 10,
            offset: 0,
            attributesToSearchOn: [
              "name",
              "description"
            ]
          },
          {
            indexUid: "event",
            attributesToHighlight: ["*"],
            highlightPostTag: "</ais-highlight-0000000000>",
            highlightPreTag: "<ais-highlight-0000000000>",
            q: request.query,
            facets: [],
            limit: 5,
            offset: 0,
            attributesToSearchOn: [
              "title",
              "description",
            ]
          },
          {
            indexUid: "faq-page",
            attributesToHighlight: ["*"],
            highlightPostTag: "</ais-highlight-0000000000>",
            highlightPreTag: "<ais-highlight-0000000000>",
            q: request.query,
            facets: [],
            limit: 5,
            offset: 0,
            attributesToSearchOn: [
              "title",
              "questions_with_answers.topic",
              "questions_with_answers.question",
              "questions_with_answers.answer"
            ]
          }
        ]
      }
    )
  });

  return res.json()
}