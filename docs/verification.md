# Verification record

Application checked on October 17, 2026 using Node 24.13.0 and the exported production app at `http://localhost:4173`. Public deployment verification is recorded separately below.

## Build and tooling

- Clean `npm ci` succeeds from the committed dependency tree.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- `expo install --check` reports aligned dependencies; Expo Doctor passes 20/20 checks.
- The initial complete browser run passed 28 scenarios. The scrolling-regression follow-up below adds six checks; its full-suite evidence is under `.scratch/portfolio-polish/qa/scroll-fix-browser-results.json`.

| Production output     |    Uncompressed | Sum of individually gzipped files |
| --------------------- | --------------: | --------------------------------: |
| JavaScript, 17 chunks | 1,278,668 bytes |                     348,067 bytes |
| CSS, 6 files          |    23,129 bytes |                       7,006 bytes |

The original build was approximately 2.56 MB of JavaScript and 27.7 kB of CSS. These are build-size observations, not load-time or runtime-performance measurements. Exact final measurements are saved in `qa/build-measurements.json` alongside the implementation evidence.

## Browser coverage

| Area                         | Observable checks                                                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry and appearance         | Direct entry, visible sample-data indication, both themes, preference after reload                                                                                                      |
| Leads                        | Creation and duplicate-email validation, details, notes, eligible stage changes, reopening Lost, reset cancellation and confirmation                                                    |
| Commercial workflow          | First and repeat purchases, double click, USD 537 reconciliation, stock 42 → 39, one conversion, paid transaction details and persistence                                               |
| Reports                      | Date periods, UTC boundary, empty revenue and conversion cohorts, source segments, stage snapshot, dashboard/detail/campaign totals                                                     |
| Campaigns and plans          | Origin attribution across repeat purchases, saved budget, allocations totaling 100%, baseline comparison, reset, unchanged achieved revenue                                             |
| Search and CSV               | Both record types, new and removed leads, empty results, keyboard dismissal, all filtered pages, Unicode/formula escaping, three entity exports                                         |
| Recovery                     | Unreadable data preserved until reset; unavailable storage retains the session and explains limitations; internal recovery links preserve memory                                        |
| Responsive and accessible UI | Both themes at 320, 768, 1024, and 1440 px; WCAG A/AA axe scans at 320 and 1440 across nine views; visible focus, skip link, keyboard, emulated touch, reduced motion, long valid names |
| Routing                      | Direct detail URLs, reload, browser back/forward, and unknown-route recovery                                                                                                            |

The portfolio screenshots show the actual production preview. They were visually inspected for layout, text, palette consistency, and incidental personal information. Only fictional records appear. No walkthrough recording has started.

Additional browser spot checks passed for lead next/previous pagination, alphabetical ordering, clearing zero-result filters, campaign sources without results, invalid budgets (zero amount, negative allocations, 99% and 101% totals), preservation of the last saved plan, and missing-record recovery pages. No console errors were observed. Evidence: `.scratch/portfolio-polish/qa/spot-checks.json`.

The independent [standards and spec review](code-review.md) is complete. The budget's field-level validation finding and the shared lead-classification duplication were resolved and re-reviewed. Two added browser regressions cover accessible budget errors and clean note drafts when navigating directly between leads.

## Scrolling regression follow-up

The owner reported that ordinary scrolling was blocked. Reproduction with real wheel input confirmed that Expo's exported `body { overflow: hidden }` reset prevented document scrolling. The earlier tests could bring controls into view programmatically and did not prove wheel behavior.

The semantic web UI now explicitly enables document scrolling and lets the root grow with its content, preserving the theme background throughout long pages. The fixed sidebar scrolls independently when the window is short. An open native dialog locks background scrolling while retaining its own overflow; closing it restores page scrolling.

Six public-browser regressions cover wheel scrolling to the bottom of Leads and Help and keyboard return to the top at 390px and 1440px in both themes, the sidebar's last link at 1024 × 500, and a short dialog's independent scrolling/background lock/recovery. Each previously broken behavior was reproduced before its correction. The Dark page bottom was also visually inspected.

The complete production-preview suite passes **34/34 scenarios**, with no skips or flaky results. TypeScript, lint and export also pass. Run `npx playwright test tests/browser/scrolling.spec.ts` with `PLAYWRIGHT_BASE_URL` set to a preview or the public origin to repeat the six focused checks.

## Architecture review notes

- Local application import graph: 56 source files, no cycles. Legacy feature barrels and their old cycle were removed.
- Route files delegate to feature screens; commands and report calculations remain in the shared data module.
- Reviewed files above 200 lines: Products, Leads, Transactions, Overview, Lead detail, and the explicit catalog seed. They remain cohesive local surfaces: list screens deliberately share one filtered result between metrics, pagination, and export. Most lines are accessible markup and table columns. Splitting them only to reduce line counts would obscure that shared context; domain rules are already separate.
- The WebAnchor adapter intentionally consumes the native `onPress` prop forwarded by Expo Router's `asChild` slot, retaining its real DOM `onClick` handler. This avoids browser warnings while keeping normal link semantics and SPA navigation.
- See [the dependency review](dependency-review.md) for the 26 outstanding upstream audit findings; no critical findings remain.

## Initial public deployment

Published through the existing GitHub/Vercel Production integration on October 17, 2026:

- [Public application](https://dashboard-one-rose-14.vercel.app/dashboard)
- Application commit: `d1cbeb37f917ded769151047d9b01dbb89f09f92`
- [Immutable deployment](https://dashboard-2l6135o99-eprazs-projects.vercel.app/dashboard), GitHub deployment `7147325306`, status **success**.
- [Vercel deployment record](https://vercel.com/eprazs-projects/dashboard/919jq1bDnW3FqhfsBNLLF3ZyNHR5)

**10 hosted browser scenarios passed** against the public alias: the complete cross-feature journey, first and repeat purchases, both budget scenarios, search and cross-lead navigation, remembered themes, mobile touch/history/unknown-route recovery, and nine-view accessibility checks at Light 320px and Dark 1440px. No skips or flaky results. Evidence: `.scratch/portfolio-polish/qa/hosted-browser-results.json`.

Additional hosted checks verified direct entry and reload for lead, product, and transaction details; transaction browser back/forward; and HTTP 200 with correct non-HTML content types for all entry scripts/styles, font, and favicons. No console or page errors occurred in these spot checks. The prior deployment returned HTML for the font URL; the corrected routing now serves `font/woff2`. Evidence and the repeatable spot-check script are under `qa/hosted-spot-checks.json` and `qa/verify-hosted.cjs` in the feature tracker.

The public version remains a browser-local sample-data frontend. Test purchases and contacts were isolated to the automated browser contexts. The [English walkthrough script](walkthrough.md) is ready; recording still awaits the owner's explicit confirmation.

## Deliberate limits

This is a browser-local frontend demo: no backend, authentication, payment processing, cross-device sync, or native app delivery. Multi-tab concurrency and production inventory reservation are outside scope. Current-stage reports do not invent historical transitions. Budget plans are proposals, and the sample dataset is regenerated only on a fresh workspace or confirmed reset.

The owner authorized autonomous implementation through the application, README and deployment milestones, waiving intermediate review pauses. Walkthrough recording remains explicitly gated on the owner's confirmation of the final result.
