# become.dev

A self-paced, interactive engineering school that takes developers from absolute beginner to senior and staff level.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TypeScript (strict mode)
- Fonts: Poppins (headings), DM Sans (body), JetBrains Mono (code)

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```text
app/
  (marketing)/       # Marketing pages and components
  (platform)/        # Platform pages and components
components/
  ui/                # Shared UI components
content/
  modules/           # Course content (MDX + JSON)
lib/                 # Utilities and content loaders
types/               # TypeScript types
```

## Content Structure

Each lesson is stored as three files:

```text
content/modules/{module-id}/
  meta.json           # Module metadata
  lessons/{lesson-id}/
    prose.mdx         # Learn tab content
    exercises.json    # Practice tab exercises
    quiz.json         # Assess tab questions
```

After adding new content, regenerate the tracks index:

```bash
npm run generate:tracks
```

## Learning Paths

| Path   | Target              |
| ------ | ------------------- |
| Path 1 | Zero to Junior      |
| Path 2 | Junior to Mid       |
| Path 3 | Mid to Senior/Staff |

## Tracks

- **Foundations** (F01-F07): Web basics, HTML/CSS, JavaScript, TypeScript, Git
- **Professional** (P01-P09): Advanced JS/TS, React, Testing, CI/CD, AI
- **Advanced** (A01-A06): Engine internals, Performance, Design Systems, Leadership
