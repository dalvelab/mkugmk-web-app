import type { ApiResponse, DefaultRequestParams } from "@/shared";

import type { WelcomePageResponse } from "./models";

interface getWelcomePageProps extends DefaultRequestParams {};

export async function getWelcomePage(params: getWelcomePageProps): Promise<ApiResponse<WelcomePageResponse, null>> {
  const res = await fetch(`${process.env.DB_HOST}/welcome-page?locale=${params.locale}`);

  return res.json()
}