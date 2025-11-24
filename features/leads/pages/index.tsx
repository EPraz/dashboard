import { PageHeader } from "@/components";
import { useState } from "react";
import { View } from "react-native";
import TopMenu, { TopMenuTab } from "../components/topMenu/TopMenu";
import LeadFunnel from "./LeadFunnel";
import Overview from "./Overview";
import SegmentedLeads from "./SegmentedLeads";

const TABS: TopMenuTab[] = [
  { key: "overview", label: "Overview" },
  { key: "segmented", label: "Segmented Leads" },
  { key: "funnel", label: "Lead Funnel" },
  { key: "import_export", label: "Lead Import & Export", disabled: true },
  { key: "nurturing", label: "Lead Nurturing", disabled: true },
];

const DashboardLeadsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const handleActiveTab = (value: TopMenuTab["key"]) => {
    setActiveTab(value);
  };
  return (
    <View className="gap-6">
      <PageHeader
        title="Leads Management"
        subTitle="Track and monitor the performance of your leads from all aspects of
          Leads Management."
      />

      <TopMenu
        tabs={TABS}
        activeTab={activeTab}
        onChangeTab={handleActiveTab}
      />

      {/*  */}
      {activeTab === "overview" && <Overview />}
      {activeTab === "segmented" && <SegmentedLeads />}
      {activeTab === "funnel" && <LeadFunnel />}
    </View>
  );
};

export default DashboardLeadsContainer;
