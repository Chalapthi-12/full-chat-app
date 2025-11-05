import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({
      theme: theme,
    });
  },
}));
export { useThemeStore };
