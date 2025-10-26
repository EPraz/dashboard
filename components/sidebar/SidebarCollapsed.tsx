import { MAIN, SECONDARY, SidebarKey } from "@/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JSX } from "react";
import { Pressable, View } from "react-native";
import { RailButton } from "./RailButton";

type Props = {
  headerLogo: JSX.Element;
  activeKey: SidebarKey;
  onChangeActive: (key: SidebarKey) => void;
  onToggleTheme: (() => void) | undefined;
  onLogout: (() => void) | undefined;
  handleSetCollapse: (value: boolean) => void;
};

export default function SidebarCollapsed({
  headerLogo,
  activeKey,
  onChangeActive,
  onToggleTheme,
  onLogout,
  handleSetCollapse,
}: Props) {
  return (
    <View className="bg-white py-2 p-4 mt-[-70px]">
      <View className="w-16  items-center pt-4 pb-4  flex z-10 ">
        {/* Logo */}
        {headerLogo}

        {/* Grupo principal */}
        <View className="mt-5 rounded-3xl bg- border border-slate-200 p-2 gap-3 bg-slate-50 ">
          {MAIN.map((it, idx) => (
            <RailButton
              key={idx}
              active={activeKey === it.key}
              onPress={() => onChangeActive(it.key)}
            >
              {it.icon({
                size: 22,
                color: activeKey === it.key ? "#fff" : "#0f172a",
              })}
            </RailButton>
          ))}
        </View>

        {/* Segundo grupo */}
        <View className="mt-5 w-10 h-[4px] bg-slate-50 " />
        <View className="mt-4 rounded-3xl bg-slate-50 border border-slate-200 p-2 gap-3">
          {SECONDARY.map((it, index) => (
            <RailButton key={index} onPress={() => onChangeActive(it.key)}>
              {it.icon({ size: 22, color: "#0f172a" })}
            </RailButton>
          ))}
        </View>

        {/* Acciones inferiores */}
        <View className="flex-1 " />
        <RailButton onPress={onToggleTheme} size={44}>
          <Ionicons name="moon-outline" size={22} color={"#0f172a"} />
        </RailButton>
        <View className="h-3" />
        <RailButton danger onPress={onLogout} size={44}>
          <MaterialCommunityIcons name="logout" size={22} color="#ef4444" />
        </RailButton>

        {/* Toggle expand */}
        <View className="h-4" />
        <Pressable
          onPress={() => handleSetCollapse(false)}
          className="rounded-full bg-white border border-slate-200 px-3 py-2 mt-2"
        >
          <Ionicons name="chevron-forward" size={18} color={"#0f172a"} />
        </Pressable>
      </View>
    </View>
  );
}
