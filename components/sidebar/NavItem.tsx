import { SidebarItemType } from "@/constants/sidebarItems";
import { Pressable, Text } from "react-native";

export function NavItem({
  item,
  active,
  onPress,
}: {
  item: SidebarItemType;
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
