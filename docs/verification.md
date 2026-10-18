# Verification record

Application checked on October 17, 2026 using Node 24.13.0 and the exported production app at `http://localhost:4173`. Public deployment verification is recorded separately below.

## Build and tooling

- Clean `npm ci` succeeds from the committed dependency tree.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- `expo install --check` reports aligned dependencies; Expo Doctor passes 20/20 checks.
- The initial complete browser run passed 28 scenarios. The scrolling-regression follow-up below adds six checks; its full-suite evidence is under `.scratch/portfolio-polish/qa/scroll-fix-browser-results.json`.

| Production output     |    Uncompressed | Sum of individually gzipped files |
| --------------------- | --------------: | --------------------------------: |
| JavaScript, 18 chunks | 1,283,409 bytes |                     350,023 bytes |
| CSS, 7 files          |    24,934 bytes |                       7,713 bytes |

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

The portfolio screenshots show the actual production preview. They were visually inspected for layout, text, palette consistency, and incidental personal information. Only fictional records appear. The finished captioned walkthrough is documented separately below.

Additional browser spot checks passed for lead next/previous pagination, alphabetical ordering, clearing zero-result filters, campaign sources without results, invalid budgets (zero amount, negative allocations, 99% and 101% totals), preservation of the last saved plan, and missing-record recovery pages. No console errors were observed. Evidence: `.scratch/portfolio-polish/qa/spot-checks.json`.

The independent [standards and spec review](code-review.md) is complete. The budget's field-level validation finding and the shared lead-classification duplication were resolved and re-reviewed. Two added browser regressions cover accessible budget errors and clean note drafts when navigating directly between leads.

## Scrolling regression follow-up

The owner reported that ordinary scrolling was blocked. Reproduction with real wheel input confirmed that Expo's exported `body { overflow: hidden }` reset prevented document scrolling. The earlier tests could bring controls into view programmatically and did not prove wheel behavior.

The semantic web UI now explicitly enables document scrolling and lets the root grow with its content, preserving the theme background throughout long pages. The fixed sidebar scrolls independently when the window is short. An open native dialog locks background scrolling while retaining its own overflow; closing it restores page scrolling.

Six public-browser regressions cover wheel scrolling to the bottom of Leads and Help and keyboard return to the top at 390px and 1440px in both themes, the sidebar's last link at 1024 × 500, and a short dialog's independent scrolling/background lock/recovery. Each previously broken behavior was reproduced before its correction. The Dark page bottom was also visually inspected.

The complete production-preview suite passes **34/34 scenarios**, with no skips or flaky results. TypeScript, lint and export also pass. Run `npx playwright test tests/browser/scrolling.spec.ts` with `PLAYWRIGHT_BASE_URL` set to a preview or the public origin to repeat the six focused checks.

## Architecture review notes

- Local application source: 58 files after the walkthrough route and screen were added. The original 56-file import graph had no cycles; the new thin route delegates to a screen that depends only on Router, shared WebAnchor and scoped CSS. Legacy feature barrels and their old cycle were removed.
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

The public version remains a browser-local sample-data frontend. Test purchases and contacts were isolated to the automated browser contexts. Walkthrough recording subsequently proceeded after the owner's explicit approval and verification that the scroll fix was already public.

## Finished walkthrough

The [walkthrough](walkthrough.md) is a real 3:06 capture of the public app at commit `9454116`, encoded as a 1920 × 1080 H.264 MP4 with embedded English captions and no audio track. Video: 6,853,357 bytes. It is loaded only on the dedicated player route; the movie is separate from the JavaScript/CSS measurements above.

The entire movie decodes without errors. A chronological review across the complete edit, key-frame inspection and paused native-player checks confirmed readable framing/captions, visible cursor in dialogs, selective highlights, both themes, a real mobile viewport and fictional records only. Recording assertions reconcile USD 537, two purchases, three units, stock 39, one conversion, and the CSV download. Evidence: `qa/walkthrough-render.json` in the feature tracker.

The local player passes direct entry, playback, seven seek positions, including the corrected interval, HTTP 206 byte ranges, downloaded-file SHA-256 matching, captions, transcript, demo-return navigation, overflow and WCAG A/AA axe checks at 390px and 1440px. The audio-caption heuristic is inapplicable to the silent movie; the embedded explanations also have an HTML transcript. Evidence: `qa/walkthrough-player-local.json`. TypeScript, lint and export pass; all seven selected shell and scrolling scenarios pass.

The same player checks pass against [the public URL](https://dashboard-one-rose-14.vercel.app/walkthrough), with no browser errors and an exact SHA-256 match to the reviewed MP4. Initial publication commit `72fa2307fa08195be0ce59b390022ac3fa2ac401`, deployment `7147825131`, Vercel success. [Immutable player](https://dashboard-5ec3uxrd6-eprazs-projects.vercel.app/walkthrough). Hosted evidence: `qa/walkthrough-player-hosted.json`. README now links to the working player.

The owner subsequently requested removal of a brief recorded reload flash around 2:38. A 0.40-second hold of the preceding clean dark frame covers nine blank frames and one font-loading frame; all other chapters match the original decoded frames exactly. Duration remains 186.56 seconds. Full-file decoding and frame-by-frame review pass; the corrected interval is included in the player seek checks. See the [review correction](walkthrough.md#owner-review-theme-reload-flash).

The correction is published at commit `be508636ec23d36599da079f2de46d3932ece0d1`, deployment `7147948569`, Vercel success. Hosted player checks pass at both widths, including seeks at 158.20, 158.40 and 158.60 seconds. The public file matches SHA-256 `413e6cfceec414be15b559ce91e0e6779b3ac9da8af1df3cd67cfa801159e576`. [Corrected immutable player](https://dashboard-rcwi3r980-eprazs-projects.vercel.app/walkthrough).

## Deliberate limits

The owner approved the corrected walkthrough on October 17, 2026 (America/Bogota), accepting its brief pause around 2:38, and authorized final deployment and closure. All 14 portfolio-polish tickets are resolved. The delivered scope includes the frontend, responsive UI, both themes, recruiter README, published demo and approved walkthrough. No acceptance decision remains pending for this scope.

This is a browser-local frontend demo: no backend, authentication, payment processing, cross-device sync, or native app delivery. Multi-tab concurrency and production inventory reservation are outside scope. Current-stage reports do not invent historical transitions. Budget plans are proposals, and the sample dataset is regenerated only on a fresh workspace or confirmed reset.

The owner authorized autonomous implementation through the application, README and deployment milestones, waiving intermediate review pauses. The additional recording gate was satisfied by the owner's explicit approval before capture began.
