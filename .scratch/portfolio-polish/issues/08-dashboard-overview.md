# 08: Review a coherent commercial dashboard

**What to build:** On entry, the sales manager sees an understandable overview of the audio store's sales, lead acquisition and conversions, products, and campaigns, with values that agree with the detailed views.

**Blocked by:** 05 — Understand lead segments and conversion funnel; 06 — Compare campaign results and attributed revenue.

**Status:** resolved

- [x] Replace disconnected overview literals with metrics derived from shared lead, product, paid-transaction, and campaign records.
- [x] Present distinct, correctly labeled measures such as paid revenue, purchases or units sold, acquired leads, and first conversions, with meaningful USD/count/percentage units.
- [x] Default to the preceding 30 days and make reporting-period changes update applicable summaries, charts, and supporting records coherently.
- [x] Acquisition measures use acquisition dates and sales measures use sale dates; visible context explains cohort and conversion semantics where needed.
- [x] A newly created lead, first sale, repeat purchase, and reset produce the corresponding correct changes, consistent with the detail screens.
- [x] Trend comparisons use valid comparable periods and explicitly handle absent comparison data or zero denominators rather than inventing growth percentages.
- [x] Charts have meaningful axes or labels, units, accessible descriptions, and useful empty states, and do not imply that proposed budgets are historical revenue.
- [x] Preserve the dashboard's reference-inspired composition with Aster's hierarchy, restrained accents, readable cards, and functional links to relevant areas.
- [x] Browser-led scenarios reconcile overview totals with filtered detail views, including date boundaries, first/repeat purchases, zero results, and reload.
- [x] Both themes and supported widths remain readable and operable; TypeScript, lint, and production web build pass.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
