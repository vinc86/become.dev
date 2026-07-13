# become.dev — Platform Plan

> v1.4 · June 2026
> Changes from v1.3: The War Room formalized as **EPIC-16** (P2, L) — incident-style lifecycle briefing → investigation → post-mortem, built as a timed IDENTIFY→FIX chain on the EPIC-08 engine; no hints by design, itemized payout, paid tier only. §7.4 updated; Phase 3 reordered.
> Changes from v1.2: free/paid boundary **decided** — Option B (§5.2): Foundations track completamente gratuita, Professional + Advanced a pagamento. Il prodotto pagato della Phase 1 diventa **Professional early access** (§12); Foundations gratuita è il motore di acquisizione e la prova della piattaforma. Definiti i contenuti gratuiti extra (§5.3). EPIC-14 aggiornato di conseguenza.
> Changes from v1.1: added Monetization (§5) and Launch Sequencing (§12); inverted cookie economy (§4.5); fixed EPIC-07/11 dependency direction; added EPIC-14 (Payments & Entitlements) and EPIC-15 (Launch Readiness); IMPLEMENT exercise path clarified; statuses synced with backlog.

---

## 1. Vision

A self-paced, interactive engineering school that takes developers from absolute beginner to senior and staff level. Built around three beliefs: deep understanding of internals makes better engineers, mastery comes from doing (not reading), and the learning experience should be as well-crafted as the software it teaches.

Designed with accessibility in mind — short sections, immediate feedback, visible progress — making it effective for developers with ADHD or attention difficulties.

**v1.3 commercial thesis:** become.dev is freemium per track. The Foundations track is completely free — acquisition engine and live proof of platform quality. Revenue comes from the Professional and Advanced tracks; willingness to pay is validated *before* the full catalog exists via a paid early access of the Professional track (see §5 and §12). Content is the product; the platform is infrastructure in service of it.

---

## 2. Learning Paths

Three distinct journeys share modules where content overlaps, but differ in framing, exercise difficulty, and capstone recommendations.

| Path | Target | Goal |
|------|--------|------|
| 🌱 Path 1 — Zero to Junior | Complete beginners or career-changers | Job-ready as a junior frontend developer |
| 📈 Path 2 — Junior to Mid | Working devs who can ship but do not understand why things work | Confident, self-sufficient mid-level engineer |
| 🔥 Path 3 — Mid to Senior/Staff | Deep track. Internals, architecture, leadership | The engineer others come to for hard problems |

Path selection happens at entry. Not a permanent lock — learners can switch at any time.

---

## 3. Full Module Catalog

### Foundations Track
*Path 1 primary · Path 2 review*

| # | Module | Key Topics | Status |
|---|--------|------------|--------|
| F01 | How the Web Works | DNS, HTTP, browsers, request lifecycle, DevTools basics | Backlog |
| F02 | HTML & CSS Fundamentals | Semantic HTML, box model, flexbox, grid, responsive design | Backlog |
| F03 | JavaScript Foundations | Variables, types, functions, scope, the DOM | ✅ Content done |
| F04 | JavaScript Core Depth | Closures, prototypes, this, event delegation, async basics | Backlog |
| F05 | Advanced Arrays & Objects | map/filter/reduce, destructuring, spread, Object methods, immutability | Backlog |
| F06 | TypeScript Foundations | Types, interfaces, generics basics, migrating from JS | Backlog |
| F07 | Git & GitHub Essentials | Commits, branches, PRs, merge vs rebase, gh CLI, CODEOWNERS | Backlog |

### Professional Track
*Path 2 primary · Path 1 advanced · Path 3 review*

| # | Module | Key Topics | Status |
|---|--------|------------|--------|
| P01 | Advanced JavaScript | Closures deep dive, prototypal inheritance, iterators/generators, WeakMap/WeakRef | Backlog |
| P02 | Advanced TypeScript | Mapped types, conditional types, template literals, variance, branded types | Backlog |
| P03 | React Foundations | Component model, hooks, state, effects, the mental model | Backlog |
| P04 | React Architecture | Fiber internals, concurrent rendering, RSC, TanStack Router, React 19 | Backlog |
| P05 | CSS Architecture | Custom properties, design tokens, CSS-in-JS tradeoffs, animations, Tailwind | Backlog |
| P06 | Testing Strategy | Testing trophy, unit/integration/E2E, Vitest, Playwright, MSW | Backlog |
| P07 | Architectural Patterns | Monorepo/polyrepo, micro-frontends, MVC/MVVM/islands, state architecture, BFF | Backlog |
| P08 | GitHub Actions & CI/CD | YAML anatomy, triggers, jobs, secrets, matrix builds, deploy pipelines | Backlog |
| P09 | AI-Augmented Engineering | AI as coworker, LLM API integration, production AI, comprehension debt | Backlog |

