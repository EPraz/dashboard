import { Pressable } from "react-native";

export function CircleButton({
  children,
  outline = true,
  onPress,
  size = 40,
}: {
  children: React.ReactNode;
  outline?: boolean;
  onPress?: () => void;
  size?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        "items-center justify-center rounded-full",
        outline ? "bg-white border border-slate-200" : "bg-slate-50",
        "shadow-xs android:elevation-1",
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      {children}
    </Pressable>
  );
}
