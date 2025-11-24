import { iconLib, iconLibMap } from "@/components/ui/miniGraphic/MiniGraphic";
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
  badgeColor: "#2CC974" | "#EF4444";
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
  const isPositive = badgeColor === "#2CC974";

  const textMainColor = special ? "#E5E5E5" : "#121212";
  const textSubColor = special ? "#E5E5E5" : "#888888";
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
        className="flex-row items-center gap-1 px-1 py-[2px] rounded-full"
        style={{
          backgroundColor: special
            ? "#E5E5E5"
            : isPositive
              ? "#F1FCF5"
              : "#FEF2F2",
        }}
      >
        <Ionicons
          name={isPositive ? "trending-up" : "trending-down"}
          color={special ? "#F46425" : badgeColor}
          size={15}
          style={special ? valueShadow : undefined}
        />
        <Text
          style={{
            color: special ? "#F46425" : badgeColor,
            fontWeight: "600",
            ...(special ? valueShadow : {}),
          }}
        >
          {badgeValue}
        </Text>
      </View>

      <Text
        className="text-[16px] leading-[130%]"
        style={{
          color: textSubColor,
          ...(special ? titleShadow : {}),
        }}
      >
        {badgeLabel}
      </Text>
    </View>
  );

  // 🔹 contenido común
  const content = (
    <View className="gap-4">
      {/* Header: icon + title */}
      <View className="flex-row items-center w-fit gap-3">
        <Icon
          name={iconName as any}
          size={28}
          color={special ? "#F46425" : undefined}
          className={
            special
              ? "flex items-center justify-center rounded-full w-10 h-10 bg-[#E5E5E5]"
              : "border border-[#E7E7E7] flex items-center justify-center rounded-full w-10 h-10"
          }
        />
        <Text
          className="text-[20px] leading-[130%] font-semibold"
          style={{
            color: textMainColor,
            ...titleShadow,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Value + suffix */}
      <View className="gap-2 flex-row items-center w-fit">
        <Text
          className="font-semibold leading-[120%] text-[40px]"
          style={{
            color: special ? "#E5E5E5" : "#121212",
            ...valueShadow,
          }}
        >
          {value}
        </Text>
        {suffix && (
          <Text
            className="text-[16px] leading-[130%]"
            style={{
              color: textSubColor,
              ...valueShadow,
            }}
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
        colors={["#F46425", "#F5B40B"]}
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
      className="flex-1 gap-4 p-4 rounded-2xl flex flex-col items-start bg-white"
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