### Advanced Track
*Path 3 primary*

| # | Module | Key Topics | Status |
|---|--------|------------|--------|
| A01 | JS Engine Internals | V8, JIT, Ignition/TurboFan, event loop, GC, hidden classes | Backlog |
| A02 | Browser Rendering Pipeline | Parse→Style→Layout→Paint→Composite, layer promotion, CRP optimisation | Backlog |
| A03 | Frontend Performance Eng. | Core Web Vitals, INP, bundling, tree shaking, caching, profiling | Backlog |
| A04 | Design Systems Engineering | Token architecture, component contracts, accessibility-first, versioning | Backlog |
| A05 | Build Tooling & Modules | Vite/webpack internals, custom plugins, module federation, esbuild, SWC | Backlog |
| A06 | Engineering Leadership | RFCs, ADRs, code review philosophy, technical roadmaps, mentoring | Backlog |

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

- **Lesson-level quiz** — 3-8 questions. Mix of MCQ and Scenario. Submitted as a group.
- **Module Final Assessment** — 8-10 questions. Unlocks only when: all lessons visited, all quizzes submitted, all exercises solved or hints exhausted.

### 4.3 Exercise Types

| Type | Description | Engine |
|------|-------------|--------|
| ORDER | Arrange steps or code lines into correct sequence | EPIC-08 |
| PREDICT | Choose what output a code snippet produces | EPIC-08 |
| IDENTIFY | Spot the bug, pattern, or concept in given code | EPIC-08 |
| CLASSIFY | Assign items to categories | EPIC-08 |
| FIX | Rewrite a broken snippet to make it correct | EPIC-08 |
| IMPLEMENT | Write code to solve a real production-like problem | EPIC-12 (sandboxed editor) · Interim: repo-based variant in EPIC-08 |

**v1.2 clarification:** IMPLEMENT requires the in-browser editor (EPIC-12, P2). Because "mastery comes from doing" is the core product thesis, IMPLEMENT must not wait until the final EPIC: EPIC-08 ships an **interim repo-based IMPLEMENT variant** — the exercise provides a starter repo / instructions, the learner solves it locally, and submits a self-check confirmation against a provided test suite. EPIC-12 later upgrades this to fully in-browser execution.

### 4.4 Hint System

Each exercise has 1-2 hints available after the first wrong attempt. Hints cost 5 cookies on reveal. Cookie balance can never block progression (see §4.5) — a learner at 0 cookies can still complete every lesson; they simply forgo hints until they earn more.

### 4.5 Cookie Economy — REVISED in v1.2

**Previous model (v1.1):** cookies were the sole progression currency; lessons were locked behind cookie spend. **Removed.** Rationale: a paying customer must never be locked out of content they purchased; spend-gated lessons generate refund requests and fight the ADHD-friendly design goal. The v1.1 numbers were also mathematically infeasible (a perfect student could not afford Lesson 4).

**New model:** progression is gated by **completion**, cookies are a **reward and status currency**.

| Earning | Spending |
|---------|----------|
| Correct exercise answer: +10 | Hint reveal: −5 |
| First-attempt bonus: +5 | Early Field Notes unlock (before module completion): −50 |
| Lesson completion bonus: +25 | War Room challenge entry: −25 (refunded + bonus on success) |
| Quiz completion: +15 | Cosmetic profile flair / themes: variable |
| Module Final passed: +100 | |

**Lesson unlock rule:** Lesson N+1 unlocks when Lesson N is completed (all exercises solved or hints exhausted, quiz submitted). No cookie cost.

---

## 5. Monetization — DECIDED in v1.3

### 5.1 Model

**Freemium per track.** The Foundations track is completely free and acts as acquisition engine and proof of the platform; revenue comes from the Professional and Advanced tracks. Launch via **paid early access of the Professional track**.

| Tier | Contents | Price |
|------|----------|-------|
| Free | **Entire Foundations track** (F01–F07) + free extras (§5.3) + Catalog + Landing | €0 |
| Paid | Professional track, Advanced track, War Room, full Field Notes, Interview Accelerator | One-time per track; early-access discount locks the price — final pricing validated via pre-sale |

### 5.2 Free/paid boundary — RESOLVED: Option B

**Decision: Option B.** Foundations free aligns who pays with who has budget: beginners (Path 1) are high-volume / low willingness-to-pay; working devs (Path 2/3) pay for depth. Boundary is clean to communicate ("everything in Foundations is free, forever") and clean to implement: **entitlements at track level**, not per module — simplifies EPIC-14.

Discarded: Option A (first module free per track — weak proof for beginners, leaks paid depth) and Option C (first lesson of every module free — confusing boundary, hard to message). A *limited* element of C survives as a preview mechanism, see §5.3.

