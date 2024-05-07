import type { ApiResponse, DefaultRequestParams } from "@/shared";

import type { ExhibitionCenter, ExhibitionCentersPage } from "./models";

interface GetExibitionCenters extends DefaultRequestParams {
  isPopulated: boolean;
  isClientRequest?: boolean;
}

export async function getExibitionCenters(
  params: GetExibitionCenters
): Promise<ApiResponse<ExhibitionCenter[], null>> {
  const { isPopulated, locale, isClientRequest = false } = params;

  const res = await fetch(`
    ${
      isClientRequest ? "/api" : process.env.DB_HOST
    }/exhibition-centers?locale=${locale}&isPopulated=${isPopulated}
  `);

  return res.json();
}

interface GetSingleExibitionCenter extends DefaultRequestParams {
  id: number;
}

export async function getSingleExibitionCenter(
  params: GetSingleExibitionCenter
): Promise<ApiResponse<ExhibitionCenter, null>> {
  const { id, locale } = params;

  const res = await fetch(
    `${process.env.DB_HOST}/exhibition-centers/${id}?locale=${locale}`
  );

  return res.json();
}

interface GetExibitionCentersPage extends DefaultRequestParams {}

export async function getExibitionCentersPage(
  params: GetExibitionCentersPage
): Promise<ApiResponse<ExhibitionCentersPage, null>> {
  const { locale } = params;

  const res = await fetch(
    `${process.env.DB_HOST}/exhibition-center-page?locale=${locale}`
  );

  return res.json();
}
