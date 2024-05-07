import { ApiResponse, DefaultRequestParams } from "@/shared";
import { Footer } from "./models";

interface GetFooter extends DefaultRequestParams {}

export async function getFooter(
  params: GetFooter
): Promise<ApiResponse<Footer, null>> {
  const res = await fetch(`/api/footer?locale=${params.locale}`);

  return res.json();
}
