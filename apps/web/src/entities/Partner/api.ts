import type { ApiResponse, DefaultRequestParams } from "@/shared";
import type { PartnerPage } from "./models";

interface GetPartners extends DefaultRequestParams {};

export async function getPartnersPage(params: GetPartners): Promise<ApiResponse<PartnerPage, null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/partners-page?locale=${locale}`);

  return res.json();
}