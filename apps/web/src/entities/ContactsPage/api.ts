import { ApiResponse, DefaultRequestParams } from "@/shared";

import type { ContactsPage } from "./models";

interface GetContactsPage extends DefaultRequestParams {};

export async function getContactsPage(params: GetContactsPage): Promise<ApiResponse<ContactsPage, null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/contacts-page?locale=${locale}`);

  return res.json();
}