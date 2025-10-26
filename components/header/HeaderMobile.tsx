import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { CircleButton } from "./CircleButton";

export default function HeaderMobile() {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 lg:hidden">
      {/* Logo */}
      <Pressable className="h-10 w-10 rounded-full items-center justify-center bg-orange-500">
        <Text className="text-white text-lg">✺</Text>
      </Pressable>

      {/* Botonera */}
      <View className="flex-row items-center gap-2">
        <CircleButton>
          <Ionicons name="search" size={20} color="#0f172a" />
        </CircleButton>
        <CircleButton>
          <Ionicons name="notifications-outline" size={20} color="#0f172a" />
        </CircleButton>
        <CircleButton outline={false}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
            }}
            className="h-10 w-10 rounded-full"
            contentFit="cover"
          />
        </CircleButton>
        <CircleButton outline>
          <Ionicons name="menu" size={20} color="#f97316" />
        </CircleButton>
      </View>
    </View>
  );
}
