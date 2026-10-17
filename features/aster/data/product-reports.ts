import {
  availableStock,
  inPeriod,
  type DemoState,
  type Period,
  type Product,
} from "./model";

export function productPerformance(
  state: DemoState,
  product: Product,
  period: Period,
) {
  const sales = state.transactions.filter(
    (item) => item.productId === product.id && inPeriod(item.createdAt, period),
  );
  return {
    product,
    stock: availableStock(state, product),
    revenue: sales.reduce((sum, item) => sum + item.amountCents, 0),
    units: sales.reduce((sum, item) => sum + item.quantity, 0),
    sales,
  };
}
export function stockLabel(stock: number, threshold: number) {
  return stock === 0
    ? "Out of stock"
    : stock <= threshold
      ? "Low stock"
      : "In stock";
}
