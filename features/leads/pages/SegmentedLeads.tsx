import { MiniGraphic } from "@/components";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  GeographicDistributionChart,
  LeadSourceBreakdownChart,
  Table,
} from "../components";

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
        <View className="flex p-5 gap-2 xl:gap-5  rounded-[20px] bg-white">
          <View className="flex items-center justify-between flex-row overflow-auto gap-20">
            <View className="">
              <Text className="text-[20px] leading-[130%] font-semibold">
                Lead Source Breakdown
              </Text>
            </View>
            <View className="gap-3 flex-row items-center justify-evenly">
              <Pressable className="flex-row bg-white items-center justify-evenly gap-2 xl:gap-5 w-[115px] h-[36px] py-2 px-4 rounded-full border border-[#E7E7E7]">
                <Text className="text-[12px] leading-[120%] font-bold">
                  Channel
                </Text>
                <SimpleLineIcons name="arrow-down" color="#000" />
              </Pressable>
              <Pressable className="flex-row bg-white items-center justify-center w-[36px] h-[36px] rounded-full border border-[#E7E7E7]">
                <Feather name="arrow-up-right" color="#000" size={24} />
              </Pressable>
            </View>
          </View>
          <View className="">
            {/* <GeographicDistributionChart />*/}
            <LeadSourceBreakdownChart />
          </View>
        </View>
        <View className="xl:flex xl:flex-wrap xl:flex-row flex-1 gap-2 xl:gap-5 ">
          <View className="flex flex-1 p-5 gap-2 xl:gap-5  rounded-[20px] bg-white">
            <View className="flex items-center justify-between flex-row gap-2 w-full ">
              <Text className="text-[20px] leading-[130%] font-semibold">
                Geographic <br />
                Distribution of Leads
              </Text>
              <View className="gap-3 flex-row items-center justify-evenly ">
                <Pressable className="flex-row bg-white items-center justify-center w-[36px] h-[36px] rounded-full border border-[#E7E7E7]">
                  <Feather name="arrow-up-right" color="#000" size={24} />
                </Pressable>
              </View>
            </View>
            <View className="flex items-center justify-between flex-row">
              <Pressable className="flex-row bg-white items-center justify-evenly gap-2  h-[36px] py-2 px-4 rounded-full border border-[#E7E7E7]">
                <Text className="text-[12px] leading-[120%] font-bold">
                  All Region
                </Text>
                <SimpleLineIcons name="arrow-down" color="#000" />
              </Pressable>
              <Pressable className="flex-row bg-white items-center justify-evenly gap-2  h-[36px] py-2 px-4 rounded-full border border-[#E7E7E7]">
                <Text className="text-[12px] leading-[120%] font-bold">
                  Top Countries
                </Text>
                <SimpleLineIcons name="arrow-down" color="#000" />
              </Pressable>
            </View>
            <View className="">
              <GeographicDistributionChart />
              {/* <LeadSourceBreakdownChart /> */}
            </View>
          </View>
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
