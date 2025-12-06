import { LEADS } from "@/constants";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

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
      <Text className={`text-[12px] text-inherit`}>{lead.name}</Text>
    </View>

    <Text className={`${cell} ${sourceCol}`}>{lead.source}</Text>

    <View className={`${cell} ${statusCol}`}>
      <StatusPill status={lead.status} />
    </View>

    <Text className={`${cell} ${dateCol}`}>{lead.lastContact}</Text>
  </Pressable>
);

const bgMap: Record<string, string> = {
  New: "bg-surface-successPale dark:bg-surface-successPaleDark",
  "In Progress": "bg-surface-pendingPale dark:bg-surface-pendingPaleDark",
  Converted: "bg-surface-warningPale dark:bg-surface-warningPaleDark",
};

const textMap: Record<string, string> = {
  New: "text-ink-successBold dark:text-ink-successBoldDark",
  "In Progress": "text-ink-pendingBold dark:text-ink-pendingBoldDark",
  Converted: "text-ink-warningBold dark:text-ink-warningBoldDark",
};

const StatusPill = ({ status }: { status: string }) => (
  <View className={`px-3 py-1 rounded-full ${bgMap[status]}`}>
    <Text className={`text-xs font-medium ${textMap[status]}`}>{status}</Text>
  </View>
);

const LeadTableList = () => (
  <FlatList
    data={LEADS}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={LeadTableHeader}
    stickyHeaderIndices={[0]}
    renderItem={({ item }) => <LeadRow lead={item} />}
    contentContainerStyle={{ flexGrow: 1 }}
  />
);

const LeadTable = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // match your md breakpoint

  return (
    <View className="flex-1 w-full bg-surface-pale dark:bg-surface-paleDark text-ink-bold dark:text-ink-boldDark rounded-xl">
      {isMobile ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={{ minWidth: 600 }}>
            <LeadTableList />
          </View>
        </ScrollView>
      ) : (
        <LeadTableList />
      )}
    </View>
  );
};

const row = "flex-row items-center w-full text-inherit";
const headerRow = "h-[48px] rounded-tr-2xl rounded-tl-2xl text-inherit";
const bodyRow = "h-[65px]  border-b-hairline border-[#ECEFF4] text-inherit";
const cell =
  "justify-start items-center gap-3 p-3 flex-row font-normal text-[12px] text-inherit";
const checkboxCol = "w-[48px]";
const nameCol = " flex-[2]";
const sourceCol = " flex-[1]";
const statusCol = " flex-[1]";
const dateCol = " flex-[1]";
const headerText = "font-normal text-[14px] text-inherit p-3 gap-2";
const avatarPlaceholder =
  "w-[36px] h-[36px] rounded-full bg-[#E5E7EB] text-inherit";
const checkbox =
  "w-5 h-5 rounded-md border-[1.5px] border-[#9CA3AF] text-inherit";
export default LeadTable;
