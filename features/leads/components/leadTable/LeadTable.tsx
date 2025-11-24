import { LEADS } from "@/constants";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

const LeadTableHeader = () => (
  <View className={`${row} ${headerRow}`}>
    <View className={`${cell} ${checkboxCol}`} />
    <Text className={`${cell} ${nameCol} ${headerText}`}>Lead Name</Text>
    <Text className={`${cell} ${sourceCol} ${headerText}`}>Source</Text>
    <Text className={`${cell} ${statusCol} ${headerText}`}>Status</Text>
    <Text className={`${cell} ${dateCol} ${headerText}`}>Last Contact</Text>
  </View>
);

const LeadRow = ({ lead }: { lead: (typeof LEADS)[number] }) => (
  <Pressable className={`${row} ${bodyRow}`}>
    <View className={`${cell} ${checkboxCol}`}>
      <View className={` ${checkbox}`} />
    </View>

    <View className={`${cell} ${nameCol}`}>
      <View className={`${avatarPlaceholder}`} />
      <Text className={`text-[12px]`}>{lead.name}</Text>
    </View>

    <Text className={`${cell} ${sourceCol}`}>{lead.source}</Text>

    <View className={`${cell} ${statusCol}`}>
      <StatusPill status={lead.status} />
    </View>

    <Text className={`${cell} ${dateCol}`}>{lead.lastContact}</Text>
  </Pressable>
);

const map: Record<string, string> = {
  New: "bg-[#E8FFF1] text-[#16A34A]",
  "In Progress": "bg-[#FFF4E5] text-[#F59E0B]",
  Converted: "bg-[#FFE6E9] text-[#EF4444]",
};

const StatusPill = ({ status }: { status: string }) => {
  return (
    <View className={`px-3 py-1 rounded-full ${map[status]}`}>
      <Text className={`text-xs font-medium ${map[status]}`}>{status}</Text>
    </View>
  );
};

const LeadTable = () => {
  return (
    <View className="flex-1">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={LEADS}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={LeadTableHeader}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => <LeadRow lead={item} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </ScrollView>
    </View>
  );
};

const row = "flex-row items-center";
const headerRow = "h-[48px] bg-[#F5F6FA] rounded-tr-2xl rounded-tl-2xl";
const bodyRow = "h-[65px]  border-b-hairline border-[#ECEFF4]";
const cell =
  "justify-start items-center gap-3 p-3 flex-row font-normal text-[12px]";
const checkboxCol = "w-[48px]";
const nameCol = "w-[200px]";
const sourceCol = "w-[140px]";
const statusCol = "w-[100px]";
const dateCol = "w-[116px]";
const headerText = "font-normal text-[14px] text-[#121212] p-3 gap-2";
const avatarPlaceholder = "w-[36px] h-[36px] rounded-full bg-[#E5E7EB]";
const checkbox = "w-5 h-5 rounded-md border-[1.5px] border-[#9CA3AF]";
export default LeadTable;
