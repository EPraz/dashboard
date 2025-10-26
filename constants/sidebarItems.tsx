import { Ionicons } from "@expo/vector-icons";
import { JSX } from "react";
import { SidebarKey } from "./sidebarRoutes";

export type SidebarItemType = {
  key: SidebarKey;
  label: string;
  icon: (props: { size?: number; color?: string }) => JSX.Element;
};

export const MAIN: SidebarItemType[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (p) => <Ionicons name="grid" {...p} />,
  },
  {
    key: "leads",
    label: "Leads Management",
    icon: (p) => <Ionicons name="people-outline" {...p} />,
  },
  {
    key: "products",
    label: "Products",
    icon: (p) => <Ionicons name="bag-handle-outline" {...p} />,
  },
  {
    key: "transactions",
    label: "Transaction",
    icon: (p) => <Ionicons name="document-text-outline" {...p} />,
  },

  {
    key: "campaign",
    label: "Campaign",
    icon: (p) => <Ionicons name="megaphone-outline" {...p} />,
  },
];

export const SECONDARY: SidebarItemType[] = [
  {
    key: "settings",
    label: "Settings",
    icon: (p) => <Ionicons name="settings-outline" {...p} />,
  },
  {
    key: "help",
    label: "Help & Support",
    icon: (p) => <Ionicons name="help-circle-outline" {...p} />,
  },
];
