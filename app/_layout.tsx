import { useColorScheme } from "nativewind"; // ✅ OJO: este es el correcto
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    // Forzar modo oscuro al montar la app
    // solo para test
    setColorScheme("dark");
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-white ">
        <Text className="text-black dark:text-white">Modo: {colorScheme}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
