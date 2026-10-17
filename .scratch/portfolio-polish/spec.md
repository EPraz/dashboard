# Aster — Sales & Marketing Dashboard

Status: ready-for-agent

## Problem Statement

The project owner needs a finished frontend portfolio project that recruiters can explore and assess. The existing dashboard looks like a sales and marketing product, but its documentation describes logistics, its branding is inconsistent, and many controls are decorative or lead to incomplete views. Products and Transactions reuse a lead table, reporting values are disconnected, and there is no complete commercial workflow.

A recruiter cannot currently follow a reliable journey that demonstrates frontend engineering beyond static layouts. The application also needs verified responsive behavior, accessibility, persistent local interactions, and portfolio materials that accurately describe what works.

## Solution

Complete the existing project as Aster, a Sales & Marketing Dashboard for the sales manager of a fictional small audio store. Preserve the reference-inspired dashboard structure while giving it a consistent identity, polished typography, clear hierarchy, useful subviews, and two distinctive themes.

Visitors enter immediately without authentication and explore clearly identified sample data. The primary journey connects a lead to a fictional paid sale, a transaction, reduced inventory, updated revenue, and campaign attribution. Changes persist in the browser and can be reset after confirmation. Reports, filters, exports, and planning tools operate on coherent shared records without an API or backend.

Finish and verify the application first. Then prepare a recruiter-facing README, verify or update the Vercel deployment, and produce a walkthrough of the completed product.

## User Stories

