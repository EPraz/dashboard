import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { SidebarKey } from "./sidebarRoutes";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export type SidebarItemType = {
  key: SidebarKey;
  label: string;
  iconBase: IconName;
};

export const MAIN: SidebarItemType[] = [
  { key: "dashboard", label: "Dashboard", iconBase: "grid" },
  { key: "leads", label: "Leads Management", iconBase: "people" },
  { key: "products", label: "Products", iconBase: "bag-handle" },
  { key: "transactions", label: "Transaction", iconBase: "document-text" },
  { key: "campaign", label: "Campaign", iconBase: "megaphone" },
];

export const SECONDARY: SidebarItemType[] = [
  { key: "settings", label: "Settings", iconBase: "settings" },
  { key: "help", label: "Help & Support", iconBase: "help-circle" },
];
