# JSP to Astro Migration Pipeline - Presentation Notes

## What is it?

An AI-assisted migration pipeline that converts legacy JSP pages from belen-platform to modern Astro pages in ka-frontend-monorepo using **Test-Driven Development**.

**Key benefit:** Instead of manually analyzing legacy code, writing tests, and implementing - you run one command and AI agents handle each phase sequentially.

---

## The Problem We're Solving

- We have hundreds of JSP pages in belen-platform that need to migrate to Astro
- Manual migration is slow, error-prone, and requires deep knowledge of both legacy and new systems
- Different developers might migrate pages inconsistently
- Easy to miss edge cases, security requirements, or styling details

---

## How It Works - The TDD Flow

```
1. ANALYZE  →  Understand the JSP: purpose, data sources, types
2. TEST     →  Write tests against legacy (they must PASS)
3. PLAN     →  Design the Astro implementation
4. MIGRATE  →  Implement until tests pass
5. VISUAL   →  Compare screenshots, fix styling differences
6. REVIEW   →  Lint, security check, KDS validation
```

**Why TDD?**
- Tests written against legacy define the "contract"
- New implementation must pass the same tests
- Gives confidence that behavior is preserved

---

## The 5 Specialized Agents

| Agent | Role | Output |
|-------|------|--------|
| **Analyzer** | Reads JSP, finds data sources, extracts types | Markdown spec with TypeScript interfaces |
| **Tester** | Writes Playwright E2E tests against legacy URL | Test file that passes on legacy, fails on new |
| **Planner** | Maps JSP patterns to Astro, plans file structure | Implementation plan with component mappings |
| **Migrator** | Implements Astro code until tests pass | Working Astro page + React components |
| **Reviewer** | Runs linters, validates KDS tokens, security check | Approval or change requests |

Each agent has focused context - only knows what it needs to know.

---

## Running the Pipeline

**Full automated pipeline:**
```
/migrate-jsp-to-astro
```

Then answer two questions:
1. "What is the JSP file path?" → e.g., `savedSearches.jsp`
2. "What is the target app?" → e.g., `ep-frontend-web`

The pipeline auto-detects the route from Spring controllers and confirms before proceeding.

**Individual steps (for debugging):**
```
/analyze <jsp-path>
/test-legacy <legacy-url>
/plan-migration
/review
```

---

## Key Features

### 1. Automatic Route Detection
- Finds the `@RequestMapping` in Spring controllers
- Derives the sandbox URL automatically
- Target route stays the same as legacy

### 2. Authentication Support
- Handles `@PrivateController` pages
- Sets up Playwright auth with Auth0 SSO flow
- Tests both authenticated and unauthenticated scenarios

### 3. KDS Token Validation
- Ensures all Tailwind classes use KDS design system tokens
- Rejects default Tailwind values like `p-4` or `bg-white`
- Only allows `p-medium`, `bg-surface`, etc.

### 4. Visual Comparison
- Captures screenshots of legacy and new implementation
- AI analyzes differences in layout, colors, typography
- Documents required fixes with KDS token mappings

### 5. Self-Improving Pipeline
- Each agent reports what worked and what didn't
- Findings get incorporated back into agent instructions
- Pipeline gets smarter with each migration

---

## Demo: What Happens When You Run It

1. **Input gathering** - Asks for JSP path and target app
2. **Environment check** - Verifies Playwright, target app exists
3. **Analyzer agent spawns** - Reads JSP, traces data sources, generates types
4. **Tester agent spawns** - Creates Playwright tests, verifies they pass on legacy
5. **Planner agent spawns** - Maps patterns, identifies KDS components
6. **Migrator agent spawns** - Writes code, runs tests, iterates until green
7. **Visual comparison** - Screenshots captured and compared
8. **Reviewer agent spawns** - Final quality checks
9. **Summary** - Shows all files created, test results, next steps

---

## Test Migration Results (savedSearches.jsp)

- **17 tests written and passing**
- **~38 minutes total pipeline time**
- **7 files created** (page, components, tests)
- **Learnings captured** and fed back into pipeline

Improvements discovered:
- Auth0 login flow documentation
- KDS icon naming convention
- Backend API requirements template
- HTTPS default for local dev

---

## Files Structure

```
.claude/
├── agents/           # Agent definitions (analyzer, tester, planner, etc.)
├── commands/         # Slash commands (/migrate-jsp-to-astro, etc.)
├── migration-specs/  # Generated specs per migration
└── agent-memory/     # Learnings from previous migrations

tools/migration/
├── docs/playbook.md  # JSP-to-Astro pattern reference
└── templates/        # Code templates
```

---

## When to Use It

**Good candidates:**
- Static pages (JSON/XML endpoints) - low complexity
- Content pages (imprint, help pages) - medium complexity
- Interactive pages with forms - high complexity but supported

**Start with:**
- Low complexity pages to learn the workflow
- Pages with clear data sources
- Pages that have accessible sandbox URLs

---

## Questions to Expect

**Q: Does it work for all JSP pages?**
A: Most pages, yes. Very complex pages with unusual patterns may need manual assistance.

**Q: What if the backend API doesn't exist?**
A: The analyzer documents what API is needed. Migration creates the frontend structure with mock data.

**Q: How accurate is the visual comparison?**
A: It catches layout, color, and typography differences. Pixel-perfect matching requires manual review.

**Q: Can we customize the agents?**
A: Yes, agent definitions are in `.claude/agents/` - they're just markdown files.

---

## Next Steps

1. Try it on a simple page in your app
2. Review the generated spec before proceeding
3. Check the playbook for pattern references
4. Report issues to improve the pipeline

**Command to start:** `/migrate-jsp-to-astro`
