import { MiniGraphic } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { Table } from "../components";
import GeographicContainer from "../components/geographicDistributionChart/GeographicContainer";
import LeadSourceContainer from "../components/leadSourceBreakdownChart/LeadSourceContainer";

const SegmentedLeads = () => {
  const [showFullTable, setShowFullTable] = useState(false);

  if (showFullTable) {
    return (
      <View className="flex-1">
        <Table mode="full" onToggle={() => setShowFullTable(false)} />
      </View>
    );
  }

  return (
    <View className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-5 lg:grid-rows-2">
      <View className="row-span-2 gap-2 xl:gap-5 ">
        <LeadSourceContainer />

        <View className="xl:flex xl:flex-wrap xl:flex-row flex-1 gap-2 xl:gap-5 ">
          <GeographicContainer />
          <View className=" flex-wrap gap-2 xl:gap-5 ">
            <MiniGraphic
              title="Top Lead Source"
              subTitle="Hot Leads from Referral"
              iconLib="ion"
              iconName="people"
              value="$45,000"
              suffix="total value"
              charData="chartData3"
            />
            <MiniGraphic
              title="Lead Engagement"
              subTitle="Email success"
              iconLib="zc"
              iconName="email"
              value="3,250"
              suffix="emails opened"
              charData="chartData3"
            />
          </View>
        </View>
      </View>
      <View className="flex gap-2 xl:gap-5 ">
        <View className="flex-wrap flex-row gap-2 xl:gap-5  2xl:justify-between">
          {/* KPI Card */}
          <LinearGradient
            colors={["#F46425", "#F5B40B"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 312,
              minHeight: 170,
              maxWidth: 320,
            }}
            className=""
          >
            <View className="gap-2 xl:gap-5 ">
              <Text className="text-white text-lg font-semibold">
                Conversion Opportunity
              </Text>

              <Text className="text-white text-4xl font-bold">20%</Text>

              <Text className="text-white text-[12px]">
                of <Text className="font-bold">"In Progress"</Text> leads have
                been idle for over 5 days. Automate reminders or deploy
                follow-up sequences to nudge conversions.
              </Text>
            </View>
          </LinearGradient>
          <MiniGraphic
            title="Top Lead Source"
            value="$70,684"
            suffix="referrals generate"
            charData="chartData3"
          />
        </View>
        <View className="">
          <Table mode="compact" onToggle={() => setShowFullTable(true)} />
        </View>
      </View>
    </View>
  );
};

export default SegmentedLeads;
