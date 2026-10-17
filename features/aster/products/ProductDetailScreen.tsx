import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams } from "expo-router";
import { useDemo } from "../data/DemoProvider";
import { dateLabel, money } from "../data/model";
import { productPerformance, stockLabel } from "../data/product-reports";
import { Icon } from "../ui/Icon";
import { PeriodControl } from "../ui/PeriodControl";
import { Metric, PageHeader, Panel, Status } from "../ui/primitives";
import { RecordNotFound } from "../ui/RecordNotFound";
import { ProductArt } from "./ProductArt";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, period } = useDemo();
  const product = state.products.find((item) => item.id === id);
  if (!product)
    return <RecordNotFound entity="Product" path="/dashboard/products" />;
  const report = productPerformance(state, product, period);
  return (
    <div className="page-stack">
      <div>
        <Link href="/dashboard/products" asChild>
          <WebAnchor className="back-link">
            <Icon name="arrow-left" size={15} />
            Back to products
          </WebAnchor>
        </Link>
      </div>
      <PageHeader
        title={product.name}
        eyebrow={`${product.category.toUpperCase()} · ${product.sku}`}
        subtitle={product.description}
        actions={<PeriodControl />}
      />
      <div className="detail-grid">
        <Panel>
          <ProductArt product={product} large />
          <div className="product-description">
            <h2>{product.name}</h2>
            <p className="muted">{product.description}</p>
            <strong className="product-price">
              {money(product.priceCents)}{" "}
              <span className="small muted">USD retail price</span>
            </strong>
            <Status
              value={stockLabel(report.stock, product.lowStockThreshold)}
            />
          </div>
        </Panel>
        <div className="page-stack">
          <div className="metrics-grid two">
            <Metric
              label="Units available"
              value={report.stock}
              detail={
                report.stock === 0
                  ? "No units available"
                  : "Current inventory · ready for a demo sale"
              }
              icon="package"
              featured
            />
            <Metric
              label="Units sold"
              value={report.units}
              detail="Paid transactions · selected period"
              icon="shopping-bag"
            />
          </div>
          <Panel title="Performance in this period">
            <dl className="details-list">
              <div>
                <dt>Paid revenue</dt>
                <dd>{money(report.revenue)}</dd>
              </div>
              <div>
                <dt>Purchases</dt>
                <dd>{report.sales.length}</dd>
              </div>
              <div>
                <dt>Low-stock threshold</dt>
                <dd>{product.lowStockThreshold} units</dd>
              </div>
            </dl>
            <p className="info-note">
              Record a demo sale from a lead’s details. Product availability is
              checked before the purchase is recorded.
            </p>
          </Panel>
        </div>
      </div>
      <Panel
        title="Recent product purchases"
        description="Based on sale dates in the selected reporting period."
      >
        {report.sales.length ? (
          <ul className="activity-list">
            {[...report.sales]
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(0, 6)
              .map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>
                      {
                        state.leads.find((lead) => lead.id === item.leadId)
                          ?.name
                      }
                    </strong>
                    <p className="muted small">
                      {item.id} · {dateLabel(item.createdAt)} · Qty{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <strong>{money(item.amountCents)}</strong>
                </li>
              ))}
          </ul>
        ) : (
          <p className="muted small">
            No paid purchases for this product in the selected period.
          </p>
        )}
      </Panel>
    </div>
  );
}
