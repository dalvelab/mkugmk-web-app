import type { ApiResponse, DefaultRequestParams } from "@/shared";

import type { ExibitionCenter } from "./models";

interface GetExibitionCenters extends DefaultRequestParams {
  isPopulated: boolean
  isClientRequest?: boolean;
};

export async function getExibitionCenters(params: GetExibitionCenters): Promise<ApiResponse<ExibitionCenter[], null>> {
  const { isPopulated, locale, isClientRequest = false } = params;

  const res = await fetch(`${isClientRequest ? process.env.NEXT_PUBLIC_API_HOST : process.env.DB_HOST}/exhibition-centers?locale=${locale}&isPopulated=${isPopulated}`);

  return res.json()
}