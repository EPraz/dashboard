import { DemoError, sources, type BudgetPlan } from "./model";

export function initialBudget(): BudgetPlan {
  return {
    totalCents: 100000,
    allocations: {
      Email: 25,
      "Social media": 25,
      "Paid search": 25,
      "Display ads": 15,
      "Organic search": 5,
      Referral: 5,
    },
  };
}
export function validateBudget(plan: BudgetPlan) {
  if (
    !Number.isSafeInteger(plan.totalCents) ||
    plan.totalCents <= 0 ||
    plan.totalCents > 10000000000
  )
    throw new DemoError(
      "Enter a positive budget up to USD 100,000,000, with at most two decimal places.",
    );
  const values = sources.map((source) => plan.allocations[source]);
  if (
    values.some(
      (value) =>
        !Number.isFinite(value) ||
        value < 0 ||
        value > 100 ||
        Math.abs(value * 100 - Math.round(value * 100)) > 0.000001,
    )
  )
    throw new DemoError(
      "Each allocation must be between 0% and 100%, with at most two decimal places.",
    );
  if (Math.abs(values.reduce((sum, value) => sum + value, 0) - 100) > 0.000001)
    throw new DemoError(
      "Allocations must total 100% before you can save the plan.",
    );
}
export function allocatedAmounts(plan: BudgetPlan) {
  const amounts = sources.map((source) => ({
    source,
    raw: (plan.totalCents * plan.allocations[source]) / 100,
  }));
  const remainder =
    plan.totalCents -
    amounts.reduce((sum, item) => sum + Math.floor(item.raw), 0);
  const ranked = [...amounts]
    .sort((a, b) => (b.raw % 1) - (a.raw % 1))
    .slice(0, remainder)
    .map((item) => item.source);
  return Object.fromEntries(
    amounts.map((item) => [
      item.source,
      Math.floor(item.raw) + (ranked.includes(item.source) ? 1 : 0),
    ]),
  ) as Record<(typeof sources)[number], number>;
}
