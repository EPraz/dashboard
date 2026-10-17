import { useState, type FormEvent } from "react";
import { useDemo } from "../data/DemoProvider";
import { allocatedAmounts, initialBudget } from "../data/budget";
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
  const baseline = initialBudget();
  const percentage = sources.reduce(
    (sum, source) => sum + Number(allocations[source]),
    0,
  );
  const proposal: BudgetPlan = {
    totalCents: Math.round(Number(total) * 100),
    allocations: Object.fromEntries(
      sources.map((source) => [source, Number(allocations[source])]),
    ) as BudgetPlan["allocations"],
  };
  const previewValid =
    total.trim() !== "" &&
    Number.isFinite(Number(total)) &&
    Number(total) > 0 &&
    sources.every(
      (source) =>
        allocations[source].trim() !== "" &&
        Number.isFinite(Number(allocations[source])) &&
        Number(allocations[source]) >= 0,
    ) &&
    Math.abs(percentage - 100) < 0.000001;
  const amounts = previewValid ? allocatedAmounts(proposal) : null;
  function submit(event: FormEvent) {
    event.preventDefault();
    if (
      total.trim() === "" ||
      !Number.isFinite(Number(total)) ||
      Math.abs(Number(total) * 100 - proposal.totalCents) > 0.000001 ||
      sources.some((source) => allocations[source].trim() === "")
    ) {
      setError(
        "Enter a valid USD amount with at most two decimal places and complete every allocation.",
      );
      return;
    }
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
          >
            <input
              id="budget-total"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0.01"
              value={total}
              onChange={(event) => setTotal(event.target.value)}
            />
          </Field>
          <div className="form-grid">
            {sources.map((source, index) => (
              <Field
                key={source}
                id={`allocation-${index}`}
                label={`${source} allocation (%)`}
              >
                <input
                  id={`allocation-${index}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="0.01"
                  value={allocations[source]}
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
          {error && (
            <p className="field-error" role="alert">
              {error}
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
