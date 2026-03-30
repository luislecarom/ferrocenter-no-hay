export async function callWebhook(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`n8n webhook error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
