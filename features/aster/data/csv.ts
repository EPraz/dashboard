export type CsvCell = string | number;
export function makeCsv(headers: string[], rows: CsvCell[][]) {
  const cell = (value: CsvCell) => {
    let text = String(value);
    if (
      typeof value === "string" &&
      (/^\s*[=+\-@]/.test(text) || /^[\t\r\n]/.test(text))
    )
      text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  return (
    "\uFEFF" +
    [headers, ...rows].map((row) => row.map(cell).join(",")).join("\r\n") +
    "\r\n"
  );
}
export function downloadCsv(
  filename: string,
  headers: string[],
  rows: CsvCell[][],
) {
  const blob = new Blob([makeCsv(headers, rows)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  try {
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
