import { inPeriod, type DemoState, type Period } from "./model";

export function revenueTrend(
  state: DemoState,
  period: Period,
  now = new Date(),
) {
  const days =
    period === "all"
      ? Math.max(
          90,
          Math.ceil(
            (now.getTime() - new Date(state.initializedAt).getTime()) /
              86400000,
          ) + 90,
        )
      : Number(period);
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const buckets = Math.min(days, 6);
  const series = Array.from({ length: buckets }, (_, index) => {
    const from = new Date(start);
    from.setUTCDate(from.getUTCDate() + Math.floor((index * days) / buckets));
    const to = new Date(start);
    to.setUTCDate(to.getUTCDate() + Math.floor(((index + 1) * days) / buckets));
    const revenue = state.transactions
      .filter(
        (item) =>
          new Date(item.createdAt) >= from &&
          new Date(item.createdAt) < to &&
          new Date(item.createdAt) <= now,
      )
      .reduce((sum, item) => sum + item.amountCents, 0);
    return { date: from.toISOString(), revenue };
  });
  const current = state.transactions
    .filter((item) => inPeriod(item.createdAt, period, now))
    .reduce((sum, item) => sum + item.amountCents, 0);
  if (period === "all")
    return {
      series,
      comparison: "All sample history · no prior-period comparison",
    };
  const previousStart = new Date(start);
  previousStart.setUTCDate(previousStart.getUTCDate() - days + 1);
  // Compare the same number of complete UTC days, excluding the partial current day.
  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);
  const completeCurrent = state.transactions
    .filter(
      (item) =>
        new Date(item.createdAt) >= start && new Date(item.createdAt) < today,
    )
    .reduce((sum, item) => sum + item.amountCents, 0);
  const previous = state.transactions
    .filter(
      (item) =>
        new Date(item.createdAt) >= previousStart &&
        new Date(item.createdAt) < start,
    )
    .reduce((sum, item) => sum + item.amountCents, 0);
  const comparison = previous
    ? `${((completeCurrent / previous - 1) * 100).toFixed(1)}% vs preceding ${days - 1} complete days (UTC)`
    : "No prior-period revenue to compare";
  return { series, comparison, current };
}
