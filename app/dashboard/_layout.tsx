import { Header, Sidebar } from "@/components";
import { SidebarKey, SidebarRoutes } from "@/constants";
import { BlurView } from "expo-blur";
import { Slot, usePathname, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const activeKey =
    (Object.entries(SidebarRoutes).find(
      ([, path]) => path === pathname
    )?.[0] as SidebarKey) ?? "dashboard";

  const handlerOnChangeActive = (k: SidebarKey) => {
    const targetPath = SidebarRoutes[k];
    if (targetPath !== pathname) {
      router.push(targetPath);
    }
  };

  const handleSetCollapse = (value: boolean) => {
    setCollapsed(value);
  };
  return (
    <SafeAreaView className="flex-1 bg-surface-main dark:bg-surface-mainDark relative">
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
        onToggleTheme={toggleTheme}
        onLogout={() => console.log("logout")}
        handleSetCollapse={handleSetCollapse}
      />

      <View className="flex-1 flex-row -1 bg-surface-pale dark:bg-surface-paleDark ">
        <ScrollView
          className="flex-1"
          contentContainerClassName={`p-4 md:p-6 lg:p-[20px] gap-4 lg:ml-[92px]`}
        >
          <View>
            <Slot />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
