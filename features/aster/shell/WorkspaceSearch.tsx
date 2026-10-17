import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, type Href } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { Dialog } from "../ui/Dialog";
import { Icon } from "../ui/Icon";
import { Button, EmptyState } from "../ui/primitives";

function SearchDialog({ onClose }: { onClose: () => void }) {
  const { state } = useDemo();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    input.current?.focus();
  }, []);
  const term = query.trim().toLowerCase();
  const leads = term
    ? state.leads.filter((item) =>
        `${item.name} ${item.email}`.toLowerCase().includes(term),
      )
    : [];
  const products = term
    ? state.products.filter((item) =>
        `${item.name} ${item.sku}`.toLowerCase().includes(term),
      )
    : [];
  return (
    <Dialog title="Search your workspace" onClose={onClose}>
      <p className="muted dialog-description">
        Find leads by name or email, and products by name or SKU. Searches all
        dates.
      </p>
      <div className="search-field">
        <Icon name="search" />
        <input
          ref={input}
          aria-label="Search leads and products"
          placeholder="Try a name, email, or product…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <Button
            variant="ghost"
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          >
            Clear search
          </Button>
        )}
      </div>
      <div aria-live="polite" className="sr-only">
        {term
          ? `${leads.length} leads and ${products.length} products found`
          : "Enter a search to find records"}
      </div>
      {!term ? (
        <p className="info-note">
          Start typing to find a connection or a product. Use Tab to explore
          results and Escape to close.
        </p>
      ) : !leads.length && !products.length ? (
        <EmptyState title="No matches yet">
          Try a shorter name, an email address, or a product SKU.
        </EmptyState>
      ) : (
        <div className="search-results">
          {leads.length > 0 && (
            <section>
              <h3>Leads ({leads.length})</h3>
              <ul>
                {leads.map((item) => (
                  <li key={item.id}>
                    <Link href={`/dashboard/leads/${item.id}` as Href} asChild>
                      <WebAnchor onClick={onClose}>
                        <Icon name="user" />
                        <span>
                          <strong>{item.name}</strong>
                          <span>
                            {item.email} · {item.status}
                          </span>
                        </span>
                        <Icon name="arrow-up-right" size={16} />
                      </WebAnchor>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {products.length > 0 && (
            <section>
              <h3>Products ({products.length})</h3>
              <ul>
                {products.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/dashboard/products/${item.id}` as Href}
                      asChild
                    >
                      <WebAnchor onClick={onClose}>
                        <Icon name="headphones" />
                        <span>
                          <strong>{item.name}</strong>
                          <span>
                            {item.sku} · {item.category}
                          </span>
                        </span>
                        <Icon name="arrow-up-right" size={16} />
                      </WebAnchor>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Dialog>
  );
}

export function WorkspaceSearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="workspace-search"
        aria-label="Search workspace"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Icon name="search" size={17} />
        <span>Search workspace</span>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}
