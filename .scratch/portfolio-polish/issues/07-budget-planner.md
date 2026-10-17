# 07: Plan and save a simulated marketing budget

**What to build:** The sales manager edits a proposed marketing budget, distributes it across channels, compares it with the initial plan, and returns to the saved proposal without altering historical campaign results.

**Blocked by:** 06 — Compare campaign results and attributed revenue.

**Status:** resolved

- [x] Complete the Budget planner subview alongside Campaign Overview and clearly label it as a planning simulation.
- [x] Allow editing a valid finite positive USD total and nonnegative channel percentages; a plan can be saved only when allocations total 100%.
- [x] Invalid amounts, missing/non-numeric values, negative allocations, and totals below or above 100% produce useful feedback without overwriting the last valid saved plan.
- [x] Show allocated channel amounts, total allocation, and comparison with the initial budget using coherent calculations and readable units.
- [x] Persist valid plans across navigation and reload, and show appropriate feedback if browser storage cannot retain changes.
- [x] Changing a proposal never changes historical spending, revenue, paid transactions, stock, or achieved campaign outcomes.
- [x] The existing confirmed Reset demo action restores the initial plan together with the sample business data while keeping appearance preference.
- [x] Form controls, validation, and allocation visuals work with keyboard and mobile input in both themes, without relying solely on color.
- [x] Browser-led scenarios exercise invalid totals and allocations, a valid saved plan, reload, initial-plan comparison, reset, and unchanged historical campaign results.
- [x] TypeScript, lint, and production web build pass; planning and historical reporting remain separate in the shared session.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
