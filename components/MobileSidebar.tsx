import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SidebarProps {
  sidebarOpen: boolean;
  handleSidebar: (open: boolean) => void;
}

const navItems = [
  { name: "Chats", icon: "chatbubbles-outline", route: "/chats" },
  { name: "Search", icon: "search-outline", route: "/search" },
  { name: "Manage subscription", icon: "card-outline", route: "/subscription" },
  { name: "Updates & FAQ", icon: "information-circle-outline", route: "/faq" },
  { name: "Settings", icon: "settings-outline", route: "/settings" },
] as const;

const chatList = [
  { name: "Welcome", count: 48, color: "bg-transparent" },
  { name: "UI8 Production", count: 16, color: "bg-purple-500" },
];

export default function Sidebar({ sidebarOpen, handleSidebar }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <Pressable
        className="absolute z-40 inset-0 bg-black/30"
        onPress={() => handleSidebar(false)}
      />

      {/* Sidebar */}
      <SafeAreaView className="absolute z-50 top-0 left-0 bottom-0 w-72 bg-[#0D0D0D] p-5">
        {/* Logo/Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-white">Brainwave</Text>
          <Pressable onPress={() => handleSidebar(false)}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Navigation */}
        <View className="space-y-3 mb-6">
          {navItems.map((item, index) => {
            const active = pathname === item.route;
            return (
              <Pressable
                key={index}
                onPress={() => {
                  router.push(item.route);
                  handleSidebar(false);
                }}
                className={`flex-row items-center px-3 py-2 rounded-lg ${
                  active ? "bg-[#1A1A1A]" : "bg-transparent"
                }`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={active ? "#60A5FA" : "#9CA3AF"}
                />
                <Text
                  className={`ml-3 font-medium text-base ${
                    active ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Chat List */}
        <View className="border-t border-gray-700 pt-4 mb-4">
          <Text className="text-gray-500 uppercase text-xs mb-3">
            Chat list
          </Text>
          {chatList.map((chat, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between px-3 py-2 rounded-lg hover:bg-[#1A1A1A]"
            >
              <View className="flex-row items-center">
                <View className={`w-3 h-3 rounded-full mr-2 ${chat.color}`} />
                <Text className="text-gray-300 text-sm font-medium">
                  {chat.name}
                </Text>
              </View>
              <View className="bg-[#1A1A1A] px-2 py-1 rounded-full">
                <Text className="text-xs text-gray-400">{chat.count}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Profile section */}
        <View className="flex-row items-center justify-between bg-[#1A1A1A] p-3 rounded-lg mb-4">
          <View className="flex-row items-center">
            <View className="w-9 h-9 rounded-full bg-gray-600 mr-3 items-center justify-center">
              <Text className="text-white">👤</Text>
            </View>
            <View>
              <Text className="text-white text-sm font-semibold">
                Tran Mau Tri Tam
              </Text>
              <Text className="text-gray-400 text-xs">tam@ui8.net</Text>
            </View>
          </View>
          <View className="bg-green-600 px-2 py-0.5 rounded-full">
            <Text className="text-white text-xs">Free</Text>
          </View>
        </View>

        {/* Upgrade CTA */}
        <Pressable className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg py-2 mb-6">
          <Text className="text-center text-white font-semibold text-sm">
            Upgraded to Pro
          </Text>
        </Pressable>

        {/* Theme Switch */}
        <View className="mt-auto flex-row justify-between items-center border-t border-gray-700 pt-4">
          <Text className="text-gray-400 text-sm">Theme</Text>
          <View className="flex-row space-x-2">
            <Pressable className="w-5 h-5 rounded-full bg-white" />
            <Pressable className="w-5 h-5 rounded-full bg-gray-800 border border-white" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
