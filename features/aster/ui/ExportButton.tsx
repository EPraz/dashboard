import { useState } from "react";
import { downloadCsv, type CsvCell } from "../data/csv";
import { Button } from "./primitives";
import { Icon } from "./Icon";

export function ExportButton({
  filename,
  headers,
  rows,
}: {
  filename: string;
  headers: string[];
  rows: CsvCell[][];
}) {
  const [message, setMessage] = useState("");
  return (
    <div className="export-control">
      <Button
        variant="secondary"
        disabled={!rows.length}
        onClick={() => {
          try {
            downloadCsv(filename, headers, rows);
            setMessage(`${rows.length} matching records exported.`);
          } catch {
            setMessage("The download could not start. Please try again.");
          }
        }}
      >
        <Icon name="download" size={15} />
        Export CSV
      </Button>
      {!rows.length && (
        <span className="muted small">No matching records to export.</span>
      )}
      {message && (
        <span className="muted small" role="status">
          {message}
        </span>
      )}
    </div>
  );
}
