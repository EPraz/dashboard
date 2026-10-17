import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, type Href } from "expo-router";
import { useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { dateLabel, inPeriod, money } from "../data/model";
import { Icon } from "../ui/Icon";
import { PeriodControl } from "../ui/PeriodControl";
import {
  Button,
  EmptyState,
  Metric,
  PageHeader,
  Panel,
  Status,
} from "../ui/primitives";
import { Pagination, usePagination } from "../ui/table";
import { ExportButton } from "../ui/ExportButton";

export default function TransactionsScreen() {
  const { state, period } = useDemo();
  const [query, setQuery] = useState("");
  const [productId, setProductId] = useState("all");
  const [sort, setSort] = useState("newest");
  const rows = state.transactions
    .map((item) => ({
      ...item,
      buyer: state.leads.find((lead) => lead.id === item.leadId)!,
      product: state.products.find((product) => product.id === item.productId)!,
    }))
    .filter(
      (item) =>
        inPeriod(item.createdAt, period) &&
        `${item.id} ${item.buyer.name} ${item.product.name}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        (productId === "all" || productId === item.productId),
    )
    .sort((a, b) =>
      sort === "amount"
        ? b.amountCents - a.amountCents
        : b.createdAt.localeCompare(a.createdAt) ||
          b.id.localeCompare(a.id, undefined, { numeric: true }),
    );
  const pagination = usePagination(
    rows,
    [query, productId, sort, period].join("|"),
  );
  const clear = () => {
    setQuery("");
    setProductId("all");
  };
  return (
    <div className="page-stack">
      <PageHeader
        title="Transactions"
        subtitle="Every purchase has a story. Here is the complete picture."
        eyebrow="FROM CONNECTION TO CUSTOMER"
        actions={<PeriodControl />}
      />
      <div className="metrics-grid three">
        <Metric
          label="Paid revenue"
          value={money(
            rows.reduce((total, item) => total + item.amountCents, 0),
          )}
          detail="Matching purchases · selected sale dates"
          icon="dollar-sign"
          featured
        />
        <Metric
          label="Transactions"
          value={rows.length}
          detail="Paid sample purchases in view"
          icon="credit-card"
        />
        <Metric
          label="Units sold"
          value={rows.reduce((total, item) => total + item.quantity, 0)}
          detail="Across matching paid transactions"
          icon="package"
        />
      </div>
      <Panel
        title="The sales ledger"
        description="All purchases are fictional, paid transactions. No real payment is taken."
        actions={
          <ExportButton
            filename="aster-transactions.csv"
            headers={[
              "Reference",
              "Buyer",
              "Buyer email",
              "Product",
              "SKU",
              "Quantity",
              "Unit price (USD)",
              "Amount (USD)",
              "Sale date (UTC)",
              "Origin campaign",
              "Status",
            ]}
            rows={rows.map((item) => [
              item.id,
              item.buyer.name,
              item.buyer.email,
              item.product.name,
              item.product.sku,
              item.quantity,
              (item.unitPriceCents / 100).toFixed(2),
              (item.amountCents / 100).toFixed(2),
              item.createdAt,
              state.campaigns.find(
                (campaign) => campaign.id === item.campaignId,
              )?.name ?? "None",
              "Paid",
            ])}
          />
        }
      >
        <div className="table-toolbar">
          <div className="search-field">
            <Icon name="search" size={16} />
            <input
              aria-label="Search transactions"
              placeholder="Search reference, customer, or product…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select
            aria-label="Filter transaction product"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
          >
            <option value="all">All products</option>
            {state.products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            aria-label="Sort transactions"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="amount">Amount: high to low</option>
          </select>
          {(query || productId !== "all") && (
            <Button variant="ghost" onClick={clear}>
              Clear filters
            </Button>
          )}
        </div>
        {rows.length ? (
          <>
            <div
              className="table-scroll"
              role="region"
              aria-label="Transactions table"
              tabIndex={0}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Reference</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col" className="numeric">
                      Qty
                    </th>
                    <th scope="col" className="numeric">
                      Amount
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pagination.rows.map((item) => (
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
                        <Link
                          href={`/dashboard/leads/${item.leadId}` as Href}
                          asChild
                        >
                          <WebAnchor className="record-link">
                            {item.buyer.name}
                          </WebAnchor>
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`/dashboard/products/${item.productId}` as Href}
                          asChild
                        >
                          <WebAnchor>{item.product.name}</WebAnchor>
                        </Link>
                      </td>
                      <td className="numeric">{item.quantity}</td>
                      <td className="numeric">
                        <strong>{money(item.amountCents)}</strong>
                      </td>
                      <td className="muted small">
                        {dateLabel(item.createdAt)}
                      </td>
                      <td>
                        <Status value="Paid" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination {...pagination} noun="transactions" />
          </>
        ) : (
          <EmptyState
            title="No transactions found"
            action={
              <Button variant="secondary" onClick={clear}>
                Clear filters
              </Button>
            }
          >
            Try another search, product, or sale-date reporting period.
          </EmptyState>
        )}
      </Panel>
    </div>
  );
}
