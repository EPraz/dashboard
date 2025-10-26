import { SidebarKey } from "@/constants";
import { MAIN, SECONDARY } from "@/constants/sidebarItems";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { NavItem } from "./NavItem";

type Props = {
  headerLogo: JSX.Element;
  activeKey: SidebarKey;
  onChangeActive: (key: SidebarKey) => void;
  onToggleTheme: (() => void) | undefined;
  onLogout: (() => void) | undefined;
  handleSetCollapse: (value: boolean) => void;
};

export default function SidebarExtended({
  headerLogo,
  activeKey,
  onChangeActive,
  onToggleTheme,
  onLogout,
  handleSetCollapse,
}: Props) {
  return (
    <View className="w-72 bg-white border-r border-slate-200 pt-5 pb-4">
      {/* Header */}
      <View className="px-4">{headerLogo}</View>

      {/* Toggle collapse */}
      <View className="px-4 mt-2">
        <Pressable
          onPress={() => handleSetCollapse(true)}
          className="self-start rounded-full bg-white border border-slate-200 px-3 py-1"
        >
          <Ionicons name="chevron-back" size={18} color={"#0f172a"} />
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
              onPress={() => onChangeActive(it.key)}
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
              onPress={() => onChangeActive(it.key)}
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
          <Ionicons name="moon-outline" size={20} color={"#0f172a"} />
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
