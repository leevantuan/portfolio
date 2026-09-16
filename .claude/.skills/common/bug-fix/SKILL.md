Fix this bug using the full autonomous bug-fix workflow.

## Mandatory Rule & Skill Discovery

Before analyzing, planning or modifying code:

1. Determine which technical areas are affected:
   - Frontend
   - Backend
   - Database
   - Infrastructure
   - API
   - Authentication / Authorization
   - Other project-specific areas

2. If Frontend is affected:
   - Read all applicable Frontend rules.
   - Read all applicable Frontend skills.
   - Follow the existing FE design system, UI/UX patterns, responsive rules, accessibility rules and component conventions.

3. If Backend is affected:
   - Read all applicable Backend rules.
   - Read all applicable Backend skills.
   - Follow existing API, database, error-handling, logging, security and performance conventions.

4. If multiple areas are affected:
   - Read the rules and skills for every affected area.

5. Never implement before reading the applicable rules and skills.

6. Do not invent a new pattern when an existing rule, skill, component or implementation pattern already exists.

7. Project-specific rules and skills have priority over generic common practices.

8. If rules conflict:
   - identify the conflict
   - follow the higher-priority project rule
   - report the conflict before implementation if it affects architecture or behavior.

Bug:
When the user answers a vocabulary card and clicks Next, the card flips to the next word, but during the flip transition the previous answer/content can briefly appear before the new word is shown.

Run this workflow automatically:

AUDIT
→ ROOT CAUSE
→ FIX PLAN
→ SECOND-PASS REVIEW
→ CORRECT PLAN
→ IMPLEMENT
→ TEST
→ FINAL QA

Rules:

1. AUDIT
- Inspect the actual codebase first.
- Trace the complete vocabulary/card flow.
- Inspect state, props, events, rendering, animation, transition lifecycle and async operations.
- Do not assume the root cause.

2. ROOT CAUSE
- Verify the cause against the actual code.
- Identify exactly why the previous answer/content becomes visible during the transition.
- Check for race conditions and stale state.

3. FIX PLAN
- Create the smallest safe fix.
- Preserve the existing UI/UX and architecture.
- Do not modify unrelated code.

4. SECOND-PASS REVIEW
Before implementation, review the fix plan again.
Check for:
- missing states
- incorrect assumptions
- race conditions
- stale data
- animation timing
- state reset timing
- rapid Next clicks
- Previous/Next interaction
- regression risks

If anything is missing or incorrect, correct the plan before implementation.

5. IMPLEMENT
- Implement the corrected plan.
- The previous answer must NEVER appear while the next word is loading or flipping.
- The new word must start with a clean answer/result state.
- Synchronize data changes with the actual animation lifecycle.
- Do not rely on an arbitrary setTimeout if transition/animation lifecycle events can be used.
- Prevent duplicate/rapid Next actions during transition.

6. TEST
Test at minimum:
- Answer → Next
- I don't know → Next
- Next while answer is visible
- Rapid double-click Next
- Next → Previous
- Previous → Next
- Multiple consecutive questions
- Animation interruption
- Empty/unanswered state
- Refresh/reload
- Regression of existing vocabulary behavior

If a test fails:
→ investigate
→ determine root cause
→ fix
→ rerun the failed test
Do not declare success while tests are failing.

7. FINAL QA
Verify:
- Original bug is fixed.
- Previous answer never flashes.
- New word never inherits previous answer state.
- Animation and data state are synchronized.
- No race condition remains.
- No regression is introduced.
- UI/UX remains unchanged.
- Only necessary files were modified.

IMPORTANT:
Do not stop after finding the first possible cause.
Do not implement based on assumptions.
Do not rewrite unrelated components.

At the end, report:

### Root Cause
### Files Changed
### Fix Implemented
### Before vs After Flow
### Tests
### Final QA
### Remaining Risks