# 11: Complete and verify the Aster application

**What to build:** A recruiter can explore the finished application confidently, follow a useful Help guide, use meaningful Settings, and complete the whole lead-to-sale journey across devices without encountering unfinished controls or contradictory results.

**Blocked by:** 07 — Plan and save a simulated marketing budget; 08 — Review a coherent commercial dashboard; 09 — Find leads and products from the header; 10 — Export filtered leads, products, and transactions.

**Status:** resolved

- [x] Help provides a short English exploration guide covering the main journey, sample-data limitations, local persistence/reset, campaign attribution, and budget simulation.
- [x] Settings presents the working appearance and confirmed-reset controls, with consistent behavior across header and Settings and no unrelated account/integration placeholders.
- [x] Remove remaining inactive refresh, chat, notifications, logout/account surfaces, unsupported tabs, inconsistent branding, and controls without a meaningful action.
- [x] Finish cleanup of disconnected duplicate implementations, dead code, unused template assets where appropriate, and broken tooling references without changing the approved framework or widening product scope.
- [x] Review architecture boundaries and remove unnecessary duplication or import cycles; explain any justified large cohesive modules rather than splitting mechanically.
- [x] Run the full browser-led journey from a fresh session and after reload: create a lead, update stage and notes, record first and repeat sales, inspect stock/transactions/attribution, plan budget, export, and reset.
- [x] Reconcile revenue, product totals, stock, conversion counts, campaign attribution, reporting periods, and exported records with the same business scenario.
- [x] Recheck validation, empty and zero-value states, insufficient stock, duplicate submission, canceled reset, unreadable/unavailable storage, and recovery across completed features.
- [x] Verify both themes at representative 320, 768, 1024, and 1440 pixel widths, including touch use, no page-wide overflow, contrast, keyboard navigation, focus management, form feedback, chart descriptions, and reduced motion.
- [x] Verify production-output direct links, detail links, refresh, browser back/forward, and unknown-route recovery, with no unresolved browser errors in exercised flows.
- [x] TypeScript, lint, production web build, and the behavior suite pass. Record final build measurements and investigate material avoidable regressions without equating bundle size with runtime performance.
- [x] Record concrete verification evidence and any material limitations, and obtain application acceptance before the README, public deployment, and walkthrough milestones proceed.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
