import { ApiResponse, DefaultRequestParams } from "@/shared";
import { FooterResponse } from "./models";

interface getFooterProps extends DefaultRequestParams {};

export async function getFooter(params: getFooterProps): Promise<ApiResponse<FooterResponse, null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/footer?locale=${params.locale}`);

  return res.json()
}