1. As a recruiter, I want to enter Aster directly without registering or logging in, so that I can assess the project immediately.
2. As a visitor, I want to see that this is an interactive demo using sample data, so that I understand what the product represents.
3. As a visitor, I want a consistent Aster name, logo, and Sales & Marketing Dashboard description, so that I understand the product identity.
4. As a visitor, I want the application to work on desktop, tablet, and mobile, so that my device does not prevent exploration.
5. As a sales manager, I want navigation that clearly identifies the current area and subview, so that I can move between tasks confidently.
6. As a keyboard user, I want to reach and operate every essential control, so that I can complete the same workflows without a pointer.
7. As a visitor, I want a visible Light / Dark selector, so that I notice and can explore both visual treatments.
8. As a returning visitor, I want my selected theme to be remembered, so that the interface opens with my preference.
9. As a visitor, I want statuses and interaction meanings to stay consistent across themes, so that switching appearance does not change my understanding.
10. As a sales manager, I want header search to find leads and products, so that I can reach a record from anywhere in the dashboard.
11. As a sales manager, I want useful empty search results and a way to clear the query, so that I can recover from an unsuccessful search.
12. As a visitor, I want meaningful record details and working links, so that I can explore beyond summary cards.
13. As a sales manager, I want a lead list showing relevant contact, acquisition, and stage information, so that I can prioritize follow-up.
14. As a sales manager, I want to create a lead with validated contact information, so that I can demonstrate a realistic capture workflow.
15. As a sales manager, I want to record an acquisition source, so that I understand how a lead reached the store.
16. As a sales manager, I want an optional origin campaign when creating a lead, so that later purchases can contribute to campaign results.
17. As a sales manager, I want to search and sort leads, so that I can find and compare relevant records.
18. As a sales manager, I want to filter leads by relevant attributes and acquisition period, so that I can focus on a useful cohort.
19. As a sales manager, I want to clear filters and understand zero-result states, so that filtering never leaves me at a dead end.
20. As a sales manager, I want manageable table pagination where needed, so that larger datasets remain readable.
21. As a sales manager, I want to open a lead's details, so that I can inspect its acquisition context, status, notes, and purchases.
22. As a sales manager, I want to move an eligible lead between New, Contacted, Qualified, and Lost, so that its current commercial stage is represented.
23. As a sales manager, I want to reopen a Lost lead, so that renewed interest can be followed up.
24. As a sales manager, I want Converted to reflect a first paid purchase and remain protected from manual reassignment, so that conversions retain a clear meaning.
25. As a sales manager, I want to add notes to a lead and retain them after reload, so that follow-up context is not lost.
26. As a sales manager, I want to compare lead segments calculated from the same records, so that groups agree with the lead list.
27. As a sales manager, I want a meaningful funnel view, so that I can understand commercial progression and outcomes.
28. As a sales manager, I want conversion measures to explain their cohort and denominator, so that percentages are interpretable.
29. As a sales manager, I want to browse a realistic audio product catalog, so that the store has a coherent business context.
30. As a sales manager, I want product details with price, availability, and related performance, so that I can inspect an individual offering.
31. As a sales manager, I want product performance to come from recorded sales, so that product rankings and revenue totals agree.
32. As a sales manager, I want to identify low-stock and out-of-stock products, so that inventory has a practical purpose.
33. As a sales manager, I want product and inventory filters, so that I can focus on relevant products or stock conditions.
34. As a sales manager, I want to record a demo sale from a lead's details, so that I can complete the main commercial journey.
35. As a sales manager, I want to choose one product and a positive whole-number quantity within available stock, so that the sale has valid inputs.
36. As a sales manager, I want invalid sales to leave all records unchanged, so that a failed action cannot partially alter the business data.
37. As a sales manager, I want protection against accidental duplicate submission, so that one confirmation does not record two purchases.
38. As a sales manager, I want a successful sale to create a paid transaction with the buyer, product, quantity, price, amount, and date, so that the purchase can be inspected afterward.
39. As a sales manager, I want a lead's first paid sale to mark it Converted, so that customer acquisition is reflected automatically.
40. As a sales manager, I want to record further purchases by a customer without counting another conversion, so that repeat revenue and acquisition remain distinct.
41. As a sales manager, I want inventory to decrease after each successful sale, so that product availability stays coherent.
42. As a sales manager, I want revenue and related summaries to update after a sale, so that every affected view agrees.
43. As a sales manager, I want to browse, filter, sort, and inspect transactions, so that I can trace displayed revenue to paid purchases.
44. As a visitor, I want recent, varied sample records when the demo is initialized or reset, so that time filters produce meaningful results.
45. As a sales manager, I want consistent USD amounts, date formats, and measurement units, so that I can compare values correctly.
46. As a visitor, I want the initial reporting period to cover the preceding 30 days, so that the first view has a clear and useful scope.
47. As a sales manager, I want reporting-period changes to update applicable tables, charts, and summaries together, so that the reporting context stays consistent.
48. As a sales manager, I want acquisition and sales metrics to identify their date basis, so that I do not confuse lead creation with purchase activity.
49. As a sales manager, I want a dashboard overview derived from the same records as the detailed views, so that it is a trustworthy starting point.
50. As a visitor, I want readable charts with labels, units, and accessible descriptions, so that visualizations communicate more than decoration.
51. As a sales manager, I want to compare campaigns using meaningful results, so that I can see their commercial contribution.
52. As a sales manager, I want purchases attributed to the buyer's origin campaign when present, so that campaign revenue follows a consistent rule.
53. As a sales manager, I want subsequent purchases included in that campaign's attributed revenue and unattributed purchases included in overall revenue, so that totals remain explainable.
54. As a sales manager, I want the attribution method explained in the interface, so that I understand the limits of the campaign comparison.
55. As a sales manager, I want to edit a proposed total marketing budget, so that I can explore a spending plan.
56. As a sales manager, I want to distribute the budget across channels, so that I can see the proposed allocation.
57. As a sales manager, I want invalid budget values and allocations that do not total 100% rejected with useful feedback, so that saved plans are coherent.
58. As a sales manager, I want to compare a budget plan with the initial allocation, so that changes are easy to understand.
59. As a sales manager, I want budget planning clearly labeled as a simulation that does not alter historical results, so that proposed spending is not mistaken for achieved revenue.
60. As a returning visitor, I want a valid saved budget plan restored, so that I can continue exploring it later.
61. As a returning visitor, I want my leads, notes, sales, inventory effects, and preferences preserved locally, so that the demo supports a continuing session.
62. As a visitor, I want related records to remain coherent after reloading, so that persistence does not undo part of a completed action.
63. As a visitor, I want Reset demo to request confirmation, so that I do not accidentally discard my exploration.
64. As a visitor, I want canceling reset to leave the session untouched, so that I can safely reconsider.
65. As a visitor, I want a confirmed reset to restore recent sample data and original budget plans while retaining my appearance preference, so that I can restart the business scenario comfortably.
66. As a visitor whose browser cannot save changes, I want a clear notice and a usable session, so that storage restrictions do not cause silent loss or a crash.
67. As a visitor with unreadable saved data, I want an understandable recovery path, so that I can return to a working demo deliberately.
68. As a sales manager, I want validation messages close to the relevant fields, so that I can correct input without guessing.
69. As a visitor, I want clear success, error, and empty-state feedback, so that I understand the result of each action.
70. As a sales manager, I want Leads, Products, and Transactions exports to contain all records matching the active filters, so that downloads reflect the selected data rather than only one visible page.
71. As a sales manager, I want correctly formatted and safely escaped CSV values, so that exported records remain usable in spreadsheet software.
72. As a sales manager, I want empty export behavior explained, so that a zero-result view does not produce a confusing download.
73. As a visitor, I want a short Help guide describing the primary journey, attribution, and simulations, so that I can explore without prior product knowledge.
74. As a visitor, I want Settings to contain meaningful appearance and demo-reset controls, so that preferences are useful rather than placeholders.
75. As a visitor, I want direct links, reload, and browser back/forward navigation to work, so that the app behaves like a dependable website.
76. As a visitor opening an unknown route, I want a useful recovery option, so that a bad link does not strand me.
77. As a visitor, I want readable contrast, visible focus, usable touch targets, and respect for reduced motion, so that presentation supports access and comfort.
78. As a project maintainer, I want repeatable checks of complete user workflows, so that refactoring does not silently break commercial rules.
79. As a project maintainer, I want clear feature boundaries and shared business rules, so that the code demonstrates maintainable frontend engineering.
80. As a recruiter, I want a concise English README explaining the product, frontend scope, verified capabilities, and engineering decisions, so that I can assess the work quickly.
81. As a developer reviewing the repository, I want accurate installation and verification instructions, so that I can run the project successfully.
82. As a recruiter, I want current screenshots of the finished interface, so that the repository represents the delivered application.
83. As a recruiter, I want a working public Vercel demo with reliable navigation, so that I can evaluate the project without local setup.
84. As a recruiter, I want a focused walkthrough showing the finished product and the lead-to-sale journey, so that I can understand its depth in a short viewing.
85. As a project owner, I want documentation, deployment, and video claims to match verified behavior, so that the portfolio is credible.

