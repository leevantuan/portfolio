# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page personal portfolio site (Lê Văn Tuấn) built with Angular 19 standalone components and
Tailwind CSS v4. There is no backend — it is a static SPA of scroll-linked sections rendered inside
one page (`HomeComponent`), with a custom in-house i18n system (no `@angular/localize` / ngx-translate)
and a manual dark/light theme system driven by CSS custom properties.

`memory.md` at the repo root is a living design-decision log (Vietnamese) for this project — sections,
layout rules, exact colors/measurements already chosen, and a "Quy Tắc Bất Khả Xâm Phạm" (inviolable
rules) list at the bottom. Read it before making visual/content changes; treat its rules as binding
unless the user says otherwise. Note: `.claude/CLAUDE.md` and the `.claude/.rules|.agents|.skills`
tree in this repo are a *shared, multi-project* Claude config (covers other unrelated repos too:
CIO, CSR, Device, Face, Ops, TaskFlow, ZKTime) — its Scope Discipline and config-protection rules
still apply here, but its architecture-specific content is not about this Angular app.

## Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200/ (auto-reloads on save)
npm run build      # ng build — production build to dist/portfolio (budget: 1MB warn / 2MB error initial)
npm run watch      # ng build --watch --configuration development
npm test           # ng test — Karma + Jasmine, runs in Chrome
```

Run a single spec file with `ng test --include='**/skills.component.spec.ts'`. There is no e2e setup
and no lint script configured in `package.json`.

## Architecture

**Everything renders inside one route.** `app.routes.ts` has a single `''` path to `HomeComponent`
(`src/app/layout/home/home.component.ts`) — this is a one-page scroller, not a multi-route app.
`HomeComponent` composes every section component in a fixed order (header, global-network hero,
infrastructure-hud, skills, roadmap, credentials, experience, diagram-viewer modal, contact, footer)
via anchor IDs (`#skills`, `#roadmap`, `#credentials`, `#experience`, `#projects`, `#contact`).

**Components live under two roots:**
- `src/app/layout/` — page shells (currently just `home`).
- `src/app/pages/` — one folder per section/feature (header, global-network, infrastructure-hud,
  skills, roadmap, credentials, experience, projects, education, diagram-viewer, contact, footer,
  greeting). Each is a standalone component with its own `.ts/.html/.css`.
- `src/app/shared/` — cross-cutting: `session.service.ts` (theme + lang state), `lang/` (i18n resource
  dictionaries), `constants/tech-terms.ts` (canonical English tech-term strings, not translated),
  `network-bg/` (shared background component).

**i18n is hand-rolled, not Angular i18n.** `src/app/shared/lang/{eng,vn,zh}.ts` each export a large
`UIResource*` object (matching shape across all three files — same keys, ~740 lines each) containing
all copy, nested by section (e.g. `.nav`, `.roadmap`, `.skills_page.aiSteps`). Pattern repeated in
every component that needs text:
```ts
lang: string = 'ENG';                     // 'ENG' | 'VI' | 'ZH', usually an @Input from HomeComponent
UIResource: any = UIResourceENG;
ngOnChanges(changes) { if (changes['lang']) this.updateResource(); }
private updateResource() { switch (this.lang) { case 'ENG': ...; case 'ZH': ...; case 'VI': default: ...; } }
```
`SessionService.currentLang` is the source of truth; `HomeComponent` reads it, passes `lang` down as
an `@Input()` to each section component, which independently re-derives its own `UIResource`. When
adding new copy, add the same key to **all three** lang files or the site will render `undefined` in
non-English locales. Default language is `'ENG'` (falls back to VN resource if an unrecognized value
reaches the `default` case — the fallback constant, not the initial default).

**Theme is CSS custom properties, not Angular theming.** `SessionService` holds
`currentTheme = signal<'dark'|'light'>('light')`, defaulting to light (`07A Light Blueprint`) unless
`localStorage.theme === 'dark'`. Toggling sets both `data-theme` attribute and a `.dark` class on
`<html>` (kept in sync for the Tailwind v4 custom variant in `src/styles.css`:
`@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *, .dark, .dark *))`). All theme
colors are CSS vars defined once in `src/styles.css` under `:root, [data-theme="dark"]` and
`[data-theme="light"]` (`--bg`, `--surface`, `--text-1`, `--accent`, etc.) — components consume them
via `var(--token)` in both Tailwind arbitrary values and raw CSS/SVG `fill`/`stroke` attributes so
theme switches apply instantly with no per-component JS. Don't hardcode hex colors in new component
CSS/SVG; use the existing tokens.

**Scroll-driven reveal pattern.** Multiple section components (`skills`, `roadmap`, etc.) use an
`IntersectionObserver` in `ngAfterViewInit` to add an `is-revealed` class to `.scroll-reveal-item`
elements as they scroll into view, and unobserve once revealed. Known gotcha (see comments in
`skills.component.ts`): Angular calls `ngOnChanges` for the initial `@Input()` binding too, not just
on real changes — code that re-triggers reveal/animation on language change must check
`changes['lang'].firstChange` to avoid force-revealing everything on initial page load instead of on
scroll (a bug already fixed once — see git log "Fix scroll-reveal firing immediately on load").

**`trackBy` functions matter here.** Data arrays for lang-dependent lists (steps, skills, metrics,
scenarios) are re-created by object identity on every language switch. Missing/wrong `trackBy` tears
down DOM nodes mid-animation. Follow the existing `trackBy*` pattern in `skills.component.ts` /
`roadmap.component.ts` when adding new `*ngFor` lists over lang-resource data.

## Conventions

- 2-space indent, single quotes in `.ts` (enforced by `.editorconfig`).
- Standalone components only (`standalone: true`, explicit `imports: [...]`) — no `NgModule`s.
- FontAwesome via `angular-font-awesome` + `@fortawesome/fontawesome-free` CSS (imported globally in
  `angular.json` styles, not per-component).
- Styling is Tailwind v4 utility classes plus per-component `.css` files for anything needing SVG
  targeting, keyframe animations, or CSS vars — not a strict either/or split.
