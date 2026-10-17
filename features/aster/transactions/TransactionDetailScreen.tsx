import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useDemo } from "../data/DemoProvider";
import { dateLabel, money } from "../data/model";
import { Icon } from "../ui/Icon";
import { Metric, PageHeader, Panel, Status } from "../ui/primitives";
import { RecordNotFound } from "../ui/RecordNotFound";
import { ProductArt } from "../products/ProductArt";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useDemo();
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction)
    return (
      <RecordNotFound entity="Transaction" path="/dashboard/transactions" />
    );
  const buyer = state.leads.find((item) => item.id === transaction.leadId)!;
  const product = state.products.find(
    (item) => item.id === transaction.productId,
  )!;
  const campaign = state.campaigns.find(
    (item) => item.id === transaction.campaignId,
  );
  return (
    <div className="page-stack">
      <div>
        <Link href="/dashboard/transactions" asChild>
          <WebAnchor className="back-link">
            <Icon name="arrow-left" size={15} />
            Back to transactions
          </WebAnchor>
        </Link>
      </div>
      <PageHeader
        title={transaction.id}
        subtitle={`Recorded ${dateLabel(transaction.createdAt)} · A fictional paid purchase`}
        eyebrow="A CONNECTION BECAME A SALE"
        actions={<Status value="Paid" />}
      />
      <div className="metrics-grid two">
        <Metric
          label="Sale amount"
          value={money(transaction.amountCents)}
          detail="USD · paid sample transaction"
          icon="dollar-sign"
          featured
        />
        <Metric
          label="Quantity"
          value={transaction.quantity}
          detail="Units in this purchase"
          icon="shopping-bag"
        />
      </div>
      <div className="detail-grid">
        <Panel title="Purchase details">
          <div className="person-cell">
            <ProductArt product={product} />
            <div>
              <Link href={`/dashboard/products/${product.id}` as Href} asChild>
                <WebAnchor className="record-link">{product.name}</WebAnchor>
              </Link>
              <p className="muted small">{product.sku}</p>
            </div>
          </div>
          <dl className="details-list">
            <div>
              <dt>Unit price at purchase</dt>
              <dd>{money(transaction.unitPriceCents)}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{transaction.quantity}</dd>
            </div>
            <div>
              <dt>Paid total</dt>
              <dd>{money(transaction.amountCents)}</dd>
            </div>
          </dl>
          <p className="info-note">
            No payment was taken. This sample purchase is reflected in local
            inventory and reporting.
          </p>
        </Panel>
        <Panel title="Customer & attribution">
          <dl className="details-list">
            <div>
              <dt>Customer</dt>
              <dd>
                <Link href={`/dashboard/leads/${buyer.id}` as Href} asChild>
                  <WebAnchor className="record-link">{buyer.name}</WebAnchor>
                </Link>
              </dd>
            </div>
            <div>
              <dt>Acquisition source</dt>
              <dd>{buyer.source}</dd>
            </div>
            <div>
              <dt>Origin campaign</dt>
              <dd>{campaign?.name ?? "No campaign · unattributed"}</dd>
            </div>
            <div>
              <dt>Recorded</dt>
              <dd>{dateLabel(transaction.createdAt)}</dd>
            </div>
          </dl>
          <p className="info-note">
            Purchases are attributed to the customer’s origin campaign,
            including repeat purchases. Only the first paid purchase counts as a
            conversion.
          </p>
        </Panel>
      </div>
    </div>
  );
}
