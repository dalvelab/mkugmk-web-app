import { ApiResponse, DefaultRequestParams, StrapiMeta } from "@/shared";
import { Event, EventWithPagination } from "./models";

interface GetPaginatedEvents extends DefaultRequestParams {};

export async function getPaginatedEvents(params: GetPaginatedEvents): Promise<ApiResponse<EventWithPagination[], StrapiMeta>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/events?locale=${locale}&populate=image`);

  return res.json();
}

interface GetSingleEvent extends DefaultRequestParams {
  id: number;
};


export async function getSingleEvent(params: GetSingleEvent): Promise<ApiResponse<Event, null>> {
  const { id, locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/events/${id}?locale=${locale}`);

  return res.json();
}