import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link } from "expo-router";
import { PageHeader, Panel } from "../ui/primitives";

export default function HelpScreen() {
  return (
    <div className="page-stack">
      <PageHeader
        title="A quick guide to Aster"
        eyebrow="A LITTLE CONTEXT GOES A LONG WAY"
        subtitle="An interactive sales and marketing workspace for a fictional audio store."
      />
      <Panel
        title="Try the complete journey"
        description="A few minutes, from first connection to repeat customer."
      >
        <ol className="guide-steps">
          <li>
            <strong>Create a connection.</strong> Open Leads, add a name and
            email, then choose an acquisition source and an optional matching
            origin campaign.
          </li>
          <li>
            <strong>Keep the context.</strong> Move the lead to Contacted or
            Qualified and add a note. Lost leads can reopen. Converted is
            reserved for a first paid purchase.
          </li>
          <li>
            <strong>Record a demo sale.</strong> From the lead’s detail page,
            choose a product and a whole quantity within available stock. The
            sale creates a paid transaction, reduces inventory, updates revenue,
            and converts the lead together.
          </li>
          <li>
            <strong>Follow the results.</strong> Inspect the transaction,
            product, and campaign. Record a repeat purchase to see revenue grow
            while the customer remains one conversion.
          </li>
          <li>
            <strong>Explore and reset.</strong> Search from the header, compare
            periods, export matching records, and try the Budget planner.
            Settings restores a fresh sample workspace after confirmation.
          </li>
        </ol>
        <Link href="/dashboard/leads" asChild>
          <WebAnchor className="button button-primary">
            Start with a lead
          </WebAnchor>
        </Link>
      </Panel>
      <div className="detail-grid">
        <Panel title="A demo that stays with you">
          <p className="muted">
            No account, API, or real payment is involved. This is a frontend
            portfolio project with fictional people, products, and paid sales.
          </p>
          <p className="info-note">
            Your edits and budget plan are saved in this browser on this device.
            They are not shared or synchronized. Clearing browser storage
            removes them. Aster warns you when it cannot save or read a session.
          </p>
          <p className="muted small">
            Reset demo restores sample records dated within the preceding 90
            days and the original budget. Your Light or Dark appearance
            preference stays as you chose it.
          </p>
        </Panel>
        <Panel title="Read the numbers with confidence">
          <dl className="guide-definitions">
            <dt>Reporting dates</dt>
            <dd>
              The default is the last 30 UTC calendar days, including today.
              Leads use acquisition dates; revenue and purchases use sale dates.
              Inventory always shows current availability.
            </dd>
            <dt>Conversions</dt>
            <dd>
              A first paid purchase converts one lead. Cohort conversion is the
              share of acquired leads that are currently converted. Repeat
              purchases add revenue and units sold, without adding conversions.
            </dd>
            <dt>Campaign attribution</dt>
            <dd>
              Every purchase belongs to the buyer’s optional origin campaign,
              including repeat purchases. Unassigned sales contribute to overall
              revenue but not to a campaign. Acquisition source identifies a
              channel, rather than a campaign.
            </dd>
            <dt>Budget simulation</dt>
            <dd>
              Your proposal must allocate 100% across channels. It changes
              planned amounts only; it never rewrites historical outcomes or
              predicts returns.
            </dd>
            <dt>Exports</dt>
            <dd>
              CSV downloads include all matching records across pages. Monetary
              columns use USD, dates use UTC, and formula-like text is escaped
              for spreadsheet safety.
            </dd>
          </dl>
        </Panel>
      </div>
    </div>
  );
}
