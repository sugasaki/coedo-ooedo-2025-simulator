import { create } from 'zustand';
import { RaceData } from '../types/race';

type State = {
  runnerIds: string[];
  category: string;
  raceData: Record<string, RaceData>;
  isRaceDataLoading: boolean;
  raceDataError: string | null;
};

export const useStore = create<
  State & {
    setRunnerIds: (ids: string[]) => void;
    setCategory: (category: string) => void;
    setRaceData: (data: Record<string, RaceData>) => void;
    setRaceDataLoading: (isLoading: boolean) => void;
    setRaceDataError: (error: string | null) => void;
  }
>(set => ({
  runnerIds: [],
  category: '',
  raceData: {},
  isRaceDataLoading: true,
  raceDataError: null,
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategory: category => set({ category }),
  setRaceData: data => set({ raceData: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
}));
