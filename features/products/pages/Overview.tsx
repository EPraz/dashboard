import { IconButton, StatCard } from "@/components";
import { Table } from "@/features/leads/components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import AIStar from "../../../assets/images/ai-star.png";
import TopSellingProductsCard from "../components/TopSellingProducts";

const Overview = () => {
  const [showFullTable, setShowFullTable] = useState(false);

  if (showFullTable) {
    return (
      <View className="flex-1">
        <Table mode="full" onToggle={() => setShowFullTable(false)} />
      </View>
    );
  }

  return (
    <View className="grid grid-cols-1 lg:grid-cols-4 gap-2 xl:gap-5 ">
      <View className="col-span-1 gap-2 xl:gap-5 ">
        <TopSellingProductsCard />
        <LinearGradient
          colors={["#F46425", "#F5B40B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 20,
            padding: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 312,
            minHeight: 170,
          }}
          className=""
        >
          <View className="gap-4 p-4">
            <View className="gap-4 flex-row items-center justify-start ">
              <IconButton>
                <Image
                  source={AIStar}
                  style={{ width: 48, height: 48, borderRadius: "50%" }}
                  contentFit="contain"
                />
              </IconButton>
              <Text className="text-white text-[20px] leading-[130%] font-bold">
                Promote Top <br />
                Selling Products
              </Text>
            </View>
            <View>
              <Text className="text-white text-[16px] leading-[130%]">
                Increase marketing efforts for <b>Xylo Orion Smart Clock</b> and
                <b>Xylo Lumina LED TV</b> to sustain high conversion rates.
                <b>
                  Launch targeted campaigns and offer limited-time discounts.
                </b>
              </Text>
            </View>
            <View>
              <Pressable className="flex flex-row w-full items-center justify-center h-[40px] gap-2 px-3 py-2 bg-[#fff] rounded-full">
                <Text className="text-[#F46425] font-bold text-[16px] leading-[120%]">
                  Launch Campaigns Today!
                </Text>
                <SimpleLineIcons
                  name="arrow-right-circle"
                  color="#000"
                  size={24}
                />
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View className="col-span-1 lg:col-span-3 gap-2 xl:gap-5 ">
        <View className="gap-2 xl:gap-5 flex flex-row flex-wrap items-center justify-start xl:justify-between">
          <StatCard
            iconName="people-outline"
            iconLib="ion"
            title="Total Leads"
            value="1,250"
            suffix="leads"
            badgeValue="10.55%"
            badgeColor="#2CC974"
            badgeLabel="vs last month"
          />
          <StatCard
            iconName="person-outline"
            iconLib="ion"
            title="Active Leads"
            value="850"
            suffix="active leads"
            badgeValue="12.45%"
            badgeColor="#2CC974"
            badgeLabel="vs last month"
          />
          <StatCard
            iconName="chevron-triple-up"
            iconLib="mc"
            title="Lead Growth Rate"
            value="$25,000"
            suffix="increase"
            badgeValue="5.75%"
            badgeColor="#EF4444"
            badgeLabel="vs last month"
          />
        </View>
        <View className="">
          <Table mode="compact" onToggle={() => setShowFullTable(true)} />
        </View>
      </View>
    </View>
  );
};

export default Overview;
