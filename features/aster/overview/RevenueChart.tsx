import { dateLabel, money, shortMoney } from "../data/model";
import { EmptyState } from "../ui/primitives";

export function RevenueChart({
  series,
}: {
  series: { date: string; revenue: number }[];
}) {
  if (series.every((item) => item.revenue === 0))
    return (
      <EmptyState title="No revenue in this period">
        Record a demo sale from a lead, or choose a wider reporting period.
      </EmptyState>
    );
  const max = Math.max(...series.map((item) => item.revenue), 100);
  const points = series
    .map(
      (item, index) =>
        `${55 + index * 112},${185 - (item.revenue / max) * 150}`,
    )
    .join(" ");
  return (
    <figure className="revenue-chart">
      <svg
        viewBox="0 0 660 235"
        role="img"
        aria-label="Paid revenue by day group, in USD"
      >
        <title>Paid revenue in the selected period</title>
        <desc>
          {series
            .map(
              (item) =>
                `${dateLabel(item.date)} onward: ${money(item.revenue)}`,
            )
            .join("; ")}
        </desc>
        {[0, 0.5, 1].map((value) => (
          <g key={value}>
            <line
              x1="55"
              x2="615"
              y1={185 - value * 150}
              y2={185 - value * 150}
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <text x="0" y={189 - value * 150} fill="var(--muted)" fontSize="11">
              {shortMoney(max * value)}
            </text>
          </g>
        ))}
        <polygon
          points={`55,185 ${points} 615,185`}
          fill="var(--accent-soft)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {series.map((item, index) => (
          <g key={item.date}>
            <circle
              cx={55 + index * 112}
              cy={185 - (item.revenue / max) * 150}
              r="4"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={55 + index * 112}
              y="220"
              textAnchor="middle"
              fill="var(--muted)"
              fontSize="11"
            >
              {dateLabel(item.date).replace(/, \d{4}/, "")}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="muted small">
        Paid purchases grouped by consecutive UTC date ranges. Each label marks
        a range’s start.
      </figcaption>
      <details className="chart-data">
        <summary>View chart values</summary>
        <ul>
          {series.map((item) => (
            <li key={item.date}>
              {dateLabel(item.date)} onward{" "}
              <strong>{money(item.revenue)}</strong>
            </li>
          ))}
        </ul>
      </details>
    </figure>
  );
}
