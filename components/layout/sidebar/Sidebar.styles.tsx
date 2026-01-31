import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, type ComponentProps } from "react";
import { Text, View, ViewProps, type TextProps } from "react-native";

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const SidebarLabel = (props: TextProps) => {
  return (
    <Text
      {...props}
      selectable={false}
      className={cx(
        "select-none text-ink-bold dark:text-ink-boldDark",
        props.className as string,
      )}
    />
  );
};

export const SidebarIcon = (props: ComponentProps<typeof Ionicons>) => {
  return (
    <Ionicons
      {...props}
      size={22}
      className={cx(
        "text-icon-bold dark:text-icon-boldDark",
        props.className as string,
      )}
    />
  );
};

export const SidebarIconSelected = (props: ComponentProps<typeof Ionicons>) => {
  return (
    <Ionicons
      {...props}
      size={22}
      className={cx(
        "text-icon-lightConstant dark:text-icon-lightConstantDark",
        props.className as string,
      )}
    />
  );
};

type GroupSidebarMenuProps = {
  collapsed: boolean;
  children: React.ReactNode;
  className?: string;
};
export const GroupSidebarMenu = ({
  collapsed,
  children,
  className,
}: GroupSidebarMenuProps) => {
  return (
    <View
      className={cx(
        `${collapsed ? "rounded-full w-fit" : "rounded-[20px] w-full"} bg-surface-pale dark:bg-surface-paleDark p-1 gap-3 h-fit`,
        className as string,
      )}
    >
      {children}
    </View>
  );
};

type SidebarContainerProps = ViewProps & {
  collapsed: boolean;
  isDesktop: boolean;
};

export const SidebarContainer = ({
  collapsed,
  isDesktop,
  children,
  className,
  ...rest
}: PropsWithChildren<SidebarContainerProps>) => {
  const desktopWidth = collapsed ? "w-[92px]" : "w-[320px]";
  // const mobileWidth = "w-[320px]";
  const mobileWidth = "w-[85vw] max-w-[360px]";

  // Drawer positioning for mobile/tablet
  const mobilePosition = collapsed ? "-left-[340px]" : "left-0";

  return (
    <View
      {...rest}
      className={cx(
        isDesktop ? desktopWidth : mobileWidth,
        isDesktop ? "left-0" : mobilePosition,
        // ✅ always render; on mobile it slides off-screen when collapsed
        "flex flex-col bg-surface-main dark:bg-surface-mainDark absolute top-0 z-20 min-h-[100vh] items-center justify-between gap-[26px] p-[20px]",
        // ✅ transitions on web (nice), harmless on native
        "transition-all duration-200",
        !collapsed ? "shadow-sm rounded-tr-[20px] rounded-br-[20px]" : "",
        className,
      )}
    >
      {children}
    </View>
  );
};
