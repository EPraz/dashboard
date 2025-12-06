import { PageHeader, StatCard } from "@/components";
import { Table } from "@/features/leads/components";
import { View } from "react-native";

const DashboardTransactionsContainer = () => {
  return (
    <View className="gap-6">
      <PageHeader
        title="Transactions"
        subTitle="Track, manage, and analyze your sales transactions in one place."
      />
      <View className="gap-2 xl:gap-5 flex flex-row flex-wrap items-center justify-start xl:justify-between">
        <StatCard
          iconName="monetization-on"
          iconLib="mi"
          title="Total Sales"
          value="$45,678"
          suffix="in this month"
          badgeValue="5.56%"
          badgeColor="success"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="cart"
          iconLib="ev"
          title="Total Orders"
          value="1,235"
          suffix="orders in this month"
          badgeValue="2.65%"
          badgeColor="fail"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="cube-outline"
          iconLib="ion"
          title="Avg. Order Value"
          value="$37.02"
          suffix="per customer"
          badgeValue="10.55%"
          badgeColor="success"
          badgeLabel="vs last month"
        />
        <StatCard
          iconName="arrow-up"
          iconLib="ev"
          title="Refunds Processed"
          value="$1,230"
          suffix="3% of total sales"
          badgeValue="3.75%"
          badgeColor="fail"
          badgeLabel="vs last month"
        />
      </View>
      <View className="flex-1">
        <Table />
      </View>
    </View>
  );
};

export default DashboardTransactionsContainer;
