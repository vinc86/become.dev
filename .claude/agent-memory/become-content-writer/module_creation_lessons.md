---
name: Module Creation Lessons Learned
description: Critical errors to avoid when creating become.dev educational modules, learned from F03 JavaScript Foundations review
type: feedback
---

## Seniority Alignment Violations

**Rule:** Never use, demonstrate, or test concepts before they're taught in the curriculum sequence.

**Why:** F03 module used `this` keyword and closures extensively, but these aren't taught until F04. This creates cognitive overload for Foundations learners and violates the scaffolded learning approach.

**How to apply:**
- Before writing a module, check what concepts are taught in EARLIER modules only
- When referencing future concepts, give a practical rule without demonstrating the mechanism
- BAD: Showing `this.classList.toggle()` in event handlers before `this` is taught
- GOOD: Using `event.target.classList.toggle()` which IS taught in the current module
- BAD: Showing closure pattern with `createMultiplier(factor)` returning a function
- GOOD: "Functions can return other functions — we'll explore this in F04"

## Verify JavaScript Behavior Before Writing

**Rule:** Test all code examples, especially edge cases involving type coercion.

**Why:** F03 stated "empty string divided by 100 produces NaN" but `"" / 100` actually equals `0`. This teaches incorrect language behavior.

**How to apply:**
- Run `node -e "console.log(expression)"` to verify any non-obvious JS behavior
- Especially verify: empty string coercion, NaN propagation, typeof quirks
- `""` coerces to `0` in numeric contexts, NOT NaN
- `"non-numeric-text"` coerces to NaN
- `Number(null) = 0` but `Number(undefined) = NaN`

## Exercise Code Must Match Prose Constraints

**Rule:** If prose says "we'll cover X later", exercises cannot require X to solve.

**Why:** Quiz question tested closure behavior (`var i` in loop with setTimeout callbacks) but closures were explicitly deferred to F04.

**How to apply:**
- After writing exercises, verify each can be solved using ONLY concepts taught so far
- Search exercise files for deferred terms (`this`, `closure`, `async`, etc.)

## HTMLCollection vs NodeList

**Rule:** `getElementsByClassName` returns HTMLCollection, not NodeList.

**Why:** This was incorrectly categorized in an exercise, teaching wrong DOM API knowledge.

**How to apply:**
- `querySelector` / `querySelectorAll` → Element / NodeList
- `getElementById` → Element
- `getElementsByClassName` / `getElementsByTagName` → HTMLCollection
- Key difference: NodeList supports `forEach`, HTMLCollection does not

## Quiz Distractor Quality

**Rule:** Wrong answers must be plausible misconceptions, not obviously wrong.

**Why:** "const is only for numbers, let is for strings" is too obviously wrong. Better: "const creates immutable values, let creates mutable values" (plausible misconception about const).

**How to apply:**
- Each distractor should represent a real misconception learners might have
- Test: "Would a beginner plausibly believe this?"

## Forward Reference Format

**Rule:** Use consistent format for cross-module references.

**How to apply:**
- Same module: `[→ Lesson 4: Scope and Hoisting]`
- Different module: `[→ F04: JavaScript Core Depth]`
- Always include colon after module ID


