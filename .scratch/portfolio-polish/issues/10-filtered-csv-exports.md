# 10: Export filtered leads, products, and transactions

**What to build:** The sales manager downloads usable CSV records directly from each completed data table, matching the active filters across the entire result set rather than just the current page.

**Blocked by:** 02 — Manage leads in a persistent demo session; 03 — Explore product performance and inventory; 04 — Record demo sales and inspect transactions.

**Status:** resolved

- [x] Export CSV works for Leads, Products, and Transactions entirely within the browser, without API requests or a backend.
- [x] Exported records match the active query, reporting period where applicable, and entity-specific filters across all matching pages, in a consistent meaningful order.
- [x] Use clear column headers and consistent USD amounts, dates, stage labels, identifiers, and inventory/transaction units as appropriate to each record type.
- [x] Correctly preserve delimiters, quotes, line breaks, and international characters, and handle spreadsheet formula-like cell values safely.
- [x] Clearly label current inventory versus period-based performance in product export content where both are included.
- [x] Empty result sets have explicit behavior and feedback rather than a confusing empty download; download controls are labeled and accessible.
- [x] Exports reflect newly created leads and recorded purchases and remain consistent after reload or reset.
- [x] Browser-led checks download and inspect each entity's CSV, including combined filters, a result spanning multiple pages, special cell values, and zero matches.
- [x] TypeScript, lint, and production web build pass; use the same filtering/reporting context as the visible tables rather than a parallel export-only interpretation.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
