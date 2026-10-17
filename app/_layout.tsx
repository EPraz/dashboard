import { Slot } from "expo-router";
import { ThemeProvider } from "@/features/aster/theme/ThemeProvider";
import { DemoProvider } from "@/features/aster/data/DemoProvider";
import "../global.css";
import "../features/aster/styles/tokens.css";
import "../features/aster/styles/shell.css";
import "../features/aster/styles/ui.css";
import "../features/aster/styles/forms.css";
import "../features/aster/styles/insights.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DemoProvider>
        <Slot />
      </DemoProvider>
    </ThemeProvider>
  );
}
