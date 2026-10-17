import { sources, leadStatuses, type Lead } from "./model";

export function leadSummary(leads: Lead[]) {
  const converted = leads.filter((item) => item.status === "Converted").length;
  return {
    total: leads.length,
    converted,
    open: leads.filter((item) => !["Converted", "Lost"].includes(item.status))
      .length,
    rate: leads.length
      ? `${((converted / leads.length) * 100).toFixed(1)}%`
      : "—",
  };
}
export function acquisitionSegments(leads: Lead[]) {
  return sources.map((source) => ({
    source,
    ...leadSummary(leads.filter((item) => item.source === source)),
  }));
}
export function stageDistribution(leads: Lead[]) {
  return leadStatuses.map((status) => {
    const count = leads.filter((item) => item.status === status).length;
    return {
      status,
      count,
      share: leads.length ? (count / leads.length) * 100 : 0,
    };
  });
}
