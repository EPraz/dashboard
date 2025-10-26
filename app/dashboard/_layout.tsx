import { Header, Sidebar } from "@/components";
import { SidebarKey, SidebarRoutes } from "@/constants";
import { Slot, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const router = useRouter();

  const handlerOnChangeActive = (k: SidebarKey) => {
    router.push(SidebarRoutes[k]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      <View className="flex-1 flex-row bg-slate-50">
        <Sidebar
          initialCollapsed
          activeKey="dashboard"
          onChangeActive={handlerOnChangeActive}
          onToggleTheme={() => console.log("toggle theme")}
          onLogout={() => console.log("logout")}
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4 md:p-6 lg:p-8 gap-4"
        >
          <Slot />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
