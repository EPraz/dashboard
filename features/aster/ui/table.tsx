import { useState } from "react";
import { Button } from "./primitives";
import { Icon } from "./Icon";

export function usePagination<T>(items: T[], scope: string, size = 8) {
  const [selection, setSelection] = useState({ scope, page: 1 });
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const page =
    selection.scope === scope ? Math.min(selection.page, totalPages) : 1;
  return {
    rows: items.slice((page - 1) * size, page * size),
    page,
    totalPages,
    count: items.length,
    size,
    go: (next: number) =>
      setSelection({ scope, page: Math.max(1, Math.min(next, totalPages)) }),
  };
}
export function Pagination({
  page,
  totalPages,
  count,
  size,
  go,
  noun,
}: {
  page: number;
  totalPages: number;
  count: number;
  size: number;
  go: (page: number) => void;
  noun: string;
}) {
  return (
    <div className="pagination">
      <p aria-live="polite">
        {count
          ? `${(page - 1) * size + 1}–${Math.min(page * size, count)}`
          : "0"}{" "}
        of {count} {noun}
      </p>
      <div>
        <span className="small muted">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="secondary"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
        >
          <Icon name="chevron-left" size={16} />
        </Button>
        <Button
          variant="secondary"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
        >
          <Icon name="chevron-right" size={16} />
        </Button>
      </div>
    </div>
  );
}
