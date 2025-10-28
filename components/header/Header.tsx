import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../logo/Logo";
import { CircleButton } from "./CircleButton";

type Props = {
  collapsed: boolean;
  handleSetCollapse: (value: boolean) => void;
};

export default function Header({ collapsed, handleSetCollapse }: Props) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="bg-white lg:ml-[92px]"
    >
      <View className="h-[72px] lg:h-[84px] flex-row items-center justify-between py-4 pr-4">
        <View className="lg:hidden">
          <Logo collapsed={collapsed} handleSetCollapse={handleSetCollapse} />
        </View>

        <Pressable
          onPress={() => Keyboard.dismiss()}
          className="hidden lg:flex"
        >
          <View className="hidden lg:flex flex-row items-center w-[400px] h-[52px] gap-3 px-5 rounded-[100px] bg-[#F7F7F7]">
            <Ionicons name="search" size={24} color="#9ca3af" />
            <TextInput
              placeholder="Search Anything…"
              placeholderTextColor="#888888"
              className="flex-1 text-[14px] outline-none focus:outline-none focus:ring-0"
              returnKeyType="search"
              submitBehavior="blurAndSubmit"
            />
          </View>
        </Pressable>

        <View className="flex-row items-center gap-3">
          <CircleButton className="lg:hidden flex">
            <Ionicons name="search" size={15} color="#888888" />
          </CircleButton>
          <CircleButton>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={15}
              color="#0f172a"
            />
          </CircleButton>
          <CircleButton>
            <Ionicons name="notifications-outline" size={15} color="#0f172a" />
          </CircleButton>
          <CircleButton className="lg:hidden flex">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
              }}
              className="h-9 w-9 rounded-full"
              contentFit="cover"
            />
          </CircleButton>

          <View className="hidden lg:flex h-6 w-[1px] bg-slate-200 mx-1" />

          <Pressable className="hidden lg:flex flex-row items-center bg-white border border-slate-200 rounded-full pl-2 pr-2.5 h-11 gap-2">
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
          <CircleButton
            className="lg:hidden flex"
            onPress={() => handleSetCollapse(!collapsed)}
            bgColor="bg-[#FFF5ED]"
          >
            <Ionicons name="menu" size={15} color="#F46425" />
          </CircleButton>
        </View>
      </View>

      {/* <HeaderDesktop /> */}
    </SafeAreaView>
  );
}
