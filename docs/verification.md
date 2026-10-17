# Verification record

Application checked on October 17, 2026 using Node 24.13.0 and the exported production app at `http://localhost:4173`. Public deployment verification is recorded separately below.

## Build and tooling

- Clean `npm ci` succeeds from the committed dependency tree.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- `expo install --check` reports aligned dependencies; Expo Doctor passes 20/20 checks.
- Final complete browser run: **28 passed**, no skips or flaky results, against the production export. The versioned JSON evidence is under `.scratch/portfolio-polish/qa/browser-results.json`.

| Production output     |    Uncompressed | Sum of individually gzipped files |
| --------------------- | --------------: | --------------------------------: |
| JavaScript, 17 chunks | 1,278,668 bytes |                     348,067 bytes |
| CSS, 6 files          |    23,012 bytes |                       6,946 bytes |

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

## Architecture review notes

- Local application import graph: 56 source files, no cycles. Legacy feature barrels and their old cycle were removed.
- Route files delegate to feature screens; commands and report calculations remain in the shared data module.
- Reviewed files above 200 lines: Products, Leads, Transactions, Overview, Lead detail, and the explicit catalog seed. They remain cohesive local surfaces: list screens deliberately share one filtered result between metrics, pagination, and export. Most lines are accessible markup and table columns. Splitting them only to reduce line counts would obscure that shared context; domain rules are already separate.
- The WebAnchor adapter intentionally consumes the native `onPress` prop forwarded by Expo Router's `asChild` slot, retaining its real DOM `onClick` handler. This avoids browser warnings while keeping normal link semantics and SPA navigation.
- See [the dependency review](dependency-review.md) for the 26 outstanding upstream audit findings; no critical findings remain.

## Public deployment

Pending the reviewed implementation commit and Vercel's existing GitHub production integration. The intended alias is `https://dashboard-one-rose-14.vercel.app/dashboard`. Publication is not considered verified until the actual hosted application and assets pass their checks.

## Deliberate limits

This is a browser-local frontend demo: no backend, authentication, payment processing, cross-device sync, or native app delivery. Multi-tab concurrency and production inventory reservation are outside scope. Current-stage reports do not invent historical transitions. Budget plans are proposals, and the sample dataset is regenerated only on a fresh workspace or confirmed reset.

The owner authorized autonomous implementation through the application, README and deployment milestones, waiving intermediate review pauses. Walkthrough recording remains explicitly gated on the owner's confirmation of the final result.
