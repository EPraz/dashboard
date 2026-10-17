import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, type Href } from "expo-router";
import {
  acquisitionSegments,
  leadSummary,
  stageDistribution,
} from "../data/lead-reports";
import type { Lead, LeadStatus, Source } from "../data/model";
import { Icon, type IconName } from "../ui/Icon";
import { Metric, Panel } from "../ui/primitives";

const sourceIcons: Record<Source, IconName> = {
  Email: "mail",
  "Social media": "users",
  "Paid search": "search",
  "Display ads": "monitor",
  "Organic search": "compass",
  Referral: "user-plus",
};
const stageDefinitions: Record<LeadStatus, string> = {
  New: "An initial connection, ready for follow-up.",
  Contacted: "A conversation has started.",
  Qualified: "A relevant interest in the store’s products.",
  Converted: "At least one paid purchase recorded.",
  Lost: "Not an active opportunity. Can be reopened.",
};

export function LeadInsights({
  leads,
  view,
}: {
  leads: Lead[];
  view: "segments" | "funnel";
}) {
  const summary = leadSummary(leads);
  const groups = acquisitionSegments(leads);
  return (
    <>
      <div className="metrics-grid three">
        <Metric
          label="Leads in cohort"
          value={summary.total}
          detail="Acquired in the selected reporting period"
          icon="users"
          featured
        />
        <Metric
          label="Cohort conversion"
          value={summary.rate}
          detail={
            summary.total
              ? "Converted ÷ all acquired leads in this cohort"
              : "No leads in this acquisition cohort yet"
          }
          icon="user-check"
        />
        <Metric
          label="Open opportunities"
          value={summary.open}
          detail="Current New, Contacted, and Qualified stages"
          icon="trending-up"
        />
      </div>
      {view === "segments" ? (
        <Panel
          title="Acquisition sources"
          description="Compare where your connections began. Each source uses the same acquisition cohort."
        >
          <div className="source-grid">
            {groups.map((group) => (
              <article
                key={group.source}
                className="source-card"
                aria-label={`${group.source} segment`}
              >
                <div className="source-card-heading">
                  <span className="source-icon">
                    <Icon name={sourceIcons[group.source]} size={20} />
                  </span>
                  <h3>{group.source}</h3>
                </div>
                <div className="source-count">
                  <strong>{group.total}</strong>
                  <span className="muted small">leads acquired</span>
                </div>
                <div className="source-stats">
                  <span>{group.converted} converted</span>
                  <strong>{group.total ? group.rate : "No leads yet"}</strong>
                </div>
                <Link
                  href={
                    `/dashboard/leads?source=${encodeURIComponent(group.source)}` as Href
                  }
                  asChild
                >
                  <WebAnchor
                    className="insight-link"
                    aria-label={`View ${group.source} leads`}
                  >
                    View leads
                    <Icon name="arrow-up-right" size={16} />
                  </WebAnchor>
                </Link>
              </article>
            ))}
          </div>
          <p className="info-note">
            A source is the acquisition channel. An origin campaign is an
            optional marketing initiative within that channel. Conversion means
            a first paid purchase.
          </p>
        </Panel>
      ) : (
        <Panel
          title="Pipeline snapshot"
          description="The current position of leads acquired during the selected period."
        >
          <div className="stage-list">
            {stageDistribution(leads).map((stage) => (
              <div
                key={stage.status}
                className="stage-row"
                role="group"
                aria-label={`${stage.status} stage`}
              >
                <div className="stage-row-heading">
                  <div>
                    <h3>{stage.status}</h3>
                    <p className="small muted">
                      {stageDefinitions[stage.status]}
                    </p>
                  </div>
                  <div className="stage-numbers">
                    <strong>{stage.count}</strong>
                    <span>{stage.share.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="stage-track" aria-hidden="true">
                  <div style={{ width: `${stage.share}%` }} />
                </div>
                <Link
                  href={`/dashboard/leads?status=${stage.status}` as Href}
                  asChild
                >
                  <WebAnchor
                    className="insight-link small"
                    aria-label={`View ${stage.status} leads`}
                  >
                    View leads
                    <Icon name="arrow-up-right" size={14} />
                  </WebAnchor>
                </Link>
              </div>
            ))}
          </div>
          <p className="info-note">
            These are current stages, not a historical transition log. Leads may
            skip a stage or be reopened. Converted is reached by a first paid
            purchase; repeat purchases do not count again.
          </p>
        </Panel>
      )}
    </>
  );
}
