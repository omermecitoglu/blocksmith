import { verifySignature } from "~/core/github";

type WebhookEvent = {
  action: "edited",
  issue: {
    title: string,
    state: "open",
    labels: unknown[],
    body: string,
  },
  changes: {
    body: {
      from: string,
    },
  },
  repository: {
    name: string,
    full_name: string,
  },
};

export async function POST(request: Request) {
  const buffer = await request.arrayBuffer();
  const isSafe = verifySignature(request, buffer, "blocksmith");
  if (!isSafe) {
    return new Response("Unauthorized", { status: 401 });
  }
  const event = JSON.parse(Buffer.from(buffer).toString()) as WebhookEvent;
  console.log(event);

  return new Response("Webhook received", { status: 200 });
}
