import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import LeadConversionBarChart from "../../../features/leads/components/leadConversionBarChart/LeadConversionBarChart";

const Graphic = () => {
  return (
    <View
      // style={{ maxWidth: 640, maxHeight: 360 }}
      style={{ minHeight: 360 }}
      className="flex-1 gap-10 p-5 rounded-3xl bg-white"
    >
      {/* header */}
      <View className="flex items-center justify-between flex-row overflow-auto gap-10">
        <View className="">
          <Text className="text-[20px] leading-[130%] font-semibold">
            Lead Conversion Trends
          </Text>
        </View>
        <View className="gap-3 flex-row items-center justify-evenly">
          <Pressable className="flex-row bg-white items-center justify-evenly gap-2 w-fit h-[36px] py-2 px-4 rounded-full border border-[#E7E7E7]">
            <Text className="text-[12px] leading-[120%] font-bold">Montly</Text>
            <SimpleLineIcons name="arrow-down" color="#000" />
          </Pressable>
          <Pressable className="flex-row bg-white items-center justify-center gap-2 h-[36px] py-2 px-3 rounded-full border border-[#E7E7E7]">
            <Text className="text-[12px] leading-[120%] font-bold">
              Semester
            </Text>
            <SimpleLineIcons name="arrow-down" color="#000" />
          </Pressable>

          <Pressable className="flex-row bg-white items-center justify-center w-[36px] h-[36px] rounded-full border border-[#E7E7E7]">
            <Feather name="arrow-up-right" color="#000" size={24} />
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
