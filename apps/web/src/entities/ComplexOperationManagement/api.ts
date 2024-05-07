import { ApiResponse } from "@/shared";

import type { ComplexOperationManagement } from "./models";

export async function getComplexOperationManagement(): Promise<
  ApiResponse<ComplexOperationManagement, null>
> {
  const res = await fetch(
    `${process.env.DB_HOST}/complex-operation-management`
  );

  return res.json();
}
