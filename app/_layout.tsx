import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  // Déjalo así para test: forzar 'dark' al montar
  useEffect(() => {
    setColorScheme("dark");
  }, []);

  const toggle = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-white dark:bg-bg-white-dark">
        <Text className="text-txt-white-dark dark:text-txt-white mb-4">
          Modo: {colorScheme}
        </Text>

        <Pressable
          onPress={toggle}
          className="px-4 py-2 rounded-lg bg-text-black"
        >
          <Text className="text-txt-white-dark dark:text-txt-white ">
            Toggle light/dark
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
