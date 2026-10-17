import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { dateLabel, inPeriod, leadStatuses, sources } from "../data/model";
import { leadSummary } from "../data/lead-reports";
import { Icon } from "../ui/Icon";
import { PeriodControl } from "../ui/PeriodControl";
import {
  Button,
  EmptyState,
  Initials,
  Metric,
  PageHeader,
  Panel,
  Status,
} from "../ui/primitives";
import { Pagination, usePagination } from "../ui/table";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { LeadInsights } from "./LeadInsights";
import { ExportButton } from "../ui/ExportButton";

export default function LeadsScreen() {
  const { source, status } = useLocalSearchParams<{
    source?: string;
    status?: string;
  }>();
  return <LeadsWorkspace key={`${source ?? "all"}|${status ?? "all"}`} />;
}

function LeadsWorkspace() {
  const params = useLocalSearchParams<{
    view?: string;
    source?: string;
    status?: string;
  }>();
  const analyticsView =
    params.view === "segments"
      ? "segments"
      : params.view === "funnel"
        ? "funnel"
        : null;
  const { state, period } = useDemo();
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState(() =>
    typeof params.status === "string" &&
    leadStatuses.includes(params.status as never)
      ? params.status
      : "all",
  );
  const [source, setSource] = useState(() =>
    typeof params.source === "string" &&
    sources.includes(params.source as never)
      ? params.source
      : "all",
  );
  const [sort, setSort] = useState("newest");
  const cohort = state.leads.filter((lead) => inPeriod(lead.createdAt, period));
  const filtered = cohort
    .filter(
      (lead) =>
        `${lead.name} ${lead.email}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        (stage === "all" || lead.status === stage) &&
        (source === "all" || lead.source === source),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : b.createdAt.localeCompare(a.createdAt),
    );
  const pagination = usePagination(
    filtered,
    [query, stage, source, sort, period].join("|"),
  );
  const summary = leadSummary(filtered);
  function clear() {
    setQuery("");
    setStage("all");
    setSource("all");
  }
  return (
    <div className="page-stack">
      <PageHeader
        title="Leads management"
        subtitle="Good connections. Clear next steps. Get to know your next customer."
        actions={
          <>
            <PeriodControl />
            <Button onClick={() => setAdding(true)}>
              <Icon name="plus" size={16} />
              Add lead
            </Button>
          </>
        }
      />
      <nav className="subnav" aria-label="Leads views">
        <Link href="/dashboard/leads" asChild>
          <WebAnchor aria-current={!analyticsView ? "page" : undefined}>
            Overview
          </WebAnchor>
        </Link>
        <Link href={"/dashboard/leads?view=segments" as Href} asChild>
          <WebAnchor
            aria-current={analyticsView === "segments" ? "page" : undefined}
          >
            Segments
          </WebAnchor>
        </Link>
        <Link href={"/dashboard/leads?view=funnel" as Href} asChild>
          <WebAnchor
            aria-current={analyticsView === "funnel" ? "page" : undefined}
          >
            Funnel
          </WebAnchor>
        </Link>
      </nav>
      {analyticsView ? (
        <LeadInsights leads={cohort} view={analyticsView} />
      ) : (
        <>
          <div className="metrics-grid three">
            <Metric
              label="Leads acquired"
              value={summary.total}
              detail="Matching leads · acquired in this period"
              icon="users"
              featured
            />
            <Metric
              label="Open opportunities"
              value={summary.open}
              detail="Matching New, Contacted, or Qualified leads"
              icon="trending-up"
            />
            <Metric
              label="Converted leads"
              value={summary.converted}
              detail="Matching acquired leads · first paid purchase"
              icon="user-check"
            />
          </div>
          <Panel
            title="Your connections"
            description="Acquisition dates determine the reporting cohort. Stages show the current position."
            actions={
              <ExportButton
                filename="aster-leads.csv"
                headers={[
                  "Lead ID",
                  "Name",
                  "Email",
                  "Acquisition source",
                  "Origin campaign",
                  "Status",
                  "Acquisition date (UTC)",
                  "Last contact (UTC)",
                  "Notes",
                ]}
                rows={filtered.map((lead) => [
                  lead.id,
                  lead.name,
                  lead.email,
                  lead.source,
                  state.campaigns.find((item) => item.id === lead.campaignId)
                    ?.name ?? "None",
                  lead.status,
                  lead.createdAt,
                  lead.lastContactAt,
                  lead.notes
                    .map((note) => `${note.createdAt}: ${note.text}`)
                    .join("\n"),
                ])}
              />
            }
          >
            <div className="table-toolbar">
              <div className="search-field">
                <Icon name="search" size={16} />
                <input
                  aria-label="Search leads"
                  placeholder="Search name or email…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <select
                aria-label="Filter lead status"
                value={stage}
                onChange={(event) => setStage(event.target.value)}
              >
                <option value="all">All statuses</option>
                {leadStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                aria-label="Filter acquisition source"
                value={source}
                onChange={(event) => setSource(event.target.value)}
              >
                <option value="all">All sources</option>
                {sources.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                aria-label="Sort leads"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="name">Name A–Z</option>
              </select>
              {(query || stage !== "all" || source !== "all") && (
                <Button variant="ghost" onClick={clear}>
                  Clear filters
                </Button>
              )}
            </div>
            {filtered.length ? (
              <>
                <div
                  className="table-scroll"
                  role="region"
                  aria-label="Leads table"
                  tabIndex={0}
                >
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col">Lead</th>
                        <th scope="col">Source</th>
                        <th scope="col">Status</th>
                        <th scope="col">Added</th>
                        <th scope="col">Last contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagination.rows.map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <div className="person-cell">
                              <Initials name={lead.name} />
                              <div>
                                <Link
                                  href={`/dashboard/leads/${lead.id}` as Href}
                                  asChild
                                >
                                  <WebAnchor className="record-link">
                                    {lead.name}
                                  </WebAnchor>
                                </Link>
                                <span className="muted small cell-secondary">
                                  {lead.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{lead.source}</td>
                          <td>
                            <Status value={lead.status} />
                          </td>
                          <td className="muted small">
                            {dateLabel(lead.createdAt)}
                          </td>
                          <td className="muted small">
                            {dateLabel(lead.lastContactAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination {...pagination} noun="leads" />
              </>
            ) : (
              <EmptyState
                title="No leads found"
                action={
                  <Button variant="secondary" onClick={clear}>
                    Clear filters
                  </Button>
                }
              >
                Try a different search, source, status, or reporting period.
              </EmptyState>
            )}
          </Panel>
        </>
      )}
      {adding && <CreateLeadDialog onClose={() => setAdding(false)} />}
    </div>
  );
}
