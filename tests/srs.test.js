const test = require("node:test");
const assert = require("node:assert/strict");
const SRS = require("../srs.js");

const NOW = 1_800_000_000_000;
const DAY = SRS.DAY_MS;

test("normalizes corrupted or legacy state without NaN values", () => {
  const state = SRS.normalizeState({ stage: 999, reps: -2, interval: "bad", due: null, seen: "3", lastReview: -1 }, "vocab");
  assert.equal(state.stage, 8);
  assert.equal(state.reps, 0);
  assert.equal(state.interval, 0);
  assert.equal(state.due, 0);
  assert.equal(state.seen, 3);
  assert.equal(state.lastReview, 0);
});

test("a clean correct answer advances one stage and schedules that stage's interval", () => {
  const next = SRS.reviewTransition({
    previousState: { stage: 0, seen: 0 }, key: "vocab:親",
    correct: true, penalty: 0, now: NOW
  });
  assert.equal(next.stage, 1);
  assert.equal(next.interval, 4 / 24);
  assert.equal(next.due, NOW + 4 * 60 * 60 * 1000);
  assert.equal(next.seen, 1);
  assert.equal(next.reps, 1);
});

test("one mistake drops one stage; two mistakes or reveal drop two", () => {
  const previousState = { stage: 5, reps: 4, seen: 8 };
  const one = SRS.reviewTransition({ previousState, key: "vocab:x", correct: true, penalty: 1, now: NOW });
  const two = SRS.reviewTransition({ previousState, key: "vocab:x", correct: true, penalty: 2, now: NOW });
  const reveal = SRS.reviewTransition({ previousState, key: "vocab:x", correct: false, penalty: 2, now: NOW });
  assert.equal(one.stage, 4);
  assert.equal(two.stage, 3);
  assert.equal(reveal.stage, 3);
  assert.equal(one.reps, 0);
  assert.equal(one.seen, 9);
});

test("penalties never make a stage negative and still schedule a retry", () => {
  const next = SRS.reviewTransition({ previousState: { stage: 0 }, key: "vocab:x", correct: false, penalty: 2, now: NOW });
  assert.equal(next.stage, 0);
  assert.equal(next.interval, 2 / 24);
  assert.equal(next.due, NOW + 2 * 60 * 60 * 1000);
});

test("kana uses half the interval and stage 9 is terminal", () => {
  const next = SRS.reviewTransition({ previousState: { stage: 0 }, key: "kana:あ", correct: true, penalty: 0, now: NOW });
  assert.equal(next.stage, 1);
  assert.equal(next.interval, 2 / 24);
  const mastered = SRS.manualStageTransition({ previousState: {}, key: "kana:あ", stage: 9, now: NOW });
  assert.equal(mastered.stage, 9);
  assert.equal(mastered.due, 0);
  assert.equal(SRS.isDue(mastered, NOW, "kana:あ"), false);
  assert.deepEqual(SRS.reviewTransition({ previousState: mastered, key: "kana:あ", correct: true, now: NOW }), mastered);
});

test("manual stage changes schedule the interval for the selected stage", () => {
  const next = SRS.manualStageTransition({ previousState: { seen: 4, reps: 2 }, key: "kanji:日:translation", stage: 4, now: NOW });
  assert.equal(next.stage, 4);
  assert.equal(next.interval, 2);
  assert.equal(next.due, NOW + 2 * DAY);
  assert.equal(next.seen, 4);
  assert.equal(next.reps, 0);
});

test("stage caps are respected for both regular cards and kana", () => {
  assert.equal(SRS.reviewTransition({ previousState: { stage: 8 }, key: "vocab:x", correct: true, now: NOW }).stage, 8);
  assert.equal(SRS.reviewTransition({ previousState: { stage: 8 }, key: "kana:あ", correct: true, now: NOW }).stage, 8);
});
