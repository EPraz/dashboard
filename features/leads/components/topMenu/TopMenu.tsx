import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

export type TopMenuTab = {
  key: string;
  label: string;
  disabled?: boolean;
};

type TopMenuProps = {
  tabs: TopMenuTab[];
  activeTab: string;
  onChangeTab: (key: string) => void;
};

const TopMenu = ({ tabs, activeTab, onChangeTab }: TopMenuProps) => {
  return (
    <View className="w-full flex-row items-center justify-between">
      {/* LEFT: Tabs con scroll horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingRight: 16 }} // opcional, separa de la derecha
      >
        <View className="flex-row items-center bg-white rounded-full px-1 gap-2">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            const disabledClasses = tab.disabled
              ? "opacity-40 border-[#E0E0E0]"
              : "";

            return (
              <Pressable
                key={tab.key}
                className={`${
                  isActive ? "bg-[#F46425]" : ""
                } px-4 py-2 rounded-full ${disabledClasses}`}
                onPress={() => onChangeTab(tab.key)}
                disabled={tab.disabled}
              >
                <Text
                  className={`text-sm ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
          {/* <Pressable className="bg-[#F46425] px-4 py-2 rounded-full">
            <Text className="text-white text-sm">Overview</Text>
          </Pressable>

          <Pressable className="px-4 py-2 rounded-full">
            <Text className="text-sm">Segmented Leads</Text>
          </Pressable>

          <Pressable className="px-4 py-2 rounded-full">
            <Text className="text-sm">Lead Funnel</Text>
          </Pressable>

          <Pressable className="px-4 py-2 rounded-full">
            <Text className="text-sm">Lead Import & Export</Text>
          </Pressable>

          <Pressable className="px-4 py-2 rounded-full">
            <Text className="text-sm">Lead Nurturing</Text>
          </Pressable> */}
        </View>
      </ScrollView>

      {/* RIGHT: Filtro fijo */}
      <Pressable className="ml-3 bg-white px-4 py-2 rounded-full flex-row items-center">
        <Text className="text-sm font-semibold mr-1">This Month</Text>
        <SimpleLineIcons name="arrow-down" size={12} />
      </Pressable>
    </View>
  );
};

export default TopMenu;
