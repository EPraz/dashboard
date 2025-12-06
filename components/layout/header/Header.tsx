import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../logo/Logo";
import CircleButton from "./CircleButton";

type Props = {
  collapsed: boolean;
  handleSetCollapse: (value: boolean) => void;
};

export default function Header({ collapsed, handleSetCollapse }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const CONTENT_MAX_WIDTH = Infinity;
  const contentWidth = Math.min(screenWidth, CONTENT_MAX_WIDTH);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="bg-surface-main dark:bg-surface-mainDark"
    >
      {/* Contenedor que centra el contenido horizontalmente */}
      <View className="w-full items-center">
        {/* Contenedor limitado a 1440px */}
        <View
          style={{ maxWidth: contentWidth - 92, width: "100%" }}
          className="h-[72px] lg:h-[84px] flex-row items-center justify-between py-4 pr-4 lg:ml-[92px]"
        >
          <View className="lg:hidden">
            <Logo collapsed={collapsed} handleSetCollapse={handleSetCollapse} />
          </View>

          <Pressable
            onPress={() => Keyboard.dismiss()}
            className="hidden lg:flex"
          >
            <View className="hidden lg:flex flex-row items-center w-[400px] h-[52px] gap-3 px-5 rounded-[100px] bg-surface-pale dark:bg-surface-paleDark ">
              <Ionicons
                name="search"
                size={24}
                className="text-icon-sheen dark:text-icon-sheenDark"
              />
              <TextInput
                placeholder="Search Anything…"
                className="flex-1 text-[14px] outline-none focus:outline-none focus:ring-0 placeholder:text-ink-sheen dark:placeholder:text-ink-sheenDark"
                returnKeyType="search"
                submitBehavior="blurAndSubmit"
              />
            </View>
          </Pressable>

          <View className="flex-row items-center gap-3">
            <CircleButton className="lg:hidden flex">
              <Ionicons
                name="search"
                size={15}
                className="text-icon-bold dark:text-icon-boldDark"
              />
            </CircleButton>
            <CircleButton>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={15}
                className="text-icon-bold dark:text-icon-boldDark"
                // color="#0f172a"
              />
            </CircleButton>
            <CircleButton>
              <Ionicons
                name="notifications-outline"
                size={15}
                className="text-icon-bold dark:text-icon-boldDark"
                // color="#0f172a"
              />
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

            <View className="hidden lg:flex h-6 w-[1px] bg-stroke-pale dark:bg-stroke-paleDark mx-1" />

            <Pressable className="hidden lg:flex flex-row items-center bg-surface-main dark:bg-surface-mainDark border border-stroke-pale dark:border-stroke-paleDark rounded-full pl-2 pr-2.5 h-11 gap-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
                }}
                className="h-8 w-8 rounded-full"
                contentFit="cover"
              />
              <View className="pr-1">
                <Text className="text-[13px] leading-4 font-semibold text-ink-bold dark:text-ink-boldDark">
                  Hanna Calzoni
                </Text>
                <Text className="text-[12px] leading-4 text-ink-sheen dark:text-ink-sheenDark">
                  Admin Store
                </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={18}
                className="text-icon-bold dark:text-icon-boldDark"
              />
            </Pressable>

            <CircleButton
              className="lg:hidden flex bg-surface-primaryPale dark:bg-surface-primaryPaleDark"
              onPress={() => handleSetCollapse(!collapsed)}
            >
              <Ionicons
                name="menu"
                size={15}
                className="text-icon-primaryBold dark:text-icon-primaryBoldDark"
              />
            </CircleButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
