# Content Authoring Guide

This document explains how to add and maintain content in become.dev. Read it before creating or editing any module or lesson files.

---

## Folder Structure

```
content/
  tracks.json                          ← module order per track (generated)
  modules/
    {module-id}/                       ← e.g. f03-javascript-foundations
      meta.json                        ← module metadata
      lessons/
        {lesson-id}/                   ← e.g. 01-variables-and-values
          prose.mdx                    ← Learn tab
          exercises.json               ← Practice tab
          quiz.json                    ← Assess tab
```

### Naming conventions

**Module folders:** `{track-prefix}{number}-{kebab-title}`
- Foundations: `f01-`, `f02-`, ...
- Professional: `p01-`, `p02-`, ...
- Advanced: `a01-`, `a02-`, ...

**Lesson folders:** `{number}-{kebab-title}` — zero-padded, e.g. `01-variables-and-values`

---

## Adding a New Module

1. Create the module folder: `content/modules/{module-id}/`
2. Create `meta.json` (see format below)
3. Create `lessons/` with at least one lesson folder
4. Run `npm run generate:tracks` to update `tracks.json`

### meta.json format

```json
{
  "id": "F03",
  "title": "JavaScript Foundations",
  "track": "foundations",
  "paths": ["path-1"]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Uppercase module code (F03, P01, A02) |
| `title` | string | Human-readable title |
| `track` | string | One of: `foundations`, `professional`, `advanced` |
| `paths` | string[] | Which learning paths include this module |

---

## Adding a New Lesson

1. Create the lesson folder inside `lessons/`
2. Create the three files: `prose.mdx`, `exercises.json`, `quiz.json`

### prose.mdx format

```mdx
---
lessonId: "01"
title: "Variables and Values"
sectionCount: 4
---

## Section Heading

Prose content. 300-600 words. Start with a real technical fact.

```js
// code example — always with real context
```

More prose...

> **Simply Put:** Plain English summary. Max 2-3 sentences. Only when needed.

## Next Section

More content...

[→ Lesson 03] Forward reference when a concept belongs to a later lesson.
```

**Prose rules:**
- No em dashes (—). Use periods, commas, or parentheses instead.
- Second person throughout ("you", "your code")
- Each section covers exactly one concept
- Simply Put blocks only when the concept is genuinely complex

### exercises.json format

A flat JSON array. Choose exercise types based on what the concept requires — not all types are needed in every lesson.

```json
[
  {
    "type": "PREDICT",
    "question": "What does this code output?",
    "code": "console.log(typeof null);",
    "options": ["null", "object", "undefined", "string"],
    "correctIndex": 1,
    "explanation": "typeof null returns 'object' — a historical bug in JavaScript that was never fixed for backwards compatibility reasons."
  }
]
```

**Available types:**

| Type | Use when |
|------|----------|
| `ORDER` | The concept has a clear sequence of steps |
| `PREDICT` | The learner needs to reason about code output |
| `IDENTIFY` | The learner needs to spot a bug or pattern |
| `CLASSIFY` | The concept involves sorting items into categories |
| `FIX` | The learner needs to correct broken code |
| `IMPLEMENT` | The learner needs to write code to solve a problem |

**Type schemas:**

```json
// ORDER
{
  "type": "ORDER",
  "question": "...",
  "code": "...",
  "items": ["step 1", "step 2", "step 3"],
  "correctOrder": [0, 1, 2],
  "explanation": "..."
}

// PREDICT
{
  "type": "PREDICT",
  "question": "...",
  "code": "...",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 0,
  "explanation": "..."
}

// IDENTIFY
{
  "type": "IDENTIFY",
  "question": "...",
  "code": "...",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 0,
  "explanation": "..."
}

// CLASSIFY
{
  "type": "CLASSIFY",
  "question": "...",
  "items": [{ "label": "...", "category": "A" }],
  "categories": ["A", "B"],
  "explanation": "..."
}

// FIX
{
  "type": "FIX",
  "question": "...",
  "buggyCode": "...",
  "options": ["fix A", "fix B", "fix C", "fix D"],
  "correctIndex": 0,
  "explanation": "..."
}

// IMPLEMENT
{
  "type": "IMPLEMENT",
  "question": "...",
  "setup": "Context and requirements...",
  "starterCode": "...",
  "tests": [
    { "description": "...", "expectation": "..." }
  ],
  "solutionCode": "...",
  "explanation": "..."
}
```

**Exercise rules:**
- 4-8 exercises per lesson
- Progressive difficulty: straightforward first, ambiguous last
- Every exercise must be rooted in a real scenario
- The explanation must teach something new, not just confirm the answer
- Include at least one FIX or IDENTIFY per lesson when the content allows

### quiz.json format

```json
[
  {
    "type": "MCQ",
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 2,
    "explanation": "..."
  },
  {
    "type": "SCENARIO",
    "setup": "Description of the real situation...",
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 1,
    "explanation": "..."
  }
]
```

**Quiz rules:**
- 3-8 questions per lesson
- At least 1-2 SCENARIO questions per lesson
- Wrong options must be plausible — no obviously incorrect answers
- Explanations must say why each wrong option is wrong, not just why the correct one is right

---

## Updating tracks.json

`tracks.json` is generated — never edit it manually.

After adding or renaming a module folder, run:

```bash
npm run generate:tracks
```

This reads all `meta.json` files and rebuilds `tracks.json` with modules grouped by track. The order within each track follows the module folder naming (f01, f02, ...).

---

## Content Quality Standards

Before submitting content, verify:

- All code examples are valid and runnable
- No em dashes in prose
- Each section covers one concept only
- At least one exercise requires fixing or debugging real code
- At least one quiz question tests decision-making, not memory
- Simply Put blocks are present only where genuinely needed
- Forward references use the format `[→ Lesson X.Y]`

---

## Using the Content Pipeline

To generate a full module with AI assistance, use the `content-pipeline` Claude Code agent:

```
Write all lessons for {module-id} — {Module Title}
Track: {foundations | professional | advanced}
```

The pipeline produces an outline for your approval, then writes all lesson files in parallel. Each lesson goes through two review cycles before shipping.

See `.claude/agents/content-pipeline.md` for full documentation.