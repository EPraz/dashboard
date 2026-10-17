import {
  availableStock,
  DemoError,
  type DemoState,
  type Transaction,
} from "./model";

export type SaleInput = {
  leadId: string;
  productId: string;
  quantity: number;
  operationId: string;
};
export function recordSale(state: DemoState, input: SaleInput, now: string) {
  const existing = state.transactions.find(
    (item) => item.operationId === input.operationId,
  );
  if (existing) return { state, value: existing };
  const lead = state.leads.find((item) => item.id === input.leadId);
  if (!lead) throw new DemoError("This lead could not be found.");
  const product = state.products.find((item) => item.id === input.productId);
  if (!product)
    throw new DemoError("Choose a product for this sale.", "productId");
  if (!Number.isSafeInteger(input.quantity) || input.quantity <= 0)
    throw new DemoError(
      "Choose a whole-number quantity greater than zero.",
      "quantity",
    );
  const stock = availableStock(state, product);
  if (input.quantity > stock)
    throw new DemoError(
      `Only ${stock} units are available. Choose a smaller quantity or another product.`,
      "quantity",
    );
  const amountCents = input.quantity * product.priceCents;
  if (!Number.isSafeInteger(amountCents))
    throw new DemoError(
      "This amount exceeds the supported demo range.",
      "quantity",
    );
  const nextNumber =
    Math.max(
      1000,
      ...state.transactions
        .map((item) => Number(item.id.replace("AST-", "")))
        .filter(Number.isFinite),
    ) + 1;
  const transaction: Transaction = {
    id: `AST-${nextNumber}`,
    leadId: lead.id,
    productId: product.id,
    unitPriceCents: product.priceCents,
    quantity: input.quantity,
    amountCents,
    createdAt: now,
    campaignId: lead.campaignId,
    operationId: input.operationId,
  };
  return {
    state: {
      ...state,
      transactions: [transaction, ...state.transactions],
      leads: state.leads.map((item) =>
        item.id === lead.id
          ? { ...item, status: "Converted" as const, lastContactAt: now }
          : item,
      ),
    },
    value: transaction,
  };
}
