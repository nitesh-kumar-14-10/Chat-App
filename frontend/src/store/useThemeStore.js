import { create } from "zustand";

const isBrowser = typeof window !== "undefined";

export const useThemeStore = create((set) => ({
  theme: isBrowser ? localStorage.getItem("streamify-theme") || "coffee" : "coffee",

  setTheme: (theme) => {
    if (typeof theme === "string") {
      if (isBrowser) localStorage.setItem("streamify-theme", theme);
      set({ theme });
    }
  },
}));
