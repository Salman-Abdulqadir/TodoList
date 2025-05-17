import { useEffect, type ReactNode } from "react";

import { THEME_STORAGE_KEY, useTheme } from "./theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return <>{children}</>;
};
