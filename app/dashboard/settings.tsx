import BrandingPreferencePanel from "@/features/settings/brandingPreferencePanel";
import GeneralProfilePanel from "@/features/settings/generalProfilePanel";
import IntegrationsPanel from "@/features/settings/integrationPanel";
import LeadsPanel from "@/features/settings/leadsPanel";
import NotificationsPanel from "@/features/settings/notificationsPanel";
import SecurityPrivacyPanel from "@/features/settings/securityPrivacyPanel";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";

type TabKey =
  | "general"
  | "branding"
  | "leads"
  | "integrations"
  | "notifications"
  | "security";

type TabDef = {
  key: TabKey;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const TabPill: React.FC<{
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  active?: boolean;
  onClick?: () => void;
}> = ({ label, icon, active = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold md:px-5 md:text-sm transition-colors
      ${active ? "bg-[#ff7b3b] text-white" : "text-[#5e5e5e] hover:bg-[#f5f5f5]"}`}
  >
    <Ionicons name={icon} size={20} color={active ? "white" : "#ff7b3b"} />
    <span>{label}</span>
  </button>
);

const SettingsPage: React.FC = () => {
  const tabs: TabDef[] = useMemo(
    () => [
      { key: "general", label: "General & Profile", icon: "grid" },
      { key: "branding", label: "Brandings & Preference", icon: "megaphone" },
      { key: "leads", label: "Leads", icon: "people" },
      { key: "integrations", label: "Integrations", icon: "link" },
      { key: "notifications", label: "Notifications", icon: "notifications" },
      { key: "security", label: "Security & Privacy", icon: "lock-closed" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState<TabKey>("general");

  const headerByTab: Record<TabKey, { title: string; subtitle: string }> = {
    general: {
      title: "General & Profile Settings",
      subtitle:
        "Customize the basics to make the dashboard work just the way you like.",
    },
    branding: {
      title: "Brandings & Preference",
      subtitle: "Personalize your dashboard to reflect your brand identity and create a cohesive user experience.",
    },
    leads: {
      title: "Leads",
      subtitle: "Configure lead-related preferences.",
    },
    integrations: {
      title: "Integrations",
      subtitle: "Connect tools and services to your workspace.",
    },
    notifications: {
      title: "Notifications",
      subtitle:
        "Tailor your notification preferences to stay informed without being overwhelmed.",
    },
    security: {
      title: "Security & Privacy",
      subtitle: "Manage security settings and privacy controls.",
    },
  };

  const PanelByTab: Record<TabKey, React.ComponentType> = {
    general: GeneralProfilePanel,
    branding: BrandingPreferencePanel,
    leads: LeadsPanel,
    integrations: IntegrationsPanel,
    notifications: NotificationsPanel,
    security: SecurityPrivacyPanel,
  };

  const ActivePanel = PanelByTab[activeTab];

  return (
    <div className="min-h-screen w-full bg-[#f5f6fa] px-4 py-6 md:px-10 lg:px-16">
      
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold leading-tight text-[#141414] md:text-[32px]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#8c8c8c]">
            Customize your dashboard experience and optimize system performance.
          </p>
        </div>

    
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6e6e6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#ff7b3b]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="text-xs font-medium text-[#4a4a4a] md:text-sm">
              01–31 December 2024
            </span>
          </div>
        </div>
      </header>

   
      <nav className="mb-6 overflow-x-auto">
        <div className="inline-flex min-w-full gap-3 rounded-full bg-white px-3 py-2 md:px-4">
          {tabs.map((t) => (
            <TabPill
              key={t.key}
              label={t.label}
              icon={t.icon}
              active={activeTab === t.key}
              onClick={() => setActiveTab(t.key)}
            />
          ))}
        </div>
      </nav>


      <main className="rounded-[26px] bg-white p-5 shadow-sm md:p-8 lg:p-10">
  
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#141414] md:text-2xl">
              {headerByTab[activeTab].title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[#9a9a9a]">
              {headerByTab[activeTab].subtitle}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-full bg-[#ffece1] px-6 py-2 text-sm font-medium text-[#ff7b3b]">
              Cancel
            </button>
            <button className="rounded-full bg-[#ff7b3b] px-6 py-2 text-sm font-medium text-white">
              Save Change
            </button>
          </div>
        </div>

    
        <ActivePanel />
      </main>
    </div>
  );
};

export default SettingsPage;
