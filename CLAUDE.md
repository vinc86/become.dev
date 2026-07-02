# become.dev

Next.js App Router project with Tailwind CSS v4.

## Stack
- Next.js 16 App Router
- Tailwind CSS v4
- TypeScript strict
- Poppins (headings), DM Sans (body), JetBrains Mono (code)

## Conventions
- Components in `app/(marketing)/components/` for marketing pages
- Components in `app/(platform)/components/` for platform pages
- Shared UI components in `components/ui/`
- Content types in `types/content.ts`
- Content loader in `lib/content.ts`
- Use `cn()` from `lib/cn.ts` for conditional classes
- No `any` types
- All components Server Components by default — add `"use client"` only when needed

## Platform Plan — source of truth

The platform plan lives in **`docs/PLAN.md` (v1.4)** with the EPIC backlog in **`docs/epic-backlog-v1.4.pdf`**. Those files are the source of truth for all product decisions — when anything here or in an agent definition conflicts with them, the docs win.

Key decisions that older material tends to get wrong:

- **Cookie economy (revised in v1.2)**: lesson unlocking is **completion-based** — Lesson N+1 unlocks when Lesson N is completed (all exercises solved or hints exhausted, quiz submitted). Cookies are a **reward and status currency**, never a progression gate. Earning: +10 correct exercise answer, +5 first-attempt bonus, +25 lesson completion, +15 quiz completion, +100 module final passed. Spending: hint reveal −5, early Field Notes unlock −50, War Room entry −25 (refunded + bonus on solve), cosmetic flair.
- **Monetization (decided in v1.3, Option B)**: the entire Foundations track (F01–F07) is free. Professional and Advanced tracks are paid, with entitlements at **track level**. Lesson 1 of every paid module carries a `freePreview` flag and is playable without purchase.
- **Hints**: every exercise has 1–2 hints, available after the first wrong attempt, 5 cookies each. A learner at 0 cookies can still complete everything.
- **Content status**: only F03 has content done; everything else is backlog. The actual state is what exists under `content/modules/` — PLAN §3/§5.6 wrongly lists F06 as done.
- **The War Room (EPIC-16)**: paid tier only, timed IDENTIFY→FIX incident challenges, no hints by design.

## Content File Structure

Each lesson is stored as three separate files:

```
content/
  tracks.json                    ← generated, never edit manually
  modules/
    {module-id}/
      meta.json
      lessons/
        {lesson-id}/
          prose.mdx      ← Learn tab
          exercises.json ← Practice tab
          quiz.json      ← Assess tab
```

## Content Standards

### Voice
Direct, technically precise, never condescending. Two levels per concept:
- Main explanation — clear, precise
- Simply Put block — same concept stripped of jargon. Max 2–3 sentences.

### Forward References
When content references a later module or lesson, use the MDX component:
`<ForwardRef module="F04" title="JavaScript Core Depth" />` (a specific lesson: `module="F03-04"`).

### Typography
- Body: DM Sans, 15px
- Headings: Poppins, weight 700–800
- Code and UI labels: JetBrains Mono

### Responsive Layout
Single breakpoint at 953px. Above: sidebar + main content. Below: sidebar hidden, mobile drawer via hamburger. Sticky topbar and tab bar on all screen sizes.
