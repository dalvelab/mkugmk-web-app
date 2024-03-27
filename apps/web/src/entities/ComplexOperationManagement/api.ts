import { ApiResponse, DefaultRequestParams } from "@/shared";

import type { ComplexOperationManagement } from './models';

interface GetComplexOperationManagementParams extends DefaultRequestParams {};

export async function getComplexOperationManagement(params: GetComplexOperationManagementParams): 
  Promise<ApiResponse<ComplexOperationManagement, null>> {
    const { locale } = params;

    const res = await fetch(`${process.env.DB_HOST}/complex-operation-management?locale=${locale}`);

    return res.json();
  }
