import convertMarkdownToJSON from "@omer-x/md-to-json";
import { headers } from "next/headers";
import { addLabelToIssue, removeLabelFromIssue, verifySignature } from "~/core/github";

type WebhookEvent = {
  action: "edited",
  issue: {
    number: number,
    title: string,
    state: "open",
    labels: { name: string }[],
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
    owner: {
      login: string,
    },
  },
};

export async function POST(request: Request) {
  const buffer = await request.arrayBuffer();
  const isSafe = verifySignature(request, buffer, "blocksmith");
  if (!isSafe && process.env.NODE_ENV === "production") {
    return new Response("Unauthorized", { status: 401 });
  }
  const headersList = await headers();
  const eventName = headersList.get("X-GitHub-Event");
  switch (eventName) {
    case "ping": {
      // pong
      break;
    }
    case "issues": {
      const event = JSON.parse(Buffer.from(buffer).toString()) as WebhookEvent;
      const result = convertMarkdownToJSON(event.issue.body);
      if (result.success) {
        const blockers = result.sections.find(s => s.title === "Blockers");
        if (blockers) {
          const blockersList = blockers.content.find(item => Array.isArray(item));
          if (blockersList) {
            const isAlreadyBlocked = !!event.issue.labels.find(label => label.name === "blocked");
            const shouldBeBlocked = blockersList.some(item => item.startsWith("[ ]"));
            if (isAlreadyBlocked !== shouldBeBlocked) {
              const owner = event.repository.owner.login;
              const repo = event.repository.name;
              const issueNo = event.issue.number;
              if (shouldBeBlocked) {
                await addLabelToIssue(owner, repo, issueNo, ["blocked"]);
              } else {
                await removeLabelFromIssue(owner, repo, issueNo, "blocked");
              }
            }
          }
        }
      }
      break;
    }
  }
  return new Response("Webhook received", { status: 200 });
}
