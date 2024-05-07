import { ApiResponse, DefaultRequestParams } from "@/shared";

import type { FaqPage } from "./models";

interface GetFaqPage extends DefaultRequestParams {}

export async function getFaqPage(
  params: GetFaqPage
): Promise<ApiResponse<FaqPage, null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/faq-page?locale=${locale}`);

  return res.json();
}
