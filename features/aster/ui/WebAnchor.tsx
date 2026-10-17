import type { ComponentProps } from "react";

// Expo Router's asChild slot forwards its native onPress prop on web as well
// as the working onClick handler. Keep that native-only prop off the DOM.
export function WebAnchor({
  onPress,
  ...props
}: ComponentProps<"a"> & { onPress?: unknown }) {
  void onPress;
  return <a {...props} />;
}
