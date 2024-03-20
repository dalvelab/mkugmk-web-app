import type { ApiResponse } from "@/shared";

import type { ExibitionCentersResponse } from "./models";

export async function getAbout(): Promise<ApiResponse<ExibitionCentersResponse, null>> {
  const res = await fetch(`${process.env.DB_HOST}/exhibition-centers`);

  return res.json()
}