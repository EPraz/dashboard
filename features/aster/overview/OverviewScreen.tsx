import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, type Href } from "expo-router";
import { useDemo } from "../data/DemoProvider";
import { leadSummary } from "../data/lead-reports";
import { campaignReport } from "../data/campaign-reports";
import { availableStock, dateLabel, inPeriod, money } from "../data/model";
import { revenueTrend } from "../data/overview-reports";
import { productPerformance } from "../data/product-reports";
import { ProductArt } from "../products/ProductArt";
import { PeriodControl } from "../ui/PeriodControl";
import {
  EmptyState,
  Metric,
  PageHeader,
  Panel,
  Status,
} from "../ui/primitives";
import { RevenueChart } from "./RevenueChart";

export default function OverviewScreen() {
  const { state, period } = useDemo();
  const sales = state.transactions
    .filter((item) => inPeriod(item.createdAt, period))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const revenue = sales.reduce((sum, item) => sum + item.amountCents, 0);
  const cohort = leadSummary(
    state.leads.filter((item) => inPeriod(item.createdAt, period)),
  );
  const trend = revenueTrend(state, period);
  const products = state.products
    .map((product) => productPerformance(state, product, period))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);
  const low = state.products.filter(
    (item) => availableStock(state, item) <= item.lowStockThreshold,
  ).length;
  const leadingCampaign = state.campaigns
    .map((campaign) => campaignReport(state, campaign, period))
    .sort((a, b) => b.revenue - a.revenue)[0];
  return (
    <div className="page-stack">
      <PageHeader
        title="Your business, in harmony."
        subtitle="A little clarity for your next big move. Here’s how Aster Audio is doing."
        actions={<PeriodControl />}
      />
      <div className="metrics-grid">
        <Metric
          label="Paid revenue"
          value={money(revenue)}
          detail="Purchases by sale date · selected period"
          featured
          icon="dollar-sign"
        />
        <Metric
          label="Purchases"
          value={sales.length}
          detail={`${sales.reduce((sum, item) => sum + item.quantity, 0)} units sold · includes repeat purchases`}
          icon="shopping-bag"
        />
        <Metric
          label="Leads acquired"
          value={cohort.total}
          detail="By acquisition date · selected period"
          icon="users"
        />
        <Metric
          label="Cohort conversion"
          value={cohort.rate}
          detail={`${cohort.converted} acquired leads have made a first purchase`}
          icon="user-check"
        />
      </div>
      <div className="overview-grid">
        <Panel
          title="The sound of progress"
          description={trend.comparison}
          actions={
            <span className="chart-legend">
              <span className="live-dot" />
              Paid revenue
            </span>
          }
        >
          <RevenueChart series={trend.series} />
        </Panel>
        <Panel
          title="A few things to know"
          description="Keep the next step in sight."
        >
          <div className="overview-note">
            <span className="eyebrow">YOUR PIPELINE</span>
            <strong>{cohort.open} open opportunities</strong>
            <p className="muted small">
              New, Contacted, and Qualified leads acquired in this period.
            </p>
            <Link href="/dashboard/leads" asChild>
              <WebAnchor className="insight-link">
                Explore your leads ↗
              </WebAnchor>
            </Link>
          </div>
          <div
            className="overview-note"
            role="group"
            aria-label="Leading campaign"
          >
            <span className="eyebrow">CAMPAIGN SPOTLIGHT</span>
            <h3>
              {leadingCampaign?.revenue
                ? leadingCampaign.campaign.name
                : "No attributed purchases"}
            </h3>
            <p className="muted small">
              <strong>{money(leadingCampaign?.revenue ?? 0)}</strong> attributed
              revenue · selected sale dates.
            </p>
            <Link href="/dashboard/campaign" asChild>
              <WebAnchor className="insight-link">
                Compare campaign results
              </WebAnchor>
            </Link>
          </div>
        </Panel>
      </div>
      <div className="overview-grid">
        <Panel
          title="Recent purchases"
          description="Sale dates · selected reporting period"
          actions={
            <Link href="/dashboard/transactions" asChild>
              <WebAnchor className="record-link small">
                View all transactions
              </WebAnchor>
            </Link>
          }
        >
          {sales.length ? (
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Recent purchases"
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Transaction</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Link
                          href={`/dashboard/transactions/${item.id}` as Href}
                          asChild
                        >
                          <WebAnchor className="record-link">
                            {item.id}
                          </WebAnchor>
                        </Link>
                      </td>
                      <td>
                        {
                          state.leads.find((lead) => lead.id === item.leadId)
                            ?.name
                        }
                      </td>
                      <td className="muted small">
                        {dateLabel(item.createdAt)}
                      </td>
                      <td>{money(item.amountCents)}</td>
                      <td>
                        <Status value="Paid" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="No purchases in this period">
              Record a demo sale from a lead, or select a wider reporting
              period.
            </EmptyState>
          )}
        </Panel>
        <Panel
          title="Products in the spotlight"
          description="Ranked by paid revenue in this period"
          actions={
            <Link href="/dashboard/products" asChild>
              <WebAnchor className="record-link small">
                All products ↗
              </WebAnchor>
            </Link>
          }
        >
          <ol className="spotlight-list">
            {products.map((item) => (
              <li key={item.product.id}>
                <ProductArt product={item.product} />
                <div>
                  <Link
                    href={`/dashboard/products/${item.product.id}` as Href}
                    asChild
                  >
                    <WebAnchor className="record-link">
                      {item.product.name}
                    </WebAnchor>
                  </Link>
                  <p className="muted small">
                    {item.units} units sold · {item.stock} available now
                  </p>
                </div>
                <strong>{money(item.revenue)}</strong>
              </li>
            ))}
          </ol>
          <p className="info-note">
            Current inventory · {low} products need attention.
            <br />
            <Link href={"/dashboard/products?view=inventory" as Href} asChild>
              <WebAnchor className="insight-link">Check inventory ↗</WebAnchor>
            </Link>
          </p>
        </Panel>
      </div>
      <p className="muted small">
        Revenue uses sale dates. Acquisition and cohort conversion use leads
        acquired in the selected period and their current first-purchase
        outcome. All figures are fictional, in USD.{" "}
        <Link href="/dashboard/help" asChild>
          <WebAnchor className="record-link">See the demo guide ↗</WebAnchor>
        </Link>
      </p>
    </div>
  );
}
