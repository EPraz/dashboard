import { IconButton, StatCard } from "@/components";
import { Table } from "@/features/leads/components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import AIStar from "../../../assets/images/ai-star.png";
import BudgetAllocationSummary from "../components/BudgetAllocationSummary";

const Overview = () => {
  return (
    <View className="gap-5">
      <View className="gap-2 xl:gap-5 flex flex-row flex-wrap items-center justify-start xl:justify-between">
        <StatCard
          iconName="megaphone"
          iconLib="oc"
          title="Total Active Campaigns"
          value="12"
          suffix="campaigns currently running"
          badgeValue="2.50%"
          badgeColor="success"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="monetization-on"
          iconLib="mi"
          title="Total Revenue Generated"
          value="$58,200"
          suffix="from all active campaigns"
          badgeValue="2.65%"
          badgeColor="fail"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="people-outline"
          iconLib="ion"
          title="Total Impression"
          value="300,000"
          suffix="campaigns have been displayed"
          badgeValue="10.55%"
          badgeColor="success"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="graph"
          iconLib="oc"
          title="Conversion Rate"
          value="$1,230"
          suffix="total impression"
          badgeValue="6.50%"
          badgeColor="success"
          badgeLabel="vs last month"
        />
      </View>
      <View className="flex-row gap-5">
        <View className="basis-3/4">
          <Table />
        </View>
        <View className="flex-1 gap-2 xl:gap-5">
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
                  Campaign <br />
                  Optimization
                </Text>
              </View>
              <View>
                <Text className="text-white text-[16px] leading-[130%]">
                  Your email campaigns are generating 20% higher conversions
                  compared to paid ads.
                </Text>
              </View>
              <View>
                <Pressable className="flex flex-row w-fit items-center justify-center h-[40px] gap-2 px-3 py-2 bg-[#fff] rounded-full">
                  <Text className="text-[#F46425] font-bold text-[16px] leading-[120%]">
                    View Details
                  </Text>
                  <SimpleLineIcons
                    name="arrow-right-circle"
                    color="#F46425"
                    size={24}
                  />
                </Pressable>
              </View>
            </View>
          </LinearGradient>
          <BudgetAllocationSummary />
        </View>
      </View>
    </View>
  );
};

export default Overview;
