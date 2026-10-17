# Implementation review

Two independent, read-only reviews examined the implementation against the recorded starting commit `adb178c0b75d0e20b3bcd7bad970fde527fdc378`. The first implementation commit is `e1e338b`; focused follow-up reviews covered the corrections below before publication.

## Standards

**Initial report:** 0 documented-standard breaches; 1 low-priority judgment call. The leads list repeated open/converted classification already owned by `leadSummary`. Cohesive large screens and the WebAnchor adapter were checked against the documented architecture exceptions.

**Resolution:** The list now derives all three metrics from `leadSummary(filtered)`. The standards reviewer confirmed the duplicated classification was removed.

**Final report:** 0 hard breaches, 0 remaining judgment-call findings. No unresolved severity to report.

## Spec

**Initial report:** 1 P3 finding. Budget validation rejected invalid amounts and allocations but only displayed a general form alert, leaving specification story 68's field-level feedback incomplete. No other confirmed missing requirement, commercial-rule error, or scope expansion was found.

**Resolution:** Shared budget validation now returns field errors. The amount and every allocation receive nearby messages, `aria-invalid`, and associated descriptions; allocation-sum errors remain at form level. A browser regression failed against the prior production output and checks invalid input, accessible feedback, correction, and successful saving. The spec reviewer confirmed the finding resolved.

**Final report:** 0 remaining findings. No unresolved severity to report. Publication and the explicitly gated video remain separate milestones, tracked in tickets 13 and 14.

## Investigated concern

Both reviewers raised a possible unsaved-note carryover when global search changes the dynamic lead route. A public-browser regression passed against the unmodified production output: the router remounts the detail and clears the old draft. No implementation change was needed. The regression remains in the suite.
