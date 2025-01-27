import { create } from "zustand";
import { useStore } from "./FoodDisplay";

export const useTriggerStore = create((set) => ({
  Triggered: false,
  clearTabs: false,
  IsTriggered: () => {
    set({ Triggered: true });
    set({ clearTabs: true });
  },
  IsNotTriggered: () => {
    useStore.getState().clearAllChoices(); // Call `clearAllChoices` from `useStore`
    set({ Triggered: false });
    set({ clearTabs: false });
  },
}));
