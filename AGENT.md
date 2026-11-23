# Agent rules — mohdizzudin.github.io

This repo is GitHub Pages for `mohdizzudin.github.io` (source: `master` at `/`).

## Shareable HTML

- Put standalone analysis, ranking, report, and comparison pages under `shared/`.
- Public URL: `https://mohdizzudin.github.io/shared/{filename}.html`
- Prefer a short lowercase slug with hyphens (e.g. `phone`, `flagship-ranking`).
- Do not place new shareable analysis HTML at the repo root.
- Do not overwrite unrelated files under `shared/` unless the user names that file.
- Also follow `.cursor/rules/shared-html-pages.mdc`.

## Product comparison pages

When generating or updating interactive product comparison pages (same family as `shared/phone.html`):

- Read and follow **`.cursor/rules/comparison-page-generator.mdc`** strictly.
- Reference implementation: `shared/phone.html` (`Compare phone vs Huawei Pura 80`).
- Deliver a single self-contained HTML file with inline CSS and vanilla JS unless the user asks otherwise.
- **Scroll Option 2:** page vertical scroll by default. Table wrapper is horizontal-only (`overflow-x: auto; overflow-y: clip`). Do not trap scroll in a nested max-height table pane unless the user asks for Full View.

## Deploy

- Commit and push to `master` only when the user clearly asks to deploy, publish, push, or share.
- After a successful push, reply with the live `shared/` URL.
- Pages builds from `master`; allow a short wait after push before treating the URL as updated.

## Scope

- Only do what the user asked. Do not commit, push, or expand scope without a clear ask.
- Keep UI copy in natural English for comparison pages unless the user requests another language.
