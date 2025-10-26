// components/Sidebar.tsx
import { SidebarKey } from "@/constants";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import SidebarCollapsed from "./SidebarCollapsed";
import SidebarExtended from "./SidebarExtended";

type Props = {
  initialCollapsed?: boolean;
  activeKey: SidebarKey;
  onChangeActive: (key: SidebarKey) => void;
  onToggleTheme: () => void;
  onLogout: () => void;
};

/** Item de la lista (versión extendida) */

export default function Sidebar({
  initialCollapsed = true,
  activeKey = "dashboard",
  onChangeActive,
  onToggleTheme,
  onLogout,
}: Props) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleSetCollapse = (value: boolean) => {
    setCollapsed(value);
  };

  const HeaderLogo = useMemo(
    () => (
      <View className="flex-row items-center gap-2  ">
        <View className="h-12 w-12 rounded-full bg-orange-500 items-center justify-center">
          <Text className="text-white text-lg">D</Text>
        </View>
        {!collapsed && (
          <Text className="text-xl font-bold text-slate-900">Dashboard</Text>
        )}
      </View>
    ),
    [collapsed]
  );

  if (collapsed) {
    // ====== RAIL (contraído) ======
    return (
      <SidebarCollapsed
        headerLogo={HeaderLogo}
        activeKey={activeKey}
        onChangeActive={onChangeActive}
        onToggleTheme={onToggleTheme}
        onLogout={onLogout}
        handleSetCollapse={handleSetCollapse}
      />
    );
  }

  // ====== EXTENDIDO ======
  return (
    <SidebarExtended
      headerLogo={HeaderLogo}
      activeKey={activeKey}
      onChangeActive={onChangeActive}
      onToggleTheme={onToggleTheme}
      onLogout={onLogout}
      handleSetCollapse={handleSetCollapse}
    />
  );
}
