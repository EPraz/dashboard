import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, TextInput, View } from "react-native";
import { CircleButton } from "./CircleButton";

export default function HeaderDesktop() {
  return (
    <View className="hidden lg:flex flex-row items-center gap-4 px-6 py-3 ">
      {/* Search pill */}
      <View className="flex-1">
        <View className="h-11 rounded-full bg-slate-50 border border-slate-200 px-4 flex-row items-center gap-2">
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search Anything…"
            placeholderTextColor="#9ca3af"
            className="flex-1 text-[15px] text-slate-700"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Actions (chat + bell) */}
      <View className="flex-row items-center gap-3">
        <CircleButton>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color="#0f172a"
          />
        </CircleButton>
        <CircleButton>
          <Ionicons name="notifications-outline" size={20} color="#0f172a" />
        </CircleButton>

        {/* Divider */}
        <View className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* Profile pill */}
        <Pressable className="flex-row items-center bg-white border border-slate-200 rounded-full pl-2 pr-2.5 h-11 gap-2">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
            }}
            className="h-8 w-8 rounded-full"
            contentFit="cover"
          />
          <View className="pr-1">
            <Text className="text-[13px] leading-4 font-semibold text-slate-900">
              Hanna Calzoni
            </Text>
            <Text className="text-[12px] leading-4 text-slate-500">
              Admin Store
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} color="#0f172a" />
        </Pressable>
      </View>
    </View>
  );
}
