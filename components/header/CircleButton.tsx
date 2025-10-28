import { Pressable } from "react-native";

export function CircleButton({
  children,
  onPress,
  bgColor,
  className,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  bgColor?: string;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        "items-center justify-center rounded-full",
        bgColor ? bgColor : "bg-white border border-[#E7E7E7]",
        "shadow-xs android:elevation-1",
        className,
      ].join(" ")}
      style={{ width: 36, height: 36 }}
    >
      {children}
    </Pressable>
  );
}
