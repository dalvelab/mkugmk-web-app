import { MeilisearchResponse } from "./models";

interface CreateMeilisearchRequest {
  query: string;
}

export async function createMeilisearchRequest(
  request: CreateMeilisearchRequest
): Promise<MeilisearchResponse<any>> {
  const res = await fetch("/api/meilisearch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      queries: [
        {
          indexUid: "visitors",
          q: request.query,
          facets: [],
          limit: 6,
          offset: 0,
          attributesToSearchOn: ["title", "description"],
        },
        {
          indexUid: "exhibition-center",
          q: request.query,
          facets: [],
          limit: 6,
          offset: 0,
          attributesToSearchOn: ["name", "description"],
        },
        {
          indexUid: "event",
          q: request.query,
          facets: [],
          limit: 5,
          offset: 0,
          attributesToSearchOn: ["title", "description"],
        },
        {
          indexUid: "faq-page",
          q: request.query,
          facets: [],
          limit: 10,
          offset: 0,
          attributesToSearchOn: [
            "questions_with_answers.topic",
            "questions_with_answers.question",
          ],
        },
        {
          indexUid: "partners-page",
          q: request.query,
          facets: [],
          limit: 2,
          offset: 0,
          attributesToSearchOn: ["partners.name"],
        },
        {
          indexUid: "contacts-page",
          q: request.query,
          facets: [],
          limit: 5,
          offset: 0,
          attributesToSearchOn: ["title", "contacts.department"],
        },
      ],
    }),
  });

  return res.json();
}
