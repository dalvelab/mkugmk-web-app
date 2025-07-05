import { isEmpty, isNotEmpty } from "@/shared";
import { OfferToBuyForm } from "./models";

const SEPARATOR = "\n/&/\n";

export function formatOfferToBuyMessage(data: OfferToBuyForm) {
  let message = "";

  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const keyData = data[key as keyof OfferToBuyForm];

    if (isNotEmpty(keyData)) {
      if (isEmpty(message)) {
        message = keyData;
      } else {
        message = `${message}${SEPARATOR}${keyData}`;
      }
    }
  }

  return message;
}

export async function formatFilesToSendEmail(files?: File[]) {
  if (!files) {
    return [];
  }

  const attachments = await Promise.all(
    files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      return {
        filename: file.name,
        content: Buffer.from(buffer),
        contentType: file.type || "application/octet-stream",
      };
    })
  );

  return attachments;
}

export function getFileExtension(filename: string): string {
  return filename.slice(
    (Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1
  );
}
