# 01: Enter Aster and switch themes

**What to build:** A visitor opens Aster directly, understands that it is a Sales & Marketing Dashboard using sample data, navigates the existing areas on any supported screen size, and switches between two polished, remembered appearances.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] The application opens directly without login or registration and displays a discreet Interactive demo · Sample data indication.
- [x] The shell uses the Aster name, a new appropriate logo, and the Sales & Marketing Dashboard subtitle; experimental Navigate and Salescape branding is replaced on the completed shell.
- [x] Preserve the reference-inspired dashboard structure while improving navigation hierarchy, spacing, typography, and reusable controls.
- [x] Light uses Petrol & apricot and dark uses Ink & periwinkle, with semantic status meanings consistent across both themes.
- [x] A prominent Light / Dark control with text and icons works from the header on desktop and mobile, and the selection survives reload.
- [x] Navigation identifies the active area; mobile navigation opens, closes, and restores focus without trapping visitors or hiding essential controls.
- [x] The shell is usable at 320, 768, 1024, and 1440 pixel widths in both themes, with visible keyboard focus, readable contrast, and no page-wide overflow.
- [x] Perform any required route or shell prefactoring before extending the behavior, retaining Expo and React Native Web and keeping existing views reachable during the transition.
- [x] Introduce the minimal browser-led behavior harness and verify direct entry, navigation, theme switching, and preference restoration through visible outcomes.
- [x] TypeScript, lint, and production web build pass; do not defer verification of this slice to final integration.

## Verification

Implemented and checked through the production browser workflows, clean installation, TypeScript, lint, export, and the documented QA evidence in [verification](../../../docs/verification.md). The owner authorized progression without intermediate review pauses; walkthrough recording still requires explicit confirmation.
