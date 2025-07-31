import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const recentSales = [
    {
      name: "Ale Alonso Marquez",
      amount: "+$18.00",
      time: "2 minutes ago",
      avatar: "👤",
    },
    {
      name: "Steven Summer cano",
      amount: "+$87.00",
      time: "5 minutes ago",
      avatar: "👤",
    },
    {
      name: "Mateus San Tortillas",
      amount: "+$43.00",
      time: "8 minutes ago",
      avatar: "👤",
    },
    {
      name: "Kagney Junkies",
      amount: "+$58.00",
      time: "12 minutes ago",
      avatar: "👤",
    },
  ];

  const handleSidebar = (value: boolean) => {
    setSidebarOpen(value);
  };

  const MetricCard = ({
    title,
    value,
    change,
    changeType,
  }: {
    title: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
  }) => (
    <View className="rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-gray-600 text-sm font-medium">{title}</Text>
        <Pressable>
          <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
        </Pressable>
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-1">{value}</Text>
      <Text
        className={`text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}
      >
        {change}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white/10 backdrop-blur-md">
      <View className="flex-1 web:flex-row">
        {/* Desktop Sidebar */}
        <View className="hidden web:flex web:w-64  shadow-sm">
          <View className="p-6">
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-8 bg-blue-600 rounded-lg mr-3 items-center justify-center">
                <Text className="text-white font-bold">C</Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">CRM</Text>
            </View>

            <View className="space-y-2">
              {[
                { name: "Home", icon: "home-outline", active: false },
                { name: "Stocks", icon: "trending-up-outline", active: false },
                { name: "Analytics", icon: "analytics-outline", active: false },
                { name: "Calendar", icon: "calendar-outline", active: true },
                { name: "Email", icon: "mail-outline", active: false },
                {
                  name: "Integrations",
                  icon: "extension-puzzle-outline",
                  active: false,
                },
                { name: "Books", icon: "book-outline", active: false },
              ].map((item, index) => (
                <Pressable
                  key={index}
                  className={`flex-row items-center px-3 py-2 rounded-lg ${
                    item.active ? "bg-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.active ? "#FFFFFF" : "#6B7280"}
                  />
                  <Text
                    className={`ml-3 font-medium ${item.active ? "text-white" : "text-gray-700"}`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1 p-4 web:p-6">
          {/* Metrics Cards */}
          <View className="web:grid web:grid-cols-4 web:gap-6 space-y-4 web:space-y-0 mb-6">
            <MetricCard
              title="Profit Total"
              value="50,215"
              change="+2.5%"
              changeType="positive"
            />
            <View className="hidden web:block">
              <MetricCard
                title="Expense Total"
                value="12,2321"
                change="-0.5%"
                changeType="negative"
              />
            </View>
            <View className="hidden web:block">
              <MetricCard
                title="New Customers"
                value="658"
                change="+1.2%"
                changeType="positive"
              />
            </View>
            <View className="hidden web:block">
              <MetricCard
                title="Running Project"
                value="25"
                change="-0.1%"
                changeType="negative"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
