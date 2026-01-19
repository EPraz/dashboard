import { PageHeader, TopMenu, TopMenuTab } from "@/components";
import { useState } from "react";
import { View } from "react-native";
import BrandingPreference from "./BrandingPreference";
import GeneralProfile from "./GeneralProfile";
import Notifications from "./Notifications";

const TABS: TopMenuTab[] = [
  { key: "general_profile", label: "General & Profile" },
  {
    key: "branding_preference",
    label: "Brandings & Preference",
    disabled: true,
  },
  { key: "leads", label: "Leads", disabled: true },
  { key: "integrations", label: "Integrations", disabled: true },
  { key: "notifications", label: "Notifications", disabled: true },
  { key: "security_privacy", label: "Security & Privacy", disabled: true },
];

const DashboardSettingsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const handleActiveTab = (value: TopMenuTab["key"]) => {
    setActiveTab(value);
  };

  return (
    <View className="gap-6">
      <PageHeader
        title="Settings"
        subTitle="Customize your dashboard experience and optimize system performance."
      />

      <TopMenu
        tabs={TABS}
        activeTab={activeTab}
        onChangeTab={handleActiveTab}
      />

      {/*  */}
      {activeTab === "general_profile" && <GeneralProfile />}
      {activeTab === "branding_preference" && <BrandingPreference />}
      {activeTab === "notifications" && <Notifications />}
    </View>
  );
};

export default DashboardSettingsContainer;
