import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

type IconButtonProps = PressableProps & {
  children: ReactNode;
  bgColor?: string;
};

const CircleButton = ({
  children,
  onPress,
  bgColor,
  disabled,
  className = "",
  ...rest
}: IconButtonProps) => {
  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={onPress}
      className={[
        "items-center justify-center rounded-full border border-stroke-pale dark:border-stroke-paleDark",
        bgColor ? bgColor : "bg-surface-main dark:bg-surface-mainDark ",
        "shadow-xs android:elevation-1",
        className,
      ].join(" ")}
      style={{ width: 36, height: 36 }}
    >
      {children}
    </Pressable>
  );
};
export default CircleButton;
