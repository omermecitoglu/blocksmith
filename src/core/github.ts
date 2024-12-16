import crypto from "node:crypto";
import { RequestError } from "@octokit/request-error";
import { Octokit } from "@octokit/rest";

export function verifySignature(req: Request, buffer: ArrayBuffer, secret: string) {
  const sha1 = crypto.createHmac("sha1", secret).update(Buffer.from(buffer)).digest("hex");
  return req.headers.get("X-Hub-Signature") === `sha1=${sha1}`;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

async function ensureLabelExists(owner: string, repo: string, label: string) {
  try {
    await octokit.issues.getLabel({ owner, repo, name: label });
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      await octokit.issues.createLabel({ owner, repo, name: label, color: "FF0000", description: "created by Blocksmith" });
    }
    throw error;
  }
}

export async function addLabelToIssue(owner: string, repo: string, issueNumber: number, labels: string[]) {
  for (const label of labels) {
    await ensureLabelExists(owner, repo, label);
  }
  await octokit.issues.addLabels({ owner, repo, issue_number: issueNumber, labels });
}

export async function removeLabelFromIssue(owner: string, repo: string, issueNumber: number, label: string) {
  await octokit.issues.removeLabel({ owner, repo, issue_number: issueNumber, name: label });
}
