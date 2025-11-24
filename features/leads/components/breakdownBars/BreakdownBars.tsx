import { IconButton } from "@/components";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type LeadSourceRowProps = {
  label: string;
  value: number;
};

const leadSources: LeadSourceRowProps[] = [
  { label: "Referral", value: 45 },
  { label: "Paid Ads", value: 60 },
  { label: "Organic Search", value: 50 },
  { label: "Email Campaign", value: 75 },
];

const BreakdownBars = () => {
  return (
    <View
      className={`min-w-[312px] flex-1 relative bg-white p-5 gap-5 rounded-3xl overflow-hidden`}
    >
      <View className="gap-2">
        <View className="w-full flex-1 flex-row items-center justify-between gap-5">
          <Text className="text-[20px] leading-[130%] font-semibold">
            Top Performing Sources
          </Text>
          <IconButton disabled>
            <Feather name="arrow-up-right" color="#000" size={24} />
          </IconButton>
        </View>
        <IconButton
          disabled
          className="justify-evenly gap-2 h-[36px] w-fit  px-4"
        >
          <Text className="text-[12px] leading-[120%] font-bold">
            Conversion Rate
          </Text>
          <SimpleLineIcons name="arrow-down" color="#000" />
        </IconButton>
      </View>
      <View className="">
        {/* Título + porcentaje */}
        {leadSources.map(({ label, value }) => {
          return (
            <View className="mb-5">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[14px] leading-[130%] font-bold">
                  {label}
                </Text>
                <Text className="text-[16px] font-semibold text-[#F46425]">
                  {value}%
                </Text>
              </View>

              <View className="w-full h-[20px] bg-[#FFF4EC] rounded-sm overflow-hidden">
                {/* Barra llena */}
                <View
                  className="h-full bg-[#F46425] rounded-md"
                  style={{ width: `${value}%` }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BreakdownBars;