Consequence for the Module Engine (EPIC-07): the "requires purchase" lock state applies at **track level**, with a per-lesson exemption flag for the previews below.

### 5.3 Free extras (acquisition surface beyond Foundations)

| Extra | Purpose | Rule |
|-------|---------|------|
| First lesson of every Professional/Advanced module | Shows the depth of paid material — the real selling argument for a skeptical mid-level dev | Lesson 1 of each paid module carries a `freePreview` flag; exercises playable, no module progression beyond it |
| Selected Field Notes | Shareable cheat sheets — SEO + YouTube Shorts material | Curated subset marked free; rest unlocks with paid modules |
| Interview Accelerator teaser | Most monetizable asset; a taste creates demand | 1–2 questions with model answer, clearly marked as sample |

Not free, deliberately: full Professional modules, the War Room, capstones. The clean boundary is the message.

### 5.4 Billing infrastructure

EU consumer sales → VAT per buyer country. Decision: use a **Merchant of Record** (Paddle or Lemon Squeezy) rather than raw Stripe, eliminating OSS/VAT filing burden. Entitlements stored in Supabase **at track granularity**, checked server-side in the content loader; `freePreview` lessons exempt from the check.

### 5.5 Pre-revenue validation — reframed

The landing page pre-sale block (EPIC-03 follow-up) now sells the new Phase 1 product:

> **"Foundations free at launch. Lock the early-access price for the Professional track."**

Waitlist captures free-tier interest; pre-orders validate willingness to pay for Professional. Both signals matter: free signups size the funnel, pre-orders size the revenue.

### 5.6 Content prerequisites for launch (the real critical path)

| Milestone | Requirement | Current |
|-----------|-------------|---------|
| Free launch (Foundations) | ~3–4 playable modules (F01, F03, F04 suggested) to make quality tangible | 1/7 done (F03) |
| Paid early access (Professional) | 1–2 modules ready at first purchase, rest shipping on a visible public roadmap | 0/9 done |

Early access explicitly means "content ships incrementally" — honest framing in the pre-sale copy, visible roadmap on the platform.

---

## 6. Content File Structure

Each lesson is stored as three separate files:

```
content/
  tracks.json                    ← generated, do not edit manually
  modules/
    {module-id}/
      meta.json
      lessons/
        {lesson-id}/
          prose.mdx              ← Learn tab
          exercises.json         ← Practice tab
          quiz.json              ← Assess tab
```

See `content/CONTRIBUTING.md` for authoring documentation.

---

## 7. Platform Sections

### 7.1 Path Selector (Onboarding)
Entry experience. Card-based path picker with skills assessment.

### 7.2 Course Dashboard
Persistent overview: path chosen, modules completed, cookies earned, exercises solved.

### 7.3 Field Notes
Living reference section. Cheat sheets, DevTools guides, quick-lookups. Unlocked progressively as modules are completed; early unlock purchasable with cookies (§4.5). A curated subset is free for everyone as acquisition material (§5.3).

### 7.4 The War Room — formalized as EPIC-16 in v1.4
Timed debugging challenges framed as production incidents, paid tier only. Three-screen lifecycle: **briefing** (scenario, materials, stakes — timer starts on explicit entry), **investigation** (symptoms, console log and network timeline alongside a multi-file source viewer; resolution in two steps, diagnosis on selected lines then choice of fix), **post-mortem** (itemized payout, full explanation, "what you could have noticed earlier", lesson cross-reference). No hints by design — the clues live in the materials. Cookie entry fee (−25), refunded with bonus on solve; highest rewards on the platform. Implemented as a thin runner on the EPIC-08 engine (timed IDENTIFY→FIX chain), so it does not require EPIC-12; the in-browser editor later upgrades the fix step to written code.

### 7.5 Capstone Workspace
Capstone projects aligned to Path 3. Each has a brief, milestones, and a structured workspace.

---

## 8. Interview Accelerator

Track-specific interview prep built incrementally alongside each track. Cross-references existing module content rather than duplicating it.

- **IP-01** — Junior/Mid Interview Prep (ships after Foundations + Professional tracks)
- **IP-02** — Senior/Staff Interview Prep (ships after Advanced Track)

**v1.3 note:** a free teaser (1–2 questions with model answer, §5.3) ships early as acquisition material. IP-01 remains flagged as a candidate **standalone paid product** ("pass the interview" is the most concrete, most monetizable outcome in the catalog). Remains P2 in build order but is first in line for promotion if early-access revenue underperforms.

---

## 9. Content Pipeline

Content is produced using a multi-agent Claude Code pipeline:

| Agent | Role |
|-------|------|
| `content-pipeline` | Orchestrator for a full module. Manages phases and parallel execution. |
| `become-content-writer` | Writes prose.mdx, exercises.json, quiz.json for a single lesson. |
| `become-dev-lesson-reviewer` | Reviews a single lesson across 10 dimensions. Max 2 cycles. |
| `cross-module-reviewer` | Checks consistency across all modules in a track. Runs once per track completion. |

