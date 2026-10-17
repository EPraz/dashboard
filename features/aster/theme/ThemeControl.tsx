import { Icon } from "../ui/Icon";
import { useTheme } from "./ThemeProvider";

export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-control" role="group" aria-label="Color theme">
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        <Icon name="sun" size={16} />
        <span>Light</span>
      </button>
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        <Icon name="moon" size={16} />
        <span>Dark</span>
      </button>
    </div>
  );
}
