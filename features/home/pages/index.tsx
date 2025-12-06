import { Graphic, MiniGraphic, PageHeader, StatCard } from "@/components";
import { View } from "react-native";
import PublicityBox from "../components/PublicityBox";

const DashboardHomeContainer = () => {
  return (
    <View className="gap-6">
      <PageHeader
        title="Dashboard Overview"
        subTitle="Gain insights into your sales and marketing performance at a glance."
      />

      <View className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-5 lg:grid-rows-2">
        <View className="row-span-2 gap-2 xl:gap-5 ">
          <View className="gap-2 xl:gap-5 flex flex-row flex-wrap items-center justify-start xl:justify-between">
            <StatCard
              iconName="monetization-on"
              iconLib="mi"
              title="Total Sales"
              value="$85,200"
              badgeValue="9.97%"
              badgeColor="success"
              badgeLabel="vs last month"
              special={true}
            />
            <StatCard
              iconName="file-tray-full-outline"
              iconLib="ion"
              title="Total Revenue"
              value="$852,450"
              badgeValue="9.97%"
              badgeColor="success"
              badgeLabel="vs last month"
            />
            <StatCard
              iconName="cube-outline"
              iconLib="ion"
              title="Total Product Sales"
              value="1,254"
              badgeValue="3.51%"
              badgeColor="fail"
              badgeLabel="vs last month"
            />
            <StatCard
              iconName="archive-outline"
              iconLib="ion"
              title="Number of New Leads"
              value="$1,850"
              badgeValue="9.97%"
              badgeColor="success"
              badgeLabel="vs last month"
            />
          </View>
          <View className="">
            <Graphic />
          </View>
        </View>

        <View className="row-span-2 gap-2 xl:gap-5 ">
          <PublicityBox />
          <View className="flex-row gap-2 xl:gap-5 flex-wrap">
            <MiniGraphic
              title="Revenue Potential"
              iconLib="ion"
              iconName="people"
              value="$150,000"
              suffix="in this month"
              charData="chartData3"
            />
            <MiniGraphic
              title="Lead Engagement"
              subTitle="Email success"
              iconLib="zc"
              iconName="email"
              value="3,250"
              suffix="emails opened"
              charData="chartData"
            />
            <MiniGraphic
              title="Marketing Campaign Performance"
              subTitle="Spring Promo"
              iconLib="fa"
              iconName="product-hunt"
              value="$50,000"
              suffix="revenue generated"
              charData="chartData2"
            />
            <MiniGraphic
              title="Total Deals Closed"
              value="80"
              valueLabel="deals"
              suffix="in this month"
              charData="chartData"
              subTitle="Spring Sells"
              iconLib="mi"
              iconName="sell"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardHomeContainer;
