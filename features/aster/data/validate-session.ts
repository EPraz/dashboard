import { leadStatuses, sources, type DemoState } from "./model";
import { initialBudget, validateBudget } from "./budget";

type RecordValue = Record<string, unknown>;
const object = (value: unknown): value is RecordValue =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;
const date = (value: unknown) =>
  text(value) && Number.isFinite(Date.parse(value));
const integer = (value: unknown) =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const unique = (values: { id: string }[]) =>
  new Set(values.map((item) => item.id)).size === values.length;

export function validateSession(value: unknown): DemoState {
  const invalid = () => {
    throw new Error("The saved demo is unreadable or inconsistent.");
  };
  if (!object(value) || value.version !== 1 || !date(value.initializedAt))
    return invalid();
  for (const key of ["leads", "products", "campaigns", "transactions"])
    if (!Array.isArray(value[key])) return invalid();
  const lists = value as Record<string, unknown[]>;
  for (const item of lists.campaigns)
    if (
      !object(item) ||
      !text(item.id) ||
      !text(item.name) ||
      !sources.includes(item.source as never)
    )
      return invalid();
  for (const item of lists.products) {
    if (
      !object(item) ||
      !["id", "sku", "name", "description"].every((key) => text(item[key])) ||
      !integer(item.priceCents) ||
      Number(item.priceCents) <= 0 ||
      !integer(item.openingStock) ||
      !integer(item.lowStockThreshold) ||
      !["Headphones", "Speakers", "Microphones", "Accessories"].includes(
        String(item.category),
      ) ||
      !["headphones", "speaker", "microphone", "accessory"].includes(
        String(item.kind),
      )
    )
      return invalid();
  }
  for (const item of lists.leads) {
    if (
      !object(item) ||
      !text(item.id) ||
      !text(item.name) ||
      !text(item.email) ||
      !sources.includes(item.source as never) ||
      !leadStatuses.includes(item.status as never) ||
      !date(item.createdAt) ||
      !date(item.lastContactAt) ||
      !Array.isArray(item.notes)
    )
      return invalid();
    for (const note of item.notes)
      if (
        !object(note) ||
        !text(note.id) ||
        !text(note.text) ||
        !date(note.createdAt)
      )
        return invalid();
  }
  for (const item of lists.transactions)
    if (
      !object(item) ||
      !text(item.id) ||
      !text(item.leadId) ||
      !text(item.productId) ||
      !integer(item.quantity) ||
      Number(item.quantity) <= 0 ||
      !integer(item.unitPriceCents) ||
      !integer(item.amountCents) ||
      !date(item.createdAt) ||
      item.amountCents !== Number(item.quantity) * Number(item.unitPriceCents)
    )
      return invalid();
  const state = value as unknown as DemoState;
  // Older local sessions predate the planner; preserve their commercial records.
  if (value.budgetPlan === undefined) state.budgetPlan = initialBudget();
  if (!object(state.budgetPlan) || !object(state.budgetPlan.allocations))
    return invalid();
  try {
    validateBudget(state.budgetPlan);
  } catch {
    return invalid();
  }
  if (
    ![state.leads, state.products, state.campaigns, state.transactions].every(
      (items) => unique(items),
    )
  )
    return invalid();
  for (const lead of state.leads) {
    const campaign = state.campaigns.find(
      (item) => item.id === lead.campaignId,
    );
    if (
      lead.campaignId !== undefined &&
      (!campaign || campaign.source !== lead.source)
    )
      return invalid();
    if (
      (lead.status === "Converted") !==
      state.transactions.some((item) => item.leadId === lead.id)
    )
      return invalid();
  }
  for (const transaction of state.transactions) {
    const buyer = state.leads.find((item) => item.id === transaction.leadId);
    if (
      !buyer ||
      !state.products.some((item) => item.id === transaction.productId) ||
      buyer.campaignId !== transaction.campaignId ||
      transaction.createdAt < buyer.createdAt
    )
      return invalid();
  }
  for (const product of state.products)
    if (
      state.transactions
        .filter((item) => item.productId === product.id)
        .reduce((total, item) => total + item.quantity, 0) >
      product.openingStock
    )
      return invalid();
  return state;
}
