import assert from "node:assert/strict";
import test from "node:test";
import { classifyHealth } from "../src/lib/health-status";

const NOW = new Date("2026-08-24T09:00:00Z");

test("reports unavailable when no bridge health has been received", () => {
  assert.deepEqual(classifyHealth(null, NOW), {
    label: "Status unavailable",
    tone: "neutral",
  });
});

test("reports attention when a bridge health record is stale", () => {
  assert.deepEqual(
    classifyHealth({ online: true, lastSeen: "2026-08-24T08:57:00Z" }, NOW),
    { label: "Attention needed", tone: "warn" },
  );
});

test("reports attention when the bridge is explicitly offline", () => {
  assert.deepEqual(
    classifyHealth({ online: false, lastSeen: "2026-08-24T08:59:30Z" }, NOW),
    { label: "Attention needed", tone: "warn" },
  );
});

test("reports attention when a bridge timestamp is in the future", () => {
  assert.deepEqual(
    classifyHealth({ online: true, lastSeen: "2026-08-24T09:01:00Z" }, NOW),
    { label: "Attention needed", tone: "warn" },
  );
});

test("reports unavailable for a malformed online field", () => {
  assert.deepEqual(
    classifyHealth(
      { online: "false", lastSeen: "2026-08-24T08:59:30Z" } as unknown as { online: boolean; lastSeen: string },
      NOW,
    ),
    { label: "Status unavailable", tone: "neutral" },
  );
});

test("reports unavailable for missing, invalid and calendar-invalid timestamps", () => {
  const invalidRecords = [
    { online: true, lastSeen: null },
    { online: true, lastSeen: "not-a-timestamp" },
    { online: true, lastSeen: "2026-02-30T09:00:00Z" },
  ];

  for (const record of invalidRecords) {
    assert.deepEqual(
      classifyHealth(record as unknown as { online: boolean; lastSeen: string }, NOW),
      { label: "Status unavailable", tone: "neutral" },
    );
  }
});

test("reports healthy only for a recent online bridge health record", () => {
  assert.deepEqual(
    classifyHealth({ online: true, lastSeen: "2026-08-24T08:59:30Z" }, NOW),
    { label: "Systems healthy", tone: "up" },
  );
});
