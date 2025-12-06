import { IconButton } from "@/components";
import * as theme from "@/tailwind/colors";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";

type AllocationItem = {
  label: string;
  value: number;
  color: string;
};

const BudgetAllocationSummary = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const allocationData: AllocationItem[] = useMemo(
    () => [
      {
        label: "Social Media",
        value: 45,
        color: isDark
          ? theme.surface.primaryPaleDark
          : theme.surface.primaryPale,
      },
      {
        label: "Paid Ads",
        value: 30,
        color: isDark
          ? theme.surface.primarySheenDark
          : theme.surface.primarySheen,
      },
      {
        label: "Email",
        value: 20,
        color: isDark
          ? theme.surface.primaryNormalDark
          : theme.surface.primaryNormal,
      },
      {
        label: "Display Ads",
        value: 25,
        color: isDark
          ? theme.surface.primaryBold
          : theme.surface.primaryBoldDark,
      },
    ],
    [isDark]
  );

  const total = useMemo(
    () => allocationData.reduce((sum, item) => sum + item.value, 0),
    [allocationData]
  );

  return (
    <View className="relative min-w-[260px] bg-surface-whiteCard dark:bg-surface-whiteCardDark text-ink-bold dark:text-ink-boldDark rounded-3xl p-5 gap-4">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="gap-1 w-[70%]">
          <Text className="text-[16px] leading-[130%] font-semibold text-inherit">
            Budget Allocation
          </Text>
          <Text className="text-[16px] leading-[130%] font-semibold text-inherit">
            Summary
          </Text>
        </View>

        <IconButton>
          <Feather name="arrow-up-right" className="text-inherit" size={20} />
        </IconButton>
      </View>

      {/* Semi–donut chart */}
      <View
        className="items-center justify-center overflow-hidden"
        style={{ height: 180 }}
      >
        <VictoryPie
          data={allocationData}
          x="label"
          y="value"
          startAngle={-90}
          endAngle={90}
          innerRadius={70}
          padAngle={4}
          cornerRadius={8}
          width={280}
          height={280}
          colorScale={allocationData.map((item) => item.color)}
          labels={() => ""}
          style={{
            data: {
              fill: ({ datum }) => (datum as any).color,
            },
            labels: { display: "none" },
          }}
        />

        {/* Center text */}
        <View className="absolute top-1/2 -translate-y-1/2 items-center">
          <Text className="text-[24px] font-semibold text-inherit">$150K</Text>
          <Text className="text-[12px] text-ink-sheen dark:text-ink-sheenDark">
            Total Allocation
          </Text>
        </View>
      </View>

      {/* Legend */}
      <View className="absolute bottom-[10%] left-[26%] w-[200px] h-[40px] flex-row flex-wrap gap-3 items-center justify-center">
        {allocationData.map((item) => (
          <View key={item.label} className="flex-row items-center gap-1">
            <View
              className="w-[16px] h-[16px] rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-[12px] text-ink-sheen dark:text-ink-sheenDark">
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BudgetAllocationSummary;