## Implementation Decisions

- **Existing stack and delivery target:** Retain Expo, React Native Web, React, TypeScript, and the established styling tooling. Deliver responsive web rather than native Android or iOS applications. Complete the existing project instead of migrating frameworks.
- **Application entry:** Open directly into the dashboard. Use a discreet Interactive demo · Sample data indication. Do not introduce login, registration, accounts, or an artificial session/logout flow.
- **Brand and visual system:** Use Aster with the subtitle Sales & Marketing Dashboard and an appropriate new logo. Replace Navigate and Salescape references. Preserve the reference-inspired dashboard composition while improving hierarchy, typography, spacing, chart clarity, and table readability.
- **Themes:** Light uses Petrol & apricot; dark uses Ink & periwinkle. The Light / Dark selector is prominent in the header, includes text and icons, works on mobile, and remembers the selected appearance. Semantic status meanings and control hierarchy stay consistent between themes.
- **Navigation:** Dashboard has its overview. Leads has Overview, Segments, and Funnel. Products has Performance and Inventory. Transactions has its main view and record details. Campaigns has Overview and Budget planner. Settings handles appearance and demo reset. Help explains the exploration journey and simulations.
- **Feature boundaries:** Keep route composition thin. Separate shared demo-session state, commercial actions, reporting calculations, persistence, and CSV generation from rendering. Extract shared UI where it is reused, and remove disconnected duplicate implementations as their surfaces are completed.
- **Shared records:** Model products, leads, notes, acquisition sources, optional origin campaigns, paid transactions, inventory, and budget plans with explicit types and stable relationships. Use the domain glossary's terminology. No API contracts, remote data fetching, backend, or database service are required.
- **Sample business:** Represent a small audio store selling headphones, speakers, microphones, and audio accessories. Provide enough varied records for filtering, pagination, lead stages, conversions, repeat purchases, unattributed revenue, and low or zero stock.
- **Dates and currency:** Initialize and reset dated sample records within the preceding 90 days, with a default reporting view of the preceding 30 days. Use USD and consistent date and unit formatting. Acquisition metrics use acquisition dates; sales metrics use sale dates. Current inventory must be identifiable as present availability rather than an unsupported historical stock reconstruction.
- **Reporting:** Derive values from shared records rather than independent hardcoded totals. Keep relevant filters, counts, charts, and summaries consistent. Explain conversion cohorts and denominators, and distinguish stage distributions from historical progression if historical transitions are not represented.
- **Lead management:** Support searchable, filterable, sortable lists, pagination where needed, meaningful details, validated creation, manual stage changes, and persistent notes. Each lead has an acquisition source and may have an origin campaign.
- **Lead lifecycle:** Use New, Contacted, Qualified, Converted, and Lost. New, Contacted, Qualified, and Lost are manually editable; Lost can be reopened. Converted is reached through the first paid sale and remains Converted. Manual stage changes cannot manufacture a conversion.
- **Sale command:** Record demo sale is available from lead details. A sale contains one product and a positive whole-number quantity not exceeding available stock. A successful command creates a fictional paid transaction, reduces inventory, updates derived revenue, and converts the lead on its first purchase. Apply related changes together, reject invalid actions without partial mutation, and guard accidental duplicate submission.
- **Transaction record:** Preserve the buyer, product, unit price, quantity, amount, sale date, and applicable campaign attribution. Support browsing, filtering, sorting, and details that allow revenue to be traced to individual purchases.
- **Repeat purchases:** A customer can make later purchases. Each contributes to revenue and stock movement, while conversion counts only the first paid purchase. Returns and cancellations are outside this version.
- **Campaign attribution:** Attribute purchases, including subsequent purchases, to the buyer's optional origin campaign. Purchases without an origin campaign still contribute to overall sales. Show the attribution rule in campaign reporting; do not imply advanced attribution modeling.
- **Budget planning:** Allow a proposed total and a channel allocation totaling 100%, with valid amounts and useful validation. Compare against the initial budget and persist valid plans. Clearly label the tool as a simulation. Planned changes do not alter historical spending, campaign outcomes, or revenue.
- **Search and supporting controls:** Header search finds leads and products and opens meaningful results or details. Remove inactive refresh, chat, notifications, account menus, logout, nurturing automation tabs, and integration placeholders that do not belong to the agreed experience.
- **CSV exports:** Generate Leads, Products, and Transactions downloads in the browser. Export all records matching the active filters, not just the visible page. Use consistent columns, dates, and amounts; safely escape values and handle empty results intentionally.
- **Local persistence:** Persist mutable records, sale effects, notes, preferences, and valid budget plans as a coherent browser-local session. Restore related records together after reload. Handle unavailable storage and unreadable saved data with visible feedback and a deliberate recovery path, without crashing or silently discarding input.
- **Reset behavior:** Reset demo requests confirmation. Canceling changes nothing. Confirming restores recent sample business records and initial plans while retaining the selected appearance.
- **UX states and accessibility:** Provide nearby validation, useful success/error feedback, empty states, accessible names and roles, visible focus, keyboard operation, touch-friendly controls, and readable contrast. Keep essential actions available without hover, respect reduced motion, and do not add artificial network loading for local operations.
- **Responsive behavior:** Make the dashboard usable across phone, tablet, and desktop. Avoid page-wide overflow; contain horizontal table scrolling when necessary. Both themes must cover the same responsive behaviors and workflows.
- **Navigation and hosting:** Verify direct links, reload, back/forward navigation, and unknown-route recovery against the production web output and Vercel configuration. Do not assume the current catch-all routing already handles these correctly.
- **Incremental delivery:** Use the approved fourteen-ticket breakdown. Each application slice includes its visible behavior and relevant checks; testing is not postponed to the final integration ticket. Perform necessary prefactoring within the earliest slice that needs it while keeping existing checks green.
- **Portfolio milestones:** Finish and accept the application before the recruiter README, deployment verification, and walkthrough milestones. README preparation and Vercel verification can proceed after application acceptance; the final walkthrough follows both, using the completed public version.

