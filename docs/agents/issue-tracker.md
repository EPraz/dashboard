# Issue tracker: Local Markdown

Issues and specs live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Specs: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: one file per ticket at
  `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record triage state in a `Status:` line near the top of each issue.
  Use the role strings in `docs/agents/triage-labels.md`.
- Append comments and conversation history under `## Comments`.

## Publish to the issue tracker

Create the appropriate spec or issue file using the conventions above.
Create its directory if needed.

## Fetch the relevant ticket

Read the referenced file. Resolve issue numbers within the relevant
feature directory; ask for the feature when the number is ambiguous.

## Wayfinding operations

Used by `/wayfinder`.

- Map: `.scratch/<effort>/map.md`, containing Notes,
  Decisions-so-far, and Fog.
- Child ticket: `.scratch/<effort>/issues/NN-<slug>.md`,
  numbered from `01`, with the question in the body.
- Type: a `Type:` line containing `research`, `prototype`,
  `grilling`, or `task`.
- Lifecycle: use `Status: claimed` when claimed and
  `Status: resolved` when resolved.
- Blocking: record `Blocked by: NN, NN` near the top.
  A ticket is unblocked when every listed ticket is resolved.
- Frontier: select the first open, unblocked, unclaimed ticket
  by number.
- Claim: save `Status: claimed` before starting work.
- Resolve: append the answer under `## Answer`, set
  `Status: resolved`, and add a summary and link to
  Decisions-so-far in the map.
