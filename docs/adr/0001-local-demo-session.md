# Local demo session and derived reports

Status: Accepted

## Context

Aster is a web frontend portfolio project. The accepted scope excludes an API, database, authentication, and payment processing. Visitors should still be able to complete a coherent lead-to-sale workflow and inspect its effects.

## Decision

Use one versioned browser-local session for leads, products, campaigns, paid transactions, and the budget proposal. Domain commands validate changes before replacing the session. A sale updates the transaction ledger and first-conversion status together; inventory and revenue are derived from that ledger. An operation identifier protects against duplicate sale submission.

Reports distinguish acquisition dates, sale dates, and current inventory. Origin-campaign attribution includes repeat purchases. Budget proposals remain independent from commercial outcomes. Money is stored as integer USD cents.

Validate saved records and their relationships at the storage boundary. Preserve unreadable saved data until an explicit reset. If storage fails, retain usable in-memory state and display its session-only limitation. Appearance is stored separately so resetting business data preserves the chosen theme.

Use a static single-page Expo export with fallback routing for browser-local record URLs. The delivered target is responsive web; semantic HTML and native browser dialogs provide tables, forms, keyboard operation, and focus boundaries within Expo Router and React Native Web.

Verify business behavior through the running browser application, including downloads and reloads. Tests do not inspect the context's private state. Use the browser clock and storage boundary to exercise date and recovery cases.

## Consequences

No backend or secrets are required to run or host the project. Sessions are limited to one browser and device, without cross-tab concurrency guarantees, synchronization, or production-grade inventory reservation. Reset produces a fresh rolling sample dataset. These limits are visible in Help and the README.
