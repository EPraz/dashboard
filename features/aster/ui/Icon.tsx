import Feather from "@expo/vector-icons/Feather";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Feather>["name"];
export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <span aria-hidden="true" className="ui-icon">
      <Feather name={name} size={size} style={{ color: "currentColor" }} />
    </span>
  );
}
