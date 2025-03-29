import { create } from 'zustand';

type AppState = {
  isDrawerMenuOpen: boolean;
};

export const useAppStore = create<
  AppState & {
    setIsDrawerMenuOpen: (value: boolean) => void;
  }
>(set => ({
  isDrawerMenuOpen: false,
  setIsDrawerMenuOpen: value => set({ isDrawerMenuOpen: value }),
}));
