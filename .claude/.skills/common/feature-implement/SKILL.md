# Feature Implementation Workflow

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
   
## Goal

Automatically analyze, design, review, implement, test and validate a new feature.

## Workflow

REQUIREMENT
→ AUDIT
→ IMPACT ANALYSIS
→ IMPLEMENTATION PLAN
→ SECOND-PASS REVIEW
→ IMPLEMENT
→ TEST
→ FINAL QA

---

### Phase 1 — Requirement

Understand the requested feature.

Identify:
- expected behavior
- user flow
- inputs/outputs
- business rules
- acceptance criteria
- edge cases

Do not implement yet.

If requirements are ambiguous, inspect the existing project conventions before making assumptions.

---

### Phase 2 — Audit

Inspect the existing codebase.

Identify:
- related components
- existing services
- APIs
- database models
- state management
- UI components
- routing
- permissions
- existing reusable functionality
- testing structure

Reuse existing architecture and components whenever possible.

---

### Phase 3 — Impact Analysis

Determine what the feature affects.

Check:
- frontend
- backend
- API
- database
- authentication/authorization
- existing features
- performance
- security
- responsive/mobile behavior
- testing
- documentation

Do not modify code yet.

---

### Phase 4 — Implementation Plan

Create a minimal implementation plan.

Include:
- files to create
- files to modify
- components/services involved
- data flow
- API changes
- database changes
- UI behavior
- validation
- error handling
- tests
- migration requirements if applicable

Avoid unnecessary architectural changes.

---

### Phase 5 — Second-Pass Review

Review the implementation plan before coding.

Check:
- missing requirements
- incorrect assumptions
- missing edge cases
- architecture consistency
- security risks
- permission issues
- data integrity
- performance
- responsive behavior
- regression risks
- unnecessary complexity

Correct the plan before implementation.

Do not implement until the plan passes review.

---

### Phase 6 — Implementation

Implement the approved plan.

Rules:
- follow existing architecture
- reuse existing components/services
- follow project coding rules
- make minimal necessary changes
- preserve existing behavior
- do not rewrite unrelated code

---

### Phase 7 — Testing

Test:

- happy path
- validation
- error cases
- edge cases
- permission/authentication
- API
- database
- UI
- responsive/mobile
- regression

If tests fail:

INVESTIGATE
→ FIX
→ RETEST

Do not declare success while important tests are failing.

---

### Phase 8 — Final QA

Verify:

- feature matches requirements
- acceptance criteria are satisfied
- existing functionality still works
- no unnecessary changes
- security is acceptable
- performance is acceptable
- UI/UX is consistent
- tests pass
- documentation is updated when required

If QA fails, return to the appropriate phase and fix the issue.

---

## Completion Report

Return:

### Feature
...

### Requirements
...

### Files Created
...

### Files Modified
...

### Architecture / Data Flow
...

### Tests
...

### QA
PASS / FAIL

### Remaining Risks
...