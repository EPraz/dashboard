# 14: Produce the finished Aster walkthrough

**What to build:** A recruiter watches a concise walkthrough of the completed public application and understands the product, its visual quality, and the connected frontend workflow without having to explore every screen manually.

**Blocked by:** 12 — Present Aster clearly to recruiters; 13 — Verify and publish the completed Vercel demo.

**Status:** resolved

**Recording prerequisite:** The user must review the finished result and explicitly confirm that recording can begin. Do not start recording before that confirmation, even if all blocking tickets are complete.

- [x] Prepare an English script and recording sequence grounded in the accepted application and the verified public deployment.
- [x] Obtain the user's explicit confirmation before starting any walkthrough recording.
- [x] Start from a clean, recognizable demo scenario and briefly introduce Aster, its audio-store context, and the frontend/sample-data scope.
- [x] Show the main lead journey: create or inspect a lead, add follow-up context, record a first sale, and inspect the resulting transaction, inventory effect, revenue, and campaign contribution.
- [x] Demonstrate a repeat purchase or clearly explain the first-conversion-only rule without implying functionality that was not delivered.
- [x] Include concise views of budget planning, useful reporting or CSV, mobile responsiveness, and the visible switch between both palettes.
- [x] Produce an actual playable recording with readable framing, deliberate pacing, and English narration or explanatory captions; a script alone does not complete the ticket.
- [x] Review the full recording for broken interactions, unreadable content, incidental personal information, stale branding, inaccurate claims, and divergence from the public version.
- [x] Add the final walkthrough reference to the portfolio presentation and confirm the recording is accessible from its intended destination.
- [x] Record any external recording/publishing prerequisite that prevents delivery and leave the ticket incomplete until the playable result and its reference have been verified.

## Progress

The reviewed 3:06 captioned MP4, VTT and poster are published. The public application at scroll-fix commit 9454116 was verified before recording. The complete public recording workflow and local/hosted player checks pass, including stock/revenue/conversion reconciliation, downloads, playback/seeking, byte ranges, SHA-256 and responsive/accessibility checks. The [public player](https://dashboard-one-rose-14.vercel.app/walkthrough) is linked from README. Publication commit 72fa230, deployment 7147825131, Vercel success. No recording or publishing prerequisite remains. Details: [walkthrough](../../../docs/walkthrough.md).

## Comments

The owner explicitly approved the proposed video scope with “acepto” after reviewing the finished app and the planned cursor, selective highlights, English captions and complete commercial workflow. The owner then reminded us to publish the latest fix before filming; its successful Vercel status and actual public wheel scrolling were rechecked before capture began.

The owner requested a final video-only correction: remove the brief white reload flash around 2:38 while retaining the rest of the video. The edited interval is 158.20 to 158.60 seconds; all other chapters match the original decoded frames exactly. Final owner approval awaits review of the corrected public artifact.

The correction is published at be508636ec23d36599da079f2de46d3932ece0d1 (deployment 7147948569, Vercel success). The public player passes both responsive widths, corrected-interval seeks, exact MP4 hash, byte ranges, navigation and accessibility without browser errors. The owner can review the corrected video at the existing public URL.
