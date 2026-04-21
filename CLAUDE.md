# become.dev

Next.js 15 App Router project with Tailwind CSS v4.

## Stack
- Next.js 15 App Router
- Tailwind CSS v4
- TypeScript strict
- Poppins (headings), DM Sans (body), JetBrains Mono (code)

## Conventions
- Components in `app/(marketing)/components/` for marketing pages
- Components in `app/(platform)/components/` for platform pages
- Shared UI components in `components/ui/`
- Content types in `types/content.ts`
- Content loader in `lib/content.ts`
- Use `cn()` from `lib/utils.ts` for conditional classes
- No `any` types
- All components Server Components by default — add `"use client"` only when needed

# become.dev — Platform Plan

> v1.0 · February 2026

---

## 1. Vision

A self-paced, interactive engineering school that takes developers from absolute beginner to senior and staff level. Built around three beliefs: deep understanding of internals makes better engineers, mastery comes from doing (not reading), and the learning experience should be as well-crafted as the software it teaches.

---

## 2. Learning Paths

Three distinct journeys share modules where content overlaps, but differ in framing, exercise difficulty, and capstone recommendations.

| Path | Target | Goal |
|------|--------|------|
| Path 1 — Zero to Junior | Complete beginners or career-changers | Job-ready as a junior frontend developer |
| Path 2 — Junior to Mid | Working devs who can ship but don't understand why things work | Confident, self-sufficient mid-level engineer |
| Path 3 — Mid to Senior/Staff | Deep track. Internals, architecture, leadership | The engineer others come to for hard problems |

Path selection happens at entry. Not a permanent lock — learners can switch at any time. The path sets defaults for exercise difficulty, framing, and capstone recommendations, but does not restrict access to any content.

---

## 3. Full Module Catalog

### Foundations Track
*Path 1 primary · Path 2 review*

| # | Module | Key Topics |
|---|--------|------------|
| F01 | How the Web Works | DNS, HTTP, browsers, request lifecycle, DevTools basics |
| F02 | HTML & CSS Fundamentals | Semantic HTML, box model, flexbox, grid, responsive design |
| F03 | JavaScript Foundations | Variables, types, functions, scope, the DOM |
| F04 | JavaScript Core Depth | Closures, prototypes, this, event delegation, async basics |
| F05 | Advanced Arrays & Objects | map/filter/reduce, destructuring, spread, Object methods, immutability |
| F06 | TypeScript Foundations | Types, interfaces, generics basics, migrating from JS |
| F07 | Git & GitHub Essentials | Commits, branches, PRs, merge vs rebase, gh CLI, CODEOWNERS |

### Professional Track
*Path 2 primary · Path 1 advanced · Path 3 review*

| # | Module | Key Topics |
|---|--------|------------|
| P01 | Advanced JavaScript | Closures deep dive, prototypal inheritance, iterators/generators, WeakMap/WeakRef |
| P02 | Advanced TypeScript | Mapped types, conditional types, template literals, variance, branded types |
| P03 | React Foundations | Component model, hooks, state, effects, the mental model |
| P04 | React Architecture | Fiber internals, concurrent rendering, RSC, TanStack Router, React 19 |
| P05 | CSS Architecture | Custom properties, design tokens, CSS-in-JS tradeoffs, animations, Tailwind |
| P06 | Testing Strategy | Testing trophy, unit/integration/E2E, Vitest, Playwright, MSW |
| P07 | Architectural Patterns | Monorepo/polyrepo, micro-frontends, MVC/MVVM/islands, state architecture, BFF |
| P08 | GitHub Actions & CI/CD | YAML anatomy, triggers, jobs, secrets, matrix builds, deploy pipelines |
| P09 | AI-Augmented Engineering | AI as coworker, LLM API integration, production AI, comprehension debt |

### Advanced Track
*Path 3 primary*

| # | Module | Key Topics |
|---|--------|------------|
| A01 | JS Engine Internals ✓ | V8, JIT, Ignition/TurboFan, event loop, GC, hidden classes — **BUILT** |
| A02 | Browser Rendering Pipeline | Parse→Style→Layout→Paint→Composite, layer promotion, CRP optimisation |
| A03 | Frontend Performance Eng. | Core Web Vitals, INP, bundling, tree shaking, caching, profiling |
| A04 | Design Systems Engineering | Token architecture, component contracts, accessibility-first, versioning |
| A05 | Build Tooling & Modules | Vite/webpack internals, custom plugins, module federation, esbuild, SWC |
| A06 | Engineering Leadership | RFCs, ADRs, code review philosophy, technical roadmaps, mentoring |

