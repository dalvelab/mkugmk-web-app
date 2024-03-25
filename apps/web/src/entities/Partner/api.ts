import type { ApiResponse, DefaultRequestParams } from "@/shared";
import type { Partner } from "./models";

interface GetPartners extends DefaultRequestParams {};

export async function getPartners(params: GetPartners): Promise<ApiResponse<Partner[], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/partners?locale=${locale}`);

  return res.json();
}