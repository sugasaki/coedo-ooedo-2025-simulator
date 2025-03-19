import { create } from 'zustand';

type State = {
  runnerIds: string[];
  category: string;
};

export const useStore = create<
  State & {
    setRunnerIds: (ids: string[]) => void;
    setCategory: (category: string) => void;
  }
>(set => ({
  runnerIds: [],
  category: '',
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategory: category => set({ category }),
}));
