// DashboardLayout.tsx
import { Header, Sidebar } from "@/components";
import { SidebarKey, SidebarRoutes } from "@/constants";
import { BlurView } from "expo-blur";
import { Slot, usePathname, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const { colorScheme, setColorScheme } = useColorScheme();
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width >= 1024;

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const activeKey =
    (Object.entries(SidebarRoutes).find(
      ([, path]) => path === pathname,
    )?.[0] as SidebarKey) ?? "dashboard";

  const handlerOnChangeActive = (k: SidebarKey) => {
    const targetPath = SidebarRoutes[k];
    if (targetPath !== pathname) router.push(targetPath);
    if (!isDesktop) setCollapsed(true);
  };

  const handleSetCollapse = (value: boolean) => setCollapsed(value);

  const showOverlay = !collapsed && !isDesktop; // overlay solo en drawer

  return (
    <SafeAreaView className="flex-1 bg-surface-main dark:bg-surface-mainDark relative">
      {showOverlay && (
        <Pressable
          onPress={() => handleSetCollapse(true)}
          className="absolute inset-0 z-10"
          accessibilityLabel="Close menu"
        >
          <BlurView
            intensity={8}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={StyleSheet.absoluteFill}
          />
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

      <View className="flex-1 flex-row bg-surface-pale dark:bg-surface-paleDark">
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4 md:p-6 lg:p-[20px] gap-4 lg:ml-[92px]"
        >
          <Slot />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
