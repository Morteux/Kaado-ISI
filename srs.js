/*!
 * Kaado SRS Core
 * Version: 1.0.0
 * Dependency-free spaced-repetition engine.
 * Browser: window.KaadoSRS | Node.js: module.exports
 * Scheduling policy is injected through plain data, so this module can be reused
 * independently of Kaado ISI's UI, datasets, storage, and campaign logic.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.KaadoSRS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DAY_MS = 86400000;
  const INTERVALS_DAYS = Object.freeze([4 / 24, 8 / 24, 1, 2, 7, 14, 30, 120]);
  const MAX_STAGE = 8;
  const DEFAULT_STATE = Object.freeze({
    stage: 0, reps: 0, interval: 0, due: 0, seen: 0, lastReview: 0
  });

  function finiteNonNegative(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
  }

  function maxStageFor(cardOrKey, configuredMax = MAX_STAGE) {
    const key = typeof cardOrKey === "string"
      ? cardOrKey
      : String(cardOrKey && (cardOrKey.key || cardOrKey.jp) || "");
    if (key.startsWith("kana:") || (cardOrKey && cardOrKey.type === "kana")) return 9;
    return Math.max(0, Math.min(MAX_STAGE, Number.isInteger(configuredMax) ? configuredMax : MAX_STAGE));
  }

  function normalizeState(rawState, cardOrKey) {
    const raw = rawState && typeof rawState === "object" && !Array.isArray(rawState) ? rawState : {};
    const maxStage = maxStageFor(cardOrKey);
    const stageValue = Number(raw.stage);
    const stage = Number.isInteger(stageValue) ? Math.max(0, Math.min(maxStage, stageValue)) : 0;
    return {
      ...DEFAULT_STATE,
      ...raw,
      stage,
      reps: Math.floor(finiteNonNegative(raw.reps)),
      interval: finiteNonNegative(raw.interval),
      due: finiteNonNegative(raw.due),
      seen: Math.floor(finiteNonNegative(raw.seen)),
      lastReview: finiteNonNegative(raw.lastReview)
    };
  }

  function intervalForStage(stage, intervals = INTERVALS_DAYS) {
    const safeStage = Math.max(1, Math.min(intervals.length, Math.floor(Number(stage) || 1)));
    return finiteNonNegative(intervals[safeStage - 1]);
  }

  function failureInterval(stage, intervals = INTERVALS_DAYS) {
    // A failed card drops to the resulting stage, then returns at half that
    // stage's normal interval. Stage 0 uses half the first interval.
    return intervalForStage(Math.max(1, Number(stage) || 0), intervals) / 2;
  }

  function reviewTransition(options = {}) {
    const {
      previousState, card, key, correct = false, penalty = 0,
      now = Date.now(), intervals = INTERVALS_DAYS, dayMs = DAY_MS
    } = options;
    const identity = card || key || "";
    const previous = normalizeState(previousState, identity);
    if (maxStageFor(identity) === 9 && previous.stage === 9) return previous;
    const cleanCorrect = correct === true && Number(penalty) === 0;
    const penaltySteps = cleanCorrect ? 0 : Math.max(1, Math.min(2, Math.floor(Number(penalty) || 1)));
    const stage = cleanCorrect
      ? Math.min(maxStageFor(identity), previous.stage + 1)
      : Math.max(0, previous.stage - penaltySteps);
    let interval = cleanCorrect
      ? intervalForStage(stage, intervals)
      : failureInterval(stage, intervals);
    if (identity && (typeof identity === "object" ? identity.type === "kana" : String(identity).startsWith("kana:"))) {
      interval *= 0.5;
    }
    const timestamp = finiteNonNegative(now, Date.now());
    return {
      ...previous,
      stage,
      reps: cleanCorrect ? previous.reps + 1 : 0,
      interval,
      due: timestamp + interval * dayMs,
      lastReview: timestamp,
      seen: previous.seen + 1
    };
  }

  function manualStageTransition(options = {}) {
    const { previousState, card, key, stage: requestedStage, now = Date.now(), intervals = INTERVALS_DAYS, dayMs = DAY_MS } = options;
    const identity = card || key || "";
    const previous = normalizeState(previousState, identity);
    const maxStage = maxStageFor(identity);
    const numericStage = Number(requestedStage);
    const stage = Math.max(0, Math.min(maxStage, Number.isFinite(numericStage) ? Math.floor(numericStage) : 0));
    const mastered = maxStage === 9 && stage === 9;
    const interval = stage === 0 || mastered ? 0 : intervalForStage(stage, intervals) * (maxStage === 9 ? 0.5 : 1);
    const timestamp = finiteNonNegative(now, Date.now());
    return {
      ...previous,
      stage,
      interval,
      due: mastered ? 0 : stage === 0 ? timestamp : timestamp + interval * dayMs,
      lastReview: stage === 0 || mastered ? 0 : timestamp,
      seen: stage === 0 ? 0 : Math.max(1, previous.seen),
      reps: 0
    };
  }

  function isDue(state, now = Date.now(), cardOrKey) {
    const normalized = normalizeState(state, cardOrKey);
    // Stage 9 is a terminal mastered state for kana and must never be due.
    if (maxStageFor(cardOrKey) === 9 && normalized.stage === 9) return false;
    return normalized.due <= finiteNonNegative(now, Date.now());
  }

  return Object.freeze({
    DAY_MS,
    MAX_STAGE,
    INTERVALS_DAYS,
    DEFAULT_STATE,
    maxStageFor,
    normalizeState,
    intervalForStage,
    failureInterval,
    reviewTransition,
    manualStageTransition,
    isDue
  });
});
