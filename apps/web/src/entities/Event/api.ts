import { ApiResponse, DefaultRequestParams, StrapiMeta } from "@/shared";
import { EventWithPagination } from "./models";

interface GetPaginatedEvents extends DefaultRequestParams {};

export async function getPaginatedEvents(params: GetPaginatedEvents): Promise<ApiResponse<EventWithPagination[], StrapiMeta>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/events?locale=${locale}&populate=image`);

  return res.json();
}