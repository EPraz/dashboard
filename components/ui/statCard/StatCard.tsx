import { iconLib, iconLibMap } from "@/constants";
import * as theme from "@/tailwind/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type StatCardProps = {
  iconName: string;
  iconLib: iconLib;
  title: string;
  value: string;
  suffix?: string;
  badgeValue: string;
  badgeColor: "success" | "fail";
  badgeLabel: string;
  special?: boolean;
};

const StatCard = ({
  iconName,
  iconLib = "ion",
  title,
  value,
  suffix,
  badgeValue,
  badgeColor,
  badgeLabel,
  special = false,
}: StatCardProps) => {
  const Icon = iconLibMap[iconLib];
  const isPositive = badgeColor === "success";

  const cardMinWidth = 312;
  const cardMinHeight = 170;

  const titleShadow = special
    ? {
        textShadowColor: "rgba(0,0,0,0.25)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
      }
    : {};

  const valueShadow = titleShadow;

  const renderBadge = () => (
    <View className="flex-row gap-2">
      <View
        className={`flex-row items-center gap-1 px-1 py-[2px] rounded-full ${special ? "bg-surface-disabled " : isPositive ? "bg-surface-successPale dark:bg-surface-successPaleDark" : "bg-surface-warningPale dark:bg-surface-warningPaleDark"} `}
      >
        <Ionicons
          name={isPositive ? "trending-up" : "trending-down"}
          size={15}
          style={special ? valueShadow : undefined}
          className={`${special ? "text-icon-primaryBoldConstant" : isPositive ? "text-icon-successBold dark:text-icon-successBoldDark" : "text-icon-warningBold dark:text-icon-warningBoldDark"}`}
        />
        <Text
          className={`${special ? "text-icon-primaryBoldConstant" : isPositive ? "text-icon-successBold dark:text-icon-successBoldDark" : "text-icon-warningBold dark:text-icon-warningBoldDark"}`}
          style={{
            ...(special ? valueShadow : {}),
          }}
        >
          {badgeValue}
        </Text>
      </View>

      <Text
        className={`leading-[130%] text-[16px]  ${special ? "text-surface-disabled" : "text-ink-sheen dark:text-ink-sheenDark"}`}
        style={{
          ...(special ? titleShadow : {}),
        }}
      >
        {badgeLabel}
      </Text>
    </View>
  );

  //  contenido común
  const content = (
    <View className="gap-4">
      {/* Header: icon + title */}
      <View className="flex-row items-center w-fit gap-3">
        <Icon
          name={iconName as any}
          size={28}
          className={
            special
              ? "flex items-center justify-center rounded-full w-10 h-10 bg-surface-disabled text-icon-primaryBold "
              : "border border-stroke-pale dark:border-stroke-paleDark  flex items-center justify-center rounded-full w-10 h-10 text-ink-bold dark:text-ink-boldDark bg-surface-main dark:bg-surface-mainDark "
          }
        />
        <Text
          className={`${special ? "text-ink-constantDark" : "text-ink-bold dark:text-ink-boldDark"} text-[20px] leading-[130%] font-semibold text-inherit`}
          style={{
            ...titleShadow,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Value + suffix */}
      <View className="gap-2 flex-row items-center w-fit">
        <Text
          className={`font-semibold leading-[120%] text-[40px]  ${special ? "text-ink-pale" : "text-ink-bold dark:text-ink-boldDark"}`}
          style={{
            // color: special ? theme.neutral.black3 : theme.neutral.black12,
            ...valueShadow,
          }}
        >
          {value}
        </Text>
        {suffix && (
          <Text
            className={`text-[16px] leading-[130%] ${special ? "text-surface-disabled" : "text-ink-sheen dark:text-ink-sheenDark"} `}
          >
            {suffix}
          </Text>
        )}
      </View>

      {renderBadge()}
    </View>
  );

  if (special) {
    return (
      <LinearGradient
        colors={[theme.surface.primaryNormal, theme.surface.pendingBold]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 20,
          padding: 16,
          minWidth: cardMinWidth,
          minHeight: cardMinHeight,
          justifyContent: "center",
          flex: 1,
        }}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View
      className="flex-1 gap-4 p-4 rounded-2xl flex flex-col items-start bg-surface-whiteCard dark:bg-surface-whiteCardDark"
      style={{
        minWidth: cardMinWidth,
        minHeight: cardMinHeight,
      }}
    >
      {content}
    </View>
  );
};

export default StatCard;
