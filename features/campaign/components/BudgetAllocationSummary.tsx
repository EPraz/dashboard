import { IconButton } from "@/components";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";

type AllocationItem = {
  label: string;
  value: number;
  color: string;
};

const allocationData: AllocationItem[] = [
  { label: "Social Media", value: 45, color: "#FFE8D9" },
  { label: "Paid Ads", value: 30, color: "#F8B787" },
  { label: "Email", value: 20, color: "#F46425" },
  { label: "Display Ads", value: 25, color: "#C53B12" },
];

const total = allocationData.reduce((sum, item) => sum + item.value, 0);
const BudgetAllocationSummary = () => {
  return (
    <View className="relative min-w-[260px] bg-white rounded-3xl p-5 gap-4">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="gap-1 w-[70%]">
          <Text className="text-[16px] leading-[130%] font-semibold">
            Budget Allocation
          </Text>
          <Text className="text-[16px] leading-[130%] font-semibold">
            Summary
          </Text>
        </View>

        <IconButton>
          <Feather name="arrow-up-right" color="#000" size={20} />
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
          labels={() => ""} // sin labels en el arco
          style={{
            data: {
              fill: ({ datum }) => (datum as any).color,
            },
            labels: { display: "none" },
          }}
        />

        {/* Texto central ($150K / Total Allocation) */}
        <View className="absolute top-1/2 -translate-y-1/2 items-center">
          <Text className="text-[24px] font-semibold text-[#121212]">
            $150K
          </Text>
          <Text className="text-[12px] text-[#9CA3AF]">Total Allocation</Text>
        </View>
      </View>

      {/* Leyenda */}
      <View className="absolute bottom-[10%] left-[26%] w-[200px] h-[40px] flex-row flex-wrap gap-3 items-center justify-center">
        {allocationData.map((item) => (
          <View key={item.label} className="flex-row items-center gap-1">
            <View
              className="w-[16px] h-[16px] rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-[12px] text-[#4B5563]">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BudgetAllocationSummary;
