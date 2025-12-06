import { IconButton } from "@/components";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import LeadTable from "../leadTable/LeadTable";

type TableProps = {
  mode?: "compact" | "full";
  onToggle?: () => void;
};

const Table = ({ onToggle, mode = "compact" }: TableProps) => {
  const isFull = mode === "full";
  return (
    <View className="flex p-5 gap-5 rounded-[20px] bg-surface-whiteCard dark:bg-surface-whiteCardDark text-ink-bold dark:text-ink-boldDark">
      <View className="flex items-center justify-between flex-row overflow-auto gap-10">
        <View className="">
          <Text className="text-[20px] leading-[130%] font-semibold text-inherit">
            Recent Lead Activities
          </Text>
        </View>
        <View className="gap-3 flex-row items-center justify-evenly">
          <IconButton
            disabled
            className="justify-evenly gap-2 h-[36px] w-auto px-4 "
          >
            <Text className="text-[12px] leading-[120%] font-bold text-inherit">
              All Status
            </Text>
            <SimpleLineIcons name="arrow-down" className="text-inherit" />
          </IconButton>

          <IconButton disabled>
            <Feather name="download" size={20} className="text-inherit" />
          </IconButton>
          <IconButton disabled>
            <Ionicons name="filter" size={20} className="text-inherit" />
          </IconButton>

          <IconButton disabled={!onToggle} onPress={onToggle}>
            <Feather
              name={isFull ? "arrow-down-left" : "arrow-up-right"}
              className="text-inherit"
              size={24}
            />
          </IconButton>
        </View>
      </View>
      <View className="flex-1">
        <LeadTable />
      </View>
    </View>
  );
};

export default Table;
