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
        props.className as string
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
        props.className as string
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
        props.className as string
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
        className as string
      )}
    >
      {children}
    </View>
  );
};

type SidebarContainerProps = ViewProps & {
  collapsed: boolean;
};

export const SidebarContainer = ({
  collapsed,
  children,
  className,
  ...rest
}: PropsWithChildren<SidebarContainerProps>) => {
  return (
    <View
      {...rest}
      className={cx(
        collapsed
          ? "w-[92px]"
          : "w-[320px] shadow-sm rounded-tr-[20px] rounded-br-[20px]",
        "hidden lg:flex flex-col bg-surface-main dark:bg-surface-mainDark absolute left-0 top-0 z-10 min-h-[100vh] items-center justify-between gap-[26px] p-[20px]",
        className
      )}
    >
      {children}
    </View>
  );
};
