# Domain Docs

## Layout

This repo uses a single-context layout:

- `GLOSSARY.md` at the repo root for domain terminology.
- `docs/adr/` for architecture decision records.

## Before exploring the codebase

Read `GLOSSARY.md` and ADRs relevant to the area being explored.

If these files do not exist, proceed silently. Domain modeling
creates them when terms or decisions are resolved.

## Use the glossary's vocabulary

Use defined domain terms in issue titles, proposals, hypotheses,
test names, and other outputs.

For a missing concept, check existing project language first.
Record genuine terminology gaps for `/domain-modeling`.

## Surface ADR conflicts

Explicitly identify any existing ADR contradicted by a proposal,
and explain why the decision should be reconsidered.
