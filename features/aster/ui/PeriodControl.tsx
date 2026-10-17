import { useDemo } from "../data/DemoProvider";
import type { Period } from "../data/model";

export function PeriodControl() {
  const { period, setPeriod } = useDemo();
  return (
    <label className="period-control">
      <span className="sr-only">Reporting period</span>
      <select
        value={period}
        onChange={(event) => setPeriod(event.target.value as Period)}
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
        <option value="all">All sample data</option>
      </select>
    </label>
  );
}
