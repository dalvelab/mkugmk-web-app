import type { ApiResponse, DefaultRequestParams } from "@/shared";

import type { WelcomePage } from "./models";

interface GetWelcomePage extends DefaultRequestParams {}

export async function getWelcomePage(
  params: GetWelcomePage
): Promise<ApiResponse<WelcomePage, null>> {
  const res = await fetch(
    `${process.env.DB_HOST}/welcome-page?locale=${params.locale}`
  );

  return res.json();
}
