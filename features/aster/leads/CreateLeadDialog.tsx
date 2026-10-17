import { useRouter, type Href } from "expo-router";
import { useRef, useState, type FormEvent } from "react";
import { useDemo } from "../data/DemoProvider";
import { sources, type Source } from "../data/model";
import { Dialog } from "../ui/Dialog";
import { Button, Field } from "../ui/primitives";

export function CreateLeadDialog({ onClose }: { onClose: () => void }) {
  const demo = useDemo();
  const router = useRouter();
  const submitted = useRef(false);
  const [source, setSource] = useState<Source>("Email");
  const [campaignId, setCampaignId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    submitted.current = true;
    setBusy(true);
    const fields = new FormData(event.currentTarget);
    const result = demo.createLead({
      name: String(fields.get("name") ?? ""),
      email: String(fields.get("email") ?? ""),
      source,
      campaignId: campaignId || undefined,
    });
    if (!result.ok) {
      setErrors({ [result.field ?? "form"]: result.message });
      submitted.current = false;
      setBusy(false);
      return;
    }
    onClose();
    router.push(`/dashboard/leads/${result.value.id}` as Href);
  }
  return (
    <Dialog title="Add a lead" onClose={onClose}>
      <p className="muted dialog-description">
        A new connection, with a little context. All information stays in your
        browser.
      </p>
      <form onSubmit={submit} noValidate className="form-stack">
        <Field id="lead-name" label="Full name" error={errors.name}>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            maxLength={120}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
          />
        </Field>
        <Field id="lead-email" label="Email address" error={errors.email}>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
          />
        </Field>
        <div className="form-grid">
          <Field
            id="lead-source"
            label="Acquisition source"
            error={errors.source}
          >
            <select
              id="lead-source"
              value={source}
              onChange={(event) => {
                setSource(event.target.value as Source);
                setCampaignId("");
              }}
            >
              {sources.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field
            id="lead-campaign"
            label="Origin campaign (optional)"
            error={errors.campaignId}
          >
            <select
              id="lead-campaign"
              value={campaignId}
              onChange={(event) => setCampaignId(event.target.value)}
            >
              <option value="">No campaign</option>
              {demo.state.campaigns
                .filter((item) => item.source === source)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </Field>
        </div>
        {errors.form && (
          <p role="alert" className="field-error">
            {errors.form}
          </p>
        )}
        <div className="form-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            Create lead
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
