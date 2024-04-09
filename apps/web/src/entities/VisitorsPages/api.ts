import { isVoid, type ApiResponse, type DefaultRequestParams } from "@/shared";
import type { VisitorsPages } from "./models";

function constructBooleanQueryParam(name: string, param?: boolean) {
  if (!param) {
    return `${name}=false`
  }

  return `${name}=true`;
}

interface GetVisitorsPage extends DefaultRequestParams {
  isTicketsPage?: boolean;
  isInteractivePlaygroundPage?: boolean;
  isCafeAndSouvenirsPage?: boolean;
  isWorkingHoursPage?: boolean;
  isNavigationPage?: boolean;
};

export async function getVisitorsPages(params: GetVisitorsPage): Promise<ApiResponse<VisitorsPages, null>> {
  const { 
    locale,
    isCafeAndSouvenirsPage,
    isInteractivePlaygroundPage,
    isTicketsPage,
    isWorkingHoursPage,
    isNavigationPage
  } = params;

  const endpoint = `${process.env.DB_HOST}/visitors-page?locale=${locale}` +
    `&${constructBooleanQueryParam('isCafeAndSouvenirsPage', isCafeAndSouvenirsPage)}` +
    `&${constructBooleanQueryParam('isInteractivePlaygroundPage', isInteractivePlaygroundPage)}` +
    `&${constructBooleanQueryParam('isTicketsPage', isTicketsPage)}` +
    `&${constructBooleanQueryParam('isWorkingHoursPage', isWorkingHoursPage)}` +
    `&${constructBooleanQueryParam('isNavigationPage', isNavigationPage)}`;

  const res = await fetch(endpoint);

  return res.json();
}