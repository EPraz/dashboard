import { IconButton } from "@/components";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import GeographicDistributionChart from "./GeographicDistributionChart";

const GeographicContainer = () => {
  return (
    <View className="flex flex-1 p-5 gap-2 xl:gap-5  rounded-[20px] bg-surface-whiteCard dark:bg-surface-whiteCardDark text-ink-bold dark:text-ink-boldDark">
      <View className="flex items-center justify-between flex-row gap-2 w-full  ">
        <Text className="text-[20px] leading-[130%] font-semibold text-inherit">
          Geographic <br />
          Distribution of Leads
        </Text>

        <IconButton disabled>
          <Feather name="arrow-up-right" className="text-inherit" size={24} />
        </IconButton>
      </View>
      <View className="flex items-center justify-between flex-row">
        <IconButton disabled className="w-fit px-4 gap-2">
          <Text className="text-[12px] leading-[120%] font-bold text-inherit">
            All Region
          </Text>
          <SimpleLineIcons name="arrow-down" className="text-inherit" />
        </IconButton>

        <IconButton disabled className="w-fit px-4 gap-2">
          <Text className="text-[12px] leading-[120%] font-bold text-inherit">
            Top Countries
          </Text>
          <SimpleLineIcons name="arrow-down" className="text-inherit" />
        </IconButton>
      </View>
      <View className="">
        <GeographicDistributionChart />
      </View>
    </View>
  );
};

export default GeographicContainer;
