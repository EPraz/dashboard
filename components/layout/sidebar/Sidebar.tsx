import { MAIN, SECONDARY, SidebarKey } from "@/constants";
import { Platform, Pressable, useWindowDimensions, View } from "react-native";
import {
  GroupSidebarMenu,
  SidebarContainer,
  SidebarLabel,
} from "./Sidebar.styles";
import SidebarItem from "./SidebarItem";

type Props = {
  collapsed: boolean;
  activeKey: SidebarKey;
  onChangeActive: (key: SidebarKey) => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  handleSetCollapse: (value: boolean) => void;
};

export default function Sidebar({
  collapsed,
  activeKey = "dashboard",
  onChangeActive,
  onToggleTheme,
  onLogout,
  handleSetCollapse,
}: Props) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= 1024;

  const widthFitFull = collapsed ? "w-fit" : "w-full";
  return (
    <SidebarContainer
      collapsed={collapsed}
      {...(isDesktop && {
        onMouseEnter: () => handleSetCollapse(false),
        onMouseLeave: () => handleSetCollapse(true),
      })}
    >
      {/* Logo here eventuyally */}
      <View
        className={`${widthFitFull} flex-row items-center justify-start gap-6`}
      >
        <Pressable
          className={`rounded-full border-r-2 border border-stroke-primaryNormal dark:border-stroke-primaryNormalDark h-[52px] w-[52px]`}
          onPress={() => handleSetCollapse(!collapsed)}
        />
        {!collapsed && (
          <SidebarLabel className="w-full font-bold size-12">
            Dashboard
          </SidebarLabel>
        )}
      </View>

      <View className={`${widthFitFull} gap-[26px] pt-4 flex-1 items-center `}>
        <GroupSidebarMenu collapsed={collapsed}>
          {MAIN.map((it, idx) => (
            <SidebarItem
              key={idx}
              active={activeKey === it.key}
              collapsed={collapsed}
              label={it.label}
              iconBase={it.iconBase}
              onPress={() => onChangeActive(it.key)}
            />
          ))}
        </GroupSidebarMenu>

        <View className="w-fuill h-[1px] bg-stroke-pale dark:bg-stroke-paleDark" />

        <GroupSidebarMenu collapsed={collapsed}>
          {SECONDARY.map((it, index) => (
            <SidebarItem
              key={index}
              active={activeKey === it.key}
              collapsed={collapsed}
              label={it.label}
              iconBase={it.iconBase}
              onPress={() => onChangeActive(it.key)}
            />
          ))}
        </GroupSidebarMenu>
      </View>

      <View className={`${widthFitFull} flex items-center justify-start gap-3`}>
        <GroupSidebarMenu collapsed={collapsed}>
          <SidebarItem
            key={"Switch Theme"}
            active={false}
            collapsed={collapsed}
            label={"Switch Theme"}
            iconBase={"moon"} // moon-outline
            onPress={onToggleTheme}
          />
        </GroupSidebarMenu>
        <GroupSidebarMenu
          collapsed={collapsed}
          className="bg-surface-warningPale dark:bg-surface-warningPaleDark"
        >
          <SidebarItem
            key={"Logout"}
            active={false}
            collapsed={collapsed}
            label={"Logout"}
            iconBase={"arrow-back-circle"}
            outlinedOnInactive={false}
            onPress={onLogout}
            iconColor={"text-icon-warningBold dark:text-icon-warningBoldDark"}
          />
        </GroupSidebarMenu>
      </View>
    </SidebarContainer>
  );
}
