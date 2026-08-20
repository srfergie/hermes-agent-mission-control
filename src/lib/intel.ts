export type IntelInput = {
  title?: unknown;
  source?: unknown;
  sourceUrl?: unknown;
  topic?: unknown;
  summary?: unknown;
  whatHappened?: unknown;
  whyItMatters?: unknown;
  implications?: unknown;
  recommendedAction?: unknown;
  credibility?: unknown;
  posture?: unknown;
  urgency?: unknown;
  status?: unknown;
  publishedAt?: unknown;
};

export type ValidIntelItem = {
  title: string;
  source: string;
  sourceUrl: string;
  topic: string;
  summary: string;
  whatHappened: string | null;
  whyItMatters: string | null;
  implications: string | null;
  recommendedAction: string | null;
  credibility: string;
  posture: string;
  urgency: string;
  status: string;
  publishedAt: Date | null;
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const allowedPostures = new Set(["ignore", "monitor", "read", "investigate", "trial", "apply"]);
const allowedStatuses = new Set(["draft", "approved", "archived"]);

export function validateIntelItem(input: IntelInput): { ok: true; data: ValidIntelItem } | { ok: false; error: string } {
  const title = text(input.title);
  const source = text(input.source);
  const sourceUrl = text(input.sourceUrl);
  const topic = text(input.topic);
  const summary = text(input.summary);
  if (!title || !source || !sourceUrl || !topic || !summary) return { ok: false, error: "title, source, URL, topic and summary are required" };

  try {
    if (new URL(sourceUrl).protocol !== "https:") throw new Error();
  } catch {
    return { ok: false, error: "a valid HTTPS source URL is required" };
  }

  const posture = text(input.posture) || "read";
  const status = text(input.status) || "draft";
  if (!allowedPostures.has(posture)) return { ok: false, error: "invalid posture" };
  if (!allowedStatuses.has(status)) return { ok: false, error: "invalid status" };
  const publishedText = text(input.publishedAt);
  const publishedAt = publishedText ? new Date(publishedText) : null;
  if (publishedAt && Number.isNaN(publishedAt.getTime())) return { ok: false, error: "invalid publication date" };

  return { ok: true, data: {
    title, source, sourceUrl, topic, summary,
    whatHappened: text(input.whatHappened) || null,
    whyItMatters: text(input.whyItMatters) || null,
    implications: text(input.implications) || null,
    recommendedAction: text(input.recommendedAction) || null,
    credibility: text(input.credibility) || "primary",
    posture, urgency: text(input.urgency) || "routine", status, publishedAt,
  } };
}
