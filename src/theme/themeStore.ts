import { create } from "zustand";

export interface ThemeStore {
  theme: "light" | "dark";
  toggle: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggle: () =>
    set((store) => ({ theme: store.theme === "dark" ? "light" : "dark" })),
}));

export default useThemeStore;