### Content Quality Thresholds

| Dimension | Min score to ship |
|-----------|-------------------|
| Technical Accuracy | 8/10 |
| Exercise Quality | 9/10 |
| Learning Effectiveness | 7/10 |
| Real-World Relevance | 7/10 |

---

## 10. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 |
| Language | TypeScript strict |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Payments | Merchant of Record (Paddle / Lemon Squeezy — decide in EPIC-14) |
| Email | Transactional provider (Resend / Postmark — decide in EPIC-15) |
| Analytics | Privacy-friendly product analytics (PostHog EU / Plausible + events — decide in EPIC-15) |
| Content | MDX + JSON flat files (DB migration path preserved) |
| Fonts | Poppins (headings), DM Sans (body), JetBrains Mono (code) |
| Deployment | Vercel |

---

## 11. Build Status

| EPIC | Description | Priority | Status |
|------|-------------|----------|--------|
| EPIC-01 | Design System & Storybook | P0 | Backlog |
| EPIC-02 | Auth & User Identity | P0 | Backlog |
| EPIC-03 | Landing Page | P1 | ✅ Done (waitlist/pre-sale follow-up pending) |
| EPIC-04 | Catalog Page | P1 | Backlog |
| EPIC-05 | Onboarding | P1 | Backlog |
| EPIC-06 | Dashboard & Progress | P1 | Backlog |
| EPIC-07 | Module Engine | P0 | 🔄 In progress |
| EPIC-08 | Exercise & Cookie System | P0 | Backlog |
| EPIC-09 | Final Assessment & Module Completion | P1 | Backlog |
| EPIC-10 | Field Notes | P2 | Backlog |
| EPIC-11 | Tracks & Content Structure | P0 | ✅ Done |
| EPIC-12 | In-Browser Code Editor | P2 | Backlog |
| EPIC-13 | Interview Accelerator | P2 | Backlog |
| EPIC-14 | Payments & Entitlements (boundary decided: Option B) | P0 | Backlog |
| EPIC-15 | Launch Readiness (email, analytics, legal) | P1 | Backlog |
| EPIC-16 | The War Room (incident challenges) | P2 | 🆕 Backlog |

**Dependency fix (v1.2):** EPIC-11 (content schema) does **not** depend on EPIC-07. The dependency runs the other way: EPIC-07 consumes the EPIC-11 schema. EPIC-11 is already done, which is the correct order.

---

## 12. Launch Sequencing — UPDATED in v1.3

Strategy: **vertical slice over horizontal layers.** Foundations track free as acquisition + proof; **Professional track is the paid Phase 1 product** (early access). Everything else earns its place after the first euro.

### Phase 1 — Sellable Slice (target: free Foundations + paid Professional early access)
1. ~~EPIC-11 — Content schema~~ ✅ done
2. EPIC-03 follow-up — waitlist + pre-sale on Landing: "Foundations free at launch, lock the Professional early-access price" (1-2 days, do immediately)
3. EPIC-01 — Design System (scoped to components the slice needs)
4. EPIC-02 — Auth
5. EPIC-07 — Module Engine (in progress; track-level purchase lock + `freePreview` lesson exemption)
6. EPIC-08 — Exercise & Cookie System (incl. interim repo-based IMPLEMENT)
7. EPIC-14 — Payments & Entitlements (track-level, product: Professional early access)
8. Content gate: ≥3 Foundations modules playable, ≥1 Professional module ready
9. **→ Launch: Foundations free + Professional paid early access**

### Phase 2 — Complete Core Experience
10. EPIC-09 — Final Assessment & Module Completion (fast-follow)
11. EPIC-15 — Launch Readiness (receipts/email required as soon as money moves; analytics; legal pages incl. Impressum)
12. EPIC-05 — Onboarding
13. EPIC-06 — Dashboard & Progress
14. EPIC-04 — Catalog (wired to content layer, Option B entitlement badges)

### Phase 3 — Post-revenue, demand-driven
15. EPIC-13 — Interview Accelerator (teaser ships earlier as free extra, §5.3; full product or standalone per §8)
16. EPIC-16 — The War Room (retention per gli utenti paganti; runner sul motore di EPIC-08)
17. EPIC-10 — Field Notes (curated free subset ships with launch content)
18. EPIC-12 — In-Browser Code Editor (upgrades IMPLEMENT and the war room fix step)

### Parallel track throughout: content
Content production via the pipeline (§9) continues every phase — and per §5.6 it is now formally a **launch gate**, not just a parallel stream. Foundations content unblocks the free launch; Professional content unblocks revenue. Platform work never blocks content work; content is the critical path.