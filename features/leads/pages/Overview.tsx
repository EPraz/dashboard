import { MiniGraphic, StatCard } from "@/components";
import { View } from "react-native";
import Graphic from "../../../components/ui/graphic/Graphic";
import { Table } from "../components";

const Overview = () => {
  return (
    <View className="gap-6">
      <View className="overflow-hidden">
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
          <StatCard
            iconName="person-add-outline"
            iconLib="ion"
            title="Number of New Leads"
            value="850"
            suffix="active leads"
            badgeValue="12.45%"
            badgeColor="#2CC974"
            badgeLabel="vs last month"
          />
        </View>
      </View>

      <View className="gap-2 xl:gap-5 flex-row flex-wrap justify-between">
        {/* Recent Lead Activies Table */}
        <View className="flex-1">
          <Table />
        </View>

        {/* LEad Conversion Trends && Total deals closed and total marketing spend*/}
        <View className="flex flex-1 gap-2 xl:gap-5">
          {/* LEad Conversion Trends */}
          <View className="">
            <Graphic />
          </View>

          <View className="flex-row gap-2 xl:gap-5 flex-wrap">
            <MiniGraphic
              title="Total Deals Closed"
              value="80"
              valueLabel="deals"
              suffix="in this month"
              charData="chartData"
            />
            <MiniGraphic
              title="Total Marketing Spend"
              value="$10,000"
              suffix="in this month"
              charData="chartData2"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Overview;
