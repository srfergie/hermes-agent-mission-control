import assert from "node:assert/strict";
import test from "node:test";
import { validateIntelItem } from "../src/lib/intel";

test("accepts a complete intelligence item with a canonical HTTPS source URL", () => {
  const result = validateIntelItem({
    title: "Claude adds organisation analytics",
    source: "Anthropic",
    sourceUrl: "https://support.claude.com/en/articles/example",
    topic: "enterprise AI",
    summary: "A concise summary.",
    whatHappened: "Anthropic released a reporting feature.",
    whyItMatters: "It may improve licence governance.",
    implications: "IOD PARC can measure adoption.",
    recommendedAction: "Investigate the available metrics.",
    credibility: "primary",
    posture: "investigate",
    status: "draft",
  });

  if (result.ok === false) throw new Error(result.error);
  assert.equal(result.ok, true);
  assert.equal(result.data.posture, "investigate");
  assert.equal(result.data.status, "draft");
});

test("rejects an intelligence item without a valid HTTPS source URL", () => {
  const result = validateIntelItem({
    title: "Missing source",
    source: "Anthropic",
    sourceUrl: "not-a-url",
    topic: "enterprise AI",
    summary: "A concise summary.",
  });

  assert.equal(result.ok, false);
  assert.match(result.error ?? "", /HTTPS source URL/);
});
