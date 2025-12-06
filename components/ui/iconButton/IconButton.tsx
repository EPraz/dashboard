import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

type IconButtonProps = PressableProps & {
  children: ReactNode;
};
const IconButton = ({
  children,
  className = "",
  disabled,
  ...rest
}: IconButtonProps) => {
  const baseClasses = `
    flex-row items-center justify-center
    w-[36px] h-[36px] rounded-full
    border border-stroke-pale dark:border-stroke-paleDark
    bg-surface-main dark:bg-surface-mainDark
  `;

  const disabledClasses = disabled ? "opacity-40 " : "";

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </Pressable>
  );
};

export default IconButton;
