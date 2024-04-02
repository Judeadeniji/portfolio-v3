import { JSXElement, createContext, createEffect, createSignal, useContext } from 'solid-js';

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: JSXElement;
  defaultTheme?: () => Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: () => Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: () => "light",
  setTheme: () => null,
};

const themeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = createSignal<Theme>((localStorage.getItem(props.storageKey || "theme") as Theme) || props.defaultTheme || "system");

  createEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme() === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme() ?? "");
  });

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(props.storageKey || "theme", theme);
      setTheme(theme);
    },
  };

  return (
    <themeProviderContext.Provider value={value}>
      { props.children }
      </themeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(themeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
