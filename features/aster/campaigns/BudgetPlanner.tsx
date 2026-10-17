import { useState, type FormEvent } from "react";
import { useDemo } from "../data/DemoProvider";
import { allocatedAmounts, budgetErrors, initialBudget } from "../data/budget";
import { money, sources, type BudgetPlan } from "../data/model";
import { Button, Field, Panel } from "../ui/primitives";

export function BudgetPlanner() {
  const { state, saveBudget } = useDemo();
  const [total, setTotal] = useState(String(state.budgetPlan.totalCents / 100));
  const [allocations, setAllocations] = useState(
    Object.fromEntries(
      sources.map((source) => [
        source,
        String(state.budgetPlan.allocations[source]),
      ]),
    ),
  );
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const baseline = initialBudget();
  const percentage = sources.reduce(
    (sum, source) => sum + Number(allocations[source]),
    0,
  );
  const rawCents = Number(total) * 100;
  const proposal: BudgetPlan = {
    totalCents:
      total.trim() !== "" &&
      Math.abs(rawCents - Math.round(rawCents)) < 0.000001
        ? Math.round(rawCents)
        : NaN,
    allocations: Object.fromEntries(
      sources.map((source) => [
        source,
        allocations[source].trim() === "" ? NaN : Number(allocations[source]),
      ]),
    ) as BudgetPlan["allocations"],
  };
  const errors = budgetErrors(proposal);
  const previewValid =
    !errors.total && !errors.sum && !Object.keys(errors.allocations).length;
  const amounts = previewValid ? allocatedAmounts(proposal) : null;
  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    setError("");
    if (!previewValid) return;
    const result = saveBudget(proposal);
    setError(result.ok ? "" : result.message);
  }
  const difference = state.budgetPlan.totalCents - baseline.totalCents;
  return (
    <div className="detail-grid">
      <Panel
        title="Plan your next move"
        description="Planning simulation · a proposal, not historical spending."
      >
        <form className="form-stack" onSubmit={submit} noValidate>
          <Field
            id="budget-total"
            label="Total budget (USD)"
            hint="Your initial plan is USD 1,000.00."
            error={submitted ? errors.total : undefined}
          >
            <input
              id="budget-total"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0.01"
              value={total}
              aria-invalid={submitted && !!errors.total}
              aria-describedby={`budget-total-hint${submitted && errors.total ? " budget-total-error" : ""}`}
              onChange={(event) => setTotal(event.target.value)}
            />
          </Field>
          <div className="form-grid">
            {sources.map((source, index) => (
              <Field
                key={source}
                id={`allocation-${index}`}
                label={`${source} allocation (%)`}
                error={submitted ? errors.allocations[source] : undefined}
              >
                <input
                  id={`allocation-${index}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="0.01"
                  value={allocations[source]}
                  aria-invalid={submitted && !!errors.allocations[source]}
                  aria-describedby={
                    submitted && errors.allocations[source]
                      ? `allocation-${index}-error`
                      : undefined
                  }
                  onChange={(event) =>
                    setAllocations({
                      ...allocations,
                      [source]: event.target.value,
                    })
                  }
                />
              </Field>
            ))}
          </div>
          <p className="muted small">
            Total allocation:{" "}
            <strong>
              {Number.isFinite(percentage)
                ? `${Number(percentage.toFixed(2))}%`
                : "Incomplete"}
            </strong>{" "}
            · Must equal 100%.
          </p>
          {(error || (submitted && errors.sum)) && (
            <p className="field-error" role="alert">
              {error || errors.sum}
            </p>
          )}
          <div className="form-actions">
            <Button type="submit">Save plan</Button>
          </div>
        </form>
      </Panel>
      <div className="page-stack">
        <Panel
          title="Allocation preview"
          description="Amounts update as you edit. Save to retain your proposal."
        >
          <div className="stage-list">
            {sources.map((source) => (
              <div className="stage-row" key={source}>
                <div className="stage-row-heading">
                  <h3>{source}</h3>
                  <strong>{amounts ? money(amounts[source]) : "—"}</strong>
                </div>
                <p className="muted small">
                  Initial: {baseline.allocations[source]}% ·{" "}
                  {money(
                    (baseline.totalCents * baseline.allocations[source]) / 100,
                  )}
                </p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Saved proposal">
          <p className="metric-value">{money(state.budgetPlan.totalCents)}</p>
          <p className="muted small">
            {difference === 0
              ? "Matches the initial plan"
              : `${money(Math.abs(difference))} ${difference > 0 ? "above" : "below"} the initial plan`}
          </p>
          <p className="muted small">
            This plan does not change paid revenue, purchases, conversions, or
            inventory. Reset demo restores the initial plan.
          </p>
        </Panel>
      </div>
    </div>
  );
}
