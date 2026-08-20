import assert from "node:assert/strict";
import test from "node:test";
import { personalThreads, morningPrompts } from "../src/lib/mission-control";

test("defines the five agreed personal operating threads", () => {
  assert.deepEqual(
    personalThreads.map((thread) => thread.slug),
    ["study", "radar", "lab", "application", "try-list"],
  );
});

test("defines the three morning decisions", () => {
  assert.equal(morningPrompts.length, 3);
  assert.match(morningPrompts[0].question, /changed overnight/i);
});
