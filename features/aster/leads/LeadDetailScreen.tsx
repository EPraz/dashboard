import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useState, type FormEvent } from "react";
import { useDemo } from "../data/DemoProvider";
import { dateLabel, money, type LeadStatus } from "../data/model";
import { Icon } from "../ui/Icon";
import {
  Button,
  Field,
  Initials,
  PageHeader,
  Panel,
  Status,
} from "../ui/primitives";
import { RecordNotFound } from "../ui/RecordNotFound";
import { RecordSaleDialog } from "./RecordSaleDialog";

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const demo = useDemo();
  const lead = demo.state.leads.find((item) => item.id === id);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [selling, setSelling] = useState(false);
  if (!lead) return <RecordNotFound entity="Lead" path="/dashboard/leads" />;
  const campaign = demo.state.campaigns.find(
    (item) => item.id === lead.campaignId,
  );
  const purchases = demo.state.transactions
    .filter((item) => item.leadId === lead.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  function addNote(event: FormEvent) {
    event.preventDefault();
    const result = demo.addNote(id, note);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError("");
    setNote("");
  }
  return (
    <div className="page-stack">
      <div>
        <Link href="/dashboard/leads" asChild>
          <WebAnchor className="back-link">
            <Icon name="arrow-left" size={15} />
            Back to leads
          </WebAnchor>
        </Link>
      </div>
      <PageHeader
        title={lead.name}
        subtitle={lead.email}
        eyebrow="A CONNECTION WORTH KEEPING"
        actions={
          <Button onClick={() => setSelling(true)}>
            <Icon name="shopping-bag" size={16} />
            Record demo sale
          </Button>
        }
      />
      {selling && (
        <RecordSaleDialog lead={lead} onClose={() => setSelling(false)} />
      )}
      <div className="detail-grid">
        <div className="page-stack">
          <Panel title="Lead profile">
            <div className="profile-summary">
              <Initials name={lead.name} large />
              <div>
                <h3>{lead.name}</h3>
                <p className="muted small">
                  {lead.status === "Converted"
                    ? "Customer since first purchase"
                    : "Potential customer · Audio store"}
                </p>
                <Status value={lead.status} />
              </div>
            </div>
            <dl className="details-list">
              <div>
                <dt>Email</dt>
                <dd>{lead.email}</dd>
              </div>
              <div>
                <dt>Acquisition source</dt>
                <dd>{lead.source}</dd>
              </div>
              <div>
                <dt>Origin campaign</dt>
                <dd>{campaign?.name ?? "No campaign"}</dd>
              </div>
              <div>
                <dt>Added</dt>
                <dd>{dateLabel(lead.createdAt)}</dd>
              </div>
              <div>
                <dt>Last contact</dt>
                <dd>{dateLabel(lead.lastContactAt)}</dd>
              </div>
            </dl>
            {lead.status === "Converted" ? (
              <p className="info-note">
                Converted through a paid sale. Further purchases count toward
                revenue, not another conversion.
              </p>
            ) : (
              <Field id="detail-lead-status" label="Lead status">
                <select
                  id="detail-lead-status"
                  value={lead.status}
                  onChange={(event) => {
                    const result = demo.setStatus(
                      id,
                      event.target.value as LeadStatus,
                    );
                    if (!result.ok) setError(result.message);
                  }}
                >
                  {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </Field>
            )}
          </Panel>
          <Panel
            title="Purchase history"
            description="Only paid purchases are shown."
          >
            {purchases.length ? (
              <ul className="activity-list">
                {purchases.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>
                        {
                          demo.state.products.find(
                            (product) => product.id === item.productId,
                          )?.name
                        }
                      </strong>
                      <p className="muted small">
                        <Link
                          href={`/dashboard/transactions/${item.id}` as Href}
                          asChild
                        >
                          <WebAnchor className="record-link">
                            {item.id}
                          </WebAnchor>
                        </Link>{" "}
                        · {dateLabel(item.createdAt)} · Qty {item.quantity}
                      </p>
                    </div>
                    <strong>{money(item.amountCents)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small">
                No purchases yet. This lead has not converted.
              </p>
            )}
          </Panel>
        </div>
        <Panel
          title="Follow-up notes"
          description="A little context for the next conversation."
        >
          <form className="form-stack" onSubmit={addNote}>
            <Field id="new-lead-note" label="New note" error={error}>
              <textarea
                id="new-lead-note"
                value={note}
                maxLength={2000}
                rows={4}
                aria-invalid={!!error}
                aria-describedby={error ? "new-lead-note-error" : undefined}
                onChange={(event) => setNote(event.target.value)}
                placeholder="What would be useful to remember?"
              />
            </Field>
            <div>
              <Button type="submit">
                <Icon name="plus" size={15} />
                Add note
              </Button>
            </div>
          </form>
          <div className="note-list">
            {lead.notes.length ? (
              lead.notes.map((item) => (
                <article className="lead-note" key={item.id}>
                  <span className="small muted">
                    {dateLabel(item.createdAt)}
                  </span>
                  <p>{item.text}</p>
                </article>
              ))
            ) : (
              <p className="muted small">
                No notes yet. Start with what matters to this lead.
              </p>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
