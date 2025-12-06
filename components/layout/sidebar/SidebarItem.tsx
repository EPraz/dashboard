import { Pressable, View } from "react-native";
import {
  SidebarIcon,
  SidebarIconSelected,
  SidebarLabel,
} from "./Sidebar.styles";

type SidebarItemProps = {
  active: boolean;
  collapsed: boolean;
  label: string;
  iconBase: string;
  onPress: () => void;
  iconColor?: string;
  outlinedOnInactive?: boolean;
};

const SidebarItem = ({
  active,
  collapsed,
  label,
  iconBase,
  iconColor,
  onPress,
  outlinedOnInactive = true,
}: SidebarItemProps) => {
  const inactiveName = outlinedOnInactive
    ? (`${iconBase}-outline` as any)
    : (iconBase as any);

  return (
    <Pressable
      className="gap-2 flex-row justify-start items-center"
      onPress={onPress}
    >
      <View
        className={`${
          active
            ? "bg-surface-primaryNormal dark:bg-surface-primaryNormalDark border-stroke-primaryNormal dark:border-stroke-primaryNormalDark"
            : "bg-transparent"
        } w-11 h-11 rounded-full items-center justify-center`}
      >
        {active ? (
          <SidebarIconSelected
            name={iconBase as any}
            className={iconColor as string}
          />
        ) : (
          <SidebarIcon name={inactiveName} className={iconColor as string} />
        )}
      </View>

      {!collapsed && <SidebarLabel>{label}</SidebarLabel>}
    </Pressable>
  );
};

export default SidebarItem;
