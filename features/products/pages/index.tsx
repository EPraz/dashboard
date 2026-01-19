import { PageHeader, TopMenu, TopMenuTab } from "@/components";
import { useState } from "react";
import { View } from "react-native";
import Inventory from "./Inventory";
import Overview from "./Overview";

const TABS: TopMenuTab[] = [
  { key: "overview", label: "Overview" },
  { key: "inventory", label: "Inventory Insight", disabled: true },
];

const DashboardProductsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const handleActiveTab = (value: TopMenuTab["key"]) => {
    setActiveTab(value);
  };

  return (
    <View className="gap-6">
      <PageHeader
        title="Products"
        subTitle="Track your product performance, inventory, optimize promotions, and drive sales."
      />

      <TopMenu
        tabs={TABS}
        activeTab={activeTab}
        onChangeTab={handleActiveTab}
      />

      {activeTab === "overview" && <Overview />}
      {activeTab === "inventory" && <Inventory />}
    </View>
  );
};

export default DashboardProductsContainer;
