# Aster portfolio polish — interview decisions

This records confirmed interview decisions. The interview is complete, and the product scope, browser-led testing approach, and fourteen-ticket breakdown are approved. Application implementation has not started.

## Purpose and delivery

- Position the project as a frontend portfolio piece for recruiters.
- Keep it frontend-only, without APIs, a backend, or a database service.
- Deliver a responsive web experience for desktop, tablet, and mobile using the existing Expo and React Native Web stack.
- Native Android and iOS applications are outside this delivery scope.
- Use English for the interface, README, and walkthrough script.
- Polish and complete the app first; prepare the recruiter README, walkthrough video, and verify or update the Vercel deployment afterward.
- Work by milestones without a fixed deadline.

## Product

- Name: Aster.
- Subtitle: Sales & Marketing Dashboard.
- Primary user: the sales manager of a small business.
- Product domain: sales and marketing, rather than logistics.
- Example business: a small audio store selling headphones, speakers, microphones, and accessories.
- Replace the experimental Navigate identity and inconsistent Salescape references with Aster and a new logo.

## Entry and core journey

- Open directly into the dashboard without registration, login, or a simulated authentication flow.
- Show a discreet `Interactive demo · Sample data` indication.
- Remove the inactive logout action.
- Make Leads the core interactive journey: search, filter, create a lead, open its detail, change its status, and add notes.
- Products and Transactions support browsing, filtering, and record details.
- Campaigns supports result comparison and budget simulation.

## Local data and persistence

- Save leads, notes, preferences, and budget plans in the browser.
- Include a `Reset demo` action that restores the initial data after confirmation.
- Keep all demo data and interactions local, without an API or backend.

## Lead conversion and sales

- Lead statuses: New, Contacted, Qualified, Converted, and Lost.
- New, Contacted, Qualified, and Lost are manually editable.
- Converted is reached by recording the lead's first sale.
- Provide `Record demo sale` from lead details, selecting a product and quantity.
- Recording a sale creates a fictional paid transaction, reduces available inventory, and updates the related metrics.
- Derive displayed results from shared records rather than independent hardcoded totals.
- Each sale contains one product and a positive whole-number quantity that cannot exceed available stock.
- Existing customers can make further purchases. Each purchase increases revenue and reduces stock, but only the first purchase counts as a conversion.
- A Converted lead remains Converted. A Lost lead can be reopened.
- Returns and cancellations are outside this version's scope.

## Dates and reporting

- Currency: USD.
- Initialize or reset the demo with fictional records dated within the preceding 90 days.
- Show the preceding 30 days initially.
- Apply reporting periods consistently to tables, charts, and metrics derived from shared records.

## Supporting controls

- Header: search for leads and products, visible theme selector, and demo indication.
- Settings: appearance and demo-data reset.
- Help: short exploration guide explaining simulations.
- Remove chat, notifications, and account menus without a meaningful role in this demo.

## Budget planner

- Allow editing the total budget and its distribution across marketing channels.
- Validate that channel percentages total 100%.
- Compare the plan with the initial budget.
- Keep planning changes separate from historical campaign results and revenue.

## Attribution and exports

- Each lead has an acquisition source and an optional origin campaign.
- Attribute the lead's purchases to that origin campaign.
- Calculate campaign revenue from recorded sales and explain the attribution rule in the interface.
- Export CSV for Leads, Products, and Transactions using the currently active filters.
- Generate exports locally in the browser.
- Remove the inactive global refresh action.

## Navigation scope

| Area | Views | Purpose |
| --- | --- | --- |
| Dashboard | Main overview | Review commercial performance |
| Leads | Overview, Segments, Funnel | Review contacts, compare groups, and understand sales progression |
| Products | Performance, Inventory | Compare product sales and identify low stock |
| Transactions | Main view | Review transactions |
| Campaigns | Overview, Budget planner | Compare results and simulate budget allocation |
| Settings | Preferences | Configure meaningful demo preferences |
| Help | Demo guide | Explain how to explore the demo |

- Keep subviews that serve distinct tasks and complete their interactions.
- Defer nurturing automation and integrations.
- Present the budget planner explicitly as a simulation.

## Visual direction

- Preserve the dashboard structure inspired by the user's reference images, including cards and data views.
- Improve typography, hierarchy, spacing, graphics, and consistency.
- Light theme: Petrol & apricot.
- Dark theme: Ink & periwinkle.
- Keep semantic status meanings and interaction hierarchy consistent between themes.
- Provide a conspicuous Light / Dark selector with text and icons in the header, available on mobile as well.
- Remember the selected theme when the visitor returns.

## Baseline verification

- TypeScript noEmit, existing lint, and web export build pass before implementation.
- The web build exports 10 static routes.
- Bundled JavaScript is approximately 2.56 MB and CSS 27.7 kB before compression; these are build sizes, not runtime performance measurements.
- Browser QA must verify direct links and unknown-route behavior because the current Vercel configuration sends unmatched routes to `/index.html`.
- No application source changes or dependency updates have been made during this interview.

## Handoff

- The product scope and completion criteria are approved.
- Browser-led testing of externally observable behavior is the approved primary test seam.
- The fourteen-ticket decomposition and blocking edges are approved.
- The formal specification is published as `spec.md` alongside this file with status `ready-for-agent`.
- Publish implementation tickets separately through the ticket workflow before beginning application changes.
