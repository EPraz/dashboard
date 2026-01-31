import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setColorScheme("dark");
    setReady(true);
  }, [setColorScheme]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <View className={`flex-1 ${colorScheme}`}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaProvider>
  );
}
