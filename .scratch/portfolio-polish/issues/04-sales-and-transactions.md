# 04: Record demo sales and inspect transactions

**What to build:** From lead details, the sales manager records a fictional paid purchase and sees the matching transaction, lower inventory, revenue change, and first conversion, with repeat purchases remaining coherent after reload.

**Blocked by:** 02 — Manage leads in a persistent demo session; 03 — Explore product performance and inventory.

**Status:** resolved

- [x] Record demo sale is available from lead details and allows choosing one product and a positive whole-number quantity within current available stock.
- [x] Show the price, quantity, and resulting USD amount before confirmation and clearly identify the purchase as fictional.
- [x] Reject missing/invalid products, zero, negative, fractional, or excessive quantities, and zero-stock purchases with useful nearby feedback; failed actions leave all affected records unchanged.
- [x] A successful submission creates one paid transaction with buyer, product, unit price, quantity, amount, sale date, and optional origin-campaign attribution, and reduces stock as one coherent action.
- [x] Accidental repeated confirmation does not create duplicate purchases or deduct stock twice.
- [x] The first paid purchase marks the lead Converted; later purchases increase revenue and reduce stock without counting another conversion or allowing Converted to regress manually.
- [x] Product performance and the revenue/transaction totals exposed by completed surfaces reflect the new purchase immediately and after reload.
- [x] Transactions replaces the unrelated lead table with paid purchases, relevant search/period filters, sorting, pagination when needed, counts, clear filters, and useful empty states.
- [x] A transaction's details and the buyer's purchase context expose enough information to trace the recorded purchase, including repeat purchases and attributed or unattributed sales.
- [x] Sale state persists together with lead and inventory effects. Reset restores the entire business scenario without leaving orphaned transactions or partial stock changes.
- [x] Browser-led scenarios verify a first sale, repeat purchase, invalid stock/quantity cases, repeated submission, transaction navigation, filtered totals, persistence, and reset through observable results.
- [x] No real payment, return, or cancellation flow is introduced; forms and details remain accessible and responsive, and TypeScript, lint, and production web build pass.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
