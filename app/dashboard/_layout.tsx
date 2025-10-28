import { Header, Sidebar } from "@/components";
import { SidebarKey, SidebarRoutes } from "@/constants";
import { BlurView } from "expo-blur";
import { Slot, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<SidebarKey>("dashboard");
  const handlerOnChangeActive = (k: SidebarKey) => {
    router.push(SidebarRoutes[k]);
    setActiveKey(k);
  };
  const [collapsed, setCollapsed] = useState(true);

  const handleSetCollapse = (value: boolean) => {
    setCollapsed(value);
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative ">
      {!collapsed && (
        <Pressable
          onPress={() => handleSetCollapse(true)}
          className="absolute inset-0 z-10"
          accessibilityLabel="Cerrar menú"
        >
          <BlurView intensity={4} tint="dark" style={StyleSheet.absoluteFill} />
          <View className="absolute inset-0 bg-black/40" />
        </Pressable>
      )}

      <Header collapsed={collapsed} handleSetCollapse={handleSetCollapse} />

      <Sidebar
        collapsed={collapsed}
        activeKey={activeKey}
        onChangeActive={handlerOnChangeActive}
        onToggleTheme={() => console.log("toggle theme")}
        onLogout={() => console.log("logout")}
        handleSetCollapse={handleSetCollapse}
      />

      <View className="flex-1 flex-row bg-[#F7F7F7] ">
        <ScrollView
          className="flex-1"
          contentContainerClassName={`p-4 md:p-6 lg:p-[20px] gap-4 lg:ml-[92px] rounded-tl-[50px]`}
        >
          <Slot />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
