# 06: Compare campaign results and attributed revenue

**What to build:** The sales manager compares marketing campaigns and traces their commercial contribution to purchases by leads acquired through each origin campaign.

**Blocked by:** 04 — Record demo sales and inspect transactions.

**Status:** resolved

- [x] Campaign Overview presents coherent campaign records and meaningful comparisons rather than a reused lead table and unrelated hardcoded KPI values.
- [x] Derive campaign-attributed revenue from paid transactions associated with the buyer's optional origin campaign, including subsequent purchases.
- [x] Unattributed purchases contribute to overall revenue without being assigned to an arbitrary campaign; campaign and overall totals remain reconcilable.
- [x] Creating a lead with a campaign and recording a first or repeat purchase changes the appropriate campaign's results without double-counting conversions.
- [x] Explain the origin-campaign attribution method and distinguish acquisition source, origin campaign, purchases, revenue, and conversion measures.
- [x] Reporting-period controls apply the correct date basis, use USD or valid percentage/count units, and handle empty periods and zero denominators intentionally.
- [x] Keep any sample historical campaign observations tied to their records and reporting context, distinct from proposed budgets and unsupported outcome predictions.
- [x] Campaign comparisons remain readable, accessible, and responsive in both themes; exposed controls have a useful outcome.
- [x] Browser-led scenarios compare attributed and unattributed purchases, first versus repeat purchases, filtered campaign totals, and the visible method explanation.
- [x] TypeScript, lint, and production web build pass; this reporting uses the shared commercial records and calculations.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
