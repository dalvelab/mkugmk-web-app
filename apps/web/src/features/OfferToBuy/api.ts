import { SendOfferToEmailPayload } from "./models";

export async function sendOfferToBuyEmailRequest(
  payload: SendOfferToEmailPayload
) {
  const res = await fetch("/api/send-offer-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}
