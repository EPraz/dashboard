import { MAIN, SECONDARY, SidebarKey } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  collapsed: boolean;
  activeKey: SidebarKey;
  onChangeActive: (key: SidebarKey) => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  handleSetCollapse: (value: boolean) => void;
};

export default function Sidebar({
  collapsed,
  activeKey = "dashboard",
  onChangeActive,
  onToggleTheme,
  onLogout,
  handleSetCollapse,
}: Props) {
  return (
    <View
      className={`${collapsed ? "w-[92px] " : "w-[320px] shadow-sm rounded-tr-[20px] rounded-br-[20px]"} hidden lg:flex flex-col bg-white absolute left-0 top-0 z-10 min-h-[100vh] items-center  justify-between gap-[26px] p-[20px] `}
    >
      <View
        className={`${collapsed ? "w-fit" : "w-full"} flex-row items-center justify-start gap-6`}
      >
        <Pressable
          className={`rounded-full  border-r-2 border border-orange-500 h-[52px] w-[52px]`}
          onPress={() => handleSetCollapse(!collapsed)}
        />
        {!collapsed && (
          <Text className="color-[#121212] w-full font-bold size-8">
            Navigate
          </Text>
        )}
      </View>

      <View
        className={`${collapsed ? "w-fit" : "w-full"} gap-[26px] pt-4 flex-1 items-cente `}
      >
        <View
          className={`${collapsed ? "rounded-full w-fit" : "rounded-[20px] w-full"} bg-[#F7F7F7] p-1 gap-3 h-fit`}
        >
          {MAIN.map((it, idx) => (
            <Pressable
              className="gap-2 flex-row justify-start items-center"
              onPress={() => onChangeActive(it.key)}
              key={idx}
            >
              <View
                className={`${activeKey === it.key ? "bg-[#F46425] border-orange-500" : "bg-transparent"} w-11 h-11 rounded-full items-center justify-center`}
              >
                <Ionicons
                  name={
                    activeKey === it.key
                      ? (it.iconBase as any)
                      : (`${it.iconBase}-outline` as any)
                  }
                  size={22}
                  color={activeKey === it.key ? "#fff" : "#0f172a"}
                />
              </View>
              {!collapsed && <Text>{it.label}</Text>}
            </Pressable>
          ))}
        </View>

        <View className="w-fuill h-[1px] bg-[#E7E7E7] " />

        <View
          className={`${collapsed ? "rounded-full w-fit" : "rounded-[20px] w-full"} bg-[#F7F7F7] p-1 gap-3 h-fit`}
        >
          {SECONDARY.map((it, index) => (
            <Pressable
              className="gap-2 flex-row justify-start items-center"
              onPress={() => onChangeActive(it.key)}
            >
              <View
                className={`${activeKey === it.key ? "bg-[#F46425] border-orange-500" : "bg-transparent"} w-11 h-11 rounded-full items-center justify-center`}
              >
                <Ionicons
                  name={
                    activeKey === it.key
                      ? (it.iconBase as any)
                      : (`${it.iconBase}-outline` as any)
                  }
                  size={22}
                  color={activeKey === it.key ? "#fff" : "#0f172a"}
                />
              </View>
              {!collapsed && <Text>{it.label}</Text>}
            </Pressable>
          ))}
        </View>
      </View>

      {/* <View className="flex-1" /> */}
      <View
        className={`${collapsed ? "w-fit" : "w-full"} flex items-center justify-start gap-3`}
      >
        <View
          className={`${collapsed ? "rounded-full w-fit" : "rounded-[20px] w-full"} bg-[#F7F7F7] p-1 gap-3 h-fit`}
        >
          <Pressable
            className="gap-2 flex-row justify-start items-center "
            onPress={onToggleTheme}
          >
            <View
              className={`w-11 h-11 rounded-full items-center justify-center`}
            >
              <Ionicons name="moon-outline" size={22} color={"#0f172a"} />
            </View>
            {!collapsed && <Text>Switch Theme</Text>}
          </Pressable>
        </View>
        <View
          className={`${collapsed ? "rounded-full w-fit" : "rounded-[20px] w-full"} bg-[#FEF2F2] p-1 gap-3 h-fit`}
        >
          <Pressable
            className="gap-2 flex-row justify-start items-center "
            onPress={onLogout}
          >
            <View
              className={`w-11 h-11 rounded-full items-center justify-center`}
            >
              <Ionicons name="arrow-back-circle" size={22} color={"#EF4444"} />
            </View>
            {!collapsed && <Text>Logout</Text>}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
