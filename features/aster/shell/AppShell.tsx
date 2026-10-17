import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, Slot, usePathname, type Href } from "expo-router";
import Head from "expo-router/head";
import { useRef } from "react";
import { ThemeControl } from "../theme/ThemeControl";
import { AsterMark } from "../ui/AsterLogo";
import { Icon, type IconName } from "../ui/Icon";
import { WorkspaceSearch } from "./WorkspaceSearch";

const primary: { name: string; path: string; icon: IconName }[] = [
  { name: "Overview", path: "/dashboard", icon: "grid" },
  { name: "Leads", path: "/dashboard/leads", icon: "users" },
  { name: "Products", path: "/dashboard/products", icon: "headphones" },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: "credit-card",
  },
  { name: "Campaigns", path: "/dashboard/campaign", icon: "radio" },
];
const secondary: typeof primary = [
  { name: "Settings", path: "/dashboard/settings", icon: "sliders" },
  { name: "Help & guide", path: "/dashboard/help", icon: "help-circle" },
];

function Brand() {
  return (
    <Link href="/dashboard" asChild>
      <WebAnchor className="brand" aria-label="Aster home">
        <AsterMark />
        <span>
          aster<span className="brand-period">.</span>
        </span>
      </WebAnchor>
    </Link>
  );
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  function items(links: typeof primary) {
    return links.map((item) => {
      const active =
        item.path === "/dashboard"
          ? pathname === item.path
          : pathname.startsWith(item.path);
      return (
        <Link href={item.path as Href} key={item.path} asChild>
          <WebAnchor
            onClick={onNavigate}
            className={`nav-item${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.name}</span>
            {active && <span className="nav-dot" />}
          </WebAnchor>
        </Link>
      );
    });
  }
  return (
    <nav aria-label="Main navigation">
      <span className="nav-label">WORKSPACE</span>
      {items(primary)}
      <span className="nav-label secondary-label">PREFERENCES</span>
      {items(secondary)}
    </nav>
  );
}

export default function AppShell() {
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const current =
    [...primary, ...secondary].find(
      (item) => item.path !== "/dashboard" && pathname.startsWith(item.path),
    )?.name ?? "Overview";
  return (
    <>
      <Head>
        <title>{current} · Aster</title>
        <meta
          name="description"
          content="Explore Aster, an interactive sales and marketing dashboard for an audio store. Leads, sales, inventory, and campaigns in one coherent frontend demo."
        />
      </Head>
      <WebAnchor className="skip-link" href="#main-content">
        Skip to content
      </WebAnchor>
      <aside className="sidebar">
        <Brand />
        <div className="workspace-identity">
          <span className="workspace-avatar">
            <Icon name="headphones" />
          </span>
          <div>
            <strong>Aster Audio</strong>
            <span>Demo workspace</span>
          </div>
          <Icon name="chevrons-up" size={14} />
        </div>
        <Navigation />
        <div className="sidebar-footer">
          <span className="live-dot" />
          <span>All data stays on this device</span>
        </div>
      </aside>
      <dialog
        ref={menu}
        className="mobile-menu"
        aria-label="Workspace navigation"
      >
        <div className="mobile-menu-heading">
          <Brand />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => menu.current?.close()}
          >
            <Icon name="x" />
          </button>
        </div>
        <Navigation onNavigate={() => menu.current?.close()} />
      </dialog>
      <div className="workspace-content">
        <header className="topbar">
          <div className="topbar-location">
            <button
              className="icon-button menu-button"
              aria-label="Open navigation"
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
            >
              <Icon name="menu" />
            </button>
            <span className="desktop-breadcrumb">
              Workspace <span>/</span> <strong>{current}</strong>
            </span>
            <span className="mobile-brand">
              <AsterMark />
              <span>aster.</span>
            </span>
          </div>
          <div className="topbar-actions">
            <WorkspaceSearch />
            <span className="demo-indicator">
              <span className="live-dot" />
              Interactive demo · Sample data
            </span>
            <ThemeControl />
          </div>
        </header>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <Slot />
        </main>
        <footer className="app-footer">
          <span>Aster · Sales & Marketing Dashboard</span>
          <span>Made for a clearer picture.</span>
        </footer>
      </div>
    </>
  );
}
