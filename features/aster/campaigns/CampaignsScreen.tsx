import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { campaignReport } from "../data/campaign-reports";
import { inPeriod, money, sources } from "../data/model";
import { PeriodControl } from "../ui/PeriodControl";
import { EmptyState, Metric, PageHeader, Panel } from "../ui/primitives";
import { BudgetPlanner } from "./BudgetPlanner";

export default function CampaignsScreen() {
  const { state, period } = useDemo();
  const { view } = useLocalSearchParams<{ view?: string }>();
  const planning = view === "budget";
  const [source, setSource] = useState("all");
  const reports = state.campaigns
    .filter((item) => source === "all" || item.source === source)
    .map((item) => campaignReport(state, item, period));
  const unattributed = state.transactions
    .filter((item) => !item.campaignId && inPeriod(item.createdAt, period))
    .reduce((sum, item) => sum + item.amountCents, 0);
  const attributed = state.transactions
    .filter((item) => item.campaignId && inPeriod(item.createdAt, period))
    .reduce((sum, item) => sum + item.amountCents, 0);
  return (
    <div className="page-stack">
      <PageHeader
        title="Campaign performance"
        subtitle="Follow the connections between your marketing and the music."
        actions={!planning && <PeriodControl />}
      />
      <nav className="subnav" aria-label="Campaign views">
        <Link href="/dashboard/campaign" asChild>
          <WebAnchor aria-current={!planning ? "page" : undefined}>
            Overview
          </WebAnchor>
        </Link>
        <Link href={"/dashboard/campaign?view=budget" as Href} asChild>
          <WebAnchor aria-current={planning ? "page" : undefined}>
            Budget planner
          </WebAnchor>
        </Link>
      </nav>
      {planning ? (
        <BudgetPlanner />
      ) : (
        <>
          <div className="metrics-grid three">
            <Metric
              label="Campaign revenue"
              value={money(
                reports.reduce((sum, item) => sum + item.revenue, 0),
              )}
              detail="Matching campaigns · purchases in this period"
              featured
              icon="trending-up"
            />
            <Metric
              label="All attributed revenue"
              value={money(attributed)}
              detail="All origin campaigns · purchases in this period"
            />
            <Metric
              label="Unattributed revenue"
              value={money(unattributed)}
              detail="No origin campaign · still included in total revenue"
            />
          </div>
          <Panel
            title="A clearer picture"
            description="Lead counts use acquisition dates. Revenue and purchases use sale dates."
          >
            <div className="table-toolbar">
              <select
                aria-label="Filter campaign source"
                value={source}
                onChange={(event) => setSource(event.target.value)}
              >
                <option value="all">All sources</option>
                {sources.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            {reports.length ? (
              <div
                className="table-scroll"
                role="region"
                aria-label="Campaign results"
                tabIndex={0}
              >
                <table className="data-table">
                  <thead>
                    <tr>
                      {[
                        "Campaign",
                        "Acquisition source",
                        "Acquired leads",
                        "Converted leads",
                        "Cohort conversion",
                        "Purchases",
                        "Attributed revenue",
                      ].map((item) => (
                        <th scope="col" key={item}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((item) => (
                      <tr key={item.campaign.id}>
                        <td>
                          <strong>{item.campaign.name}</strong>
                        </td>
                        <td>{item.campaign.source}</td>
                        <td>{item.total}</td>
                        <td>{item.converted}</td>
                        <td>{item.rate}</td>
                        <td>{item.purchases}</td>
                        <td>{money(item.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No campaigns for this source">
                Choose another acquisition source to compare results.
              </EmptyState>
            )}
          </Panel>
          <Panel
            title="How attribution works"
            description="One origin. Every purchase."
          >
            <p className="muted">
              Revenue belongs to the buyer’s origin campaign, including repeat
              purchases. Acquisition source describes the channel; the optional
              origin campaign identifies the initiative that acquired the lead.
              Conversion counts a customer once, after their first paid
              purchase.
            </p>
            <p className="muted small">
              All attributed revenue plus unattributed revenue equals{" "}
              {money(attributed + unattributed)} in overall paid revenue for
              this period. Cohort conversion describes the current outcome of
              leads acquired in the period, even when their purchase happened
              later. Budget proposals never change these results.
            </p>
          </Panel>
        </>
      )}
    </div>
  );
}
