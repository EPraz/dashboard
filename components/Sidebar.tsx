// components/Sidebar.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

type Item = {
  key: string;
  label: string;
  icon: (props: { size?: number; color?: string }) => JSX.Element;
};

const MAIN: Item[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (p) => <Ionicons name="grid" {...p} />,
  },
  {
    key: "leads",
    label: "Leads Management",
    icon: (p) => <Ionicons name="people-outline" {...p} />,
  },
  {
    key: "products",
    label: "Products",
    icon: (p) => <Ionicons name="bag-handle-outline" {...p} />,
  },
  {
    key: "transactions",
    label: "Transaction",
    icon: (p) => <Ionicons name="document-text-outline" {...p} />,
  },
  {
    key: "teams",
    label: "Teams",
    icon: (p) => <Ionicons name="people-circle-outline" {...p} />,
  },
  {
    key: "campaign",
    label: "Campaign",
    icon: (p) => <Ionicons name="megaphone-outline" {...p} />,
  },
  {
    key: "reports",
    label: "Sales Report",
    icon: (p) => <Ionicons name="pie-chart-outline" {...p} />,
  },
];

const SECONDARY: Item[] = [
  {
    key: "settings",
    label: "Settings",
    icon: (p) => <Ionicons name="settings-outline" {...p} />,
  },
  {
    key: "help",
    label: "Help & Support",
    icon: (p) => <Ionicons name="help-circle-outline" {...p} />,
  },
];

type Props = {
  initialCollapsed?: boolean;
  activeKey?: string;
  onChangeActive?: (key: string) => void;
  onToggleTheme?: () => void;
  onLogout?: () => void;
};

/** Botón circular de la rail */
function RailButton({
  children,
  active = false,
  danger = false,
  onPress,
  size = 44,
}: {
  children: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  onPress?: () => void;
  size?: number;
}) {
  const base =
    "items-center justify-center rounded-full border shadow-sm android:elevation-1";
  const cls = [
    base,
    active
      ? "bg-orange-500 border-orange-500"
      : danger
        ? "bg-rose-50 border-rose-100"
        : "bg-white border-slate-200",
  ].join(" ");
  return (
    <Pressable
      onPress={onPress}
      className={cls}
      style={{ width: size, height: size }}
    >
      {children}
    </Pressable>
  );
}

/** Item de la lista (versión extendida) */
function NavItem({
  item,
  active,
  onPress,
}: {
  item: Item;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        "flex-row items-center gap-3 px-3 py-3 rounded-2xl",
        active ? "bg-orange-500/10" : "bg-white",
      ].join(" ")}
      android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: false }}
    >
      {item.icon({ size: 20, color: active ? "#f97316" : "#0f172a" })}
      <Text
        className={active ? "text-orange-600 font-semibold" : "text-slate-700"}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

export default function Sidebar({
  initialCollapsed = true,
  activeKey = "dashboard",
  onChangeActive,
  onToggleTheme,
  onLogout,
}: Props) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  // Colores activos
  const iconColor = "#0f172a";

  const HeaderLogo = useMemo(
    () => (
      <View className="flex-row items-center gap-2  ">
        <View className="h-12 w-12 rounded-full bg-orange-500 items-center justify-center">
          <Text className="text-white text-lg">✺</Text>
        </View>
        {!collapsed && (
          <Text className="text-xl font-bold text-slate-900">Campify</Text>
        )}
      </View>
    ),
    [collapsed]
  );

  if (collapsed) {
    // ====== RAIL (contraído) ======
    return (
      <View className="bg-white py-2 p-4 mt-[-70px]">
        <View className="w-16  items-center pt-4 pb-4 hidden lg:flex z-10 ">
          {/* Logo */}
          {HeaderLogo}

          {/* Grupo principal */}
          <View className="mt-5 rounded-3xl bg- border border-slate-200 p-2 gap-3 bg-slate-50 ">
            {MAIN.map((it, idx) => (
              <RailButton
                key={it.key}
                active={activeKey === it.key}
                onPress={() => onChangeActive?.(it.key)}
              >
                {it.icon({
                  size: 22,
                  color: activeKey === it.key ? "#fff" : iconColor,
                })}
              </RailButton>
            ))}
          </View>

          {/* Segundo grupo */}
          <View className="mt-5 w-10 h-[4px] bg-slate-50 " />
          <View className="mt-4 rounded-3xl bg-slate-50 border border-slate-200 p-2 gap-3">
            {SECONDARY.map((it) => (
              <RailButton key={it.key} onPress={() => onChangeActive?.(it.key)}>
                {it.icon({ size: 22, color: iconColor })}
              </RailButton>
            ))}
          </View>

          {/* Acciones inferiores */}
          <View className="flex-1 " />
          <RailButton onPress={onToggleTheme} size={44}>
            <Ionicons name="moon-outline" size={22} color={iconColor} />
          </RailButton>
          <View className="h-3" />
          <RailButton danger onPress={onLogout} size={44}>
            <MaterialCommunityIcons name="logout" size={22} color="#ef4444" />
          </RailButton>

          {/* Toggle expand */}
          <View className="h-4" />
          <Pressable
            onPress={() => setCollapsed(false)}
            className="rounded-full bg-white border border-slate-200 px-3 py-2 mt-2"
          >
            <Ionicons name="chevron-forward" size={18} color={iconColor} />
          </Pressable>
        </View>
      </View>
    );
  }

  // ====== EXTENDIDO ======
  return (
    <View className="w-72 bg-white border-r border-slate-200 pt-5 pb-4">
      {/* Header */}
      <View className="px-4">{HeaderLogo}</View>

      {/* Toggle collapse */}
      <View className="px-4 mt-2">
        <Pressable
          onPress={() => setCollapsed(true)}
          className="self-start rounded-full bg-white border border-slate-200 px-3 py-1"
        >
          <Ionicons name="chevron-back" size={18} color={iconColor} />
        </Pressable>
      </View>

      {/* Main group */}
      <View className="px-4 mt-3">
        <View className="rounded-3xl bg-slate-50 p-2">
          {MAIN.map((it) => (
            <NavItem
              key={it.key}
              item={it}
              active={activeKey === it.key}
              onPress={() => onChangeActive?.(it.key)}
            />
          ))}
        </View>
      </View>

      {/* Divider */}
      <View className="px-4">
        <View className="my-5 h-[1px] bg-slate-200" />
      </View>

      {/* Secondary group */}
      <View className="px-4">
        <View className="rounded-3xl bg-slate-50 p-2">
          {SECONDARY.map((it) => (
            <NavItem
              key={it.key}
              item={it}
              onPress={() => onChangeActive?.(it.key)}
            />
          ))}
        </View>
      </View>

      {/* Bottom actions */}
      <View className="flex-1" />
      <View className="px-4 gap-3">
        <Pressable
          onPress={onToggleTheme}
          className="flex-row items-center gap-3 bg-slate-50 rounded-2xl px-4 h-12"
        >
          <Ionicons name="moon-outline" size={20} color={iconColor} />
          <Text className="text-slate-800">Switch Theme</Text>
        </Pressable>

        <Pressable
          onPress={onLogout}
          className="flex-row items-center gap-3 bg-rose-50 rounded-2xl px-4 h-12"
        >
          <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
          <Text className="text-rose-600 font-medium">Logout</Text>
        </Pressable>
      </View>

      {/* Esquinas redondeadas tipo card */}
      <View className="absolute right-0 top-0 bottom-0 w-[1px] bg-slate-200 rounded-full" />
    </View>
  );
}
