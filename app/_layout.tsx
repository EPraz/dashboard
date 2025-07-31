import { Header, MobileSidebar } from "@/components";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = (value: boolean) => {
    setSidebarOpen(value);
  };

  return (
    <SafeAreaView className="flex-1 relative bg-transparent">
      <Header title="Dashboard" handleSidebar={handleSidebar} />
      <MobileSidebar handleSidebar={handleSidebar} sidebarOpen={sidebarOpen} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent", // 👈 este es el truco
          },
        }}
      />
    </SafeAreaView>
  );
}
