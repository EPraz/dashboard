import { IconButton } from "@/components";
import {
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Zocial,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import TestBarChart, {
  ChartSelector,
} from "../../../features/leads/components/testBarChar/TestBarChar";

export type iconLib = "mc" | "ft" | "ion" | "zc" | "mi" | "fa" | "ev" | "oc";
export const iconLibMap: Record<iconLib, any> = {
  mc: MaterialCommunityIcons,
  ion: Ionicons,
  ft: Fontisto,
  zc: Zocial,
  mi: MaterialIcons,
  fa: FontAwesome,
  ev: EvilIcons,
  oc: Octicons,
};
type Props = {
  title: string;
  subTitle?: string;
  iconLib?: iconLib;
  iconName?: string;
  value: string;
  valueLabel?: string;
  suffix: string;
  charData: ChartSelector;
};
const MiniGraphic = ({
  title,
  subTitle,
  iconLib = "ion",
  iconName,
  value,
  valueLabel,
  suffix,
  charData,
}: Props) => {
  function getIconLib(iconLib: iconLib): any {
    return iconLibMap[iconLib];
  }
  const Icon = getIconLib(iconLib);

  return (
    <View
      className={` min-w-[312px] flex-1 relative bg-white  p-5 gap-5 rounded-3xl overflow-hidden`}
    >
      <View className="gap-2">
        <View className="w-full flex-1 flex-row items-center justify-between gap-2">
          <Text className="text-[20px] leading-[130%] font-semibold">
            {title}
          </Text>
          <IconButton disabled>
            <Feather name="arrow-up-right" color="#000" size={24} />
          </IconButton>
        </View>

        {subTitle && (
          <View className="flex-row gap-2 flex items-center">
            {iconLib && (
              <Icon
                name={iconName as any}
                size={28}
                className="border  border-[#F46425] bg-[#F46425] text-white flex items-center justify-center rounded-full w-10 h-10"
              />
            )}
            <Text className="font-semibold leading-[130%] text-[16px] text-[#121212]">
              {subTitle}
            </Text>
          </View>
        )}

        <View className="gap-2 flex-row items-center w-fit">
          <Text className="font-semibold leading-[120%] text-[40px] text-[#F46425] ">
            {value}
          </Text>
          {valueLabel && (
            <Text className="text-[16px] leading-[130%] text-[#121212] ">
              {valueLabel}
            </Text>
          )}
        </View>
        <Text className="text-[14px] leading-[120%] text-[#888888] ">
          {suffix}
        </Text>
      </View>
      <View className="absolute right-0 bottom-0 -z-10">
        <TestBarChart which={charData} />
      </View>
    </View>
  );
};

export default MiniGraphic;