## Testing Decisions

- **Approved primary seam:** Test at the running web application's user-facing browser boundary. Drive actual controls, navigate between views, reload, and inspect rendered results and downloaded files. This is the highest existing entry point and avoids introducing separate test interfaces for every component or calculation.
- **Good tests:** Assert externally observable behavior and business invariants rather than component structure, hook calls, internal storage shapes, or private helper output. Prefer a few complete scenarios with meaningful failures over many tests mirroring the implementation.
- **Prior art:** The repository has TypeScript, lint, and web-build checks, all passing at baseline. No existing automated behavior suite or configured test runner was identified. Introduce a minimal browser-automation setup appropriate to the existing web application rather than replacing an established suite.
- **Repeatability:** Isolate browser sessions and use a controlled browser clock where needed for relative sample dates and reporting periods. Start scenarios from an explicit fresh or reset demo. Prefer expected changes from a known initial state over brittle incidental screenshot text or hardcoded current dates.
- **Leads and navigation:** Exercise entry without authentication, creation validation, search, filters, sorting, pagination, detail navigation, notes, permitted stage changes, reopening Lost, and protection of Converted. Check direct URLs, reload, back/forward, and unknown routes.
- **Sales, products, and transactions:** Complete a first sale and a repeat purchase through the UI. Verify transaction details, exact revenue changes, stock movement, first-conversion-only behavior, and consistency after reload. Exercise zero, negative, fractional, excessive, and otherwise invalid quantities, zero stock, and repeated submission. Rejected actions must leave all affected visible values unchanged.
- **Reports and campaigns:** Verify matching totals across the overview and detailed views, date-boundary behavior, filters and cleared filters, empty and zero-value reports, lead cohorts and conversion explanations, origin-campaign attribution, subsequent purchases, and unattributed purchases.
- **Budget planning:** Exercise invalid totals, negative or otherwise invalid allocation values, percentages below or above 100%, a valid saved plan, initial-budget comparison, and reload. Confirm that editing a plan does not change historical campaign results or sales revenue.
- **Persistence and reset:** Verify restoration of notes, sales, inventory effects, plans, and theme. Confirm that canceling reset preserves the session and accepting reset restores the sample business scenario while retaining appearance. Simulate unavailable or unreadable browser storage at the browser boundary and verify useful feedback and recovery rather than private persistence internals.
- **CSV:** Download filtered Leads, Products, and Transactions exports and inspect their contents, headers, escaping, safe cell handling, and record counts. Cover a result set spanning multiple visible pages and the empty-result behavior.
- **Accessibility and responsive UI:** Exercise keyboard navigation, focus movement and return for overlays, form feedback, names and roles, chart descriptions, contrast, reduced motion, and essential actions without hover. Check representative widths including 320, 768, 1024, and 1440 pixels in both themes, with no page-wide overflow or inaccessible controls.
- **Application gates:** Keep TypeScript, lint, and production web build passing. Exercise the primary journey without unresolved browser errors. Inspect final build size and investigate material avoidable regressions; bundle size alone is not a runtime performance measurement.
- **Portfolio verification:** Check README instructions and claims against the final application, validate the public deployment's links and route behavior, and ensure screenshots and walkthrough demonstrate the delivered version.

