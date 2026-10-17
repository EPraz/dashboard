import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  return (
    <button
      type="button"
      {...props}
      className={`button button-${variant} ${className}`}
    />
  );
}
export function PageHeader({
  title,
  subtitle,
  eyebrow = "YOUR WORKSPACE, IN TUNE",
  actions,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}
export function Panel({
  title,
  description,
  actions,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {title && (
        <header className="panel-heading">
          <div>
            <h2>{title}</h2>
            {description && <p className="muted small">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && (
        <span className="field-hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field-error" role="alert" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name="search" size={24} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function Status({ value }: { value: string }) {
  return (
    <span
      className={`status status-${value.toLowerCase().replaceAll(" ", "-")}`}
    >
      <span aria-hidden="true" />
      {value}
    </span>
  );
}
export function Metric({
  label,
  value,
  detail,
  icon = "activity",
  featured = false,
}: {
  label: string;
  value: ReactNode;
  detail: ReactNode;
  icon?: Parameters<typeof Icon>[0]["name"];
  featured?: boolean;
}) {
  return (
    <div
      className={`metric${featured ? " featured" : ""}`}
      role="group"
      aria-label={label}
    >
      <div className="metric-label">
        <span>{label}</span>
        <Icon name={icon} size={18} />
      </div>
      <strong className="metric-value">{value}</strong>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}
export function Initials({
  name,
  large = false,
}: {
  name: string;
  large?: boolean;
}) {
  return (
    <span className={`initials${large ? " large" : ""}`} aria-hidden="true">
      {name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
