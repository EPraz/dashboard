# 05: Understand lead segments and conversion funnel

**What to build:** The sales manager compares meaningful groups of leads and understands commercial progression and conversion outcomes using the same records and actions as Leads Overview.

**Blocked by:** 04 — Record demo sales and inspect transactions.

**Status:** resolved

- [x] Complete the Segments and Funnel subviews with distinct useful purposes instead of decorative or disabled tabs.
- [x] Segment counts and breakdowns derive from shared lead records, with meaningful source and stage groups and an explicitly identified selected cohort.
- [x] Segment results agree with the corresponding lead records and applicable filters; provide a useful way to inspect the represented records.
- [x] Funnel stages and conversion measures use the approved lifecycle and first-paid-purchase meaning of conversion, with clear denominators and period/cohort explanations.
- [x] Do not present unrecorded historical stage transitions as observed history; clearly distinguish a current stage distribution from a cumulative historical funnel where relevant.
- [x] A stage change, new lead, first sale, or repeat purchase produces the correct visible changes; repeat purchases do not add conversions.
- [x] Period changes, boundary dates, empty cohorts, and zero denominators have meaningful results without invalid percentages or invented trends.
- [x] Charts have readable labels, units, and accessible descriptions and remain usable in both themes and at phone, tablet, and desktop widths.
- [x] Browser-led scenarios reconcile segments/funnel with filtered leads before and after stage changes and sales, including empty and zero-conversion cases.
- [x] TypeScript, lint, and production web build pass; calculations are shared with other reports rather than copied into rendering components.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
