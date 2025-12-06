import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import LeadSourceBreakdownChart from "./LeadSourceBreakdownChart";

const LeadSourceContainer = () => {
  return (
    <View className="flex p-5 gap-2 xl:gap-5  rounded-[20px] text-ink-bold dark:text-ink-boldDark bg-surface-whiteCard dark:bg-surface-whiteCardDark ">
      <View className="flex items-center justify-between flex-row overflow-auto gap-20">
        <Text className="text-[20px] leading-[130%] font-semibold text-inherit">
          Lead Source Breakdown
        </Text>
        <View className="gap-3 flex-row items-center justify-evenly">
          <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-evenly gap-2 xl:gap-5 w-[115px] h-[36px] py-2 px-4 rounded-full border border-stroke-pale dark:border-stroke-paleDark">
            <Text className="text-[12px] leading-[120%] font-bold text-inherit">
              Channel
            </Text>
            <SimpleLineIcons
              name="arrow-down"
              className="text-ink-bold dark:text-ink-boldDark"
            />
          </Pressable>
          <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-center w-[36px] h-[36px] rounded-full border border-stroke-pale dark:border-stroke-paleDark">
            <Feather
              name="arrow-up-right"
              className="text-ink-bold dark:text-ink-boldDark"
              size={24}
            />
          </Pressable>
        </View>
      </View>
      <View className="">
        {/* <GeographicDistributionChart />*/}
        <LeadSourceBreakdownChart />
      </View>
    </View>
  );
};

export default LeadSourceContainer;