---

## 4. Module Anatomy

### 4.1 Lesson Structure

Each lesson has three tabs:

| Tab | Status | Contents |
|-----|--------|----------|
| 📖 Learn | Always open | Prose, code examples, Simply Put blocks, forward-reference tags |
| ⚡ Practice | Always open | Interactive exercises with immediate feedback. Cookies earned here only. |
| 🎯 Assess | Locks until first exercise attempted | Quiz + scenario questions. Grouped submit. Score + reasoning revealed after. |

### 4.2 Assessment System

Two levels of assessment per module:

- **Lesson-level quiz** — 3–8 questions. Mix of MCQ and Scenario. Submitted as a group.
- **Module Final Assessment** — 8–10 questions. Unlocks only when: all lessons visited, all quizzes submitted, all exercises solved or hints exhausted.

After submission: score with progress bar, correct/incorrect per question with reasoning (1–3 lines), Retake button.

### 4.3 Exercise Types

- **ORDER** — arrange steps or code lines into correct sequence
- **PREDICT** — choose what output/behaviour a code snippet produces
- **IDENTIFY** — spot the bug, pattern, or concept in given code
- **CLASSIFY** — assign items to categories
- **FIX** — rewrite a broken snippet to make it correct
- **IMPLEMENT** — write code to solve a real production-like problem

Exercises provide immediate per-answer feedback. Completing all exercises in a lesson awards a bonus cookie payout.

### 4.4 Hint System

Each exercise has 1–2 hints available after the first wrong attempt. Hints cost 5 cookies on reveal.

### 4.5 Cookie Economy

Cookies are the sole progression currency. Earned through exercises, spent to unlock lessons.

| Earning | Spending |
|---------|----------|
| Correct exercise answer: +10 cookies | Unlock Lesson 2: 40 cookies |
| Lesson completion bonus: +25 cookies | Unlock Lesson 3: 90 cookies |
| No cookies from simulators or passive actions | Unlock Lesson 4: 150 cookies |
| | Reveal hint: 5 cookies |

---

## 5. Platform Sections

### 5.1 Path Selector (Onboarding)
Entry experience. Card-based path picker. No diagnostic quiz at this stage — manual pick is faster.

### 5.2 Course Dashboard
Persistent overview: path chosen, modules completed, cookies earned, exercises solved, capstones in progress.

### 5.3 Field Notes
Living reference section. Cheat sheets, DevTools guides, quick-lookups. Unlocked progressively as modules are completed.

### 5.4 The War Room
Debugging challenges with no hints and no guidance. Real-world scenarios with time pressure. Unlocks after completing core modules. Highest cookie rewards on the platform.

### 5.5 Capstone Workspace
Four capstone projects aligned to Path 3. Each has a brief, milestones, and a structured workspace.

---

## 6. Interview Accelerator

Track-specific interview prep. Built incrementally alongside each track — not standalone content. Each path gets its own interview section that cross-references existing module content rather than duplicating it.

- **IP-01** — Junior/Mid Interview Prep (ships after Foundations + Professional tracks)
- **IP-02** — Senior/Staff Interview Prep (ships after Advanced Track)

---

## 7. Content Standards

### Voice
Direct, technically precise, never condescending. Two levels per concept:
- Main explanation — clear, precise
- Simply Put block — same concept stripped of jargon. Max 2–3 sentences.

### Forward Reference Tags
When content references a later module: `[→ Module X · Topic]`. Signals intentional forward-pointing.

### Typography
- Body: DM Sans, 15px
- Headings: Poppins, weight 700–800
- Code and UI labels: JetBrains Mono

### Responsive Layout
Single breakpoint at 953px. Above: sidebar + main content. Below: sidebar hidden, mobile drawer via hamburger. Sticky topbar and tab bar on all screen sizes.

---

## 8. Content File Structure

Each lesson is stored as three separate files:

```
content/
  modules/
    {module-id}/
      meta.json
      lessons/
        {lesson-id}/
          prose.mdx      ← Learn tab
          exercises.json ← Practice tab
          quiz.json      ← Assess tab
```

---