# 02: Manage leads in a persistent demo session

**What to build:** The sales manager searches and filters leads, creates one with acquisition context, opens its details, updates its commercial stage, adds notes, and returns after reload without losing the session. A confirmed reset provides a fresh scenario.

**Blocked by:** 01 — Enter Aster and switch themes.

**Status:** resolved

- [x] Establish shared, typed sample business records and coherent relationships for leads, acquisition sources, optional origin campaigns, and existing customer purchases; later slices extend this same session rather than introducing disconnected fixtures.
- [x] Initialize sample dates within the preceding 90 days and open with the preceding 30 days selected. Lead acquisition filters identify their date basis.
- [x] Leads Overview supports search, relevant stage/source/period filters, sorting, pagination where needed, visible result counts, clear filters, and useful empty states.
- [x] A lead can be created with validated contact information, an acquisition source, and an optional origin campaign; field errors preserve entered values and success feedback opens or identifies the created record.
- [x] Lead details expose acquisition context, current stage, and notes; notes and permitted changes persist after reload.
- [x] Use New, Contacted, Qualified, Converted, and Lost. Permit manual changes among eligible non-Converted stages and reopening Lost; prevent manually manufacturing a conversion or reassigning Converted.
- [x] Converted sample leads are backed by coherent purchase records. Recording new sales is introduced by the later sale slice rather than an inactive placeholder action here.
- [x] Local session storage restores related records consistently. Unavailable or unreadable storage produces useful feedback and a deliberate recovery path without crashing or silently discarding input.
- [x] Provide Reset demo with confirmation through Settings: canceling changes nothing, while confirming restores recent sample business data and initial plans while keeping the selected appearance. Settings can be extended as later session features arrive.
- [x] Browser-led checks cover creation and validation, search/filter clearing and pagination, details, notes, allowed stage changes, protected Converted, reload, reset cancellation/confirmation, and storage failure/recovery.
- [x] Completed forms, lists, and detail controls work by keyboard and on mobile in both themes; TypeScript, lint, and production web build pass.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
