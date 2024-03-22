import type { ApiResponse } from "@/shared";

import type { ExibitionCenter } from "./models";

export async function getExibitionCenters(): Promise<ApiResponse<ExibitionCenter[], null>> {
  const res = await fetch(`${process.env.DB_HOST}/exhibition-centers`);

  return res.json()
}