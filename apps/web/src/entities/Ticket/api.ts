import { ApiResponse, DefaultRequestParams } from "@/shared";

import type { Ticket } from "./models";

interface GetTickets extends DefaultRequestParams {}

export async function getTickets(
  params: GetTickets
): Promise<ApiResponse<Ticket[], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/tickets?locale=${locale}`);

  return res.json();
}
