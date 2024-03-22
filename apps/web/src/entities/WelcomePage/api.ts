import type { ApiResponse, DefaultRequestParams } from "@/shared";

import type { WelcomePage } from "./models";

interface getWelcomePageProps extends DefaultRequestParams {};

export async function getWelcomePage(params: getWelcomePageProps): Promise<ApiResponse<WelcomePage, null>> {
  const res = await fetch(`${process.env.DB_HOST}/welcome-page?locale=${params.locale}`);

  return res.json()
}