## Out of Scope

- API integration, a backend, a database service, server persistence, multi-user collaboration, or cross-device synchronization.
- Authentication, registration, account management, real payments, returns, or cancellations.
- Native Android or iOS application delivery or a migration away from the existing Expo and React Native Web base.
- Shopping carts or multi-product transactions; each demo sale contains one product and quantity.
- Advanced marketing attribution, automated nurturing, external integrations, real advertising execution, or predictions presented as achieved results.
- Historical inventory reconstruction unless represented by the agreed data; the required inventory view shows current availability.
- Unrelated new modules, speculative features, or broad dependency upgrades without a demonstrated implementation need.
- Portfolio claims unsupported by verified behavior.

## Further Notes

- The product scope, browser-led test seam, and fourteen-ticket decomposition were explicitly approved during the conversation. No further product interview is needed to publish this specification.
- The configured issue tracker is local Markdown. This document is the published specification and carries the ready-for-agent state; implementation tickets are separate records published through the ticket workflow.
- The approved ticket sequence covers identity and themes; lead management; products and inventory; sales and transactions; segments and funnel; campaigns; budgets; dashboard reporting; header search; CSV; application completion and verification; recruiter README; Vercel verification; and walkthrough.
- The initial milestone is the complete, verified application. Work proceeds by milestones without a fixed deadline.
- Baseline TypeScript, lint, and web export pass. The existing export contains ten static routes, approximately 2.56 MB of JavaScript and 27.7 kB of CSS before compression. These are baseline build observations, not runtime performance results or final acceptance claims.
- Existing deployment routing sends unmatched URLs to the entry document, so direct-link and unknown-route behavior require explicit browser and hosting verification.
- The design was inspired by reference images. Preserve the structural qualities the owner liked while creating Aster's own branding, palette application, and finish; accurately describe provenance in portfolio materials when relevant.
- No application source changes or dependency changes have been made as part of this specification workflow.
