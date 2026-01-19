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
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View className="flex-row items-center bg-surface-main dark:bg-surface-mainDark rounded-full px-1 gap-2">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            const disabledClasses = tab.disabled ? "opacity-40" : "";

            return (
              <Pressable
                key={tab.key}
                className={`${
                  isActive
                    ? "bg-surface-primaryNormal dark:bg-surface-primaryNormalDark text-ink-main dark:text-ink-mainDark"
                    : "text-ink-bold dark:text-ink-boldDark"
                } px-4 py-2 rounded-full ${disabledClasses}`}
                onPress={() => onChangeTab(tab.key)}
                disabled={tab.disabled}
              >
                <Text className={`text-sm text-inherit `}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* RIGHT: Filtro fijo */}
      <Pressable className="ml-3 bg-surface-main dark:bg-surface-mainDark px-4 py-2 rounded-full flex-row items-center text-ink-bold dark:text-ink-boldDark">
        <Text className="text-sm font-semibold mr-1 text-inherit">
          This Month
        </Text>
        <SimpleLineIcons name="arrow-down" className="text-inherit" size={12} />
      </Pressable>
    </View>
  );
};

export default TopMenu;
