import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { money } from "../data/model";
import { productPerformance, stockLabel } from "../data/product-reports";
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
import { ProductArt } from "./ProductArt";
import { ExportButton } from "../ui/ExportButton";

export default function ProductsScreen() {
  const { view } = useLocalSearchParams<{ view?: string }>();
  const inventory = view === "inventory";
  const { state, period } = useDemo();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [stock, setStock] = useState("all");
  const [sort, setSort] = useState("name");
  const rows = state.products
    .map((product) => productPerformance(state, product, period))
    .filter(
      (item) =>
        `${item.product.name} ${item.product.sku}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        (category === "all" || category === item.product.category) &&
        (!inventory ||
          stock === "all" ||
          (stock === "out"
            ? item.stock === 0
            : stock === "low"
              ? item.stock > 0 && item.stock <= item.product.lowStockThreshold
              : item.stock > item.product.lowStockThreshold)),
    )
    .sort((a, b) =>
      sort === "revenue"
        ? b.revenue - a.revenue
        : a.product.name.localeCompare(b.product.name),
    );
  const pagination = usePagination(
    rows,
    [query, category, stock, sort, period, view].join("|"),
  );
  function clear() {
    setQuery("");
    setCategory("all");
    setStock("all");
  }
  return (
    <div className="page-stack">
      <PageHeader
        title="Products"
        eyebrow="SOUND BUSINESS, GREAT PRODUCTS"
        subtitle="A collection worth listening to. Keep performance and availability in harmony."
        actions={!inventory && <PeriodControl />}
      />
      <nav className="subnav" aria-label="Products views">
        <Link href="/dashboard/products" asChild>
          <WebAnchor aria-current={!inventory ? "page" : undefined}>
            Performance
          </WebAnchor>
        </Link>
        <Link href={"/dashboard/products?view=inventory" as Href} asChild>
          <WebAnchor aria-current={inventory ? "page" : undefined}>
            Inventory
          </WebAnchor>
        </Link>
      </nav>
      <div className="metrics-grid three">
        {inventory ? (
          <>
            <Metric
              label="Units available"
              value={rows.reduce((total, item) => total + item.stock, 0)}
              detail="Current availability · matching products"
              icon="package"
              featured
            />
            <Metric
              label="Low-stock products"
              value={
                rows.filter(
                  (item) =>
                    item.stock > 0 &&
                    item.stock <= item.product.lowStockThreshold,
                ).length
              }
              detail="At or below their stock threshold"
              icon="alert-triangle"
            />
            <Metric
              label="Out of stock"
              value={rows.filter((item) => item.stock === 0).length}
              detail="No units available for a new sale"
              icon="minus-circle"
            />
          </>
        ) : (
          <>
            <Metric
              label="Product revenue"
              value={money(
                rows.reduce((total, item) => total + item.revenue, 0),
              )}
              detail="Paid sales · selected period and products"
              icon="dollar-sign"
              featured
            />
            <Metric
              label="Units sold"
              value={rows.reduce((total, item) => total + item.units, 0)}
              detail="Based on paid transactions"
              icon="shopping-bag"
            />
            <Metric
              label="Products in view"
              value={rows.length}
              detail="Matching your current filters"
              icon="headphones"
            />
          </>
        )}
      </div>
      <Panel
        title={inventory ? "Inventory, at a glance" : "The collection"}
        description={
          inventory
            ? "Current stock is independent of historical reporting periods."
            : "A clearer picture of what your customers are listening to."
        }
        actions={
          <ExportButton
            filename="aster-products.csv"
            headers={[
              "Product ID",
              "SKU",
              "Product",
              "Category",
              "Price (USD)",
              "Current stock (units)",
              "Stock status",
              ...(!inventory
                ? [
                    "Reporting period (UTC)",
                    "Period units sold",
                    "Period revenue (USD)",
                  ]
                : []),
            ]}
            rows={rows.map((item) => [
              item.product.id,
              item.product.sku,
              item.product.name,
              item.product.category,
              (item.product.priceCents / 100).toFixed(2),
              item.stock,
              stockLabel(item.stock, item.product.lowStockThreshold),
              ...(!inventory
                ? [
                    period === "all"
                      ? "All sample data"
                      : `Last ${period} days`,
                    item.units,
                    (item.revenue / 100).toFixed(2),
                  ]
                : []),
            ])}
          />
        }
      >
        <div className="table-toolbar">
          <div className="search-field">
            <Icon name="search" size={16} />
            <input
              aria-label="Search products"
              placeholder="Search product or SKU…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select
            aria-label="Filter product category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {Array.from(
              new Set(state.products.map((item) => item.category)),
            ).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {inventory && (
            <select
              aria-label="Filter stock"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            >
              <option value="all">All stock levels</option>
              <option value="available">In stock</option>
              <option value="low">Low stock</option>
              <option value="out">Out of stock</option>
            </select>
          )}
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="name">Name A–Z</option>
            <option value="revenue">Revenue: high to low</option>
          </select>
          {(query || category !== "all" || stock !== "all") && (
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
              aria-label="Products table"
              tabIndex={0}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Category</th>
                    <th scope="col" className="numeric">
                      Price
                    </th>
                    {inventory ? (
                      <>
                        <th scope="col" className="numeric">
                          Available
                        </th>
                        <th scope="col">Stock status</th>
                      </>
                    ) : (
                      <>
                        <th scope="col" className="numeric">
                          Units sold
                        </th>
                        <th scope="col" className="numeric">
                          Revenue
                        </th>
                        <th scope="col">Availability</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pagination.rows.map((item) => (
                    <tr key={item.product.id}>
                      <td>
                        <div className="person-cell">
                          <ProductArt product={item.product} />
                          <div>
                            <Link
                              href={
                                `/dashboard/products/${item.product.id}` as Href
                              }
                              asChild
                            >
                              <WebAnchor className="record-link">
                                {item.product.name}
                              </WebAnchor>
                            </Link>
                            <span className="cell-secondary muted">
                              {item.product.sku}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{item.product.category}</td>
                      <td className="numeric">
                        {money(item.product.priceCents)}
                      </td>
                      {inventory ? (
                        <>
                          <td className="numeric">{item.stock}</td>
                          <td>
                            <Status
                              value={stockLabel(
                                item.stock,
                                item.product.lowStockThreshold,
                              )}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="numeric">{item.units}</td>
                          <td className="numeric">
                            <strong>{money(item.revenue)}</strong>
                          </td>
                          <td>
                            <Status
                              value={stockLabel(
                                item.stock,
                                item.product.lowStockThreshold,
                              )}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination {...pagination} noun="products" />
          </>
        ) : (
          <EmptyState
            title="No products found"
            action={
              <Button variant="secondary" onClick={clear}>
                Clear filters
              </Button>
            }
          >
            Try a different product, category, or stock level.
          </EmptyState>
        )}
      </Panel>
    </div>
  );
}
