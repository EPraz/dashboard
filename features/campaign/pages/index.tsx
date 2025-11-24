import { PageHeader } from "@/components";
import { TopMenu } from "@/features/leads/components";
import { View } from "react-native";

import { TopMenuTab } from "@/features/leads/components/topMenu/TopMenu";
import { useState } from "react";
import Overview from "./Overview";

const TABS: TopMenuTab[] = [
  { key: "overview", label: "Campaign Overview" },
  { key: "optimization", label: "Campaign Optimization", disabled: true },
  { key: "budgeting", label: "Campaign Budgeting", disabled: true },
  { key: "goals", label: "Campaign Campaign Goals", disabled: true },
];

const DashboardCampaignContainer = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const handleActiveTab = (value: TopMenuTab["key"]) => {
    setActiveTab(value);
  };

  return (
    <View className="gap-6">
      <PageHeader
        title="Campaign Performance"
        subTitle="Monitor and analyze the success of your marketing campaigns."
      />

      <TopMenu
        tabs={TABS}
        activeTab={activeTab}
        onChangeTab={handleActiveTab}
      />

      {activeTab === "overview" && <Overview />}
    </View>
  );
};

export default DashboardCampaignContainer;
