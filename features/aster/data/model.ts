export const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Lost",
] as const;
export const sources = [
  "Email",
  "Social media",
  "Paid search",
  "Display ads",
  "Organic search",
  "Referral",
] as const;
export type LeadStatus = (typeof leadStatuses)[number];
export type Source = (typeof sources)[number];
export type Period = "7" | "30" | "90" | "all";
export type Note = { id: string; text: string; createdAt: string };
export type Lead = {
  id: string;
  name: string;
  email: string;
  source: Source;
  campaignId?: string;
  status: LeadStatus;
  createdAt: string;
  lastContactAt: string;
  notes: Note[];
};
export type Product = {
  id: string;
  sku: string;
  name: string;
  category: "Headphones" | "Speakers" | "Microphones" | "Accessories";
  kind: "headphones" | "speaker" | "microphone" | "accessory";
  priceCents: number;
  openingStock: number;
  lowStockThreshold: number;
  description: string;
};
export type Campaign = { id: string; name: string; source: Source };
export type BudgetPlan = {
  totalCents: number;
  allocations: Record<Source, number>;
};
export type Transaction = {
  id: string;
  leadId: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
  amountCents: number;
  createdAt: string;
  campaignId?: string;
  operationId?: string;
};
export type DemoState = {
  version: 1;
  initializedAt: string;
  leads: Lead[];
  products: Product[];
  campaigns: Campaign[];
  transactions: Transaction[];
  budgetPlan: BudgetPlan;
};
export type ActionResult<T> =
  { ok: true; value: T } | { ok: false; message: string; field?: string };
export class DemoError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
  }
}
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(cents / 100);
export const shortMoney = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(cents / 100);
export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
export const uniqueId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
export function availableStock(state: DemoState, product: Product) {
  return (
    product.openingStock -
    state.transactions
      .filter((item) => item.productId === product.id)
      .reduce((total, item) => total + item.quantity, 0)
  );
}
export function inPeriod(date: string, period: Period, now = new Date()) {
  if (period === "all") return true;
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - Number(period) + 1);
  return new Date(date) >= start && new Date(date) <= now;
}
