import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
const preferenceKey = "aster.appearance";

function loadAppearance(): { theme: Theme; warning: string } {
  try {
    const saved =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(preferenceKey);
    return { theme: saved === "dark" ? "dark" : "light", warning: "" };
  } catch {
    return {
      theme: "light",
      warning:
        "Your browser cannot save preferences. You can still explore Aster in this session.",
    };
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadAppearance);
  const [theme, updateTheme] = useState<Theme>(initial.theme);
  const [warning, setWarning] = useState(initial.warning);
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  const setTheme = useCallback((next: Theme) => {
    updateTheme(next);
    try {
      window.localStorage.setItem(preferenceKey, next);
      setWarning("");
    } catch {
      setWarning(
        "Your browser cannot save preferences. Your appearance will last for this session only.",
      );
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="aster-app" data-theme={theme}>
        {warning && (
          <div className="storage-warning" role="status">
            {warning}
          </div>
        )}
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("Aster theme requires ThemeProvider.");
  return value;
}
