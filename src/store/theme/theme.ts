import { create } from "zustand";

export type ThemeTypes = "light" | "dark";

export const THEME_STORAGE_KEY = "TODO_APP_THEME";

type ThemeStore = {
  theme: ThemeTypes;
  setTheme: (theme: ThemeTypes) => void;
};

export const useTheme = create<ThemeStore>((set) => ({
  theme:
    (typeof localStorage !== "undefined"
      ? (localStorage.getItem(THEME_STORAGE_KEY) as ThemeTypes)
      : null) || "light",
  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    set({ theme });
  },
}));
