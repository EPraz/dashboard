import { useRef, useState, type FormEvent } from "react";
import { useDemo } from "../data/DemoProvider";
import { availableStock, money, uniqueId, type Lead } from "../data/model";
import { Dialog } from "../ui/Dialog";
import { Button, Field } from "../ui/primitives";

export function RecordSaleDialog({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  const demo = useDemo();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [operationId] = useState(() => uniqueId("sale"));
  const submitted = useRef(false);
  const [busy, setBusy] = useState(false);
  const product = demo.state.products.find((item) => item.id === productId);
  const units = Number(quantity);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    submitted.current = true;
    setBusy(true);
    const result = demo.recordSale({
      leadId: lead.id,
      productId,
      quantity: units,
      operationId,
    });
    if (!result.ok) {
      setErrors({ [result.field ?? "form"]: result.message });
      submitted.current = false;
      setBusy(false);
      return;
    }
    onClose();
  }
  return (
    <Dialog title="Record demo sale" onClose={onClose}>
      <p className="dialog-description muted">
        A sample purchase for <strong>{lead.name}</strong>. No payment is taken.
        This records a paid transaction and updates the local inventory.
      </p>
      <form onSubmit={submit} noValidate className="form-stack">
        <Field id="sale-product" label="Product" error={errors.productId}>
          <select
            id="sale-product"
            value={productId}
            aria-invalid={!!errors.productId}
            aria-describedby={
              errors.productId ? "sale-product-error" : undefined
            }
            onChange={(event) => setProductId(event.target.value)}
          >
            <option value="">Choose a product</option>
            {demo.state.products.map((item) => (
              <option
                key={item.id}
                value={item.id}
                disabled={availableStock(demo.state, item) === 0}
              >
                {item.name} · {money(item.priceCents)}
                {availableStock(demo.state, item) === 0
                  ? " · Out of stock"
                  : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="sale-quantity"
          label="Quantity"
          error={errors.quantity}
          hint={
            product
              ? `${availableStock(demo.state, product)} units available · ${money(product.priceCents)} each`
              : "Choose a product to check availability."
          }
        >
          <input
            id="sale-quantity"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={quantity}
            aria-invalid={!!errors.quantity}
            aria-describedby={
              errors.quantity ? "sale-quantity-error" : "sale-quantity-hint"
            }
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Field>
        <div className="sale-summary">
          <span>Total · USD</span>
          <strong>
            {product && Number.isSafeInteger(units) && units > 0
              ? money(product.priceCents * units)
              : "—"}
          </strong>
        </div>
        {errors.form && (
          <p className="field-error" role="alert">
            {errors.form}
          </p>
        )}
        <p className="small muted">
          {lead.status === "Converted"
            ? "A repeat purchase adds revenue without counting another conversion."
            : "The first paid purchase converts this lead into a customer."}
        </p>
        <div className="form-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            Record sale
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
