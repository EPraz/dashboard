# 09: Find leads and products from the header

**What to build:** From any main area, the visitor searches for a lead or product and opens its real details, with understandable results and recovery when no record matches.

**Blocked by:** 02 — Manage leads in a persistent demo session; 03 — Explore product performance and inventory.

**Status:** resolved

- [x] Replace the decorative header search with working search over the shared leads and products.
- [x] Clearly distinguish result types and provide meaningful identity/context without confusing acquisition sources with products or campaigns.
- [x] Selecting a result opens the correct existing record details and supports normal browser navigation and return to the previous view.
- [x] New leads are discoverable and reset removes records that no longer exist; no duplicate search-specific data store or stale static result list is introduced.
- [x] Empty queries and zero matches have deliberate behavior, with a useful way to clear the query and continue exploring.
- [x] Search controls and any result overlay have accessible labels, keyboard operation, appropriate focus management, and a reliable dismissal path.
- [x] The header and results fit mobile, tablet, and desktop in both themes without hiding the theme selector or essential actions.
- [x] Browser-led scenarios search both record types, open results, recover from no matches, discover a newly created lead, and verify keyboard dismissal/navigation.
- [x] TypeScript, lint, and production web build pass; do not introduce an API or simulated remote loading.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
