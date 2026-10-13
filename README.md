# Kaado ISI

Kaado ISI is a static web app for studying Japanese vocabulary, kana, and kanji with active recall and spaced repetition. The interface is in English and works in desktop and mobile browsers.

**No account or server is required.** Study progress is stored in the current browser's local storage.

## Content

- **Vocabulary:** Japanese words with readings and English and Spanish meanings, organized by textbook topic.
- **Kanji · 初級 II:** Kanji from 漢字HSJ初級II, with kunyomi, onyomi, and meaning prompts.
- **Kana:** Hiragana and katakana are prerequisite study content before kanji.
- **Kanji reference data:** JLPT, Jōyō grade, and WaniKani levels where available.
- **Campaign and ranks:** Global progress, content unlocks, and themed ranks.
- **Manual level adjustment:** Set the stage of known content without reviewing every card from the beginning.

## Studying

The app uses a shared review queue. New content is introduced as the learning campaign allows, and reviews become available when their scheduled interval expires.

### Answering cards

- Vocabulary cards require both the translation and reading parts.
- Kanji cards can ask for kunyomi, onyomi, or meaning.
- Translation answers may be in English or Spanish.
- Reading answers must match an accepted reading for that card.
- Romaji input is converted to kana when WanaKana is available.
- Small spelling mistakes in non-Japanese answers may be accepted and shown with a character-by-character comparison.
- If a kanji reading answer matches the opposite reading type, the app explains the distinction and lets you retry without penalizing the card.
- Revealing an answer applies the configured stage penalty.

## Spaced repetition

Each card has its own learning stage. A clean correct answer advances the card; incorrect attempts or revealing the answer can reduce its stage. When a card is penalized, its next interval is shortened according to the SRS rules.

The standard intervals are:

| Stage | Time until next review |
| ---: | --- |
| 0 | Available immediately |
| 1 | 4 hours |
| 2 | 8 hours |
| 3 | 1 day |
| 4 | 2 days |
| 5 | 7 days |
| 6 | 14 days |
| 7 | 30 days |
| 8 | 120 days |

Kana uses half of the standard intervals. Kana can be marked as mastered at stage 9; mastered kana are excluded from active statistics and will not be reviewed again.

## Statistics and content management

The Statistics view includes review counts, learning-stage charts, recent accuracy, and a seven-day kanji review forecast. Weekly performance requires at least 20 answers across at least two different days in the last seven days. The progress-zone threshold is 85% first-try accuracy; 100% is shown as Nirvana.

The Contents view provides searchable vocabulary, kana, and kanji lists. Manual adjustment tools can set stages by kanji level, textbook chapter, vocabulary topic, or individual card. Kanji reference filters include JLPT, Jōyō grade, WaniKani, and textbook chapter.

## Local synonyms

If a valid translation is not in the accepted answer list, you can save it as a local synonym after submitting an answer. Local synonyms apply only to vocabulary translations and kanji meanings, not reading questions. They are stored separately from study progress in this browser and are not synced to other devices. Resetting study progress does not delete local synonyms.

## Resetting progress

The Reset progress action asks for confirmation before deleting this app's saved study progress in the current browser. Local synonyms are managed separately and are not deleted by this action.

Progress is not synced between browsers or devices. Clearing this site's browser storage, using private browsing, or changing browser profiles may cause locally stored progress to be lost.

## Data and attribution

The app includes kanji reference data attributed to **OpenJLPT**, under the **CC BY-SA 4.0** license. JLPT levels are indicative and are not an official list published by the JLPT examination organization. Jōyō and WaniKani references are also provided for guidance and do not represent official equivalencies between systems. The app's dictionary attribution is **Jisho.org**.

## Development

The app is static and does not require a build step or package installation. Serve the project directory with a static web server that supports JavaScript and browser local storage.

- [index.html](./index.html): interface and script loading.
- [app.js](./app.js): interface, cards, campaign, statistics, and local persistence.
- [srs.js](./srs.js): spaced-repetition engine independent of the interface and app data.
- [tests/srs.test.js](./tests/srs.test.js): automated SRS tests, runnable with `node --test tests/srs.test.js`.

### Reusable SRS engine

`srs.js` exposes `KaadoSRS` in the browser and `module.exports` in Node.js. It accepts cards and state as plain objects, so it can be reused without copying the Kaado ISI interface, campaign, or storage layer. It includes state normalization, interval calculation, answer transitions, manual stage adjustments, and due-date checks. The app retains its existing local-storage key and progress data format.
