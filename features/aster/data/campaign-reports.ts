import { inPeriod, type Campaign, type DemoState, type Period } from "./model";
import { leadSummary } from "./lead-reports";

export function campaignReport(
  state: DemoState,
  campaign: Campaign,
  period: Period,
) {
  const leads = state.leads.filter(
    (item) =>
      item.campaignId === campaign.id && inPeriod(item.createdAt, period),
  );
  const purchases = state.transactions.filter(
    (item) =>
      item.campaignId === campaign.id && inPeriod(item.createdAt, period),
  );
  return {
    campaign,
    ...leadSummary(leads),
    purchases: purchases.length,
    revenue: purchases.reduce((sum, item) => sum + item.amountCents, 0),
  };
}
