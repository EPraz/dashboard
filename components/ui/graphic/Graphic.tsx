import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import LeadConversionBarChart from "../../../features/leads/components/leadConversionBarChart/LeadConversionBarChart";

const Graphic = () => {
  return (
    <View
      // style={{ maxWidth: 640, maxHeight: 360 }}
      style={{ minHeight: 360 }}
      className="flex-1 gap-10 p-5 rounded-3xl bg-surface-whiteCard dark:bg-surface-whiteCardDark"
    >
      {/* header */}
      <View className="flex items-center justify-between flex-row overflow-auto gap-10">
        <View className="">
          <Text className="text-[20px] leading-[130%] font-semibold text-ink-bold dark:text-ink-boldDark">
            Lead Conversion Trends
          </Text>
        </View>
        <View className="gap-3 flex-row items-center justify-evenly">
          <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-evenly gap-2 w-fit h-[36px] py-2 px-4 rounded-full border border-stroke-pale dark:border-stroke-paleDark">
            <Text className="text-[12px] leading-[120%] font-bold text-ink-bold dark:text-ink-boldDark">
              Montly
            </Text>
            <SimpleLineIcons
              name="arrow-down"
              className="text-ink-bold dark:text-ink-boldDark"
            />
          </Pressable>
          <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-center gap-2 h-[36px] py-2 px-3 rounded-full border border-stroke-pale dark:border-stroke-paleDark">
            <Text className="text-[12px] leading-[120%] font-bold text-ink-bold dark:text-ink-boldDark">
              Semester
            </Text>
            <SimpleLineIcons
              name="arrow-down"
              className="text-ink-bold dark:text-ink-boldDark"
            />
          </Pressable>

          <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-center w-[36px] h-[36px] rounded-full border border-stroke-pale dark:border-stroke-paleDark text-ink-bold dark:text-ink-boldDark">
            <Feather
              name="arrow-up-right"
              className="text-ink-bold dark:text-ink-boldDark"
              size={24}
            />
          </Pressable>
        </View>
      </View>
      <View className="flex items-center justify-center">
        <LeadConversionBarChart />
      </View>
    </View>
  );
};

export default Graphic;
