# 03: Explore product performance and inventory

**What to build:** The sales manager browses the audio store's catalog, inspects a product, compares performance from recorded purchases, and identifies low or depleted inventory instead of seeing an unrelated lead table.

**Blocked by:** 02 — Manage leads in a persistent demo session.

**Status:** resolved

- [x] Use shared sample products covering headphones, speakers, microphones, and audio accessories, with stable identity, price, current stock, and a meaningful low-stock threshold.
- [x] Products provides the agreed Performance and Inventory subviews with clear active-state and keyboard behavior.
- [x] Product lists support relevant search, filtering, sorting, pagination when needed, clear filters, result counts, and useful zero-result states.
- [x] Product details show identity, USD price, current availability, and relevant sales performance.
- [x] Performance amounts and rankings derive from shared paid transactions and agree with the corresponding product totals for the chosen reporting period.
- [x] Inventory distinguishes available, low-stock, and out-of-stock products using labels as well as color, with current availability clearly distinguished from historical sales reporting.
- [x] Switching period changes sales performance consistently without pretending to reconstruct historical inventory.
- [x] Use the shared session as the source for later sale-driven inventory updates; do not keep separate stock or revenue literals inside components.
- [x] Browser-led checks cover product details, filters and empty results, period-based performance, and low/zero stock on desktop and mobile in both themes.
- [x] TypeScript, lint, and production web build pass, and all controls exposed by this completed surface have a real result.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
