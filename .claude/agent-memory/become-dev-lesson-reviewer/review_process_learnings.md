---
name: Review Process Learnings
description: Lessons learned from 8-pass review of F03 JavaScript Foundations - what to check and common issues found
type: feedback
---

## Multi-Pass Review Strategy

**Why:** Single passes miss issues. The F03 review required 8 passes - critical factual errors weren't caught until pass 4, seniority alignment issues needed passes 3-6 to fully identify and verify fixes.

**How to apply:**
1. First pass: Structure and flow
2. Second pass: Technical accuracy of code examples
3. Third pass: Seniority alignment (concepts used before taught)
4. Fourth pass: Edge cases and subtle errors
5. Final pass: Verify all fixes are actually in place

## Always Verify JavaScript Behavior

**Rule:** Don't trust review findings about JS behavior - test them.

**Why:** Pass 4 claimed `"" / 100` produces NaN. I verified with `node -e` and found it returns `0`. The content had been fixed but the review agent made the same error.

**How to apply:**
```bash
node -e "console.log('' / 100)"  # Verify coercion claims
node -e "console.log(Number(''))"  # Check conversions
```

## Seniority Alignment Checklist

**Rule:** Check these specific patterns for Foundations modules:

| Concept | Should NOT appear in F01-F03 |
|---------|------------------------------|
| `this` keyword | Use `event.target` instead |
| Closures | Describe behavior without the term |
| Async/await | Defer completely |
| Prototypes | Defer completely |
| `reduce` | Acceptable as distractor, not required knowledge |

**How to apply:** Search exercise/quiz files for these terms before approving.

## Common False Positives

**Things that look like issues but aren't:**

1. **NaN explanation "incomplete"** - For Foundations, showing `NaN === NaN` is false + `Number.isNaN()` solution is sufficient. Don't over-explain IEEE 754.

2. **HTMLCollection vs NodeList** - Having both in a CLASSIFY exercise is fine IF the explanation clarifies the forEach difference.

3. **Forward references to F04/F05** - These are appropriate for deferred concepts, not errors.

## Review Report Structure

**What works:**
- Scores with thresholds (8/10 minimum for Technical Accuracy)
- Severity ratings (Critical/Major/Minor)
- Specific file paths and line numbers
- Concrete fix recommendations with code snippets
- Checklist for content writer
- Review history table showing pass progression

## Signs Content Is Ready

- All scores meet thresholds
- No "Critical" severity issues remain
- Seniority alignment verified (no untaught concepts used)
- Code examples verified runnable
- Cross-references validated
