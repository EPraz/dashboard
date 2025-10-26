// routes.ts (en /constants o /utils)
import type { Href } from "expo-router";

export const SidebarRoutes = {
  dashboard: "/dashboard",
  leads: "/dashboard/leads",
  products: "/dashboard/products",
  transactions: "/dashboard/transactions",
  campaign: "/dashboard/campaign",
  settings: "/dashboard/settings",
  help: "/dashboard/help",
} as const satisfies Record<string, Href>;

export type SidebarKey = keyof typeof SidebarRoutes;
