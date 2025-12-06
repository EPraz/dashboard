import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "victory-native";

type Props = {
  title: string;
  subTitle: string;
};
const PageHeader = ({ title, subTitle }: Props) => {
  return (
    <View className="flex flex-col items-start md:flex-row md:items-center justify-between gap-10 ">
      <View className=" flex flex-1 gap-2">
        <Text className="leading-[120%] text-ink-bold dark:text-ink-boldDark font-semibold text-[40px]">
          {title}
        </Text>
        <Text className="text-ink-sheen dark:text-ink-sheenDark">
          {subTitle}
        </Text>
      </View>
      <View className="flex flex-1 max-w-[380px] flex-row items-center justify-evenly gap-3">
        <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-evenly gap-2 w-[157px] h-[44px] px-3 py-2 rounded-full">
          <Ionicons
            className="text-icon-bold dark:text-icon-boldDark"
            name="calendar"
          />
          <Text className="text-ink-bold dark:text-ink-boldDark">
            December 2024
          </Text>
        </Pressable>
        <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-evenly gap-2 w-[98px] h-[44px] px-2 py-3 rounded-full">
          <Feather
            name="upload"
            className="text-icon-bold dark:text-icon-boldDark"
            size={20}
          />
          <Text className="text-ink-bold dark:text-ink-boldDark">Export</Text>
        </Pressable>
        <Pressable className="flex-row text-icon-main dark:text-icon-mainDark bg-surface-primaryNormal dark:bg-surface-primaryNormalDark items-center justify-center w-[44px] h-[44px] rounded-full ">
          <Feather name="refresh-cw" size={24} />
        </Pressable>
        <Pressable className="flex-row bg-surface-main dark:bg-surface-mainDark items-center justify-center w-[44px] h-[44px] rounded-full ">
          <Ionicons
            name="filter"
            className="text-icon-bold dark:text-icon-boldDark"
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PageHeader;
