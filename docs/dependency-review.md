# Dependency review

Reviewed on October 17, 2026, after the owner authorized necessary package updates.

- Updated Expo SDK 54 to SDK 58, retaining Expo Router and React Native Web. React 19.3.0, React Native 0.88.0, TypeScript 6.0, and Expo modules follow the SDK's compatibility recommendations. `expo install --check` and all 20 Expo Doctor checks pass.
- Removed dependencies used only by the retired implementation, including NativeWind/Tailwind, Victory, masonry layout, gradients, blur, and unused native feature packages. Styling now uses local semantic CSS; charts and product illustrations use SVG.
- Kept ESLint 9 because Expo's import and React plugins do not support ESLint 10 in their declared peer ranges. Installed the TypeScript import resolver explicitly for reliable alias resolution after a clean install.
- Applied the compatible `compression` 1.8.2 patch through an override because the preview server pins 1.8.1. See [the upstream advisory](https://github.com/advisories/GHSA-vc2v-76pw-4v95).

The first captured audit reported 64 alerts, including two critical alerts. The final tree reports **26 alerts: 19 high, 7 moderate, and no critical alerts**. The remaining graph is rooted in Expo and React Native, including Metro's `braces` chain, native signing's `node-forge`, and Xcode tooling's `uuid`. Upstream advisories still affect their available versions or dependency ranges; the suggested forced fix includes downgrading Expo to SDK 44 and React Native to 0.72. That would break the supported SDK alignment, so it was not applied.

This is a static frontend export without application APIs, server rendering, native signing, or user-supplied build inputs. This limits the deployed surface; it does not make an outstanding audit finding disappear. Keep the lockfile, re-run `npm audit`, and revisit these dependencies when upstream fixes are published. Audit JSON snapshots are retained with the implementation evidence under `.scratch/portfolio-polish/qa/`.
