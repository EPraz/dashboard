import { Ionicons } from "@expo/vector-icons";
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
        <Text className="leading-[120%] font-semibold text-[40px]">
          {title}
        </Text>
        <Text className="text-[#888888]">{subTitle}</Text>
      </View>
      <View className="flex flex-1 max-w-[380px] flex-row items-center justify-evenly gap-3">
        <Pressable className="flex-row bg-white items-center justify-evenly gap-2 w-[157px] h-[44px] px-3 py-2 rounded-full">
          <Ionicons name="calendar" />
          <Text>December 2024</Text>
        </Pressable>
        <Pressable className="flex-row bg-white items-center justify-evenly gap-2 w-[98px] h-[44px] px-2 py-3 rounded-full">
          <Ionicons name="arrow-up" />
          <Text>Export</Text>
        </Pressable>
        <Pressable className="flex-row bg-[#F46425] items-center justify-center w-[44px] h-[44px] rounded-full ">
          <Ionicons name="reload" color={"white"} size={20} />
        </Pressable>
        <Pressable className="flex-row bg-white items-center justify-center w-[44px] h-[44px] rounded-full ">
          <Ionicons name="filter" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default PageHeader;
