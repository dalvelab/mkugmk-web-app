interface sendEmailRequestBody {
  message: string;
}

export async function sendEmailRequest(payload: sendEmailRequestBody) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return res.json()
}