import { IconButton, MiniGraphic, StatCard } from "@/components";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { BreakdownBars, LeadSourceBreakdownChart, Table } from "../components";

const LeadFunnel = () => {
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
      <View className="row-span-2 gap-2 xl:gap-5">
        <View className="flex flex-wrap flex-row gap-2  xl:gap-5 xl:justify-evenly">
          <StatCard
            iconName="people-outline"
            iconLib="ion"
            title="Total Leads"
            value="1,250"
            suffix="leads"
            badgeValue="10.55%"
            badgeColor="success"
            badgeLabel="vs last month"
          />
          <StatCard
            iconName="people-outline"
            iconLib="ion"
            title="Total Leads"
            value="1,250"
            suffix="leads"
            badgeValue="10.55%"
            badgeColor="success"
            badgeLabel="vs last month"
          />
        </View>
        <View className="">
          <Table mode="compact" onToggle={() => setShowFullTable(true)} />
        </View>
        <View className="flex flex-wrap flex-row gap-2 xl:gap-5 ">
          <MiniGraphic
            title="New Leads to Contacted"
            value="2"
            suffix="days"
            charData="chartData"
          />
          <MiniGraphic
            title="Proposal Sent to Negotiation"
            value="5"
            suffix="days"
            charData="chartData"
          />
        </View>
      </View>
      <View className="flex flex-1 flex-row flex-wrap gap-2 xl:gap-5 ">
        <View className="flex-col flex-1 gap-2 xl:gap-5">
          <StatCard
            iconName="people-outline"
            iconLib="ion"
            title="Total Leads"
            value="1,250"
            suffix="leads"
            badgeValue="10.55%"
            badgeColor="success"
            badgeLabel="vs last month"
          />
          <MiniGraphic
            title="Revenue Potencial"
            value="$600,000"
            suffix="on this month"
            charData="chartData"
          />
        </View>
        <View className="flex-1">
          <BreakdownBars />
        </View>
      </View>
      <View className="flex p-5 gap-2 rounded-[20px] bg-surface-whiteCard dark:bg-surface-whiteCardDark text-ink-bold dark:text-ink-boldDark flex-1 h-fit">
        <View className="flex items-center justify-between flex-row overflow-auto gap-20">
          <View className="">
            <Text className="text-[20px] leading-[130%] font-semibold text-inherit">
              Lead Source Breakdown
            </Text>
          </View>
          <View className="gap-3 flex-row items-center justify-evenly">
            <IconButton
              disabled
              className="justify-evenly gap-2 h-[36px] w-auto px-4"
            >
              <Text className="text-[12px] leading-[120%] font-bold text-inherit">
                Channel
              </Text>
              <SimpleLineIcons name="arrow-down" className="text-inherit" />
            </IconButton>
            <IconButton disabled>
              <Feather
                name="arrow-up-right"
                className="text-inherit"
                size={24}
              />
            </IconButton>
          </View>
        </View>
        <View className="">
          <LeadSourceBreakdownChart />
        </View>
      </View>
    </View>
  );
};

export default LeadFunnel;
