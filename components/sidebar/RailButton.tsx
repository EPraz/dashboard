import { Pressable } from "react-native";

export function RailButton({
  children,
  active = false,
  danger = false,
  onPress,
  size = 44,
}: {
  children: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  onPress?: () => void;
  size?: number;
}) {
  const base =
    "items-center justify-center rounded-full border shadow-sm android:elevation-1";
  const cls = [
    base,
    active
      ? "bg-orange-500 border-orange-500"
      : danger
        ? "bg-rose-50 border-rose-100"
        : "bg-white border-slate-200",
  ].join(" ");
  return (
    <Pressable
      onPress={onPress}
      className={cls}
      style={{ width: size, height: size }}
    >
      {children}
    </Pressable>
  );
}
